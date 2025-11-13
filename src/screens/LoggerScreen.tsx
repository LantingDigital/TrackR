/**
 * Logger Screen - TrackR
 * Bottom sheet modal for logging coaster rides
 * Will be fully implemented in Phase 4 (KILLER FEATURE!)
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text, Card, Button } from '@/components/base';
import { useTheme } from '@/hooks';

export const LoggerScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <View style={styles.content}>
        <Text variant="title1" color="primary" style={styles.title}>
          📝 Log a Ride
        </Text>

        <Card variant="elevated" style={styles.card}>
          <Text variant="title3" color="primary" style={styles.cardTitle}>
            Coming in Phase 4!
          </Text>
          <Text variant="body" color="secondary" style={styles.description}>
            The weighted criteria system - your app's killer feature:
          </Text>
          <Text variant="callout" color="primary" style={styles.feature}>
            • Guest mode: Simple 1-5 star rating
          </Text>
          <Text variant="callout" color="primary" style={styles.feature}>
            • Enthusiast mode: Custom weighted criteria
          </Text>
          <Text variant="callout" color="primary" style={styles.feature}>
            • Weight editor with locking + auto-balance
          </Text>
          <Text variant="callout" color="primary" style={styles.feature}>
            • Photo upload
          </Text>
          <Text variant="callout" color="primary" style={styles.feature}>
            • Log history with sorting/filtering
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
    marginBottom: 24,
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

export default LoggerScreen;
