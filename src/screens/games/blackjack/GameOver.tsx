/**
 * GameOver Component
 * Results screen showing final score, streak, and stats
 */

import React from 'react';
import { View, StyleSheet, Modal, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Text } from '@/components/base';
import { useTheme } from '@/hooks/useTheme';
import { useHaptic, HapticType } from '@/hooks/useHaptic';
import { GameStats } from './types';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface GameOverProps {
  visible: boolean;
  streak: number;
  score: number;
  highScore: number;
  stats: GameStats;
  onPlayAgain: () => void;
  onBackToHub: () => void;
}

export const GameOver: React.FC<GameOverProps> = ({
  visible,
  streak,
  score,
  highScore,
  stats,
  onPlayAgain,
  onBackToHub,
}) => {
  const theme = useTheme();
  const { trigger } = useHaptic();

  const playAgainScale = useSharedValue(1);
  const backScale = useSharedValue(1);

  const handlePressIn = (scale: Animated.SharedValue<number>) => {
    scale.value = withSpring(0.95, theme.springs.snappy);
  };

  const handlePressOut = (scale: Animated.SharedValue<number>) => {
    scale.value = withSpring(1, theme.springs.snappy);
  };

  const handlePlayAgain = () => {
    trigger(HapticType.MEDIUM);
    onPlayAgain();
  };

  const handleBackToHub = () => {
    trigger(HapticType.LIGHT);
    onBackToHub();
  };

  const playAgainStyle = useAnimatedStyle(() => ({
    transform: [{ scale: playAgainScale.value }],
  }));

  const backStyle = useAnimatedStyle(() => ({
    transform: [{ scale: backScale.value }],
  }));

  const isNewHighScore = score > 0 && score >= highScore;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View
          style={[
            styles.modal,
            {
              backgroundColor: theme.colors.background.primary,
              ...theme.shadows.xl,
            },
          ]}
        >
          {/* Title */}
          <Text
            variant="title1"
            style={{
              ...styles.title,
              fontSize: 40,
              lineHeight: 50,
            }}
          >
            🎉
          </Text>
          <Text variant="title1" style={styles.title}>
            Game Over!
          </Text>

          {/* Final Stats */}
          <View style={styles.finalStats}>
            <View style={styles.statRow}>
              <Text
                variant="headline"
                style={{
                  fontSize: 48,
                  lineHeight: 60,
                }}
              >
                🔥
              </Text>
            </View>
            <View style={styles.statRow}>
              <Text variant="headline" style={{ color: theme.colors.text.secondary }}>
                Final Streak:
              </Text>
              <Text variant="title1" style={{ color: theme.colors.text.primary }}>
                {streak}
              </Text>
            </View>
            <View style={styles.statRow}>
              <Text variant="headline" style={{ color: theme.colors.text.secondary }}>
                Total Score:
              </Text>
              <Text variant="title1" style={{ color: theme.colors.text.primary }}>
                {score.toLocaleString()}
              </Text>
            </View>
            {isNewHighScore && (
              <View style={[styles.newHighScore, { backgroundColor: theme.colors.semantic.success }]}>
                <Text variant="callout" style={{ color: '#FFFFFF', fontWeight: '600' }}>
                  NEW HIGH SCORE!
                </Text>
              </View>
            )}
          </View>

          {/* All-Time Stats */}
          <View
            style={[
              styles.statsBox,
              {
                backgroundColor: theme.colors.background.tertiary,
                borderColor: theme.colors.border.light,
              },
            ]}
          >
            <Text
              variant="callout"
              style={{
                ...styles.statsHeader,
                color: theme.colors.text.tertiary,
              }}
            >
              ALL-TIME STATS
            </Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text variant="title2" style={{ color: theme.colors.text.primary }}>
                  {stats.highestStreak}
                </Text>
                <Text variant="caption1" style={{ color: theme.colors.text.tertiary }}>
                  Highest Streak
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text variant="title2" style={{ color: theme.colors.text.primary }}>
                  {stats.gamesPlayed}
                </Text>
                <Text variant="caption1" style={{ color: theme.colors.text.tertiary }}>
                  Games Played
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text variant="title2" style={{ color: theme.colors.text.primary }}>
                  {stats.bestScore.toLocaleString()}
                </Text>
                <Text variant="caption1" style={{ color: theme.colors.text.tertiary }}>
                  Best Score
                </Text>
              </View>
            </View>
          </View>

          {/* Buttons */}
          <View style={styles.buttons}>
            {/* Play Again */}
            <AnimatedPressable
              style={[
                styles.primaryButton,
                {
                  backgroundColor: theme.colors.primary.blue,
                  ...theme.shadows.md,
                },
                playAgainStyle,
              ]}
              onPress={handlePlayAgain}
              onPressIn={() => handlePressIn(playAgainScale)}
              onPressOut={() => handlePressOut(playAgainScale)}
            >
              <Text variant="headline" style={styles.buttonText}>
                PLAY AGAIN
              </Text>
            </AnimatedPressable>

            {/* Back to Hub */}
            <AnimatedPressable
              style={[
                styles.secondaryButton,
                {
                  backgroundColor: theme.colors.background.secondary,
                  borderColor: theme.colors.border.medium,
                  ...theme.shadows.sm,
                },
                backStyle,
              ]}
              onPress={handleBackToHub}
              onPressIn={() => handlePressIn(backScale)}
              onPressOut={() => handlePressOut(backScale)}
            >
              <Text
                variant="headline"
                style={{
                  ...styles.buttonText,
                  color: theme.colors.text.primary,
                }}
              >
                BACK TO GAMES HUB
              </Text>
            </AnimatedPressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(26, 26, 26, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modal: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 24,
    padding: 32,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '700',
  },
  finalStats: {
    marginTop: 24,
    marginBottom: 24,
    gap: 12,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  newHighScore: {
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statsBox: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 24,
  },
  statsHeader: {
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '600',
    letterSpacing: 1,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 8,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  buttons: {
    gap: 12,
  },
  primaryButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    minHeight: 56,
    justifyContent: 'center',
  },
  secondaryButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    minHeight: 56,
    justifyContent: 'center',
    borderWidth: 2,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
