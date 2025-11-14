/**
 * Trivia Game Logic
 * Scoring calculations and game state management functions
 */

import {
  TriviaQuestion,
  TriviaAnswer,
  TriviaGame,
  TriviaDifficulty,
  BASE_POINTS,
  DIFFICULTY_PROGRESSION,
  QUESTIONS_PER_GAME,
} from './types';
import { getRandomQuestion } from './triviaData';

/**
 * Calculate points earned for an answer
 * Formula: Base points + (Base points × Speed multiplier)
 *
 * @param isCorrect - Whether the answer was correct
 * @param timeRemaining - Time remaining when answered (0-10 seconds)
 * @param difficulty - Question difficulty level
 * @returns Points earned (0 if incorrect)
 *
 * @example
 * calculatePoints(true, 8, 'easy')    // 500 + (500 × 0.8) = 900 pts
 * calculatePoints(true, 2, 'hard')    // 1000 + (1000 × 0.2) = 1200 pts
 * calculatePoints(true, 10, 'medium') // 750 + (750 × 1.0) = 1500 pts (instant)
 * calculatePoints(false, 5, 'easy')   // 0 pts (incorrect)
 */
export function calculatePoints(
  isCorrect: boolean,
  timeRemaining: number,
  difficulty: TriviaDifficulty
): number {
  if (!isCorrect) return 0;

  const base = BASE_POINTS[difficulty];
  const speedMultiplier = timeRemaining / 10; // 0.0 to 1.0
  const speedBonus = base * speedMultiplier;

  return Math.round(base + speedBonus);
}

/**
 * Generate a new trivia game with 5 questions following difficulty progression
 * Progression: Easy → Easy → Medium → Hard → Hard
 *
 * @returns New TriviaGame instance
 */
export function generateNewGame(): TriviaGame {
  const questions: TriviaQuestion[] = [];
  const usedIds: string[] = [];

  // Generate questions following the progression
  for (let i = 0; i < QUESTIONS_PER_GAME; i++) {
    const difficulty = DIFFICULTY_PROGRESSION[i];
    const question = getRandomQuestion(difficulty, usedIds);
    questions.push(question);
    usedIds.push(question.id);
  }

  return {
    questions,
    currentQuestionIndex: 0,
    score: 0,
    answers: [],
    startedAt: new Date(),
  };
}

/**
 * Process an answer and update game state
 *
 * @param game - Current game state
 * @param selectedIndex - Index of selected option (0-3)
 * @param timeRemaining - Time remaining when answered (0-10)
 * @returns Updated game state
 */
export function processAnswer(
  game: TriviaGame,
  selectedIndex: number,
  timeRemaining: number
): TriviaGame {
  const currentQuestion = game.questions[game.currentQuestionIndex];
  const isCorrect = selectedIndex === currentQuestion.correctIndex;
  const pointsEarned = calculatePoints(
    isCorrect,
    timeRemaining,
    currentQuestion.difficulty
  );

  const answer: TriviaAnswer = {
    questionId: currentQuestion.id,
    selectedIndex,
    isCorrect,
    timeRemaining,
    pointsEarned,
    difficulty: currentQuestion.difficulty,
  };

  return {
    ...game,
    score: game.score + pointsEarned,
    answers: [...game.answers, answer],
    currentQuestionIndex: game.currentQuestionIndex + 1,
  };
}

/**
 * Check if game is complete
 *
 * @param game - Current game state
 * @returns True if all questions have been answered
 */
export function isGameComplete(game: TriviaGame): boolean {
  return game.currentQuestionIndex >= QUESTIONS_PER_GAME;
}

/**
 * Get current question from game
 *
 * @param game - Current game state
 * @returns Current question or null if game is complete
 */
export function getCurrentQuestion(game: TriviaGame): TriviaQuestion | null {
  if (isGameComplete(game)) return null;
  return game.questions[game.currentQuestionIndex];
}

/**
 * Calculate percentage rank based on score
 * Mock implementation - in production, this would query a leaderboard
 *
 * @param score - Final game score
 * @returns Rank percentage (e.g., 12 means "Top 12%")
 */
export function calculateRank(score: number): number {
  // Mock ranking algorithm based on score
  const maxPossibleScore =
    BASE_POINTS.easy * 2 * 2 + // 2 easy questions × 2x multiplier
    BASE_POINTS.medium * 2 +    // 1 medium question × 2x multiplier
    BASE_POINTS.hard * 2 * 2;   // 2 hard questions × 2x multiplier

  const percentage = (score / maxPossibleScore) * 100;

  if (percentage >= 90) return Math.floor(Math.random() * 5) + 1; // Top 1-5%
  if (percentage >= 80) return Math.floor(Math.random() * 5) + 6; // Top 6-10%
  if (percentage >= 70) return Math.floor(Math.random() * 10) + 11; // Top 11-20%
  if (percentage >= 60) return Math.floor(Math.random() * 10) + 21; // Top 21-30%
  if (percentage >= 50) return Math.floor(Math.random() * 10) + 31; // Top 31-40%
  return Math.floor(Math.random() * 20) + 41; // Top 41-60%
}

/**
 * Get performance message based on score
 *
 * @param score - Final game score
 * @param totalQuestions - Number of questions answered
 * @returns Encouraging message
 */
export function getPerformanceMessage(
  score: number,
  totalQuestions: number
): string {
  const averagePerQuestion = score / totalQuestions;

  if (averagePerQuestion >= 1500) return 'Perfect! You\'re a coaster genius!';
  if (averagePerQuestion >= 1200) return 'Amazing! Expert-level knowledge!';
  if (averagePerQuestion >= 1000) return 'Excellent! You know your coasters!';
  if (averagePerQuestion >= 800) return 'Great job! Solid performance!';
  if (averagePerQuestion >= 600) return 'Good work! Keep learning!';
  if (averagePerQuestion >= 400) return 'Nice try! Room to improve!';
  return 'Keep practicing! You\'ll get there!';
}

/**
 * Format score with comma separators
 *
 * @param score - Score to format
 * @returns Formatted score string (e.g., "6,350")
 */
export function formatScore(score: number): string {
  return score.toLocaleString('en-US');
}

/**
 * Get color for timer based on time remaining
 *
 * @param timeRemaining - Seconds remaining (0-10)
 * @returns Color hex code
 */
export function getTimerColor(timeRemaining: number): {
  progressColor: string;
  textColor: string;
} {
  if (timeRemaining >= 6) {
    return {
      progressColor: '#5B7C99', // Primary blue
      textColor: '#1A1A1A', // Primary text
    };
  }
  if (timeRemaining >= 3) {
    return {
      progressColor: '#C9A857', // Warning yellow
      textColor: '#1A1A1A', // Primary text
    };
  }
  return {
    progressColor: '#C96B6B', // Error red
    textColor: '#C96B6B', // Red text for urgency
  };
}
