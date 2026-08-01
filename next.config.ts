import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Ensure Next.js can resolve Three.js and Fiber packages properly
  transpilePackages: ['@react-three/fiber', '@react-three/drei', 'three'],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
