/**
 * Success Overlay Context - TrackR
 * Global success animation overlay that lives above navigation
 * Prevents glitchy transitions when logging rides
 */

import React, { createContext, useContext, useState, useCallback } from 'react';

interface SuccessOverlayData {
  title: string;
  subtitle: string;
}

interface SuccessOverlayContextType {
  showSuccess: (data: SuccessOverlayData) => void;
  hideSuccess: () => void;
  isVisible: boolean;
  data: SuccessOverlayData | null;
}

const SuccessOverlayContext = createContext<SuccessOverlayContextType | undefined>(undefined);

export const SuccessOverlayProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState<SuccessOverlayData | null>(null);

  const showSuccess = useCallback((newData: SuccessOverlayData) => {
    setData(newData);
    setIsVisible(true);
  }, []);

  const hideSuccess = useCallback(() => {
    setIsVisible(false);
    setData(null);
  }, []);

  return (
    <SuccessOverlayContext.Provider value={{ showSuccess, hideSuccess, isVisible, data }}>
      {children}
    </SuccessOverlayContext.Provider>
  );
};

export const useSuccessOverlay = (): SuccessOverlayContextType => {
  const context = useContext(SuccessOverlayContext);
  if (!context) {
    throw new Error('useSuccessOverlay must be used within a SuccessOverlayProvider');
  }
  return context;
};

export default SuccessOverlayContext;
