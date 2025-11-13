/**
 * Button Component
 * Primary UI button with 3 variants and full accessibility support
 * Follows Apple HIG principles with spring animations and haptic feedback
 */

import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useTheme } from '@/hooks/useTheme';
import { useHaptic, HapticType } from '@/hooks/useHaptic';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps {
  /** Button label text */
  title: string;

  /** Press handler */
  onPress: () => void;

  /** Visual variant */
  variant?: ButtonVariant;

  /** Size preset */
  size?: ButtonSize;

  /** Disabled state */
  disabled?: boolean;

  /** Full width button */
  fullWidth?: boolean;

  /** Custom style override */
  style?: ViewStyle;

  /** Accessibility label */
  accessibilityLabel?: string;

  /** Accessibility hint */
  accessibilityHint?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  fullWidth = false,
  style,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const theme = useTheme();
  const { trigger } = useHaptic();
  const reducedMotion = useReducedMotion();

  // Animation value for press effect
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    if (!reducedMotion) {
      scale.value = withSpring(0.97, theme.springs.snappy);
    }
    trigger(HapticType.LIGHT);
  };

  const handlePressOut = () => {
    if (!reducedMotion) {
      scale.value = withSpring(1, theme.springs.snappy);
    }
  };

  const handlePress = () => {
    if (!disabled) {
      onPress();
    }
  };

  // Animated style
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  // Variant styles
  const containerStyle: ViewStyle[] = [
    styles.base,
    sizeStyles[size],
    variantStyles(theme)[variant].container,
    disabled && styles.disabled,
    fullWidth && styles.fullWidth,
    style,
  ];

  const textStyle: TextStyle[] = [
    styles.text,
    variantStyles(theme)[variant].text,
    disabled && styles.disabledText,
  ];

  return (
    <AnimatedPressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={[containerStyle, animatedStyle]}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled }}
    >
      <Text style={textStyle}>{title}</Text>
    </AnimatedPressable>
  );
};

// Base styles
const styles = StyleSheet.create({
  base: {
    borderRadius: 8, // theme.borderRadius.sm
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44, // theme.touchTargets.minimum
  },
  text: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600',
    letterSpacing: -0.408,
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.7,
  },
  fullWidth: {
    width: '100%',
  },
});

// Size variants
const sizeStyles: Record<ButtonSize, ViewStyle> = {
  small: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 36,
  },
  medium: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 44,
  },
  large: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    minHeight: 56,
  },
};

// Variant styles (color-based)
const variantStyles = (theme: ReturnType<typeof useTheme>) => ({
  primary: {
    container: {
      backgroundColor: theme.colors.primary.blue,
      ...theme.shadows.sm,
    },
    text: {
      color: '#FFFFFF',
    },
  },
  secondary: {
    container: {
      backgroundColor: theme.colors.background.secondary,
      borderWidth: 2,
      borderColor: theme.colors.border.medium,
      ...theme.shadows.xs,
    },
    text: {
      color: theme.colors.text.primary,
    },
  },
  ghost: {
    container: {
      backgroundColor: 'transparent',
    },
    text: {
      color: theme.colors.primary.blue,
    },
  },
});

export default Button;
