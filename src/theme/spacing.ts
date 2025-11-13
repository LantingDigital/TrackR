/**
 * Spacing System - TrackR Design System
 * 8px grid base with 4px micro adjustments
 * Ensures consistent spacing throughout the app
 */

export const spacing = {
  // Micro Spacing (4px increments)
  xxs: 4,
  xs: 8,

  // Standard Spacing (8px increments)
  sm: 16,
  md: 24,
  lg: 32,
  xl: 40,
  xxl: 48,
  xxxl: 64,
} as const;

/**
 * Touch Target Sizes
 * Following Apple HIG minimum requirements
 */
export const touchTargets = {
  minimum: 44, // 44x44pt minimum (Apple HIG)
  comfortable: 48, // 48x48pt comfortable
  large: 56, // 56x56pt for primary actions
} as const;

export type Spacing = typeof spacing;
export type TouchTargets = typeof touchTargets;
