/**
 * useReducedMotion Hook
 * Respects user's reduced motion accessibility preference
 * Critical for accessibility compliance (WCAG 2.1)
 */

import { useEffect, useState } from 'react';
import { AccessibilityInfo } from 'react-native';

/**
 * Checks if user has enabled reduced motion in system settings
 *
 * @returns boolean - true if reduced motion is preferred
 *
 * @example
 * const reducedMotion = useReducedMotion();
 *
 * const animationConfig = reducedMotion
 *   ? { duration: 0 }
 *   : springs.smooth;
 */
export const useReducedMotion = (): boolean => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check initial state
    const checkReducedMotion = async () => {
      try {
        const isReduceMotionEnabled = await AccessibilityInfo.isReduceMotionEnabled();
        setReducedMotion(isReduceMotionEnabled);
      } catch (error) {
        console.warn('Failed to check reduced motion setting:', error);
        setReducedMotion(false);
      }
    };

    checkReducedMotion();

    // Listen for changes
    const subscription = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      (isReduceMotionEnabled) => {
        setReducedMotion(isReduceMotionEnabled);
      }
    );

    // Cleanup
    return () => {
      subscription.remove();
    };
  }, []);

  return reducedMotion;
};

export default useReducedMotion;
