/**
 * Widget Component - TrackR
 * Base widget component with press animations and haptic feedback
 * Supports both square and rectangle aspect ratios
 */

import React from 'react';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { useTheme, useHaptic, HapticType, useReducedMotion } from '@/hooks';

interface WidgetProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  aspectRatio?: number; // For rectangular widgets (e.g., 16/9, 2/1)
  disabled?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

export const Widget: React.FC<WidgetProps> = ({
  children,
  onPress,
  style,
  aspectRatio,
  disabled = false,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const theme = useTheme();
  const { trigger } = useHaptic();
  const reducedMotion = useReducedMotion();

  const scale = useSharedValue(1);
  const shadowScale = useSharedValue(1);

  const handlePressIn = () => {
    if (!reducedMotion && !disabled) {
      scale.value = withSpring(0.97, theme.springs.snappy);
      shadowScale.value = withSpring(0.8, theme.springs.snappy);
    }
    if (!disabled) {
      trigger(HapticType.LIGHT);
    }
  };

  const handlePressOut = () => {
    if (!reducedMotion && !disabled) {
      scale.value = withSpring(1, theme.springs.smooth);
      shadowScale.value = withSpring(1, theme.springs.smooth);
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const baseShadowOpacity = 0.12; // MD shadow opacity

  const animatedShadowStyle = useAnimatedStyle(() => ({
    shadowOpacity: baseShadowOpacity * shadowScale.value,
  }));

  const containerStyle = [
    styles.container,
    {
      backgroundColor: theme.colors.background.secondary,
      borderRadius: theme.borderRadius.lg,
      aspectRatio: aspectRatio,
      ...theme.shadows.md,
    },
    style,
  ];

  if (onPress && !disabled) {
    return (
      <Animated.View style={[animatedStyle, animatedShadowStyle]}>
        <Pressable
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={disabled}
          accessibilityLabel={accessibilityLabel}
          accessibilityHint={accessibilityHint}
          accessibilityRole="button"
          style={containerStyle}
        >
          {children}
        </Pressable>
      </Animated.View>
    );
  }

  return (
    <View style={containerStyle}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Widget;
