/**
 * Trading Card Game - Visual Effects
 * Holographic, shimmer, particle, and rarity-based effects for cards
 */

import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import { CardRarity, CARD_CONFIG } from './types';
import { useReducedMotion } from '@/hooks';

/**
 * Get rarity-based border color
 */
export const getRarityBorderColor = (rarity: CardRarity): string => {
  switch (rarity) {
    case 'common':
      return '#D8D7D5'; // Light gray
    case 'rare':
      return '#5B7C99'; // Desaturated blue
    case 'epic':
      return '#8B7B9E'; // Desaturated purple
    case 'legendary':
      return '#C9A857'; // Desaturated gold
  }
};

/**
 * Get rarity-based border width
 */
export const getRarityBorderWidth = (rarity: CardRarity): number => {
  switch (rarity) {
    case 'common':
      return 2;
    case 'rare':
      return 3;
    case 'epic':
    case 'legendary':
      return 4;
  }
};

/**
 * Shimmer Effect (Epic cards)
 * Animated gradient overlay that slides across the card
 */
export const ShimmerEffect: React.FC<{ rarity: CardRarity }> = ({ rarity }) => {
  const reducedMotion = useReducedMotion();
  const translateX = useSharedValue(-CARD_CONFIG.width);

  useEffect(() => {
    if (reducedMotion || rarity !== 'epic') return;

    translateX.value = withRepeat(
      withSequence(
        withTiming(CARD_CONFIG.width * 2, {
          duration: 3000,
          easing: Easing.inOut(Easing.ease),
        }),
        withTiming(-CARD_CONFIG.width, { duration: 0 })
      ),
      -1, // Infinite repeat
      false
    );
  }, [reducedMotion, rarity, translateX]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  if (rarity !== 'epic') return null;

  return (
    <Animated.View style={[styles.shimmerContainer, animatedStyle]}>
      <View style={styles.shimmerGradient} />
    </Animated.View>
  );
};

/**
 * Holographic Effect (Legendary cards)
 * Rainbow gradient that shifts and rotates
 */
export const HolographicEffect: React.FC<{ rarity: CardRarity }> = ({ rarity }) => {
  const reducedMotion = useReducedMotion();
  const rotation = useSharedValue(0);

  useEffect(() => {
    if (reducedMotion || rarity !== 'legendary') return;

    rotation.value = withRepeat(
      withTiming(360, {
        duration: 4000,
        easing: Easing.linear,
      }),
      -1, // Infinite repeat
      false
    );
  }, [reducedMotion, rarity, rotation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  if (rarity !== 'legendary') return null;

  return (
    <Animated.View style={[styles.holographicContainer, animatedStyle]}>
      <View style={styles.holographicGradient} />
    </Animated.View>
  );
};

/**
 * Glow Effect (Rare, Epic, Legendary cards)
 * Soft glow around card border
 */
export const GlowEffect: React.FC<{ rarity: CardRarity }> = ({ rarity }) => {
  const reducedMotion = useReducedMotion();
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    if (reducedMotion || rarity === 'common') return;

    opacity.value = withRepeat(
      withSequence(
        withTiming(0.6, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.3, { duration: 1500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
  }, [reducedMotion, rarity, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  if (rarity === 'common') return null;

  const glowColor = getRarityBorderColor(rarity);

  return (
    <Animated.View
      style={[
        styles.glowContainer,
        {
          shadowColor: glowColor,
          shadowOpacity: 0.4,
          shadowRadius: rarity === 'legendary' ? 16 : rarity === 'epic' ? 12 : 8,
        },
        animatedStyle,
      ]}
    />
  );
};

/**
 * Floating Particles (Legendary cards only)
 * Small particles that float around the card
 */
const Particle: React.FC<{ delay: number; index: number }> = ({ delay, index }) => {
  const reducedMotion = useReducedMotion();
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (reducedMotion) return;

    // Random horizontal offset
    const xOffset = (Math.random() - 0.5) * 40;
    const yRange = 60;

    // Stagger start
    setTimeout(() => {
      opacity.value = withTiming(1, { duration: 300 });

      translateY.value = withRepeat(
        withSequence(
          withTiming(-yRange, {
            duration: 2000 + index * 100,
            easing: Easing.inOut(Easing.ease),
          }),
          withTiming(0, { duration: 0 })
        ),
        -1,
        false
      );

      translateX.value = withRepeat(
        withSequence(
          withTiming(xOffset, {
            duration: 1000 + index * 50,
            easing: Easing.inOut(Easing.ease),
          }),
          withTiming(-xOffset, {
            duration: 1000 + index * 50,
            easing: Easing.inOut(Easing.ease),
          })
        ),
        -1,
        false
      );
    }, delay);
  }, [reducedMotion, delay, index, translateY, translateX, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    opacity: opacity.value,
  }));

  return <Animated.View style={[styles.particle, animatedStyle]} />;
};

export const ParticleEffect: React.FC<{ rarity: CardRarity }> = ({ rarity }) => {
  if (rarity !== 'legendary') return null;

  const particleCount = 15;
  const particles = Array.from({ length: particleCount }, (_, i) => i);

  return (
    <View style={styles.particleContainer} pointerEvents="none">
      {particles.map((i) => (
        <Particle key={i} index={i} delay={i * 100} />
      ))}
    </View>
  );
};

/**
 * Shine Effect (Legendary cards)
 * Occasional shine sweep across card
 */
export const ShineEffect: React.FC<{ rarity: CardRarity }> = ({ rarity }) => {
  const reducedMotion = useReducedMotion();
  const translateX = useSharedValue(-CARD_CONFIG.width);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (reducedMotion || rarity !== 'legendary') return;

    // Trigger shine every 3 seconds
    const interval = setInterval(() => {
      opacity.value = withTiming(1, { duration: 0 });
      translateX.value = withSequence(
        withTiming(-CARD_CONFIG.width, { duration: 0 }),
        withTiming(CARD_CONFIG.width * 2, {
          duration: 800,
          easing: Easing.out(Easing.ease),
        })
      );
      setTimeout(() => {
        opacity.value = withTiming(0, { duration: 200 });
      }, 800);
    }, 3000);

    return () => clearInterval(interval);
  }, [reducedMotion, rarity, translateX, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));

  if (rarity !== 'legendary') return null;

  return (
    <Animated.View style={[styles.shineContainer, animatedStyle]}>
      <View style={styles.shineGradient} />
    </Animated.View>
  );
};

/**
 * Combined Card Effects
 * Applies all rarity-based effects to a card
 */
export const CardEffects: React.FC<{ rarity: CardRarity }> = ({ rarity }) => {
  return (
    <>
      <GlowEffect rarity={rarity} />
      <ShimmerEffect rarity={rarity} />
      <HolographicEffect rarity={rarity} />
      <ParticleEffect rarity={rarity} />
      <ShineEffect rarity={rarity} />
    </>
  );
};

const styles = StyleSheet.create({
  // Shimmer Effect (Epic)
  shimmerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: CARD_CONFIG.width / 2,
    height: CARD_CONFIG.height,
    overflow: 'hidden',
  },
  shimmerGradient: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    opacity: 0.6,
  },

  // Holographic Effect (Legendary)
  holographicContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: CARD_CONFIG.width,
    height: CARD_CONFIG.height,
    borderRadius: CARD_CONFIG.borderRadius,
    overflow: 'hidden',
  },
  holographicGradient: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    // Note: In a real implementation, you'd use react-native-linear-gradient
    // For now, using opacity to simulate effect
    opacity: 0.15,
  },

  // Glow Effect
  glowContainer: {
    position: 'absolute',
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    borderRadius: CARD_CONFIG.borderRadius + 10,
    backgroundColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    elevation: 0,
  },

  // Particle Effect (Legendary)
  particleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: CARD_CONFIG.width,
    height: CARD_CONFIG.height,
    borderRadius: CARD_CONFIG.borderRadius,
    overflow: 'hidden',
  },
  particle: {
    position: 'absolute',
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#C9A857', // Gold color
    bottom: 0,
    left: '50%',
    marginLeft: -1.5,
  },

  // Shine Effect (Legendary)
  shineContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: CARD_CONFIG.width / 3,
    height: CARD_CONFIG.height,
    overflow: 'hidden',
  },
  shineGradient: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
});
