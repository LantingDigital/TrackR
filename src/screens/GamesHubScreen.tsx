/**
 * Games Hub Screen - TrackR
 * Central hub for all 4 games
 * Will be fully implemented in Phase 5E
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text, Card, Button } from '@/components/base';
import { useTheme } from '@/hooks';

export const GamesHubScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <View style={styles.content}>
        <Text variant="title1" color="primary" style={styles.title}>
          🎮 Games Hub
        </Text>

        <Card variant="elevated" style={styles.card}>
          <Text variant="title3" color="primary" style={styles.cardTitle}>
            4 Mini-Games
          </Text>
          <Text variant="body" color="secondary" style={styles.description}>
            Coming in Phase 5:
          </Text>
          <Text variant="callout" color="primary" style={styles.feature}>
            🎯 Coastle - 3×3 Wordle-style game
          </Text>
          <Text variant="callout" color="primary" style={styles.feature}>
            🧠 Trivia - Kahoot-style quiz
          </Text>
          <Text variant="callout" color="primary" style={styles.feature}>
            🃏 Trading Cards - Stat-based battles
          </Text>
          <Text variant="callout" color="primary" style={styles.feature}>
            🎰 Blackjack - Coaster stat 21
          </Text>
        </Card>

        <Card variant="default" style={styles.card}>
          <Text variant="title3" color="primary" style={styles.cardTitle}>
            Features
          </Text>
          <Text variant="callout" color="secondary" style={styles.feature}>
            • Daily streak tracking
          </Text>
          <Text variant="callout" color="secondary" style={styles.feature}>
            • Leaderboards
          </Text>
          <Text variant="callout" color="secondary" style={styles.feature}>
            • Practice modes
          </Text>
        </Card>

        <Button
          title="Close"
          onPress={() => navigation.goBack()}
          variant="secondary"
          fullWidth
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 24,
  },
  card: {
    marginBottom: 16,
    padding: 20,
  },
  cardTitle: {
    marginBottom: 12,
  },
  description: {
    marginBottom: 12,
  },
  feature: {
    marginTop: 8,
  },
});

export default GamesHubScreen;
