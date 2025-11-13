/**
 * Home Screen - TrackR
 * Main homescreen with widgets, news feed, and carousel
 * Phase 3 Complete
 */

import React from 'react';
import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text } from '@/components/base';
import { QuickActionWidget, StreakWidget, RidesCarouselWidget, NewsFeedWidget } from '@/components/widgets';
import { useTheme, useHaptic, HapticType } from '@/hooks';
import { RootStackParamList } from '@/navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const HomeScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const { trigger } = useHaptic();

  const handleLogPress = () => {
    trigger(HapticType.MEDIUM);
    navigation.navigate('Logger');
  };

  const handleSearchPress = () => {
    trigger(HapticType.MEDIUM);
    // TODO: Navigate to search screen (Phase 3+)
    console.log('Search coasters');
  };

  const handleWalletPress = () => {
    trigger(HapticType.MEDIUM);
    navigation.navigate('Wallet');
  };

  const handleStatsPress = () => {
    trigger(HapticType.MEDIUM);
    // TODO: Navigate to stats screen (Phase 3+)
    console.log('View stats');
  };

  const handleGamesPress = () => {
    trigger(HapticType.MEDIUM);
    navigation.navigate('GamesHub');
  };

  const handleRidePress = (rideId: string) => {
    trigger(HapticType.LIGHT);
    // TODO: Navigate to ride detail (Phase 3+)
    console.log('View ride:', rideId);
  };

  const handleArticlePress = (articleId: string) => {
    trigger(HapticType.LIGHT);
    // TODO: Open article in web view or external browser (Phase 3+)
    console.log('Open article:', articleId);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text variant="title1" color="primary">
            🎢 Welcome Back!
          </Text>
          <Text variant="body" color="secondary" style={styles.subtitle}>
            Your coaster journey continues
          </Text>
        </View>

        {/* Quick Actions - 2×2 Grid */}
        <View style={styles.widgetGrid}>
          <QuickActionWidget
            title="Log Ride"
            icon="📝"
            color={theme.colors.primary.blue}
            onPress={handleLogPress}
            accessibilityHint="Log a new roller coaster ride"
          />
          <QuickActionWidget
            title="Search"
            icon="🔍"
            color={theme.colors.primary.purple}
            onPress={handleSearchPress}
            accessibilityHint="Search for roller coasters"
          />
          <QuickActionWidget
            title="Wallet"
            icon="💳"
            color={theme.colors.primary.teal}
            onPress={handleWalletPress}
            accessibilityHint="View your digital wallet"
          />
          <QuickActionWidget
            title="Stats"
            icon="📊"
            color={theme.colors.primary.orange}
            onPress={handleStatsPress}
            accessibilityHint="View your statistics"
          />
        </View>

        {/* Streak & Games Tracker */}
        <View style={styles.section}>
          <StreakWidget
            currentStreak={7}
            games={[
              { name: 'Coastle', completed: true, icon: '🎢' },
              { name: 'Trivia', completed: true, icon: '❓' },
              { name: 'Cards', completed: false, icon: '🃏' },
              { name: 'Blackjack', completed: false, icon: '🎰' },
            ]}
            onPress={handleGamesPress}
          />
        </View>

        {/* Last Logged Rides Carousel */}
        <RidesCarouselWidget
          rides={[
            {
              id: '1',
              coasterName: 'Steel Vengeance',
              parkName: 'Cedar Point',
              date: 'Today',
              rating: 5,
            },
            {
              id: '2',
              coasterName: 'Fury 325',
              parkName: 'Carowinds',
              date: '2 days ago',
              rating: 5,
            },
            {
              id: '3',
              coasterName: 'Maverick',
              parkName: 'Cedar Point',
              date: '1 week ago',
              rating: 4,
            },
          ]}
          onRidePress={handleRidePress}
        />

        {/* News Feed */}
        <NewsFeedWidget
          articles={[
            {
              id: '1',
              title: 'New RMC Coaster Announced for Cedar Point 2025',
              source: 'Screamscape',
              date: '2 hours ago',
              excerpt: 'Cedar Point confirms plans for a groundbreaking hybrid coaster...',
            },
            {
              id: '2',
              title: 'Six Flags and Cedar Fair Merger Complete',
              source: 'Screamscape',
              date: '5 hours ago',
              excerpt: 'The historic merger creates the largest amusement park operator...',
            },
            {
              id: '3',
              title: 'Intamin Unveils New Launch Technology',
              source: 'Screamscape',
              date: 'Yesterday',
              excerpt: 'Revolutionary magnetic launch system promises faster acceleration...',
            },
          ]}
          onArticlePress={handleArticlePress}
        />

        <View style={styles.footer}>
          <Text variant="caption1" color="tertiary" style={styles.centered}>
            Phase 3: Homescreen Complete ✅
          </Text>
          <Text variant="caption2" color="quaternary" style={styles.centered}>
            Next: Phase 4 - Logger System (Weighted Criteria)
          </Text>
        </View>
      </ScrollView>

      {/* Floating Action Button - Log Ride */}
      <Pressable
        style={[styles.fab, { backgroundColor: theme.colors.primary.blue, ...theme.shadows.lg }]}
        onPress={handleLogPress}
        accessibilityLabel="Log a ride"
        accessibilityRole="button"
      >
        <Text style={styles.fabText}>📝</Text>
      </Pressable>
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
  header: {
    marginBottom: 32,
  },
  subtitle: {
    marginTop: 8,
  },
  widgetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 32,
    gap: 8,
  },
  section: {
    marginBottom: 24,
  },
  footer: {
    marginTop: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#E8E7E5',
  },
  centered: {
    textAlign: 'center',
    marginBottom: 4,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabText: {
    fontSize: 24,
  },
});

export default HomeScreen;
