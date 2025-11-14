/**
 * Trivia Timer Component
 * Circular SVG progress ring with countdown
 * Features smooth linear countdown with color transitions
 */

import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
  withSequence,
  withSpring,
  cancelAnimation,
  withDelay,
} from 'react-native-reanimated';
import { Text } from '@/components/base';
import { useTheme, useReducedMotion } from '@/hooks';
import { getTimerColor } from './triviaLogic';
import { QUESTION_TIME_LIMIT } from './types';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface TriviaTimerProps {
  /** Duration in seconds */
  duration?: number;
  /** Callback when timer completes */
  onComplete?: () => void;
  /** Callback when time updates */
  onTimeUpdate?: (timeRemaining: number) => void;
  /** Whether timer is paused */
  isPaused?: boolean;
  /** Size of the timer circle */
  size?: number;
}

export const TriviaTimer: React.FC<TriviaTimerProps> = ({
  duration = QUESTION_TIME_LIMIT,
  onComplete,
  onTimeUpdate,
  isPaused = false,
  size = 150,
}) => {
  const theme = useTheme();
  const reducedMotion = useReducedMotion();

  // Circle calculations
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  // Progress value (1.0 to 0.0) - shared value for animation
  const progress = useSharedValue(1);
  const scale = useSharedValue(1);

  // Display state (regular state for rendering)
  const [displayTime, setDisplayTime] = useState(duration);
  const [previousDisplayTime, setPreviousDisplayTime] = useState(duration);

  // Get current timer colors
  const timerColors = getTimerColor(displayTime);

  // Trigger pulse when displayTime changes to 3, 2, or 1
  useEffect(() => {
    if (previousDisplayTime !== displayTime) {
      if (displayTime === 3 || displayTime === 2 || displayTime === 1) {
        if (!reducedMotion) {
          scale.value = withSequence(
            withSpring(1.1, theme.springs.snappy),
            withSpring(1, theme.springs.snappy)
          );
        }
      }
      setPreviousDisplayTime(displayTime);
    }
  }, [displayTime, previousDisplayTime, reducedMotion, scale, theme.springs]);

  // Animate countdown
  useEffect(() => {
    if (isPaused) {
      // Stop the progress animation when paused
      cancelAnimation(progress);
      return;
    }

    // Reset timer
    progress.value = 0; // Start from 0
    setDisplayTime(duration);
    setPreviousDisplayTime(duration);
    scale.value = 1;

    const totalDuration = duration * 1000 + 500; // Total: draw (500ms) + countdown (duration)
    const drawPhaseEnd = 500 / totalDuration; // Fraction when draw ends (e.g., 0.05 for 500ms/10500ms)

    // Animate from 0 to 1 representing the entire duration
    progress.value = withTiming(1, {
      duration: totalDuration,
      easing: Easing.linear,
    });

    // Update time remaining display with more frequent updates
    // Start counting down after the draw animation (500ms delay)
    const startTime = Date.now() + 500; // Account for draw animation
    let hasCompleted = false;

    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      const remaining = Math.max(0, duration - elapsed);
      const displaySeconds = Math.ceil(remaining);

      setDisplayTime(displaySeconds);
      onTimeUpdate?.(remaining);

      // Stop interval and trigger completion when time is exactly up
      if (remaining <= 0 && !hasCompleted) {
        hasCompleted = true;
        clearInterval(interval);
        setDisplayTime(0);
        onComplete?.();
      }
    }, 50); // Update every 50ms for smoother timing

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration, isPaused]);

  // Animated stroke dash offset (conditional for both phases in same direction)
  const animatedProps = useAnimatedProps(() => {
    'worklet';
    const drawPhaseEnd = 0.047619; // 500ms / 10500ms for 10s duration

    if (progress.value <= drawPhaseEnd) {
      // Draw phase: map 0→drawPhaseEnd to offset -circumference→0 (reveals counter-clockwise)
      const drawProgress = progress.value / drawPhaseEnd;
      return {
        strokeDashoffset: -circumference + circumference * drawProgress,
      };
    } else {
      // Countdown phase: map drawPhaseEnd→1 to offset 0→circumference (continues counter-clockwise)
      const countdownProgress = (progress.value - drawPhaseEnd) / (1 - drawPhaseEnd);
      return {
        strokeDashoffset: circumference * countdownProgress,
      };
    }
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          width: size,
          height: size,
        },
        {
          transform: [{ scale }],
        },
      ]}
    >
      <Svg width={size} height={size}>
        {/* Background track */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={theme.colors.border.light}
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Progress circle */}
        <AnimatedCircle
          cx={center}
          cy={center}
          r={radius}
          stroke={timerColors.progressColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={0}
          strokeLinecap="round"
          fill="none"
          rotation="-90"
          origin={`${center}, ${center}`}
          animatedProps={animatedProps}
        />
      </Svg>

      {/* Centered countdown text */}
      <View style={styles.textContainer}>
        <Text
          style={[
            styles.timeText,
            {
              fontSize: 36,
              lineHeight: 44, // CRITICAL: Prevent clipping
              color: timerColors.textColor,
            },
          ]}
        >
          {displayTime}
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  textContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    fontWeight: '700',
    fontVariant: ['tabular-nums'], // Monospaced numbers
  },
});
