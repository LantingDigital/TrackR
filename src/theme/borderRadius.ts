/**
 * Border Radius System - TrackR Design System
 * Varied by component size, harmonized with device hardware
 * Modern phones have ~20-24px corner radius - our modals match
 */

export const borderRadius = {
  // Small Elements
  xs: 4,
  sm: 8,

  // Medium Elements
  md: 12,
  lg: 16,

  // Large Elements
  xl: 20,
  xxl: 24,

  // Special
  full: 9999, // Circular/pill shape
} as const;

/**
 * Component-Specific Border Radius Guide:
 *
 * - Buttons: sm (8px)
 * - Input Fields: sm (8px)
 * - Small Badges: sm (8px)
 * - Cards: lg (16px)
 * - Large Cards: xl (20px)
 * - Modals: xxl (24px)
 * - Bottom Sheets: xxl (24px, top corners only)
 * - Avatar: full (circular)
 * - Pills/Tags: full (pill shape)
 */

export type BorderRadius = typeof borderRadius;
