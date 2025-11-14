/**
 * CoastleCell Component
 * Individual cell in the 3x3 Coastle grid with flip animation
 * Displays stat name, feedback icon, and value
 */

import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
} from 'react-native-reanimated';
import { Text } from '@/components/base';
import { useTheme, useHaptic, useReducedMotion, HapticType } from '@/hooks';
import { GridFeedback, STAT_LABELS, FeedbackType } from './types';
import { getFeedbackIcon, getCellColors } from './coastleLogic';

interface CoastleCellProps {
  /** Grid feedback for this cell */
  feedback?: GridFeedback;

  /** Whether to show the revealed state */
  revealed: boolean;

  /** Delay before animation starts (for staggered effect) */
  animationDelay?: number;

  /** Cell size (square) */
  size: number;
}

export const CoastleCell: React.FC<CoastleCellProps> = ({
  feedback,
  revealed,
  animationDelay = 0,
  size,
}) => {
  const theme = useTheme();
  const { trigger } = useHaptic();
  const reducedMotion = useReducedMotion();

  // Animation values
  const flipValue = useSharedValue(0);
  const hasAnimated = React.useRef(false);

  // Trigger flip animation when revealed
  useEffect(() => {
    if (revealed && !hasAnimated.current && feedback) {
      hasAnimated.current = true;

      // Start flip animation with delay
      flipValue.value = withDelay(
        animationDelay,
        withSpring(1, {
          damping: reducedMotion ? 100 : theme.springs.smooth.damping,
          stiffness: reducedMotion ? 500 : theme.springs.smooth.stiffness,
          mass: reducedMotion ? 0.1 : theme.springs.smooth.mass,
        })
      );

      // Trigger haptic feedback at midpoint of flip
      setTimeout(() => {
        trigger(HapticType.LIGHT);
      }, animationDelay + (reducedMotion ? 0 : 150));
    }
  }, [revealed, feedback, animationDelay, flipValue, trigger, reducedMotion, theme.springs.smooth]);

  // Get cell colors based on feedback
  const colors = feedback
    ? getCellColors(feedback.feedback)
    : {
        backgroundColor: theme.colors.background.tertiary,
        borderColor: theme.colors.border.light,
      };

  // Animated style for flip effect
  const frontAnimatedStyle = useAnimatedStyle(() => {
    if (reducedMotion) {
      // Fade instead of flip for reduced motion
      return {
        opacity: 1 - flipValue.value,
        transform: [{ scale: 1 }],
      };
    }

    return {
      opacity: flipValue.value < 0.5 ? 1 : 0,
      transform: [
        { perspective: 1000 },
        { rotateY: `${flipValue.value * 180}deg` },
      ],
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    if (reducedMotion) {
      // Fade instead of flip for reduced motion
      return {
        opacity: flipValue.value,
        transform: [{ scale: 1 }],
      };
    }

    return {
      opacity: flipValue.value >= 0.5 ? 1 : 0,
      transform: [
        { perspective: 1000 },
        { rotateY: `${180 + flipValue.value * 180}deg` },
      ],
    };
  });

  // Front face (unrevealed)
  const renderFront = () => (
    <Animated.View
      style={[
        styles.cellFace,
        {
          width: size,
          height: size,
          backgroundColor: theme.colors.background.tertiary,
          borderColor: theme.colors.border.light,
          borderRadius: theme.borderRadius.md,
        },
        frontAnimatedStyle,
      ]}
    >
      {feedback && (
        <Text
          variant="caption2"
          color="tertiary"
          style={styles.statLabel}
        >
          {STAT_LABELS[feedback.stat]}
        </Text>
      )}
      {/* Question mark for unrevealed cell - centered */}
      <View style={styles.questionMarkContainer}>
        <Text
          style={{
            fontSize: 32,
            lineHeight: 40,
            color: theme.colors.text.quaternary,
            fontWeight: '700',
          }}
        >
          ?
        </Text>
      </View>
    </Animated.View>
  );

  // Back face (revealed with feedback)
  const renderBack = () => {
    if (!feedback) return null;

    const icon = getFeedbackIcon(feedback.feedback);
    const isCorrect = feedback.feedback === FeedbackType.CORRECT;

    return (
      <Animated.View
        style={[
          styles.cellFace,
          {
            width: size,
            height: size,
            backgroundColor: colors.backgroundColor,
            borderColor: colors.borderColor,
            borderRadius: theme.borderRadius.md,
            borderWidth: 2,
          },
          backAnimatedStyle,
        ]}
        accessibilityLabel={`${STAT_LABELS[feedback.stat]}: ${feedback.value}. ${
          isCorrect ? 'Correct' : 'Incorrect'
        }`}
        accessibilityRole="text"
      >
        {/* Stat Name (top) */}
        <Text
          variant="caption2"
          style={{ ...styles.statLabel, color: '#FFFFFF' }}
        >
          {STAT_LABELS[feedback.stat]}
        </Text>

        {/* Icon (center) */}
        <Text
          style={{
            fontSize: 24,
            lineHeight: 30, // CRITICAL: Prevent emoji clipping
            color: '#FFFFFF',
            fontWeight: '700',
          }}
        >
          {icon}
        </Text>

        {/* Value (bottom) */}
        <Text
          variant="footnote"
          style={{ ...styles.valueLabel, color: '#FFFFFF' }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {feedback.value}
        </Text>
      </Animated.View>
    );
  };

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {renderFront()}
      {renderBack()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    // Container MUST have dimensions for absolute children to position correctly
  },
  cellFace: {
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderWidth: 1,
    // Backface visibility is handled by opacity in animations
  },
  questionMarkContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statLabel: {
    textAlign: 'center',
    fontSize: 9,
    lineHeight: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  valueLabel: {
    textAlign: 'center',
    fontSize: 11,
    lineHeight: 13,
    fontWeight: '500',
  },
});

export default CoastleCell;
