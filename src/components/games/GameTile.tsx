/**
 * GameTile Component - TrackR
 * Individual game icon tile with press animations
 * Used in Games Hub 2×2 grid
 */

import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Text } from '@/components/base';
import { useTheme, useHaptic, HapticType, useReducedMotion } from '@/hooks';
import { GameType } from '@/types/games';

interface GameTileProps {
  game: GameType;
  icon: string;
  name: string;
  color: string;
  onPress: () => void;
  isNew?: boolean;
}

export const GameTile: React.FC<GameTileProps> = ({
  game,
  icon,
  name,
  color,
  onPress,
  isNew = false,
}) => {
  const theme = useTheme();
  const { trigger } = useHaptic();
  const reducedMotion = useReducedMotion();

  const scale = useSharedValue(1);
  const shadowScale = useSharedValue(1);

  const handlePressIn = () => {
    if (!reducedMotion) {
      scale.value = withSpring(0.95, theme.springs.snappy);
      shadowScale.value = withSpring(0.8, theme.springs.snappy);
    }
    trigger(HapticType.SELECTION);
  };

  const handlePressOut = () => {
    if (!reducedMotion) {
      scale.value = withSpring(1, theme.springs.bouncy);
      shadowScale.value = withSpring(1, theme.springs.bouncy);
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const baseShadowOpacity = 0.16; // LG shadow opacity

  const animatedShadowStyle = useAnimatedStyle(() => ({
    shadowOpacity: baseShadowOpacity * shadowScale.value,
  }));

  return (
    <Animated.View style={[animatedStyle, animatedShadowStyle, { flex: 1 }]}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        accessibilityLabel={`Play ${name}`}
        accessibilityHint={`Opens ${name} game`}
        accessibilityRole="button"
        style={[
          styles.container,
          {
            backgroundColor: theme.colors.background.secondary,
            borderRadius: 20,
            ...theme.shadows.lg,
          },
        ]}
      >
        {/* Icon */}
        <Text style={styles.icon}>{icon}</Text>

        {/* Game Name */}
        <Text
          variant="headline"
          color="primary"
          style={styles.label}
          numberOfLines={1}
        >
          {name}
        </Text>

        {/* "New!" Badge */}
        {isNew && (
          <View
            style={[
              styles.newBadge,
              {
                backgroundColor: theme.colors.accent.orange,
                borderRadius: theme.borderRadius.sm,
              },
            ]}
          >
            <Text
              variant="caption1"
              style={[styles.newBadgeText, { color: theme.colors.background.secondary }] as any}
            >
              New!
            </Text>
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  icon: {
    fontSize: 64,
    lineHeight: 80, // CRITICAL: Prevent emoji clipping
    textAlign: 'center',
    marginBottom: 8,
  },
  label: {
    textAlign: 'center',
  },
  newBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  newBadgeText: {
    fontWeight: '700',
    textTransform: 'uppercase',
    fontSize: 10,
  },
});

export default GameTile;
