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
  useAnimatedStyle,
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
  /** Question difficulty for draw color */
  difficulty?: 'easy' | 'medium' | 'hard';
}

// Get draw color based on difficulty
const getDifficultyColor = (difficulty?: 'easy' | 'medium' | 'hard'): string => {
  switch (difficulty) {
    case 'easy':
      return '#6B9B6B'; // Green
    case 'medium':
      return '#C9A857'; // Yellow
    case 'hard':
      return '#C77C7C'; // Red
    default:
      return '#7B68EE'; // Default purple if no difficulty
  }
};

export const TriviaTimer: React.FC<TriviaTimerProps> = ({
  duration = QUESTION_TIME_LIMIT,
  onComplete,
  onTimeUpdate,
  isPaused = false,
  size = 150,
  difficulty,
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
  const animatedStrokeWidth = useSharedValue(strokeWidth);
  const drawProgress = useSharedValue(0); // Separate progress for draw phase with easing
  const circleScale = useSharedValue(1); // For completion pulse

  // Display state (regular state for rendering)
  const [displayTime, setDisplayTime] = useState(duration);
  const [previousDisplayTime, setPreviousDisplayTime] = useState(duration);
  const [isDrawPhase, setIsDrawPhase] = useState(true);

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
      // Stop all animations when paused
      cancelAnimation(progress);
      cancelAnimation(drawProgress);
      return;
    }

    // Reset timer
    progress.value = 0; // Start from 0
    drawProgress.value = 0; // Reset draw progress
    setDisplayTime(duration);
    setPreviousDisplayTime(duration);
    setIsDrawPhase(true);
    scale.value = 1;
    circleScale.value = 1;
    animatedStrokeWidth.value = strokeWidth;

    const drawDuration = 750; // Increased from 500ms to 750ms for more noticeable acceleration
    const totalDuration = duration * 1000 + drawDuration; // Total: draw + countdown
    const drawPhaseEnd = drawDuration / totalDuration;

    // Animate draw progress with custom bezier: 5% slow start, 80% fast middle, 15% slow end
    drawProgress.value = withTiming(1, {
      duration: drawDuration,
      easing: Easing.bezier(0.3, 0, 0.15, 1), // Quick acceleration, long fast section
    });

    // Completion pulse after draw finishes - quick pop
    if (!reducedMotion) {
      circleScale.value = withSequence(
        // Wait for draw to complete
        withDelay(
          drawDuration,
          withSequence(
            // Quick pulse up - faster and smaller
            withSpring(1.05, { damping: 15, stiffness: 300 }),
            // Back to normal quickly
            withSpring(1, { damping: 15, stiffness: 300 })
          )
        )
      );
    }

    // Switch from draw phase to countdown phase after draw completes
    const phaseTimeout = setTimeout(() => {
      setIsDrawPhase(false);
    }, drawDuration);

    // Animate stroke width pulse ONLY during the fast middle section
    if (!reducedMotion) {
      // Delay to skip the slow start (~5% = 37ms), pulse during middle section
      animatedStrokeWidth.value = withSequence(
        // Wait during short slow start
        withDelay(
          35,
          withSequence(
            // Pulse up during fast middle
            withTiming(strokeWidth + 6, {
              duration: 200,
              easing: Easing.out(Easing.ease),
            }),
            // Pulse back down before slow end
            withTiming(strokeWidth, {
              duration: 200,
              easing: Easing.in(Easing.ease),
            })
          )
        )
      );
    }

    // Animate from 0 to 1 representing the entire duration
    progress.value = withTiming(1, {
      duration: totalDuration,
      easing: Easing.linear,
    });

    // Update time remaining display with more frequent updates
    // Start counting down after the draw animation
    const startTime = Date.now() + drawDuration; // Account for draw animation
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
      clearTimeout(phaseTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration, isPaused]);

  // Animated stroke dash offset (conditional for both phases in same direction)
  const animatedProps = useAnimatedProps(() => {
    'worklet';
    const drawPhaseEnd = 0.0698; // 750ms / 10750ms for 10s duration

    if (progress.value <= drawPhaseEnd) {
      // Draw phase: use drawProgress with ease-in-out for acceleration
      // offset -circumference→0 (reveals counter-clockwise)
      return {
        strokeDashoffset: -circumference + circumference * drawProgress.value,
        strokeWidth: animatedStrokeWidth.value,
      };
    } else {
      // Countdown phase: map drawPhaseEnd→1 to offset 0→circumference (continues counter-clockwise)
      const countdownProgress = (progress.value - drawPhaseEnd) / (1 - drawPhaseEnd);
      return {
        strokeDashoffset: circumference * countdownProgress,
        strokeWidth: animatedStrokeWidth.value,
      };
    }
  });

  // Animated style for circle scale (completion pulse)
  const circleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: circleScale.value }],
  }));

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
      <Animated.View style={circleAnimatedStyle}>
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

          {/* Progress circle - color changes based on phase */}
          <AnimatedCircle
            cx={center}
            cy={center}
            r={radius}
            stroke={isDrawPhase ? getDifficultyColor(difficulty) : timerColors.progressColor}
            strokeDasharray={circumference}
            strokeDashoffset={0}
            strokeLinecap="round"
            fill="none"
            rotation="-90"
            origin={`${center}, ${center}`}
            animatedProps={animatedProps}
          />
        </Svg>
      </Animated.View>

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
          {Math.min(displayTime, duration)}
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
