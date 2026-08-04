'use client';

import { createContext, useContext } from 'react';
import { ActiveTab } from '../types';

interface NavigationContextValue {
  setActiveTab: (tab: ActiveTab) => void;
  openCVModal: () => void;
}

const NavigationContext = createContext<NavigationContextValue | null>(null);

export function useNavigation(): NavigationContextValue {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}

export const NavigationProvider = NavigationContext.Provider;
