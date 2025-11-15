/**
 * Trivia Countdown Component
 * Shows 3-2-1 countdown before first question
 */

import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  FadeOut,
} from 'react-native-reanimated';
import { Text } from '@/components/base';
import { useTheme, useHaptic, HapticType, useReducedMotion } from '@/hooks';

interface TriviaCountdownProps {
  /** Callback when countdown completes */
  onComplete: () => void;
}

export const TriviaCountdown: React.FC<TriviaCountdownProps> = ({
  onComplete,
}) => {
  const theme = useTheme();
  const { trigger } = useHaptic();
  const reducedMotion = useReducedMotion();

  const [count, setCount] = useState(3);
  const [shouldExit, setShouldExit] = useState(false);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          // Fade out before completing
          setShouldExit(true);
          setTimeout(() => {
            onComplete();
          }, 300); // Complete after fade out
          return prev;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [onComplete]);

  // Fade out animation when countdown completes
  useEffect(() => {
    if (shouldExit) {
      opacity.value = withTiming(0, { duration: 300 });
    }
  }, [shouldExit, opacity]);

  // Pulse animation on each count
  useEffect(() => {
    trigger(HapticType.SELECTION);

    if (!reducedMotion) {
      // Start from 1, pulse up and back
      scale.value = withSequence(
        withSpring(1.15, theme.springs.snappy),
        withSpring(1, theme.springs.smooth)
      );
    } else {
      scale.value = 1;
    }
  }, [count, scale, trigger, reducedMotion, theme.springs]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const containerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <Animated.View style={animatedStyle}>
        <Text
          style={{
            ...styles.countText,
            fontSize: 120,
            lineHeight: 140,
            color: theme.colors.primary.blue,
            fontWeight: '800',
          }}
        >
          {count}
        </Text>
      </Animated.View>
      <Text
        variant="title2"
        color="secondary"
        style={styles.labelText}
      >
        Get ready...
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
  countText: {
    fontVariant: ['tabular-nums'],
  },
  labelText: {
    textAlign: 'center',
  },
});

export default TriviaCountdown;
