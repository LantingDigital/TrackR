/**
 * Wallet Screen - TrackR
 * Apple Wallet clone for park passes
 * Will be fully implemented in Phase 7
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text, Card, Button } from '@/components/base';
import { useTheme } from '@/hooks';

export const WalletScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <View style={styles.content}>
        <Text variant="title1" color="primary" style={styles.title}>
          💳 Wallet
        </Text>

        <Card variant="elevated" style={styles.card}>
          <Text variant="title3" color="primary" style={styles.cardTitle}>
            Apple Wallet Clone
          </Text>
          <Text variant="body" color="secondary" style={styles.description}>
            Coming in Phase 7:
          </Text>
          <Text variant="callout" color="primary" style={styles.feature}>
            • Card stacking with depth
          </Text>
          <Text variant="callout" color="primary" style={styles.feature}>
            • Barcode scanning + regeneration
          </Text>
          <Text variant="callout" color="primary" style={styles.feature}>
            • 5-10 park-themed card designs
          </Text>
          <Text variant="callout" color="primary" style={styles.feature}>
            • High-res barcode recreation
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

export default WalletScreen;
