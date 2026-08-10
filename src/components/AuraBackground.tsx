'use client';

import React, { useEffect, useRef } from 'react';
import {
  WebGLRenderer,
  OrthographicCamera,
  Scene,
  PlaneGeometry,
  ShaderMaterial,
  Color,
  Vector2,
  Mesh,
} from 'three';

// --- Tunable uniforms (adjust to retune the effect) ---
// Colors are tied to the site palette: near-black base + the single blue accent.
const MAX_DPR = 1.5; // never render a background at full retina resolution
const MAX_DELTA = 0.1; // clamp frame delta (s) so a backgrounded tab can't cause a time jump
const UNIFORMS_DEFAULTS = {
  uScale: 1.8, // noise frequency
  uSpeed: 0.2, // animation rate (seconds of shader time per real second)
  uDistortion: 2.2, // how strongly the noise warps the field (wider motion range)
  uIntensity: 0.9, // glow strength
  uColorBase: new Color('#060607'),
  uColorAccent1: new Color('#5B8DEF'),
  uColorAccent2: new Color('#6C9BF5'),
};

// Static fallback used when WebGL is unavailable or prefers-reduced-motion is set.
const FALLBACK_BACKGROUND =
  'radial-gradient(circle at 50% 32%, rgba(91, 141, 239, 0.09) 0%, rgba(91, 141, 239, 0.03) 34%, transparent 62%), #060607';

// Fullscreen quad. The quad maps 1:1 to the viewport via the orthographic camera.
const VERTEX_SHADER = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

varying vec2 vUv;

uniform vec2 uResolution;
uniform float uTime;
uniform float uScale;
uniform float uSpeed;
uniform float uDistortion;
uniform float uIntensity;
uniform vec3 uColorBase;
uniform vec3 uColorAccent1;
uniform vec3 uColorAccent2;

// --- Simplex noise: standard Ashima Arts / Stefan Gustavson implementation (MIT) ---
// Freely-reusable building block; this is the algorithm only, not the creative
// shader composition above/below it.

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
        i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

// --- Fractal Brownian motion (3 octaves — kept cheap for a background effect) ---
float fbm(vec3 p) {
  float value = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 3; ++i) {
    value += amp * snoise(p);
    p = p * 2.03 + vec3(13.7, 7.3, 5.9);
    amp *= 0.5;
  }
  return value;
}

void main() {
  // Aspect-corrected, centered coordinates so forms keep their shape on any screen.
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 p = (vUv - 0.5) * vec2(aspect, 1.0);

  float t = uTime * uSpeed;

  // Domain warp — one broad noise field bends the sampling coordinates so the
  // forms wander across a wide area instead of sitting still (uDistortion
  // controls how wide that wander range is).
  float warp = fbm(vec3(p * uScale * 0.5 + 3.1, t * 0.5));
  vec3 field = vec3(p * uScale + uDistortion * warp, t * 0.35);

  // Large-scale nebula body + finer secondary wisps.
  float nebula = fbm(field);
  float detail = fbm(field * 1.9 + vec3(4.7, 9.2, 2.6));

  float shape = 0.62 * nebula + 0.38 * detail;
  float glow = smoothstep(-0.75, 1.1, shape);
  glow = pow(glow, 1.5);

  // Gentle radial falloff toward the edges keeps the effect behind panels and
  // keeps foreground text readable instead of being fought by bright corners.
  float d = length(p);
  float falloff = 1.0 - smoothstep(0.5, 1.25, d);

  // Monochrome-with-one-accent palette: near-black base lifted toward the blue accent.
  vec3 accent = mix(uColorAccent1, uColorAccent2, 0.5 + 0.5 * detail);
  vec3 color = uColorBase + accent * (glow * uIntensity * falloff);

  gl_FragColor = vec4(color, 1.0);
}
`;

export const AuraBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (typeof window === 'undefined') return;

    // prefers-reduced-motion → static gradient fallback, no WebGL context at all.
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      container.style.background = FALLBACK_BACKGROUND;
      return;
    }

    let renderer: WebGLRenderer;
    let material: ShaderMaterial;
    let geometry: PlaneGeometry;
    let resizeObserver: ResizeObserver;
    let intersectionObserver: IntersectionObserver | null = null;
    let animationFrame = 0;
    let lastTime = performance.now();
    let paused = document.hidden;

    try {
      renderer = new WebGLRenderer({
        antialias: false,
        depth: false,
        stencil: false,
        powerPreference: 'high-performance',
        alpha: false,
      });
    } catch (error) {
      // WebGL unavailable (headless/very old device) → static fallback.
      container.style.background = FALLBACK_BACKGROUND;
      return;
    }

    const canvas = renderer.domElement;
    canvas.className = 'absolute inset-0 h-full w-full';
    canvas.style.display = 'block';
    container.appendChild(canvas);

    const scene = new Scene();
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 2);
    camera.position.z = 1;

    geometry = new PlaneGeometry(2, 2);
    material = new ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new Vector2(1, 1) },
        uScale: { value: UNIFORMS_DEFAULTS.uScale },
        uSpeed: { value: UNIFORMS_DEFAULTS.uSpeed },
        uDistortion: { value: UNIFORMS_DEFAULTS.uDistortion },
        uIntensity: { value: UNIFORMS_DEFAULTS.uIntensity },
        uColorBase: { value: UNIFORMS_DEFAULTS.uColorBase },
        uColorAccent1: { value: UNIFORMS_DEFAULTS.uColorAccent1 },
        uColorAccent2: { value: UNIFORMS_DEFAULTS.uColorAccent2 },
      },
    });
    scene.add(new Mesh(geometry, material));

    const resize = (width: number, height: number) => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const w = Math.max(1, Math.floor(width * dpr));
      const h = Math.max(1, Math.floor(height * dpr));
      // updateStyle=false → never let Three.js write inline CSS on resize.
      renderer.setSize(w, h, false);
      renderer.setPixelRatio(1); // dimensions already include the dpr cap
      material.uniforms.uResolution.value.set(w, h);
    };

    // Initial size before the observer's first callback so there's no degenerate frame.
    const rect = container.getBoundingClientRect();
    resize(rect.width || window.innerWidth, rect.height || window.innerHeight);

    resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      resize(entry.contentRect.width, entry.contentRect.height);
    });
    resizeObserver.observe(container);

    const tick = (now: number) => {
      if (paused) {
        animationFrame = 0; // render loop fully stopped
        return;
      }
      animationFrame = requestAnimationFrame(tick);
      // Delta-time driven (not frame-count), clamped so resume can't jump forward.
      const delta = Math.min((now - lastTime) / 1000, MAX_DELTA);
      lastTime = now;
      material.uniforms.uTime.value += delta * UNIFORMS_DEFAULTS.uSpeed;
      renderer.render(scene, camera);
    };

    const setPaused = (value: boolean) => {
      if (paused === value) return;
      paused = value;
      if (paused) {
        cancelAnimationFrame(animationFrame);
        animationFrame = 0;
        lastTime = performance.now(); // reset delta reference → no time jump on resume
      } else {
        lastTime = performance.now();
        if (animationFrame === 0) animationFrame = requestAnimationFrame(tick);
      }
    };

    const handleVisibility = () => setPaused(document.hidden);

    if ('IntersectionObserver' in window) {
      intersectionObserver = new IntersectionObserver((entries) => {
        for (const entry of entries) setPaused(!entry.isIntersecting);
      });
      intersectionObserver.observe(canvas);
    }
    document.addEventListener('visibilitychange', handleVisibility);

    // Render one frame immediately so the aura is visible the moment the chunk
    // loads, then always start the loop. If the page loaded backgrounded, the
    // first tick stops the loop and observers keep it paused.
    lastTime = performance.now();
    renderer.render(scene, camera);
    animationFrame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      if (intersectionObserver) intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
      geometry.dispose();
      material.dispose();
      renderer.forceContextLoss();
      renderer.dispose();
      canvas.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    />
  );
};

export default AuraBackground;
