/**
 * Social Screen - TrackR
 * Instagram-style social feed
 * Will be fully implemented in Phase 6
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Card } from '@/components/base';
import { useTheme } from '@/hooks';

export const SocialScreen: React.FC = () => {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <View style={styles.content}>
        <Text variant="title1" color="primary" style={styles.title}>
          👥 Social Feed
        </Text>

        <Card variant="elevated" style={styles.card}>
          <Text variant="body" color="secondary">
            Instagram-style feed coming in Phase 6:
          </Text>
          <Text variant="callout" color="primary" style={styles.feature}>
            • Photo posts with coaster tags
          </Text>
          <Text variant="callout" color="primary" style={styles.feature}>
            • Polls and text posts
          </Text>
          <Text variant="callout" color="primary" style={styles.feature}>
            • Like, comment, share
          </Text>
          <Text variant="callout" color="primary" style={styles.feature}>
            • User profiles with badge showcase
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

export default SocialScreen;
