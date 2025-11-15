/**
 * Trivia Game Screen
 * Main game container managing game flow and state
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { TriviaQuestionScreen } from './TriviaQuestion';
import { TriviaResults } from './TriviaResults';
import { TriviaCountdown } from './TriviaCountdown';
import {
  generateNewGame,
  processAnswer,
  getCurrentQuestion,
  isGameComplete,
} from './triviaLogic';
import { TriviaGame } from './types';
import { useTheme, useHaptic, HapticType } from '@/hooks';
import { Text, Card } from '@/components/base';

type GamePhase = 'countdown' | 'playing' | 'results';

export const TriviaScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { trigger } = useHaptic();

  // Initialize game state
  const [game, setGame] = useState<TriviaGame>(() => generateNewGame());
  const [phase, setPhase] = useState<GamePhase>('countdown');
  const [showExitModal, setShowExitModal] = useState(false);

  // Handle answer submission
  const handleAnswer = (selectedIndex: number, timeRemaining: number) => {
    // Process the answer and update game state
    const updatedGame = processAnswer(game, selectedIndex, timeRemaining);
    setGame(updatedGame);

    // Check if game is complete
    if (isGameComplete(updatedGame)) {
      // Move to results phase
      setTimeout(() => {
        setPhase('results');
      }, 500);
    }
  };

  // Handle countdown completion
  const handleCountdownComplete = () => {
    setPhase('playing');
  };

  // Handle play again
  const handlePlayAgain = () => {
    const newGame = generateNewGame();
    setGame(newGame);
    setPhase('countdown'); // Start with countdown again
  };

  // Handle exit button press (show modal)
  const handleExitPress = () => {
    trigger(HapticType.SELECTION);
    setShowExitModal(true);
  };

  // Handle confirmed exit to games hub
  const handleConfirmExit = () => {
    trigger(HapticType.SELECTION);
    setShowExitModal(false);
    // Change phase to allow navigation
    setPhase('results');
    // Then navigate back
    setTimeout(() => navigation.goBack(), 0);
  };

  // Handle cancel exit
  const handleCancelExit = () => {
    trigger(HapticType.SELECTION);
    setShowExitModal(false);
  };

  // Intercept back button during gameplay
  useEffect(() => {
    // Only intercept during countdown and playing phases
    if (phase === 'countdown' || phase === 'playing') {
      const unsubscribe = navigation.addListener('beforeRemove', (e) => {
        // Prevent default behavior
        e.preventDefault();

        // Show confirmation modal
        setShowExitModal(true);
      });

      return unsubscribe;
    }
  }, [navigation, phase]);

  // Get current question
  const currentQuestion = getCurrentQuestion(game);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background.primary,
        },
      ]}
    >
      {/* Custom Header Section */}
      <View
        style={[
          styles.header,
          { paddingHorizontal: theme.spacing.sm },
        ]}
      >
        <View style={styles.headerLeft}>
          <Text variant="title1">Trivia</Text>
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

      {phase === 'countdown' ? (
        <TriviaCountdown onComplete={handleCountdownComplete} />
      ) : phase === 'playing' && currentQuestion ? (
        <TriviaQuestionScreen
          question={currentQuestion}
          questionNumber={game.currentQuestionIndex + 1}
          totalQuestions={5}
          currentScore={game.score}
          onAnswer={handleAnswer}
        />
      ) : (
        <TriviaResults
          game={game}
          onPlayAgain={handlePlayAgain}
          onExit={handleConfirmExit}
        />
      )}

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
});
