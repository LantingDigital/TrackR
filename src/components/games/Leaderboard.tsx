/**
 * Leaderboard Component - TrackR
 * Displays top 10 players on global leaderboard
 * Shows rank, username, and total points
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@/components/base';
import { useTheme } from '@/hooks';
import { LeaderboardEntry } from '@/types/games';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  currentUserId?: string;
}

interface LeaderboardRowProps {
  entry: LeaderboardEntry;
  isCurrentUser: boolean;
}

const LeaderboardRow: React.FC<LeaderboardRowProps> = ({ entry, isCurrentUser }) => {
  const theme = useTheme();

  // Medal emojis for top 3
  const getMedalIcon = (rank: number): string => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return '';
  };

  const medal = getMedalIcon(entry.rank);

  return (
    <View
      style={[
        styles.row,
        {
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border.light,
          backgroundColor: isCurrentUser
            ? theme.colors.background.tertiary
            : 'transparent',
        },
      ]}
    >
      {/* Rank */}
      <View style={styles.rankContainer}>
        {medal ? (
          <Text style={styles.medal}>{medal}</Text>
        ) : (
          <Text variant="callout" color="secondary" style={styles.rankText}>
            {entry.rank}
          </Text>
        )}
      </View>

      {/* Username */}
      <Text
        variant="callout"
        color={isCurrentUser ? 'primary' : 'secondary'}
        style={[styles.username, isCurrentUser && styles.currentUserText] as any}
        numberOfLines={1}
      >
        {entry.username}
        {isCurrentUser && ' (You)'}
      </Text>

      {/* Points */}
      <Text
        variant="callout"
        style={[styles.points, { color: theme.colors.primary.blue }] as any}
      >
        {entry.totalPoints.toLocaleString()} pts
      </Text>
    </View>
  );
};

export const Leaderboard: React.FC<LeaderboardProps> = ({ entries, currentUserId }) => {
  const theme = useTheme();

  // Show top 10 only
  const topEntries = entries.slice(0, 10);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background.secondary,
          borderRadius: theme.borderRadius.lg,
          ...theme.shadows.md,
        },
      ]}
    >
      {/* Header */}
      <View style={styles.headerRow}>
        <Text variant="title3" color="primary" style={styles.header}>
          Leaderboard
        </Text>
        <Text variant="caption1" color="tertiary">
          Top 10
        </Text>
      </View>

      {/* Leaderboard entries */}
      {topEntries.length > 0 ? (
        topEntries.map((entry) => (
          <LeaderboardRow
            key={entry.userId}
            entry={entry}
            isCurrentUser={entry.userId === currentUserId}
          />
        ))
      ) : (
        <View style={styles.emptyState}>
          <Text variant="body" color="tertiary" style={styles.emptyText}>
            No leaderboard data yet. Be the first to play!
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  header: {
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  rankContainer: {
    width: 40,
    alignItems: 'center',
  },
  medal: {
    fontSize: 20,
    lineHeight: 26, // CRITICAL: Prevent emoji clipping
  },
  rankText: {
    fontWeight: '700',
    textAlign: 'center',
  },
  username: {
    flex: 1,
    marginLeft: 8,
  },
  currentUserText: {
    fontWeight: '600',
  },
  points: {
    fontWeight: '600',
    marginLeft: 8,
  },
  emptyState: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
  },
});

export default Leaderboard;
