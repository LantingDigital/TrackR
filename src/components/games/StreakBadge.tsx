/**
 * StreakBadge Component - TrackR
 * Displays current streak with pulse animation
 * Used at top of Games Hub screen
 */

import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import { Text } from '@/components/base';
import { useTheme, useReducedMotion } from '@/hooks';

interface StreakBadgeProps {
  streak: number;
  message?: string;
}

export const StreakBadge: React.FC<StreakBadgeProps> = ({ streak, message }) => {
  const theme = useTheme();
  const reducedMotion = useReducedMotion();

  const scale = useSharedValue(1);

  useEffect(() => {
    if (!reducedMotion && streak > 0) {
      // Gentle pulse animation
      scale.value = withRepeat(
        withSequence(
          withSpring(1.1, theme.springs.gentle),
          withSpring(1, theme.springs.gentle)
        ),
        -1, // Infinite
        true // Reverse
      );
    } else {
      scale.value = 1;
    }
  }, [streak, reducedMotion, theme.springs.gentle]);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const defaultMessage =
    streak === 0
      ? 'Play daily to start a streak!'
      : streak === 1
      ? 'Keep it going! Play again tomorrow.'
      : `Play daily to keep your streak!`;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background.secondary,
          borderRadius: theme.borderRadius.lg,
          ...theme.shadows.md,
        },
      ]}
    >
      {/* Fire icon with pulse animation */}
      <Animated.View style={[styles.iconContainer, pulseStyle]}>
        <Text style={styles.icon}>🔥</Text>
      </Animated.View>

      {/* Streak info */}
      <View style={styles.textContainer}>
        <View style={styles.streakRow}>
          <Text
            variant="title2"
            style={[styles.streakNumber, { color: theme.colors.accent.orange }] as any}
          >
            {streak}
          </Text>
          <Text variant="title3" color="primary" style={styles.streakLabel}>
            Day Streak
          </Text>
        </View>
        <Text variant="callout" color="secondary" style={styles.message}>
          {message || defaultMessage}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 24,
  },
  iconContainer: {
    marginRight: 16,
  },
  icon: {
    fontSize: 32,
    lineHeight: 40, // CRITICAL: Prevent emoji clipping
  },
  textContainer: {
    flex: 1,
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  streakNumber: {
    fontWeight: '700',
    marginRight: 8,
  },
  streakLabel: {
    fontWeight: '600',
  },
  message: {
    marginTop: 2,
  },
});

export default StreakBadge;
