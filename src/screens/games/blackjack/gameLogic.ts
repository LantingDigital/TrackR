/**
 * Higher or Lower - Game Logic
 * Core game functions for stat comparison gameplay
 */

import { GameState, CoasterData, StatType, GuessType } from './types';
import { getRandomCoaster } from './coasterData';

/**
 * Create initial game state
 */
export function createInitialGameState(): GameState {
  const leftCard = getRandomCoaster([]);
  const rightCard = getRandomCoaster([leftCard.id]);

  return {
    leftCard,
    rightCard,
    currentStat: 'height',
    streak: 0,
    score: 0,
    highScore: 0,
    isRevealed: false,
    gameOver: false,
    lastResult: null,
    usedCoasterIds: [leftCard.id, rightCard.id],
  };
}

/**
 * Get next stat in rotation
 * Rotation: height → speed → inversions → year → height
 */
export function getNextStat(current: StatType): StatType {
  const rotation: StatType[] = ['height', 'speed', 'inversions', 'year'];
  const currentIndex = rotation.indexOf(current);
  const nextIndex = (currentIndex + 1) % rotation.length;
  return rotation[nextIndex];
}

/**
 * Compare stats and check if guess was correct
 */
export function checkGuess(
  leftCard: CoasterData,
  rightCard: CoasterData,
  stat: StatType,
  guess: GuessType
): boolean {
  const leftValue = leftCard[stat];
  const rightValue = rightCard[stat];

  if (guess === 'higher') {
    return rightValue >= leftValue;
  } else {
    return rightValue <= leftValue;
  }
}

/**
 * Calculate score based on streak
 * Base: 100 points per correct guess
 * Multiplier: 1 + (streak / 10)
 * Example: Streak 5 = 100 × 1.5 = 150 points
 */
export function calculateScore(currentScore: number, streak: number): number {
  const basePoints = 100;
  const multiplier = 1 + streak / 10;
  const points = Math.floor(basePoints * multiplier);
  return currentScore + points;
}

/**
 * Format stat display for UI
 */
export function formatStat(stat: StatType, value: number): string {
  switch (stat) {
    case 'height':
      return `${value} ft`;
    case 'speed':
      return `${value} mph`;
    case 'inversions':
      return `${value}`;
    case 'year':
      return `${value}`;
    default:
      return `${value}`;
  }
}

/**
 * Get stat label for display
 */
export function getStatLabel(stat: StatType): string {
  switch (stat) {
    case 'height':
      return 'HEIGHT';
    case 'speed':
      return 'SPEED';
    case 'inversions':
      return 'INVERSIONS';
    case 'year':
      return 'YEAR BUILT';
    default:
      return stat.toUpperCase();
  }
}

/**
 * Get stat emoji icon
 */
export function getStatIcon(stat: StatType): string {
  switch (stat) {
    case 'height':
      return '📏';
    case 'speed':
      return '⚡';
    case 'inversions':
      return '🔄';
    case 'year':
      return '📅';
    default:
      return '🎢';
  }
}

/**
 * Process guess and return new game state
 */
export function processGuess(
  gameState: GameState,
  guess: GuessType
): GameState {
  if (!gameState.leftCard || !gameState.rightCard) {
    return gameState;
  }

  const isCorrect = checkGuess(
    gameState.leftCard,
    gameState.rightCard,
    gameState.currentStat,
    guess
  );

  if (isCorrect) {
    // Correct guess - increment streak and score
    const newStreak = gameState.streak + 1;
    const newScore = calculateScore(gameState.score, gameState.streak);

    return {
      ...gameState,
      streak: newStreak,
      score: newScore,
      isRevealed: true,
      lastResult: 'correct',
    };
  } else {
    // Wrong guess - game over
    return {
      ...gameState,
      isRevealed: true,
      gameOver: true,
      lastResult: 'wrong',
      highScore: Math.max(gameState.score, gameState.highScore),
    };
  }
}

/**
 * Continue to next round after correct guess
 */
export function continueToNextRound(gameState: GameState): GameState {
  if (!gameState.rightCard) {
    return gameState;
  }

  // Right card becomes new left card
  const newLeftCard = gameState.rightCard;

  // Get new right card (avoid recent repeats)
  const newRightCard = getRandomCoaster(gameState.usedCoasterIds);

  // Rotate to next stat
  const newStat = getNextStat(gameState.currentStat);

  // Update used coasters list (keep last 10)
  const updatedUsedIds = [...gameState.usedCoasterIds, newRightCard.id].slice(-10);

  return {
    ...gameState,
    leftCard: newLeftCard,
    rightCard: newRightCard,
    currentStat: newStat,
    isRevealed: false,
    lastResult: null,
    usedCoasterIds: updatedUsedIds,
  };
}

/**
 * Reset game to initial state
 */
export function resetGame(currentHighScore: number): GameState {
  const newState = createInitialGameState();
  return {
    ...newState,
    highScore: currentHighScore,
  };
}
