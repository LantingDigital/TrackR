/**
 * Trivia Game Screen
 * Main game container managing game flow and state
 */

import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
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
import { useTheme } from '@/hooks';

type GamePhase = 'countdown' | 'playing' | 'results';

export const TriviaScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  // Initialize game state
  const [game, setGame] = useState<TriviaGame>(() => generateNewGame());
  const [phase, setPhase] = useState<GamePhase>('countdown');

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

  // Handle exit to games hub
  const handleExit = () => {
    navigation.goBack();
  };

  // Get current question
  const currentQuestion = getCurrentQuestion(game);

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background.primary,
        },
      ]}
    >
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
          onExit={handleExit}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
