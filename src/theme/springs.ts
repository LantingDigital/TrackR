/**
 * Spring Animation System - TrackR Design System
 * Spring-based physics over easing curves for natural, interruptible motion
 * All animations use springs for Apple-quality feel
 */

/**
 * Spring Configuration Interface
 * Compatible with react-native-reanimated withSpring()
 */
export interface SpringConfig {
  damping: number;
  stiffness: number;
  mass: number;
}

export const springs = {
  // Gentle - Slow, smooth (modals, large movements)
  gentle: {
    damping: 20,
    stiffness: 120,
    mass: 1,
  },

  // Smooth - Balanced (default for most interactions)
  smooth: {
    damping: 15,
    stiffness: 180,
    mass: 0.8,
  },

  // Snappy - Quick, responsive (buttons, small interactions)
  snappy: {
    damping: 12,
    stiffness: 250,
    mass: 0.6,
  },

  // Bouncy - Playful (game elements, celebrations)
  bouncy: {
    damping: 10,
    stiffness: 200,
    mass: 0.8,
  },
} as const;

/**
 * Animation Duration Reference (not fixed, springs adapt)
 * These represent typical animation lengths
 */
export const durations = {
  instant: 100, // Immediate feedback
  fast: 200, // Quick transitions
  normal: 300, // Default
  slow: 400, // Large movements
  slower: 500, // Modal presentations
} as const;

/**
 * Common Animation Presets
 * Pre-configured animation patterns for consistency
 */
export const animations = {
  // Button Press
  buttonPress: {
    scale: 0.97,
    spring: springs.snappy,
  },

  // Card Press
  cardPress: {
    scale: 0.97,
    shadowReduce: 'md → xs',
    spring: springs.snappy,
  },

  // Modal Present
  modalPresent: {
    translateY: 'screenHeight → 0',
    opacity: '0 → 1',
    spring: springs.gentle,
  },

  // List Item Appear (Stagger)
  listItemAppear: {
    translateY: '20 → 0',
    opacity: '0 → 1',
    spring: springs.smooth,
    stagger: 50, // ms between each item
  },

  // Pulse (Streak Badge)
  pulse: {
    scale: '1.0 → 1.05 → 1.0',
    duration: 2000,
    loop: true,
  },
} as const;

/**
 * Animation Principles (Apple HIG):
 *
 * 1. Responsive: Animation starts IMMEDIATELY on touch (no delay)
 * 2. Interruptible: User can change direction mid-animation
 * 3. Redirectable: User can reverse their action
 * 4. 1-to-1: Touch and content move together (direct manipulation)
 */

export type Springs = typeof springs;
export type Durations = typeof durations;
export type Animations = typeof animations;
