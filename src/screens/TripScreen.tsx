/**
 * Trip Screen - TrackR
 * Trip planner with day-by-day itineraries
 * Will be fully implemented in Phase 8
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Card } from '@/components/base';
import { useTheme } from '@/hooks';

export const TripScreen: React.FC = () => {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <View style={styles.content}>
        <Text variant="title1" color="primary" style={styles.title}>
          🗺️ Trip Planner
        </Text>

        <Card variant="elevated" style={styles.card}>
          <Text variant="body" color="secondary">
            Trip planning features coming in Phase 8:
          </Text>
          <Text variant="callout" color="primary" style={styles.feature}>
            • Create multi-day trips
          </Text>
          <Text variant="callout" color="primary" style={styles.feature}>
            • Day-by-day itineraries
          </Text>
          <Text variant="callout" color="primary" style={styles.feature}>
            • Coaster checklists
          </Text>
          <Text variant="callout" color="primary" style={styles.feature}>
            • Timeline builder
          </Text>
        </Card>
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
    padding: 20,
  },
  feature: {
    marginTop: 8,
  },
});

export default TripScreen;
