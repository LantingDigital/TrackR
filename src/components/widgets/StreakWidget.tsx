/**
 * Streak Widget - TrackR
 * Displays daily login streak and game completion status
 * Phase 3 placeholder with mock data
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@/components/base';
import { Widget } from './Widget';
import { useTheme } from '@/hooks';

interface GameStatus {
  name: string;
  completed: boolean;
  icon: string;
}

export interface StreakWidgetProps {
  currentStreak: number;
  games: GameStatus[];
  onPress?: () => void;
}

export const StreakWidget: React.FC<StreakWidgetProps> = ({
  currentStreak,
  games,
  onPress,
}) => {
  const theme = useTheme();

  const completedCount = games.filter(g => g.completed).length;
  const totalCount = games.length;

  return (
    <Widget
      onPress={onPress}
      style={styles.widget}
      accessibilityLabel={`Current streak: ${currentStreak} days. ${completedCount} of ${totalCount} games completed today`}
      accessibilityHint="View game details"
    >
      <View style={styles.content}>
        {/* Streak Counter */}
        <View style={styles.streakSection}>
          <View style={[styles.streakBadge, { backgroundColor: theme.colors.primary.orange + '20' }]}>
            <Text style={styles.streakEmoji}>🔥</Text>
            <Text variant="title2" color="primary" style={styles.streakNumber}>
              {currentStreak}
            </Text>
          </View>
          <Text variant="footnote" color="secondary">
            Day Streak
          </Text>
        </View>

        {/* Games Progress */}
        <View style={styles.gamesSection}>
          <View style={styles.gamesHeader}>
            <Text variant="callout" color="primary" style={styles.gamesTitle}>
              Daily Games
            </Text>
            <Text variant="caption1" color="tertiary">
              {completedCount}/{totalCount}
            </Text>
          </View>

          <View style={styles.gameIcons}>
            {games.map((game, index) => (
              <View
                key={index}
                style={[
                  styles.gameIcon,
                  {
                    backgroundColor: game.completed
                      ? theme.colors.primary.blue + '30'
                      : theme.colors.background.tertiary,
                  },
                ]}
              >
                <Text style={{
                  fontSize: 18,
                  opacity: game.completed ? 1 : 0.4
                }}>
                  {game.icon}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </Widget>
  );
};

const styles = StyleSheet.create({
  widget: {
    padding: 16,
    alignItems: 'stretch',
  },
  content: {
    width: '100%',
    flexDirection: 'row',
    gap: 16,
  },
  streakSection: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  streakBadge: {
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  streakEmoji: {
    fontSize: 16,
    position: 'absolute',
    top: 8,
    right: 8,
  },
  streakNumber: {
    fontWeight: '700',
  },
  gamesSection: {
    flex: 1,
    gap: 8,
  },
  gamesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gamesTitle: {
    fontWeight: '600',
  },
  gameIcons: {
    flexDirection: 'row',
    gap: 8,
  },
  gameIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StreakWidget;
