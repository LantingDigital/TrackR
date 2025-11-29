/**
 * UserProfile Context - TrackR
 * Manages app-wide user preferences including:
 * - Rating mode (Guest vs Enthusiast)
 * - Criteria weights for enthusiast mode
 * - Recent parks for quick logging
 */

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

// Rating criteria configuration
export const RATING_CRITERIA = [
  { id: 'thrill', label: 'Thrill/Intensity', color: '#FF6B35' },
  { id: 'smoothness', label: 'Smoothness', color: '#4ECDC4' },
  { id: 'airtime', label: 'Airtime', color: '#95E1D3' },
  { id: 'theming', label: 'Theming', color: '#F38181' },
  { id: 'inversions', label: 'Inversions', color: '#AA96DA' },
  { id: 'speed', label: 'Speed', color: '#FCBAD3' },
] as const;

export type RatingMode = 'guest' | 'enthusiast';
export type CriteriaId = typeof RATING_CRITERIA[number]['id'];

export interface CriteriaWeight {
  id: CriteriaId;
  weight: number; // 0-100, all should sum to 100
  locked: boolean;
}

export interface RecentPark {
  id: string;
  name: string;
  lastVisited: Date;
}

export interface UserProfile {
  // Rating preferences (APP-WIDE, not per-ride)
  ratingMode: RatingMode;
  criteriaWeights: CriteriaWeight[];

  // Recent activity for quick logging
  recentParks: RecentPark[];

  // Onboarding status
  hasCompletedOnboarding: boolean;
}

interface UserProfileContextType {
  profile: UserProfile;

  // Mode management
  setRatingMode: (mode: RatingMode) => void;

  // Weights management
  setCriteriaWeight: (criteriaId: CriteriaId, weight: number) => void;
  toggleCriteriaLock: (criteriaId: CriteriaId) => void;
  resetWeightsToEqual: () => void;

  // Recent parks
  addRecentPark: (park: RecentPark) => void;

  // Onboarding
  completeOnboarding: () => void;

  // Helpers
  calculateWeightedScore: (ratings: Record<CriteriaId, number>) => number;
}

const defaultWeights: CriteriaWeight[] = RATING_CRITERIA.map((c) => ({
  id: c.id,
  weight: Math.round(100 / RATING_CRITERIA.length),
  locked: false,
}));

const defaultProfile: UserProfile = {
  ratingMode: 'guest',
  criteriaWeights: defaultWeights,
  recentParks: [],
  hasCompletedOnboarding: false,
};

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

export const UserProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);

  const setRatingMode = useCallback((mode: RatingMode) => {
    setProfile((prev) => ({ ...prev, ratingMode: mode }));
  }, []);

  const setCriteriaWeight = useCallback((criteriaId: CriteriaId, newWeight: number) => {
    setProfile((prev) => {
      const weights = [...prev.criteriaWeights];
      const targetIndex = weights.findIndex((w) => w.id === criteriaId);
      if (targetIndex === -1) return prev;

      const target = weights[targetIndex];
      const oldWeight = target.weight;
      const delta = newWeight - oldWeight;

      // Get unlocked criteria (excluding the one being changed)
      const unlockedOthers = weights.filter(
        (w, i) => i !== targetIndex && !w.locked
      );

      if (unlockedOthers.length === 0 && delta !== 0) {
        // Can't redistribute, just update the target
        weights[targetIndex] = { ...target, weight: Math.max(0, Math.min(100, newWeight)) };
      } else if (delta !== 0) {
        // Redistribute proportionally
        const totalOtherWeight = unlockedOthers.reduce((sum, w) => sum + w.weight, 0);

        weights[targetIndex] = { ...target, weight: newWeight };

        if (totalOtherWeight > 0) {
          let remaining = -delta;
          unlockedOthers.forEach((w, i) => {
            const idx = weights.findIndex((x) => x.id === w.id);
            const proportion = w.weight / totalOtherWeight;
            const adjustment = i === unlockedOthers.length - 1
              ? remaining
              : Math.round(remaining * proportion);
            weights[idx] = { ...weights[idx], weight: Math.max(0, weights[idx].weight + adjustment) };
            remaining -= adjustment;
          });
        }
      }

      return { ...prev, criteriaWeights: weights };
    });
  }, []);

  const toggleCriteriaLock = useCallback((criteriaId: CriteriaId) => {
    setProfile((prev) => ({
      ...prev,
      criteriaWeights: prev.criteriaWeights.map((w) =>
        w.id === criteriaId ? { ...w, locked: !w.locked } : w
      ),
    }));
  }, []);

  const resetWeightsToEqual = useCallback(() => {
    setProfile((prev) => ({
      ...prev,
      criteriaWeights: defaultWeights,
    }));
  }, []);

  const addRecentPark = useCallback((park: RecentPark) => {
    setProfile((prev) => {
      const filtered = prev.recentParks.filter((p) => p.id !== park.id);
      return {
        ...prev,
        recentParks: [park, ...filtered].slice(0, 5), // Keep last 5
      };
    });
  }, []);

  const completeOnboarding = useCallback(() => {
    setProfile((prev) => ({ ...prev, hasCompletedOnboarding: true }));
  }, []);

  const calculateWeightedScore = useCallback(
    (ratings: Record<CriteriaId, number>) => {
      let total = 0;
      profile.criteriaWeights.forEach((w) => {
        const rating = ratings[w.id] || 0;
        total += (rating * w.weight) / 100;
      });
      return Math.round(total * 10) / 10;
    },
    [profile.criteriaWeights]
  );

  return (
    <UserProfileContext.Provider
      value={{
        profile,
        setRatingMode,
        setCriteriaWeight,
        toggleCriteriaLock,
        resetWeightsToEqual,
        addRecentPark,
        completeOnboarding,
        calculateWeightedScore,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = (): UserProfileContextType => {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
};

export default UserProfileContext;
