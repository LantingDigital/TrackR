/**
 * Color System - TrackR Design System
 * Philosophy: Desaturated, calm colors that let coaster content shine
 * Based on Apple HIG with warm, professional aesthetic
 */

export const colors = {
  // Backgrounds
  background: {
    primary: '#F8F7F5', // Very light warm gray (main background)
    secondary: '#FEFDFB', // Off-white (card background)
    tertiary: '#F3F2F0', // Slightly darker for contrast
  },

  // Text Hierarchy
  text: {
    primary: '#1A1A1A', // Near-black (headings, important text)
    secondary: '#3A3A3A', // Dark gray (body text)
    tertiary: '#6B6B6B', // Medium gray (captions, metadata)
    quaternary: '#9B9B9B', // Light gray (placeholders, disabled)
  },

  // Primary Brand Colors (Desaturated)
  primary: {
    blue: '#5B7C99', // Calm, professional
    purple: '#8B7B9E', // Playful, unique
    teal: '#5C9A9A', // Fresh, modern
    orange: '#C68B5A', // Warm, energetic
  },

  // CTA/Accent (Same saturation as primary)
  accent: {
    blue: '#4A6B88', // Slightly darker for CTAs
    purple: '#7A6A8D',
    teal: '#4B8989',
    orange: '#B57A49',
  },

  // Semantic Colors (Desaturated)
  semantic: {
    success: '#6B9B6B', // Desaturated green
    warning: '#C9A857', // Desaturated yellow/amber
    error: '#C96B6B', // Desaturated red
    info: '#5B7C99', // Desaturated blue (same as primary.blue)
  },

  // Game-Specific (Coastle)
  game: {
    correct: '#6B9B6B', // Desaturated green
    close: '#C9A857', // Desaturated yellow (arrows)
    wrong: '#C96B6B', // Desaturated red
  },

  // Overlays & Effects
  overlay: {
    light: 'rgba(248, 247, 245, 0.9)', // 90% opacity background
    medium: 'rgba(248, 247, 245, 0.7)', // 70% opacity
    dark: 'rgba(26, 26, 26, 0.4)', // 40% dark overlay
  },

  // Borders & Dividers
  border: {
    light: '#E8E7E5', // Subtle borders
    medium: '#D8D7D5', // More prominent borders
    dark: '#C8C7C5', // Strong borders
  },
} as const;

export type Colors = typeof colors;
