/**
 * HigherLowerScreen Component
 * Main game screen for Higher or Lower stat comparison game
 */

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { Text, Card } from '@/components/base';
import { useTheme } from '@/hooks/useTheme';
import { useHaptic, HapticType } from '@/hooks/useHaptic';
import { CoasterCompareCard } from './CoasterCompareCard';
import { GameButtons } from './GameButtons';
import { GameOver } from './GameOver';
import { GameState, GameStats, GuessType } from './types';
import {
  createInitialGameState,
  processGuess,
  continueToNextRound,
  resetGame,
  getStatIcon,
  getStatLabel,
} from './gameLogic';

export const HigherLowerScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { trigger } = useHaptic();

  // Game state
  const [gameState, setGameState] = useState<GameState>(() => createInitialGameState());
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);

  // Persistent stats (would use AsyncStorage in production)
  const [gameStats, setGameStats] = useState<GameStats>({
    highestStreak: 0,
    gamesPlayed: 0,
    bestScore: 0,
    totalCorrect: 0,
    totalWrong: 0,
  });

  // Handle guess (HIGHER or LOWER)
  const handleGuess = async (guess: GuessType) => {
    if (isTransitioning || gameState.isRevealed) return;

    setIsTransitioning(true);

    // Process the guess
    const newState = processGuess(gameState, guess);
    setGameState(newState);

    // Wait for reveal animation
    await delay(300);

    if (newState.lastResult === 'correct') {
      // Correct! Flash green and continue
      trigger(HapticType.SUCCESS);

      // Wait for visual feedback
      await delay(1000);

      // Continue to next round
      const nextRoundState = continueToNextRound(newState);
      setGameState(nextRoundState);

      // Update stats
      setGameStats(prev => ({
        ...prev,
        totalCorrect: prev.totalCorrect + 1,
        highestStreak: Math.max(prev.highestStreak, nextRoundState.streak),
      }));

      setIsTransitioning(false);
    } else {
      // Wrong! Flash red and show game over
      trigger(HapticType.ERROR);

      // Update stats
      setGameStats(prev => ({
        ...prev,
        totalWrong: prev.totalWrong + 1,
        gamesPlayed: prev.gamesPlayed + 1,
        bestScore: Math.max(prev.bestScore, newState.score),
        highestStreak: Math.max(prev.highestStreak, newState.streak),
      }));

      setIsTransitioning(false);
    }
  };

  // Play again
  const handlePlayAgain = () => {
    const newState = resetGame(gameStats.bestScore);
    setGameState(newState);
  };

  // Back to Games Hub
  const handleBackToHub = () => {
    navigation.goBack();
  };

  // Handle exit button press (show modal)
  const handleExitPress = () => {
    trigger(HapticType.SELECTION);
    setShowExitModal(true);
  };

  // Handle confirmed exit
  const handleConfirmExit = () => {
    trigger(HapticType.SELECTION);
    setShowExitModal(false);
    setTimeout(() => navigation.goBack(), 0);
  };

  // Handle cancel exit
  const handleCancelExit = () => {
    trigger(HapticType.SELECTION);
    setShowExitModal(false);
  };

  const statIcon = getStatIcon(gameState.currentStat);
  const statLabel = getStatLabel(gameState.currentStat);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      {/* Header */}
      <View
        style={[
          styles.header,
          { paddingHorizontal: theme.spacing.sm },
        ]}
      >
        <View style={styles.headerLeft}>
          <Text variant="title1">Higher or Lower</Text>
        </View>
        <TouchableOpacity
          onPress={handleExitPress}
          style={[
            styles.exitButton,
            {
              borderColor: theme.colors.text.primary,
            },
          ]}
          accessibilityLabel="Exit game"
          accessibilityRole="button"
        >
          <Text
            variant="title3"
            style={{
              ...styles.exitIcon,
              lineHeight: 30,
              color: theme.colors.text.primary,
            }}
          >
            ✕
          </Text>
        </TouchableOpacity>
      </View>

      {/* Score Bar */}
      <View
        style={[
          styles.scoreBar,
          {
            backgroundColor: theme.colors.background.secondary,
            ...theme.shadows.sm,
          },
        ]}
      >
        <View style={styles.scoreItem}>
          <Text
            variant="body"
            style={{
              fontSize: 24,
              lineHeight: 30,
            }}
          >
            🔥
          </Text>
          <Text variant="headline" style={{ color: theme.colors.text.primary }}>
            Streak: {gameState.streak}
          </Text>
        </View>
        <View style={styles.scoreItem}>
          <Text variant="headline" style={{ color: theme.colors.text.primary }}>
            Score: {gameState.score}
          </Text>
        </View>
      </View>

      {/* Main Game Area */}
      <View style={styles.gameArea}>
        {/* Cards Row */}
        <View style={styles.cardsRow}>
          {/* Left Card (Always Revealed) */}
          <CoasterCompareCard
            coaster={gameState.leftCard}
            stat={gameState.currentStat}
            isRevealed={true}
            isCorrect={gameState.lastResult === 'correct'}
            isWrong={gameState.lastResult === 'wrong'}
          />

          {/* Right Card (Hidden Until Guess) */}
          <CoasterCompareCard
            coaster={gameState.rightCard}
            stat={gameState.currentStat}
            isRevealed={gameState.isRevealed}
            isCorrect={gameState.lastResult === 'correct'}
            isWrong={gameState.lastResult === 'wrong'}
          />
        </View>

        {/* Current Stat Indicator */}
        <View style={styles.statIndicator}>
          <Text variant="callout" style={{ color: theme.colors.text.tertiary }}>
            Current Stat:
          </Text>
          <View style={styles.statBadge}>
            <Text
              variant="headline"
              style={{
                fontSize: 24,
                lineHeight: 30,
              }}
            >
              {statIcon}
            </Text>
            <Text variant="headline" style={{ color: theme.colors.text.primary }}>
              {statLabel}
            </Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <GameButtons
        onHigher={() => handleGuess('higher')}
        onLower={() => handleGuess('lower')}
        disabled={isTransitioning || gameState.isRevealed}
      />

      {/* Game Over Modal */}
      <GameOver
        visible={gameState.gameOver}
        streak={gameState.streak}
        score={gameState.score}
        highScore={gameStats.bestScore}
        stats={gameStats}
        onPlayAgain={handlePlayAgain}
        onBackToHub={handleBackToHub}
      />

      {/* Exit confirmation modal */}
      <Modal
        visible={showExitModal}
        transparent
        animationType="fade"
        onRequestClose={handleCancelExit}
      >
        <View style={styles.modalOverlay}>
          <Animated.View entering={SlideInDown.springify().damping(25).stiffness(150)}>
            <Card
              variant="elevated"
              style={[
                styles.exitModalCard,
                {
                  backgroundColor: theme.colors.background.primary,
                  borderRadius: theme.borderRadius.xl,
                  ...theme.shadows.xl,
                },
              ]}
            >
              {/* Warning emoji */}
              <Text
                style={{
                  fontSize: 48,
                  lineHeight: 60,
                  textAlign: 'center',
                  marginBottom: 16,
                }}
              >
                ⚠️
              </Text>

              {/* Title */}
              <Text
                variant="title2"
                style={[
                  styles.modalTitle,
                  {
                    color: theme.colors.text.primary,
                  },
                ]}
              >
                Exit Game?
              </Text>

              {/* Message */}
              <Text
                variant="body"
                color="secondary"
                style={styles.modalMessage}
              >
                Your progress will be lost. Are you sure you want to exit?
              </Text>

              {/* Buttons */}
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[
                    styles.modalButton,
                    styles.cancelButton,
                    {
                      backgroundColor: theme.colors.background.secondary,
                      borderRadius: theme.borderRadius.md,
                    },
                  ]}
                  onPress={handleCancelExit}
                  activeOpacity={0.8}
                >
                  <Text
                    variant="headline"
                    style={{
                      color: theme.colors.text.primary,
                      fontWeight: '600',
                    }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.modalButton,
                    styles.exitButtonConfirm,
                    {
                      backgroundColor: theme.colors.semantic.error,
                      borderRadius: theme.borderRadius.md,
                      ...theme.shadows.md,
                    },
                  ]}
                  onPress={handleConfirmExit}
                  activeOpacity={0.8}
                >
                  <Text
                    variant="headline"
                    style={{
                      color: '#FFFFFF',
                      fontWeight: '600',
                    }}
                  >
                    Exit Game
                  </Text>
                </TouchableOpacity>
              </View>
            </Card>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

// Utility delay function
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 64,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    marginTop: 60,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  exitButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  exitIcon: {
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  exitModalCard: {
    width: Math.min(Dimensions.get('window').width - 32, 400),
    padding: 24,
  },
  modalTitle: {
    textAlign: 'center',
    fontWeight: '700',
    marginBottom: 12,
  },
  modalMessage: {
    textAlign: 'center',
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  cancelButton: {
    // Styles applied inline
  },
  exitButtonConfirm: {
    // Styles applied inline
  },
  scoreBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
  },
  scoreItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  gameArea: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  cardsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  statIndicator: {
    alignItems: 'center',
    gap: 8,
  },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#F3F2F0',
  },
});

export default HigherLowerScreen;
