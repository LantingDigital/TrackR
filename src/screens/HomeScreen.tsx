/**
 * Home Screen - TrackR
 * Main homescreen with widgets, news feed, and carousel
 * Will be fully implemented in Phase 3
 */

import React from 'react';
import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text, Card } from '@/components/base';
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

        {/* Placeholder Cards */}
        <Card variant="elevated" style={styles.card}>
          <Text variant="title3" color="primary" style={styles.cardTitle}>
            Quick Actions
          </Text>
          <Text variant="body" color="secondary">
            4 widgets will appear here (2×2 grid)
          </Text>
        </Card>

        <Card variant="default" style={styles.card}>
          <Text variant="title3" color="primary" style={styles.cardTitle}>
            Streak & Games
          </Text>
          <Text variant="body" color="secondary">
            Daily game completion status
          </Text>
        </Card>

        <Card variant="default" style={styles.card}>
          <Text variant="title3" color="primary" style={styles.cardTitle}>
            Last Logged Rides
          </Text>
          <Text variant="body" color="secondary">
            Horizontal carousel will appear here
          </Text>
        </Card>

        <Card variant="default" style={styles.card}>
          <Text variant="title3" color="primary" style={styles.cardTitle}>
            News Feed
          </Text>
          <Text variant="body" color="secondary">
            Latest coaster news from Screamscape
          </Text>
        </Card>

        <View style={styles.footer}>
          <Text variant="caption1" color="tertiary" style={styles.centered}>
            Phase 2: Navigation Complete ✅
          </Text>
          <Text variant="caption2" color="quaternary" style={styles.centered}>
            Full homescreen implementation in Phase 3
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
    paddingBottom: 32,
  },
  header: {
    marginBottom: 24,
  },
  subtitle: {
    marginTop: 8,
  },
  card: {
    marginBottom: 16,
  },
  cardTitle: {
    marginBottom: 8,
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
