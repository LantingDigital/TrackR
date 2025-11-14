/**
 * CoastleGameOver Component
 * Victory/defeat modal shown when game ends
 * Displays results, share button, and next actions
 */

import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Clipboard,
  Alert,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
} from 'react-native-reanimated';
import { Text, Button } from '@/components/base';
import { useTheme, useHaptic, useReducedMotion, HapticType } from '@/hooks';
import { GameStatus, GameMode, MysteryCoaster, Guess } from './types';
import { formatShareText } from './coastleLogic';

interface CoastleGameOverProps {
  /** Whether modal is visible */
  visible: boolean;

  /** Game status (won or lost) */
  gameStatus: GameStatus;

  /** Game mode (daily or practice) */
  gameMode: GameMode;

  /** Mystery coaster */
  mysteryCoaster: MysteryCoaster;

  /** All guesses made */
  guesses: Guess[];

  /** Daily puzzle number */
  dailyNumber: number;

  /** Callback to play again (practice mode) */
  onPlayAgain: () => void;

  /** Callback to play practice mode */
  onPlayPractice: () => void;

  /** Callback to return to games hub */
  onReturnToHub: () => void;

  /** Callback to close modal */
  onClose: () => void;
}

export const CoastleGameOver: React.FC<CoastleGameOverProps> = ({
  visible,
  gameStatus,
  gameMode,
  mysteryCoaster,
  guesses,
  dailyNumber,
  onPlayAgain,
  onPlayPractice,
  onReturnToHub,
  onClose,
}) => {
  const theme = useTheme();
  const { trigger } = useHaptic();
  const reducedMotion = useReducedMotion();

  const slideValue = useSharedValue(0);
  const opacityValue = useSharedValue(0);

  // Trigger animations when modal appears
  useEffect(() => {
    if (visible) {
      // Victory or defeat haptic
      if (gameStatus === GameStatus.WON) {
        trigger(HapticType.SUCCESS);
      } else {
        trigger(HapticType.ERROR);
      }

      // Animate modal entrance
      slideValue.value = withDelay(
        100,
        withSpring(1, {
          damping: reducedMotion ? 100 : theme.springs.gentle.damping,
          stiffness: reducedMotion ? 500 : theme.springs.gentle.stiffness,
          mass: reducedMotion ? 0.1 : theme.springs.gentle.mass,
        })
      );

      opacityValue.value = withSpring(1, {
        damping: reducedMotion ? 100 : theme.springs.gentle.damping,
        stiffness: reducedMotion ? 500 : theme.springs.gentle.stiffness,
      });
    } else {
      slideValue.value = 0;
      opacityValue.value = 0;
    }
  }, [visible, gameStatus, trigger, slideValue, opacityValue, reducedMotion, theme.springs.gentle]);

  // Animated styles
  const overlayStyle = useAnimatedStyle(() => ({
    opacity: opacityValue.value * 0.4,
  }));

  const modalStyle = useAnimatedStyle(() => {
    if (reducedMotion) {
      return {
        opacity: opacityValue.value,
        transform: [{ scale: 1 }],
      };
    }

    return {
      opacity: opacityValue.value,
      transform: [
        { translateY: (1 - slideValue.value) * 100 },
        { scale: 0.9 + slideValue.value * 0.1 },
      ],
    };
  });

  // Handle share
  const handleShare = () => {
    const shareText = formatShareText(guesses, dailyNumber, gameStatus);
    Clipboard.setString(shareText);
    trigger(HapticType.MEDIUM);
    Alert.alert('Copied!', 'Results copied to clipboard');
  };

  if (!visible) return null;

  const isVictory = gameStatus === GameStatus.WON;
  const guessCount = guesses.length;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      {/* Dark overlay */}
      <Animated.View style={[styles.overlay, overlayStyle]} />

      {/* Modal content */}
      <View style={styles.modalContainer}>
        <Animated.View
          style={[
            styles.modal,
            {
              backgroundColor: theme.colors.background.secondary,
              borderRadius: theme.borderRadius.xxl,
              ...theme.shadows.xl,
            },
            modalStyle,
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text
              variant="display"
              style={{
                ...styles.headerEmoji,
                lineHeight: 60, // CRITICAL: Prevent emoji clipping
              }}
            >
              {isVictory ? '🎉' : '💔'}
            </Text>
            <Text variant="title1" style={styles.headerTitle}>
              {isVictory ? 'You got it!' : 'Better luck next time!'}
            </Text>
            <Text variant="subheadline" color="secondary">
              {isVictory
                ? `Solved in ${guessCount} guess${guessCount === 1 ? '' : 'es'}`
                : `The answer was:`}
            </Text>
          </View>

          {/* Mystery Coaster Info */}
          <View
            style={[
              styles.coasterInfo,
              {
                backgroundColor: theme.colors.background.tertiary,
                borderRadius: theme.borderRadius.lg,
              },
            ]}
          >
            <Text variant="title2" style={styles.coasterName}>
              {mysteryCoaster.name}
            </Text>
            <Text variant="body" color="secondary">
              {mysteryCoaster.park}
            </Text>
            <Text variant="subheadline" color="tertiary">
              {mysteryCoaster.country}
            </Text>

            {/* Stats summary */}
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text variant="caption1" color="tertiary">
                  HEIGHT
                </Text>
                <Text variant="headline">{mysteryCoaster.stats.height} ft</Text>
              </View>
              <View style={styles.statItem}>
                <Text variant="caption1" color="tertiary">
                  SPEED
                </Text>
                <Text variant="headline">{mysteryCoaster.stats.speed} mph</Text>
              </View>
              <View style={styles.statItem}>
                <Text variant="caption1" color="tertiary">
                  YEAR
                </Text>
                <Text variant="headline">{mysteryCoaster.stats.year}</Text>
              </View>
            </View>
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            {/* Share button (daily mode only) */}
            {gameMode === GameMode.DAILY && (
              <TouchableOpacity
                style={[
                  styles.shareButton,
                  {
                    backgroundColor: theme.colors.primary.blue,
                    borderRadius: theme.borderRadius.md,
                  },
                ]}
                onPress={handleShare}
                activeOpacity={0.8}
                accessibilityLabel="Share results"
                accessibilityRole="button"
              >
                <Text variant="headline" color="white">
                  Share Results
                </Text>
              </TouchableOpacity>
            )}

            {/* Play practice mode */}
            {gameMode === GameMode.DAILY && (
              <Button
                title="Play Practice Mode"
                variant="secondary"
                onPress={onPlayPractice}
                accessibilityLabel="Play practice mode"
                fullWidth
              />
            )}

            {/* Play again (practice mode only) */}
            {gameMode === GameMode.PRACTICE && (
              <Button
                title="Play Again"
                variant="primary"
                onPress={onPlayAgain}
                accessibilityLabel="Play again"
                fullWidth
              />
            )}

            {/* Return to hub */}
            <Button
              title="Return to Games Hub"
              variant="ghost"
              onPress={onReturnToHub}
              accessibilityLabel="Return to games hub"
              fullWidth
            />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#1A1A1A',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  modal: {
    width: '100%',
    maxWidth: 400,
    padding: 24,
    gap: 24,
  },
  header: {
    alignItems: 'center',
    gap: 8,
  },
  headerEmoji: {
    fontSize: 48,
    textAlign: 'center',
  },
  headerTitle: {
    textAlign: 'center',
  },
  coasterInfo: {
    padding: 16,
    gap: 8,
    alignItems: 'center',
  },
  coasterName: {
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 16,
    gap: 16,
  },
  statItem: {
    alignItems: 'center',
    gap: 4,
  },
  actions: {
    gap: 12,
  },
  shareButton: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
});

export default CoastleGameOver;
