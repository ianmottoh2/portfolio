'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface AvatarImageProps {
  src: string;
  alt: string;
  sizes: string;
}

export const AvatarImage: React.FC<AvatarImageProps> = ({ src, alt, sizes }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && (
        <div
          className="absolute inset-0 animate-pulse bg-white/10"
          role="status"
          aria-label="Loading profile photo"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.12] via-transparent to-transparent" />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={`object-cover object-center transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setLoaded(true)}
      />
    </>
  );
};
