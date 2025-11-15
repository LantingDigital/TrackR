/**
 * Games Module Types - TrackR
 * Type definitions for all game-related features
 */

/**
 * Game identifiers
 */
export type GameType = 'coastle' | 'trivia' | 'cards' | 'blackjack';

/**
 * Streak Data
 * Tracks user's daily game streak
 */
export interface StreakData {
  currentStreak: number;
  lastPlayedDate: Date;
  dailyChallenges: DailyChallenges;
}

/**
 * Daily Challenges
 * Tracks which daily games have been completed
 */
export interface DailyChallenges {
  coastleComplete: boolean;
  triviaComplete: boolean;
}

/**
 * Leaderboard Entry
 * Individual entry on the global leaderboard
 */
export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  totalPoints: number;
  avatar?: string;
}

/**
 * User Game Statistics
 * Overall stats for all games
 */
export interface UserGameStats {
  coastle: CoastleStats;
  trivia: TriviaStats;
  cards: CardsStats;
  blackjack: BlackjackStats;
}

/**
 * Coastle Game Statistics
 */
export interface CoastleStats {
  gamesPlayed: number;
  winRate: number;
  avgGuesses: number;
  currentStreak: number;
  bestStreak: number;
}

/**
 * Trivia Game Statistics
 */
export interface TriviaStats {
  gamesPlayed: number;
  avgScore: number;
  perfectGames: number;
  currentStreak: number;
  bestStreak: number;
}

/**
 * Trading Cards Game Statistics
 */
export interface CardsStats {
  totalCards: number;
  legendariesOwned: number;
  battlesWon: number;
  winRate: number;
}

/**
 * Blackjack Game Statistics
 */
export interface BlackjackStats {
  gamesPlayed: number;
  winRate: number;
  currentStreak: number;
  bestStreak: number;
}

/**
 * Game Hub Data
 * All data needed for Games Hub screen
 */
export interface GameHubData {
  streak: StreakData;
  leaderboard: LeaderboardEntry[];
  userStats: UserGameStats;
}

/**
 * Game Info
 * Metadata for each game
 */
export interface GameInfo {
  id: GameType;
  name: string;
  icon: string;
  color: string;
  description: string;
  isNew?: boolean;
}
