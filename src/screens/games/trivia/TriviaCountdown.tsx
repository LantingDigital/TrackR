/**
 * Trivia Countdown Component
 * Shows 3-2-1 countdown before first question
 */

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  Easing,
  FadeOut,
} from 'react-native-reanimated';
import { Text } from '@/components/base';
import { useTheme, useHaptic, HapticType, useReducedMotion } from '@/hooks';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const HEADER_HEIGHT = 64;

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
  const [showReady, setShowReady] = useState(true); // Start with "Get ready..." visible

  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  // Animation values for split effect
  const readyOpacity = useSharedValue(1);
  const readyScale = useSharedValue(1);
  const readyLetterSpacing = useSharedValue(0); // For letter spread effect
  const numberOpacity = useSharedValue(0);

  // Split animation sequence
  useEffect(() => {
    const READY_DURATION = 800; // Show "Get ready..." for 800ms
    const SPLIT_DURATION = 300; // Duration of split animation

    let countdownInterval: NodeJS.Timeout | null = null;

    // After READY_DURATION, trigger split animation
    const splitTimer = setTimeout(() => {
      if (!reducedMotion) {
        // Creative split: text explodes outward and fades
        readyOpacity.value = withTiming(0, {
          duration: SPLIT_DURATION,
          easing: Easing.in(Easing.ease)
        });

        // Scale up and spread letters apart (explode effect)
        readyScale.value = withTiming(1.5, {
          duration: SPLIT_DURATION,
          easing: Easing.out(Easing.back(2))
        });

        // Increase letter spacing for scatter effect
        readyLetterSpacing.value = withTiming(20, {
          duration: SPLIT_DURATION,
          easing: Easing.out(Easing.ease)
        });

        // DO NOT fade in the number yet - it stays invisible (opacity 0)
      } else {
        readyOpacity.value = 0;
        numberOpacity.value = 1;
      }

      // Hide "Get ready..." after animation
      setTimeout(() => {
        setShowReady(false);
      }, SPLIT_DURATION);
    }, READY_DURATION);

    // Start countdown after ready text + split animation
    const countdownStartDelay = READY_DURATION + SPLIT_DURATION;
    const countdownTimer = setTimeout(() => {
      // Trigger haptic and pulse - THE PULSE IS THE REVEAL
      trigger(HapticType.SELECTION);

      if (!reducedMotion) {
        // Fade in number AS the pulse happens - simultaneous reveal
        numberOpacity.value = withTiming(1, { duration: 100 }); // Quick fade in with the pulse

        // Sharp pulse - this is the first sight of "3"
        scale.value = withSequence(
          withTiming(1, { duration: 0 }), // Start at normal size
          withTiming(1.3, { duration: 120, easing: Easing.out(Easing.ease) }), // POP up
          withTiming(1, { duration: 120, easing: Easing.in(Easing.ease) })     // POP down
        );
      } else {
        numberOpacity.value = 1;
      }

      // Start countdown interval
      countdownInterval = setInterval(() => {
        setCount((prev) => {
          if (prev <= 1) {
            if (countdownInterval) clearInterval(countdownInterval);
            setShouldExit(true);
            setTimeout(() => {
              onComplete();
            }, 300);
            return prev;
          }
          return prev - 1;
        });
      }, 1000); // Exactly 1 second between each count
    }, countdownStartDelay);

    return () => {
      clearTimeout(splitTimer);
      clearTimeout(countdownTimer);
      if (countdownInterval) clearInterval(countdownInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onComplete]);

  // Fade out animation when countdown completes
  useEffect(() => {
    if (shouldExit) {
      opacity.value = withTiming(0, { duration: 300 });
    }
  }, [shouldExit, opacity]);

  // Pulse animation on each count change (2 and 1) - sharp, distinct POP
  useEffect(() => {
    // Only trigger for 2 and 1 (3 is handled in split animation effect)
    if (count === 2 || count === 1) {
      trigger(HapticType.SELECTION);

      if (!reducedMotion) {
        // CRITICAL: Reset to 1 with duration 0 FIRST to cancel any ongoing animations
        // Then do sharp, isolated pulse - each number gets its own distinct POP
        scale.value = withSequence(
          withTiming(1, { duration: 0 }), // Instant reset - ensures isolation
          withTiming(1.3, { duration: 120, easing: Easing.out(Easing.ease) }), // Sharp up
          withTiming(1, { duration: 120, easing: Easing.in(Easing.ease) })    // Sharp down
        );
      } else {
        scale.value = 1;
      }
    }
  }, [count, scale, trigger, reducedMotion]);

  const countdownAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const containerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const readyTextStyle = useAnimatedStyle(() => ({
    opacity: readyOpacity.value,
    transform: [{ scale: readyScale.value }],
    letterSpacing: readyLetterSpacing.value,
  }));

  const numberAnimatedStyle = useAnimatedStyle(() => ({
    opacity: numberOpacity.value,
  }));

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      {/* "Get ready..." text - shown first, then animates up and fades out */}
      {showReady && (
        <Animated.View style={[styles.readyContainer, readyTextStyle]}>
          <Text
            variant="title1"
            style={{
              color: theme.colors.text.primary,
              fontWeight: '700',
              fontSize: 32,
              lineHeight: 40,
            }}
          >
            Get ready...
          </Text>
        </Animated.View>
      )}

      {/* Countdown number - emerges from center after split */}
      <Animated.View style={[countdownAnimatedStyle, numberAnimatedStyle]}>
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
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: -HEADER_HEIGHT, // Offset to account for header, centering in full screen
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  readyContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    fontVariant: ['tabular-nums'],
  },
});

export default TriviaCountdown;
