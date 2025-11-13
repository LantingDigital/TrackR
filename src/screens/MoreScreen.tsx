/**
 * More Screen - TrackR
 * Menu for Wallet, Games Hub, Settings, and other features
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text, Card, Button } from '@/components/base';
import { useTheme, useHaptic, HapticType } from '@/hooks';
import { RootStackParamList } from '@/navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const MoreScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const { trigger } = useHaptic();

  const handleWalletPress = () => {
    trigger(HapticType.MEDIUM);
    navigation.navigate('Wallet');
  };

  const handleGamesPress = () => {
    trigger(HapticType.MEDIUM);
    navigation.navigate('GamesHub');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <View style={styles.content}>
        <Text variant="title1" color="primary" style={styles.title}>
          ⚙️ More
        </Text>

        {/* Main Actions */}
        <Card variant="elevated" style={styles.card}>
          <Text variant="title3" color="primary" style={styles.sectionTitle}>
            Features
          </Text>

          <Button
            title="💳 Wallet"
            onPress={handleWalletPress}
            variant="secondary"
            fullWidth
            accessibilityLabel="Open Wallet"
            accessibilityHint="View your park passes and tickets"
          />

          <View style={styles.buttonSpacer} />

          <Button
            title="🎮 Games Hub"
            onPress={handleGamesPress}
            variant="secondary"
            fullWidth
            accessibilityLabel="Open Games Hub"
            accessibilityHint="Play Coastle, Trivia, Cards, and Blackjack"
          />
        </Card>

        {/* Coming Soon */}
        <Card variant="default" style={styles.card}>
          <Text variant="title3" color="primary" style={styles.sectionTitle}>
            Coming Soon
          </Text>
          <Text variant="callout" color="secondary" style={styles.feature}>
            • Settings & Account
          </Text>
          <Text variant="callout" color="secondary" style={styles.feature}>
            • Privacy Controls
          </Text>
          <Text variant="callout" color="secondary" style={styles.feature}>
            • Help & Support
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
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  buttonSpacer: {
    height: 12,
  },
  feature: {
    marginTop: 8,
  },
});

export default MoreScreen;
