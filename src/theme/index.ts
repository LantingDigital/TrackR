/**
 * TrackR Design System - Main Theme Export
 * Complete design system following Apple HIG principles
 * Philosophy: Clarity, Deference, Depth, Fluidity, Harmony
 */

import { colors } from './colors';
import { typography, fonts } from './typography';
import { spacing, touchTargets } from './spacing';
import { borderRadius } from './borderRadius';
import { shadows } from './shadows';
import { springs, durations, animations } from './springs';

/**
 * Unified Theme Object
 * Import this to access all design tokens
 *
 * @example
 * import { theme } from '@/theme';
 *
 * const styles = StyleSheet.create({
 *   container: {
 *     backgroundColor: theme.colors.background.primary,
 *     padding: theme.spacing.md,
 *     borderRadius: theme.borderRadius.lg,
 *     ...theme.shadows.md,
 *   },
 * });
 */
export const theme = {
  colors,
  typography,
  fonts,
  spacing,
  touchTargets,
  borderRadius,
  shadows,
  springs,
  durations,
  animations,
} as const;

// Export individual modules for granular imports
export { colors } from './colors';
export { typography, fonts } from './typography';
export { spacing, touchTargets } from './spacing';
export { borderRadius } from './borderRadius';
export { shadows } from './shadows';
export { springs, durations, animations } from './springs';

// Export types
export type Theme = typeof theme;
export type { Colors } from './colors';
export type { Typography } from './typography';
export type { Spacing, TouchTargets } from './spacing';
export type { BorderRadius } from './borderRadius';
export type { Shadows } from './shadows';
export type { Springs, Durations, Animations, SpringConfig } from './springs';

/**
 * Design System Checklist for Components:
 *
 * ✅ Uses theme tokens (no hardcoded colors/spacing)
 * ✅ Minimum touch target 44x44pt
 * ✅ Spring-based animations (no easing curves)
 * ✅ Haptic feedback on interactions
 * ✅ Respects reduced motion preference
 * ✅ Text never overflows (auto-expand containers)
 * ✅ Consistent border radius per component type
 * ✅ Appropriate shadow level for elevation
 * ✅ VoiceOver labels (accessibility)
 * ✅ High contrast (4.5:1 minimum)
 * ✅ TypeScript types defined
 * ✅ Follows Apple's Clarity, Deference, Depth principles
 */

export default theme;
