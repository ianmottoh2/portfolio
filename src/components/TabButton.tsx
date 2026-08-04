'use client';

import React from 'react';
import { useNavigation } from './NavigationContext';
import { ActiveTab } from '../types';

interface TabButtonProps {
  tab: ActiveTab;
  className?: string;
  children: React.ReactNode;
}

export const TabButton: React.FC<TabButtonProps> = ({ tab, className = '', children }) => {
  const { setActiveTab } = useNavigation();

  const handleClick = () => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  );
};
