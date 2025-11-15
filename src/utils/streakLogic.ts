/**
 * Streak Logic - TrackR Games
 * Handles streak calculation and daily challenge tracking
 */

import { StreakData, DailyChallenges, GameType } from '@/types/games';

/**
 * Calculate days difference between two dates
 */
const differenceInDays = (date1: Date, date2: Date): number => {
  const msPerDay = 1000 * 60 * 60 * 24;
  const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
  return Math.floor((utc1 - utc2) / msPerDay);
};

/**
 * Check if date is today
 */
const isToday = (date: Date): boolean => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

/**
 * Check if date is yesterday
 */
const isYesterday = (date: Date): boolean => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  return (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  );
};

/**
 * Check and update streak based on last played date
 * Returns updated streak data
 */
export const checkStreak = (streakData: StreakData): StreakData => {
  const today = new Date();
  const lastPlayed = new Date(streakData.lastPlayedDate);

  // If last played today, return as is
  if (isToday(lastPlayed)) {
    return streakData;
  }

  // If last played yesterday
  if (isYesterday(lastPlayed)) {
    // Check if at least one daily challenge was completed yesterday
    if (
      streakData.dailyChallenges.coastleComplete ||
      streakData.dailyChallenges.triviaComplete
    ) {
      // Increment streak, reset challenges for new day
      return {
        currentStreak: streakData.currentStreak + 1,
        lastPlayedDate: today,
        dailyChallenges: {
          coastleComplete: false,
          triviaComplete: false,
        },
      };
    } else {
      // No challenges completed yesterday - streak broken
      return {
        currentStreak: 0,
        lastPlayedDate: today,
        dailyChallenges: {
          coastleComplete: false,
          triviaComplete: false,
        },
      };
    }
  }

  // More than 1 day has passed - streak broken
  return {
    currentStreak: 0,
    lastPlayedDate: today,
    dailyChallenges: {
      coastleComplete: false,
      triviaComplete: false,
    },
  };
};

/**
 * Mark a game challenge as complete
 * Only works for daily games (Coastle, Trivia)
 */
export const completeChallenge = (
  streakData: StreakData,
  game: GameType
): StreakData => {
  // Only Coastle and Trivia affect daily streak
  if (game !== 'coastle' && game !== 'trivia') {
    return streakData;
  }

  const today = new Date();
  const updated: StreakData = { ...streakData };

  // Check if this is first play today
  if (!isToday(streakData.lastPlayedDate)) {
    // Check streak status from yesterday
    updated.lastPlayedDate = today;

    if (isYesterday(streakData.lastPlayedDate)) {
      // Continue streak if yesterday had completion
      if (
        streakData.dailyChallenges.coastleComplete ||
        streakData.dailyChallenges.triviaComplete
      ) {
        updated.currentStreak = streakData.currentStreak + 1;
      } else {
        // Yesterday incomplete - reset streak
        updated.currentStreak = 0;
      }
    } else {
      // More than 1 day gap - reset streak
      updated.currentStreak = 0;
    }

    // Reset challenges for new day
    updated.dailyChallenges = {
      coastleComplete: false,
      triviaComplete: false,
    };
  }

  // Mark current game as complete
  if (game === 'coastle') {
    updated.dailyChallenges.coastleComplete = true;
  } else if (game === 'trivia') {
    updated.dailyChallenges.triviaComplete = true;
  }

  return updated;
};

/**
 * Initialize streak data for new user
 */
export const initializeStreak = (): StreakData => {
  return {
    currentStreak: 0,
    lastPlayedDate: new Date(),
    dailyChallenges: {
      coastleComplete: false,
      triviaComplete: false,
    },
  };
};

/**
 * Get streak status message
 */
export const getStreakMessage = (streak: number): string => {
  if (streak === 0) {
    return 'Play daily to start a streak!';
  } else if (streak === 1) {
    return 'Keep it going! Play again tomorrow.';
  } else if (streak < 7) {
    return `${streak} days! Keep your streak alive!`;
  } else if (streak < 30) {
    return `${streak} day streak! You're on fire!`;
  } else if (streak < 100) {
    return `${streak} days! Legendary streak!`;
  } else {
    return `${streak} days! Absolutely incredible!`;
  }
};

/**
 * Check if user has completed daily challenge today
 */
export const hasCompletedDailyChallenge = (streakData: StreakData): boolean => {
  if (!isToday(streakData.lastPlayedDate)) {
    return false;
  }
  return (
    streakData.dailyChallenges.coastleComplete ||
    streakData.dailyChallenges.triviaComplete
  );
};
