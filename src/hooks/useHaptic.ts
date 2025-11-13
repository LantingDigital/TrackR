/**
 * useHaptic Hook
 * Unified haptic feedback system across the app
 * Wraps expo-haptics with consistent naming and error handling
 */

import * as Haptics from 'expo-haptics';
import { useCallback } from 'react';

export enum HapticType {
  // Light
  LIGHT = 'light',

  // Medium
  MEDIUM = 'medium',

  // Heavy
  HEAVY = 'heavy',

  // Selection
  SELECTION = 'selection',

  // Impact
  IMPACT_LIGHT = 'impactLight',
  IMPACT_MEDIUM = 'impactMedium',
  IMPACT_HEAVY = 'impactHeavy',

  // Notification
  SUCCESS = 'notificationSuccess',
  WARNING = 'notificationWarning',
  ERROR = 'notificationError',
}

/**
 * Haptic Usage Guide:
 *
 * - Button Tap: LIGHT
 * - Toggle Switch: LIGHT
 * - Card Press: MEDIUM
 * - CTA Button: MEDIUM
 * - Delete Action: HEAVY
 * - Slider Change: SELECTION
 * - Pull-to-Refresh Trigger: MEDIUM
 * - Success (Log Saved): SUCCESS
 * - Error: ERROR
 * - Tab Switch: LIGHT
 */

export const useHaptic = () => {
  const trigger = useCallback(async (type: HapticType) => {
    try {
      switch (type) {
        case HapticType.LIGHT:
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          break;
        case HapticType.MEDIUM:
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          break;
        case HapticType.HEAVY:
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          break;
        case HapticType.SELECTION:
          await Haptics.selectionAsync();
          break;
        case HapticType.IMPACT_LIGHT:
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          break;
        case HapticType.IMPACT_MEDIUM:
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          break;
        case HapticType.IMPACT_HEAVY:
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          break;
        case HapticType.SUCCESS:
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          break;
        case HapticType.WARNING:
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
          break;
        case HapticType.ERROR:
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          break;
        default:
          console.warn(`Unknown haptic type: ${type}`);
      }
    } catch (error) {
      // Silently fail - haptics not available on all devices/simulators
      console.warn('Haptic feedback failed:', error);
    }
  }, []);

  return { trigger };
};

export default useHaptic;
