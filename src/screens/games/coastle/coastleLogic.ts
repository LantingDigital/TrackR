/**
 * Coastle Game - Core Game Logic
 * Comparison logic, scoring, and game state management
 */

import {
  MysteryCoaster,
  GridFeedback,
  StatType,
  FeedbackType,
  GRID_LAYOUT,
  GameStatus,
  Guess,
} from './types';

/**
 * Compare a guess against the mystery coaster
 * Returns feedback for all 9 cells in the grid
 */
export const compareGuess = (
  guess: MysteryCoaster,
  mystery: MysteryCoaster
): GridFeedback[] => {
  const feedback: GridFeedback[] = [];

  GRID_LAYOUT.forEach((stat, index) => {
    const cellFeedback = compareStat(stat, guess, mystery);
    feedback.push({
      cell: index,
      stat,
      ...cellFeedback,
    });
  });

  return feedback;
};

/**
 * Compare a single stat between guess and mystery coaster
 */
const compareStat = (
  stat: StatType,
  guess: MysteryCoaster,
  mystery: MysteryCoaster
): { feedback: FeedbackType; value: string } => {
  switch (stat) {
    case StatType.HEIGHT:
      return compareNumericStat(
        guess.stats.height,
        mystery.stats.height,
        'ft'
      );

    case StatType.SPEED:
      return compareNumericStat(
        guess.stats.speed,
        mystery.stats.speed,
        'mph'
      );

    case StatType.LENGTH:
      return compareNumericStat(
        guess.stats.length,
        mystery.stats.length,
        'ft'
      );

    case StatType.YEAR:
      return compareNumericStat(
        guess.stats.year,
        mystery.stats.year,
        ''
      );

    case StatType.INVERSIONS:
      return compareNumericStat(
        guess.stats.inversions,
        mystery.stats.inversions,
        ''
      );

    case StatType.COUNTRY:
      return compareCategoricalStat(guess.country, mystery.country);

    case StatType.MANUFACTURER:
      return compareCategoricalStat(guess.manufacturer, mystery.manufacturer);

    case StatType.TYPE:
      return compareCategoricalStat(guess.type, mystery.type);

    case StatType.PARK:
      return compareCategoricalStat(guess.park, mystery.park);

    default:
      return { feedback: FeedbackType.WRONG, value: '?' };
  }
};

/**
 * Compare numeric stats (height, speed, length, year, inversions)
 * Returns CORRECT, HIGHER, or LOWER
 */
const compareNumericStat = (
  guessValue: number,
  mysteryValue: number,
  unit: string
): { feedback: FeedbackType; value: string } => {
  const formattedValue = unit ? `${guessValue} ${unit}` : `${guessValue}`;

  if (guessValue === mysteryValue) {
    return {
      feedback: FeedbackType.CORRECT,
      value: formattedValue,
    };
  } else if (guessValue < mysteryValue) {
    return {
      feedback: FeedbackType.HIGHER,
      value: formattedValue,
    };
  } else {
    return {
      feedback: FeedbackType.LOWER,
      value: formattedValue,
    };
  }
};

/**
 * Compare categorical stats (country, manufacturer, type, park)
 * Returns CORRECT or WRONG (no directional feedback)
 */
const compareCategoricalStat = (
  guessValue: string,
  mysteryValue: string
): { feedback: FeedbackType; value: string } => {
  if (guessValue === mysteryValue) {
    return {
      feedback: FeedbackType.CORRECT,
      value: guessValue,
    };
  } else {
    return {
      feedback: FeedbackType.WRONG,
      value: guessValue,
    };
  }
};

/**
 * Check if the game is won (all cells are correct)
 */
export const isGameWon = (gridFeedback: GridFeedback[]): boolean => {
  return gridFeedback.every((cell) => cell.feedback === FeedbackType.CORRECT);
};

/**
 * Determine game status based on guesses
 */
export const determineGameStatus = (
  guesses: Guess[],
  maxGuesses: number
): GameStatus => {
  if (guesses.length === 0) {
    return GameStatus.IN_PROGRESS;
  }

  // Check if last guess was a win
  const lastGuess = guesses[guesses.length - 1];
  if (isGameWon(lastGuess.gridFeedback)) {
    return GameStatus.WON;
  }

  // Check if out of guesses
  if (guesses.length >= maxGuesses) {
    return GameStatus.LOST;
  }

  return GameStatus.IN_PROGRESS;
};

/**
 * Format share text for social media
 * Creates emoji grid like Wordle
 */
export const formatShareText = (
  guesses: Guess[],
  dailyNumber: number,
  gameStatus: GameStatus
): string => {
  if (gameStatus === GameStatus.IN_PROGRESS) {
    return '';
  }

  const guessCount =
    gameStatus === GameStatus.WON ? guesses.length : 'X';
  const maxGuesses = 6;

  let shareText = `Coastle #${dailyNumber} ${guessCount}/${maxGuesses}\n\n`;

  guesses.forEach((guess) => {
    const row1 = guess.gridFeedback.slice(0, 3).map(feedbackToEmoji).join('');
    const row2 = guess.gridFeedback.slice(3, 6).map(feedbackToEmoji).join('');
    const row3 = guess.gridFeedback.slice(6, 9).map(feedbackToEmoji).join('');

    shareText += `${row1}\n${row2}\n${row3}\n\n`;
  });

  return shareText.trim();
};

/**
 * Convert feedback type to emoji for sharing
 */
const feedbackToEmoji = (cell: GridFeedback): string => {
  switch (cell.feedback) {
    case FeedbackType.CORRECT:
      return '🟩';
    case FeedbackType.HIGHER:
    case FeedbackType.LOWER:
      return '🟨';
    case FeedbackType.WRONG:
      return '⬜';
    default:
      return '⬜';
  }
};

/**
 * Get icon for feedback type
 */
export const getFeedbackIcon = (feedback: FeedbackType): string => {
  switch (feedback) {
    case FeedbackType.CORRECT:
      return '✓';
    case FeedbackType.HIGHER:
      return '↑';
    case FeedbackType.LOWER:
      return '↓';
    case FeedbackType.WRONG:
      return '✗';
    default:
      return '';
  }
};

/**
 * Get cell colors based on feedback type
 */
export const getCellColors = (feedback: FeedbackType): {
  backgroundColor: string;
  borderColor: string;
} => {
  switch (feedback) {
    case FeedbackType.CORRECT:
      return {
        backgroundColor: '#6B9B6B', // Desaturated green
        borderColor: '#5A8A5A',
      };
    case FeedbackType.HIGHER:
    case FeedbackType.LOWER:
      return {
        backgroundColor: '#C9A857', // Desaturated yellow
        borderColor: '#B89747',
      };
    case FeedbackType.WRONG:
      return {
        backgroundColor: '#C77C7C', // Desaturated red
        borderColor: '#B76B6B',
      };
    default:
      return {
        backgroundColor: '#F3F2F0', // Tertiary background
        borderColor: '#E8E7E5',
      };
  }
};

/**
 * Format stat value for display
 */
export const formatStatValue = (stat: StatType, value: string | number): string => {
  switch (stat) {
    case StatType.HEIGHT:
      return `${value} ft`;
    case StatType.SPEED:
      return `${value} mph`;
    case StatType.LENGTH:
      return `${value} ft`;
    case StatType.YEAR:
      return `${value}`;
    case StatType.INVERSIONS:
      return `${value}`;
    default:
      return String(value);
  }
};

/**
 * Validate if a guess is allowed
 * (For future hard mode implementation)
 */
export const isValidGuess = (
  guess: MysteryCoaster,
  previousGuesses: Guess[]
): { valid: boolean; reason?: string } => {
  // For now, all guesses are valid
  // Future: Check if guess contradicts previous feedback (hard mode)
  return { valid: true };
};

/**
 * Calculate hint cost (for future hint system)
 */
export const calculateHintCost = (guessNumber: number): number => {
  // Cost increases with each guess
  return 50 * (guessNumber + 1);
};

/**
 * Get a hint (reveal one correct cell)
 * (For future hint implementation)
 */
export const getHint = (
  mystery: MysteryCoaster,
  revealedCells: number[]
): { stat: StatType; value: string } | null => {
  // Find first unrevealed cell
  const unrevealedIndex = GRID_LAYOUT.findIndex(
    (_, index) => !revealedCells.includes(index)
  );

  if (unrevealedIndex === -1) {
    return null;
  }

  const stat = GRID_LAYOUT[unrevealedIndex];
  const { value } = compareStat(stat, mystery, mystery);

  return { stat, value };
};
