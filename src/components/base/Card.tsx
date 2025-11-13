/**
 * Card Component
 * 3D elevated card with shadow and press animation
 * Foundation for content containers throughout the app
 */

import React from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useTheme } from '@/hooks/useTheme';
import { useHaptic, HapticType } from '@/hooks/useHaptic';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export type CardVariant = 'default' | 'elevated' | 'flat';

export interface CardProps {
  /** Card content */
  children: React.ReactNode;

  /** Optional press handler */
  onPress?: () => void;

  /** Visual variant */
  variant?: CardVariant;

  /** Custom style override */
  style?: ViewStyle;

  /** Accessibility label */
  accessibilityLabel?: string;

  /** Accessibility hint */
  accessibilityHint?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  onPress,
  variant = 'default',
  style,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const theme = useTheme();
  const { trigger } = useHaptic();
  const reducedMotion = useReducedMotion();

  // Animation values
  const scale = useSharedValue(1);
  const shadowScale = useSharedValue(1);

  const handlePressIn = () => {
    if (onPress && !reducedMotion) {
      scale.value = withSpring(0.97, theme.springs.snappy);
      shadowScale.value = withSpring(0.5, theme.springs.snappy); // Reduce shadow
    }
    if (onPress) {
      trigger(HapticType.MEDIUM);
    }
  };

  const handlePressOut = () => {
    if (onPress && !reducedMotion) {
      scale.value = withSpring(1, theme.springs.snappy);
      shadowScale.value = withSpring(1, theme.springs.snappy);
    }
  };

  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  // Animated style
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      // Shadow animation (iOS)
      shadowOpacity: shadowScale.value * 0.12,
      // Elevation animation (Android)
      elevation: shadowScale.value * 4,
    };
  });

  const containerStyle: ViewStyle[] = [
    styles.base,
    variantStyles(theme)[variant],
    style,
  ];

  // If pressable, wrap in animated pressable
  if (onPress) {
    return (
      <AnimatedPressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[containerStyle, animatedStyle]}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
      >
        {children}
      </AnimatedPressable>
    );
  }

  // Static card (no press interaction)
  return (
    <Animated.View
      style={containerStyle}
      accessibilityRole="none"
      accessibilityLabel={accessibilityLabel}
    >
      {children}
    </Animated.View>
  );
};

// Base styles
const styles = StyleSheet.create({
  base: {
    borderRadius: 16, // theme.borderRadius.lg
    padding: 16, // theme.spacing.sm
    backgroundColor: '#FEFDFB', // theme.colors.background.secondary
  },
});

// Variant styles
const variantStyles = (theme: ReturnType<typeof useTheme>) => ({
  default: {
    ...theme.shadows.md,
  },
  elevated: {
    ...theme.shadows.lg,
  },
  flat: {
    ...theme.shadows.sm,
  },
});

export default Card;
