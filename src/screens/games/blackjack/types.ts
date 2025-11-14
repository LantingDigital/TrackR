/**
 * Higher or Lower Game - TypeScript Types
 * Complete type definitions for stat showdown game
 */

export type StatType = 'height' | 'speed' | 'inversions' | 'year';
export type GuessType = 'higher' | 'lower';
export type GameStatus = 'playing' | 'revealing' | 'game_over';

/**
 * Coaster data with all stats for comparison
 */
export interface CoasterData {
  id: string;
  name: string;
  height: number; // feet
  speed: number; // mph
  inversions: number; // count
  year: number; // year built
  park: string;
  country: string;
}

/**
 * Complete game state
 */
export interface GameState {
  leftCard: CoasterData | null;
  rightCard: CoasterData | null;
  currentStat: StatType;
  streak: number;
  score: number;
  highScore: number;
  isRevealed: boolean;
  gameOver: boolean;
  lastResult: 'correct' | 'wrong' | null;
  usedCoasterIds: string[]; // Prevent recent repeats
}

/**
 * Game statistics (persistent)
 */
export interface GameStats {
  highestStreak: number;
  gamesPlayed: number;
  bestScore: number;
  totalCorrect: number;
  totalWrong: number;
}
