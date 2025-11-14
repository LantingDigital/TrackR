/**
 * CoasterCompareCard Component
 * Individual card display for Higher/Lower game with flip animation
 */

import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Text } from '@/components/base';
import { useTheme } from '@/hooks/useTheme';
import { CoasterData, StatType } from './types';
import { formatStat, getStatLabel } from './gameLogic';

interface CoasterCompareCardProps {
  coaster: CoasterData | null;
  stat: StatType;
  isRevealed: boolean;
  isCorrect?: boolean;
  isWrong?: boolean;
}

export const CoasterCompareCard: React.FC<CoasterCompareCardProps> = ({
  coaster,
  stat,
  isRevealed,
  isCorrect,
  isWrong,
}) => {
  const theme = useTheme();
  const flipAnim = useSharedValue(0);
  const borderFlashAnim = useSharedValue(0);

  // Flip animation when revealed
  useEffect(() => {
    if (isRevealed) {
      flipAnim.value = withSpring(1, theme.springs.bouncy);
    } else {
      flipAnim.value = 0;
    }
  }, [isRevealed]);

  // Border flash animation on result
  useEffect(() => {
    if (isCorrect || isWrong) {
      borderFlashAnim.value = withSpring(1, theme.springs.snappy);
      const timeout = setTimeout(() => {
        borderFlashAnim.value = withSpring(0, theme.springs.snappy);
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [isCorrect, isWrong]);

  // Flip animation style
  const flipStyle = useAnimatedStyle(() => {
    const rotateY = `${flipAnim.value * 180}deg`;
    return {
      transform: [
        { perspective: 1000 },
        { rotateY },
      ],
    };
  });

  // Border flash style
  const borderStyle = useAnimatedStyle(() => {
    const borderColor = isCorrect
      ? theme.colors.semantic.success
      : isWrong
      ? theme.colors.semantic.error
      : 'transparent';

    return {
      borderColor,
      borderWidth: borderFlashAnim.value * 3,
    };
  });

  if (!coaster) {
    return (
      <View style={[styles.card, { backgroundColor: theme.colors.background.secondary }]}>
        <Text variant="body" style={styles.placeholder}>
          Loading...
        </Text>
      </View>
    );
  }

  const statValue = coaster[stat];
  const formattedValue = formatStat(stat, statValue);
  const statLabel = getStatLabel(stat);

  return (
    <Animated.View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.background.secondary,
          ...theme.shadows.md,
        },
        borderStyle,
      ]}
    >
      <Animated.View style={[styles.cardContent, flipStyle]}>
        {/* Coaster Name */}
        <Text
          variant="title3"
          style={{
            ...styles.coasterName,
            color: theme.colors.text.primary,
          }}
        >
          {coaster.name}
        </Text>

        {/* Stat Label */}
        <Text
          variant="callout"
          style={{
            ...styles.statLabel,
            color: theme.colors.text.tertiary,
          }}
        >
          {statLabel}
        </Text>

        {/* Stat Value or Hidden */}
        {isRevealed ? (
          <Text
            variant="display"
            style={{
              ...styles.statValue,
              color: theme.colors.text.primary,
            }}
          >
            {formattedValue}
          </Text>
        ) : (
          <Text
            variant="display"
            style={{
              ...styles.statValue,
              ...styles.hidden,
              color: theme.colors.text.quaternary,
            }}
          >
            ???
          </Text>
        )}

        {/* Park Name */}
        <Text
          variant="caption1"
          style={{
            ...styles.parkName,
            color: theme.colors.text.tertiary,
          }}
        >
          {coaster.park}
        </Text>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    aspectRatio: 3 / 4,
    borderRadius: 16,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  coasterName: {
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: '700',
  },
  statLabel: {
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 1,
  },
  statValue: {
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: '700',
  },
  hidden: {
    opacity: 0.4,
  },
  parkName: {
    textAlign: 'center',
    position: 'absolute',
    bottom: 0,
  },
  placeholder: {
    textAlign: 'center',
  },
});
