/**
 * GameButtons Component
 * HIGHER and LOWER action buttons with animations
 */

import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Text } from '@/components/base';
import { useTheme } from '@/hooks/useTheme';
import { useHaptic, HapticType } from '@/hooks/useHaptic';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface GameButtonsProps {
  onHigher: () => void;
  onLower: () => void;
  disabled: boolean;
}

export const GameButtons: React.FC<GameButtonsProps> = ({
  onHigher,
  onLower,
  disabled,
}) => {
  const theme = useTheme();
  const { trigger } = useHaptic();

  const higherScale = useSharedValue(1);
  const lowerScale = useSharedValue(1);

  const handlePressIn = (scale: Animated.SharedValue<number>) => {
    scale.value = withSpring(0.95, theme.springs.snappy);
  };

  const handlePressOut = (scale: Animated.SharedValue<number>) => {
    scale.value = withSpring(1, theme.springs.snappy);
  };

  const handleHigher = () => {
    if (!disabled) {
      trigger(HapticType.LIGHT);
      onHigher();
    }
  };

  const handleLower = () => {
    if (!disabled) {
      trigger(HapticType.LIGHT);
      onLower();
    }
  };

  const higherStyle = useAnimatedStyle(() => ({
    transform: [{ scale: higherScale.value }],
  }));

  const lowerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: lowerScale.value }],
  }));

  return (
    <View style={styles.container}>
      {/* HIGHER Button */}
      <AnimatedPressable
        style={[
          styles.button,
          {
            backgroundColor: disabled
              ? theme.colors.text.quaternary
              : '#5B7C99',
            ...theme.shadows.md,
          },
          higherStyle,
        ]}
        onPress={handleHigher}
        onPressIn={() => handlePressIn(higherScale)}
        onPressOut={() => handlePressOut(higherScale)}
        disabled={disabled}
      >
        <Text
          variant="headline"
          style={{
            ...styles.buttonText,
            fontSize: 32,
            lineHeight: 40,
          }}
        >
          ⬆️
        </Text>
        <Text variant="headline" style={styles.buttonText}>
          HIGHER
        </Text>
      </AnimatedPressable>

      {/* LOWER Button */}
      <AnimatedPressable
        style={[
          styles.button,
          {
            backgroundColor: disabled
              ? theme.colors.text.quaternary
              : '#8A8A8A',
            ...theme.shadows.md,
          },
          lowerStyle,
        ]}
        onPress={handleLower}
        onPressIn={() => handlePressIn(lowerScale)}
        onPressOut={() => handlePressOut(lowerScale)}
        disabled={disabled}
      >
        <Text
          variant="headline"
          style={{
            ...styles.buttonText,
            fontSize: 32,
            lineHeight: 40,
          }}
        >
          ⬇️
        </Text>
        <Text variant="headline" style={styles.buttonText}>
          LOWER
        </Text>
      </AnimatedPressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  button: {
    flex: 1,
    minHeight: 64,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
