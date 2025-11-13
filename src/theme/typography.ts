/**
 * Typography System - TrackR Design System
 * iOS-inspired type scale using system font stack
 * All sizes match Apple Human Interface Guidelines
 */

import { TextStyle } from 'react-native';

export const fonts = {
  // iOS System Font Stack
  primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',

  // Monospace (for code, numbers)
  mono: 'SF Mono, Menlo, Monaco, Courier, monospace',
} as const;

// Type scale following iOS standards
export const typography: Record<string, TextStyle> = {
  // Display (Extra Large)
  display: {
    fontSize: 34,
    lineHeight: 41,
    fontWeight: '700', // Bold
    letterSpacing: 0.374,
  },

  // Title 1 (Large Titles)
  title1: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    letterSpacing: 0.364,
  },

  // Title 2 (Section Headers)
  title2: {
    fontSize: 24,
    lineHeight: 29,
    fontWeight: '600', // Semibold
    letterSpacing: 0.352,
  },

  // Title 3 (Subsection Headers)
  title3: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '600',
    letterSpacing: 0.38,
  },

  // Headline (Emphasized Body)
  headline: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600',
    letterSpacing: -0.408,
  },

  // Body (Standard Text)
  body: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '400', // Regular
    letterSpacing: -0.408,
  },

  // Callout (Slightly Smaller)
  callout: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '400',
    letterSpacing: -0.24,
  },

  // Subheadline (Metadata)
  subheadline: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400',
    letterSpacing: -0.078,
  },

  // Footnote (Small Text)
  footnote: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400',
    letterSpacing: -0.078,
  },

  // Caption 1 (Very Small)
  caption1: {
    fontSize: 11,
    lineHeight: 13,
    fontWeight: '400',
    letterSpacing: 0.066,
  },

  // Caption 2 (Tiny)
  caption2: {
    fontSize: 11,
    lineHeight: 13,
    fontWeight: '400',
    letterSpacing: 0.066,
  },
} as const;

export type Typography = typeof typography;
