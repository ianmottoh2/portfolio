'use client';

import React from 'react';
import { useNavigation } from './NavigationContext';

interface OpenCVButtonProps {
  className?: string;
  children: React.ReactNode;
}

export const OpenCVButton: React.FC<OpenCVButtonProps> = ({ className = '', children }) => {
  const { openCVModal } = useNavigation();

  return (
    <button type="button" onClick={openCVModal} className={className}>
      {children}
    </button>
  );
};
