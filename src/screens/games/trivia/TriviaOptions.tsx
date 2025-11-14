/**
 * Trivia Options Component
 * Four answer buttons with spring animations and feedback states
 */

import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Text } from '@/components/base';
import { useTheme, useHaptic, HapticType, useReducedMotion } from '@/hooks';

interface TriviaOptionsProps {
  /** Array of 4 option texts */
  options: string[];
  /** Index of selected option (0-3) or null if not answered */
  selectedIndex: number | null;
  /** Index of correct option (0-3) */
  correctIndex: number;
  /** Whether to show feedback (after answer submitted) */
  showFeedback: boolean;
  /** Callback when option is pressed */
  onSelectOption: (index: number) => void;
  /** Whether options are disabled */
  disabled?: boolean;
}

export const TriviaOptions: React.FC<TriviaOptionsProps> = ({
  options,
  selectedIndex,
  correctIndex,
  showFeedback,
  onSelectOption,
  disabled = false,
}) => {
  const theme = useTheme();
  const { trigger } = useHaptic();
  const reducedMotion = useReducedMotion();

  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <TriviaOptionButton
          key={index}
          index={index}
          text={option}
          isSelected={selectedIndex === index}
          isCorrect={index === correctIndex}
          showFeedback={showFeedback}
          onPress={() => {
            if (!disabled && !showFeedback) {
              trigger(HapticType.SELECTION);
              onSelectOption(index);
            }
          }}
          disabled={disabled || showFeedback}
        />
      ))}
    </View>
  );
};

interface TriviaOptionButtonProps {
  index: number;
  text: string;
  isSelected: boolean;
  isCorrect: boolean;
  showFeedback: boolean;
  onPress: () => void;
  disabled: boolean;
}

const TriviaOptionButton: React.FC<TriviaOptionButtonProps> = ({
  index,
  text,
  isSelected,
  isCorrect,
  showFeedback,
  onPress,
  disabled,
}) => {
  const theme = useTheme();
  const reducedMotion = useReducedMotion();

  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  // Determine button state
  const getButtonState = () => {
    if (!showFeedback) {
      return 'default';
    }
    if (isCorrect) {
      return 'correct';
    }
    if (isSelected && !isCorrect) {
      return 'wrong';
    }
    return 'dimmed';
  };

  const buttonState = getButtonState();

  // Get button colors based on state
  const getButtonColors = () => {
    switch (buttonState) {
      case 'correct':
        return {
          backgroundColor: '#6B9B6B', // Desaturated green
          borderColor: '#5A8A5A',
          textColor: '#FEFDFB',
          borderWidth: 3,
          opacity: 1,
        };
      case 'wrong':
        return {
          backgroundColor: '#C77C7C', // Desaturated red
          borderColor: '#B76B6B',
          textColor: '#FEFDFB',
          borderWidth: 3,
          opacity: 1,
        };
      case 'dimmed':
        return {
          backgroundColor: theme.colors.background.secondary,
          borderColor: theme.colors.border.light,
          textColor: theme.colors.text.tertiary,
          borderWidth: 1,
          opacity: 0.3,
        };
      default:
        return {
          backgroundColor: theme.colors.background.secondary,
          borderColor: theme.colors.border.medium,
          textColor: theme.colors.text.primary,
          borderWidth: 1,
          opacity: 1,
        };
    }
  };

  const colors = getButtonColors();

  // Handle press animations
  const handlePressIn = () => {
    if (reducedMotion || disabled) return;
    scale.value = withSpring(0.95, theme.springs.snappy);
  };

  const handlePressOut = () => {
    if (reducedMotion || disabled) return;
    if (showFeedback) {
      // If showing feedback, animate based on correctness
      if (buttonState === 'correct') {
        scale.value = withSpring(1.05, theme.springs.bouncy);
        setTimeout(() => {
          scale.value = withSpring(1, theme.springs.smooth);
        }, 200);
      } else if (buttonState === 'wrong') {
        scale.value = withSpring(0.95, theme.springs.snappy);
        setTimeout(() => {
          scale.value = withSpring(1, theme.springs.smooth);
        }, 200);
      } else {
        scale.value = withSpring(1, theme.springs.snappy);
      }
    } else {
      scale.value = withSpring(1, theme.springs.snappy);
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value * colors.opacity,
  }));

  // Get option letter (A, B, C, D)
  const optionLetter = String.fromCharCode(65 + index); // 65 = 'A'

  return (
    <Animated.View style={[animatedStyle]}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        style={[
          styles.optionButton,
          {
            backgroundColor: colors.backgroundColor,
            borderColor: colors.borderColor,
            borderWidth: colors.borderWidth,
          },
        ]}
      >
        <View style={styles.optionContent}>
          <Text
            style={{
              ...styles.optionLetter,
              color: colors.textColor,
            }}
          >
            {optionLetter}.
          </Text>
          <Text
            style={{
              ...styles.optionText,
              color: colors.textColor,
            }}
            numberOfLines={2}
          >
            {text}
          </Text>
          {showFeedback && buttonState === 'correct' && (
            <Text
              style={{
                ...styles.feedbackIcon,
                fontSize: 20,
                lineHeight: 26, // Prevent emoji clipping
                color: colors.textColor,
              }}
            >
              ✓
            </Text>
          )}
          {showFeedback && buttonState === 'wrong' && (
            <Text
              style={{
                ...styles.feedbackIcon,
                fontSize: 20,
                lineHeight: 26, // Prevent emoji clipping
                color: colors.textColor,
              }}
            >
              ✗
            </Text>
          )}
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12, // 8px grid
  },
  optionButton: {
    minHeight: 56, // Touch target minimum
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'center',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionLetter: {
    fontSize: 16,
    fontWeight: '700',
    minWidth: 20,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  feedbackIcon: {
    fontWeight: '700',
    marginLeft: 8,
  },
});
