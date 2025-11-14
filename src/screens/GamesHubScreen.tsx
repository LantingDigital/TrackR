/**
 * Games Hub Screen - TrackR
 * Central hub for all 4 games with streak tracking and leaderboards
 * Production-ready implementation - Phase 4
 */

import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text } from '@/components/base';
import { GameTile, StreakBadge, DailyChallenges, Leaderboard } from '@/components/games';
import { useTheme, useHaptic, HapticType } from '@/hooks';
import { RootStackParamList } from '@/navigation/types';
import { StreakData, DailyChallenges as DailyChallengesType, LeaderboardEntry } from '@/types/games';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const GamesHubScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const { trigger } = useHaptic();

  // Mock streak data (will be from state management in future)
  const streakData: StreakData = {
    currentStreak: 5,
    lastPlayedDate: new Date(),
    dailyChallenges: {
      coastleComplete: true,
      triviaComplete: false,
    },
  };

  // Mock leaderboard data (will be from API in future)
  const leaderboardEntries: LeaderboardEntry[] = [
    { rank: 1, userId: 'user1', username: 'CoasterFan99', totalPoints: 9850 },
    { rank: 2, userId: 'user2', username: 'ThrillSeeker', totalPoints: 9720 },
    { rank: 3, userId: 'user3', username: 'RideWarrior', totalPoints: 9100 },
    { rank: 4, userId: 'user4', username: 'LoopLover', totalPoints: 8950 },
    { rank: 5, userId: 'user5', username: 'CoasterKing', totalPoints: 8720 },
    { rank: 6, userId: 'user6', username: 'AirTimePro', totalPoints: 8500 },
    { rank: 7, userId: 'user7', username: 'InversionQueen', totalPoints: 8350 },
    { rank: 8, userId: 'user8', username: 'LaunchMaster', totalPoints: 8200 },
    { rank: 9, userId: 'user9', username: 'WoodenCoasterFan', totalPoints: 8100 },
    { rank: 10, userId: 'user10', username: 'RMCEnthusiast', totalPoints: 7950 },
  ];

  const currentUserId = 'user1'; // Mock current user

  // Navigation handlers
  const handleCoastlePress = () => {
    trigger(HapticType.SELECTION);
    navigation.navigate('CoastleGame');
  };

  const handleTriviaPress = () => {
    trigger(HapticType.SELECTION);
    navigation.navigate('TriviaGame');
  };

  const handleCardsPress = () => {
    trigger(HapticType.SELECTION);
    navigation.navigate('TradingCardGame');
  };

  const handleBlackjackPress = () => {
    trigger(HapticType.SELECTION);
    navigation.navigate('BlackjackGame');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Streak Badge */}
        <StreakBadge streak={streakData.currentStreak} />

        {/* Daily Challenges */}
        <DailyChallenges challenges={streakData.dailyChallenges} />

        {/* Section Header */}
        <Text variant="title3" color="primary" style={styles.sectionHeader}>
          Play Now
        </Text>

        {/* Game Grid - 2×2 Layout */}
        <View style={styles.gameGrid}>
          {/* Row 1 */}
          <View style={styles.gameRow}>
            <GameTile
              game="coastle"
              icon="🎯"
              name="Coastle"
              color={theme.colors.primary.blue}
              onPress={handleCoastlePress}
            />
            <GameTile
              game="trivia"
              icon="🧠"
              name="Trivia"
              color={theme.colors.primary.purple}
              onPress={handleTriviaPress}
            />
          </View>

          {/* Row 2 */}
          <View style={styles.gameRow}>
            <GameTile
              game="cards"
              icon="🃏"
              name="Cards"
              color={theme.colors.primary.teal}
              onPress={handleCardsPress}
            />
            <GameTile
              game="blackjack"
              icon="🎰"
              name="Blackjack"
              color={theme.colors.primary.orange}
              onPress={handleBlackjackPress}
            />
          </View>
        </View>

        {/* Leaderboard */}
        <Leaderboard entries={leaderboardEntries} currentUserId={currentUserId} />

        {/* Footer */}
        <View style={styles.footer}>
          <Text variant="caption1" color="tertiary" style={styles.centered}>
            Phase 4: Games Hub Complete ✅
          </Text>
          <Text variant="caption2" color="quaternary" style={styles.centered}>
            Individual games coming in Phase 5
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  sectionHeader: {
    marginBottom: 16,
    fontWeight: '600',
  },
  gameGrid: {
    marginBottom: 32,
    gap: 16,
  },
  gameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  footer: {
    marginTop: 8,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#E8E7E5',
  },
  centered: {
    textAlign: 'center',
    marginBottom: 4,
  },
});

export default GamesHubScreen;
