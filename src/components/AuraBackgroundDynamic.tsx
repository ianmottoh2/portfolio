'use client';

import dynamic from 'next/dynamic';

const AuraBackground = dynamic(() => import('./AuraBackground'), {
  ssr: false,
  loading: () => null,
});

// Static gradient renders instantly (server + first paint) so the background is
// never just flat black while the WebGL chunk hydrates. The opaque shader frames
// cover it seamlessly once the canvas starts rendering.
const PLACEHOLDER_GRADIENT =
  'radial-gradient(circle at 50% 32%, rgba(91, 141, 239, 0.09) 0%, rgba(91, 141, 239, 0.03) 34%, transparent 62%), #060607';

export default function AuraBackgroundDynamic() {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      style={{ background: PLACEHOLDER_GRADIENT }}
      aria-hidden="true"
    >
      <AuraBackground />
    </div>
  );
}
