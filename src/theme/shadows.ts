/**
 * Shadow System - TrackR Design System
 * 5-level shadow system for depth and elevation
 * Works on both iOS and Android (shadowColor vs elevation)
 */

import { ViewStyle } from 'react-native';

export const shadows: Record<string, ViewStyle> = {
  // XS - Subtle Lift
  xs: {
    shadowColor: '#1A1A1A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  // SM - Small Elevation
  sm: {
    shadowColor: '#1A1A1A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },

  // MD - Medium Elevation (Default Card)
  md: {
    shadowColor: '#1A1A1A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },

  // LG - High Elevation (Modals, Floating)
  lg: {
    shadowColor: '#1A1A1A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 8,
  },

  // XL - Maximum Elevation (Alerts, Overlays)
  xl: {
    shadowColor: '#1A1A1A',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 12,
  },

  // None - Remove shadow
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
} as const;

/**
 * Shadow Usage Guide:
 *
 * - Flat Cards: sm (subtle depth)
 * - Standard Cards: md (default elevation)
 * - Pressed Cards: xs (reduces on press for feedback)
 * - Floating Action Button: lg (prominent, always accessible)
 * - Modals: lg (floats above content)
 * - Alerts/Toasts: xl (demands attention)
 */

export type Shadows = typeof shadows;
