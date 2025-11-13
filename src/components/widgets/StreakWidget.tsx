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
        {/* Header */}
        <View style={styles.header}>
          <Text variant="headline" color="primary" style={styles.title}>
            Daily Games
          </Text>
          <Text variant="caption1" color="tertiary" style={styles.streakText}>
            Streak: {currentStreak} 🔥
          </Text>
        </View>

        {/* Game Icons Row */}
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
                fontSize: 32,
                opacity: game.completed ? 1 : 0.4
              }}>
                {game.icon}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </Widget>
  );
};

const styles = StyleSheet.create({
  widget: {
    padding: 20,
    alignItems: 'stretch',
  },
  content: {
    width: '100%',
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: '700',
  },
  streakText: {
    fontSize: 12,
  },
  gameIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  gameIcon: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    overflow: 'hidden',
  },
});

export default StreakWidget;
