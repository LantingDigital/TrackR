/**
 * TrackR - Premium Roller Coaster Companion App
 * Design System Showcase & Entry Point
 */

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView, SafeAreaView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Button, Card, Text } from './src/components/base';
import { useTheme } from './src/hooks';

export default function App() {
  const theme = useTheme();

  const handleButtonPress = () => {
    console.log('Button pressed! (Check haptic feedback)');
  };

  return (
    <GestureHandlerRootView style={styles.gestureContainer}>
      <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background.primary }]}>
        <StatusBar style="auto" />
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text variant="display" color="primary">
              🎢 TrackR
            </Text>
            <Text variant="body" color="secondary" style={styles.subtitle}>
              Premium Roller Coaster Companion
            </Text>
          </View>

          {/* Design System Showcase */}
          <Card variant="elevated" style={styles.section}>
            <Text variant="title2" color="primary" style={styles.sectionTitle}>
              Design System Ready
            </Text>
            <Text variant="body" color="secondary" style={styles.paragraph}>
              Complete design system implementation following Apple's Human Interface Guidelines.
            </Text>

            <View style={styles.featureList}>
              <Text variant="callout" color="primary">
                ✅ Desaturated color palette
              </Text>
              <Text variant="callout" color="primary">
                ✅ iOS-inspired typography
              </Text>
              <Text variant="callout" color="primary">
                ✅ Spring-based animations
              </Text>
              <Text variant="callout" color="primary">
                ✅ Haptic feedback system
              </Text>
              <Text variant="callout" color="primary">
                ✅ Accessibility support
              </Text>
            </View>
          </Card>

          {/* Button Showcase */}
          <Card variant="default" style={styles.section}>
            <Text variant="title3" color="primary" style={styles.sectionTitle}>
              Interactive Components
            </Text>
            <Text variant="footnote" color="tertiary" style={styles.hint}>
              Tap buttons to feel haptic feedback
            </Text>

            <View style={styles.buttonGroup}>
              <Button
                title="Primary Button"
                onPress={handleButtonPress}
                variant="primary"
                fullWidth
              />
              <Button
                title="Secondary Button"
                onPress={handleButtonPress}
                variant="secondary"
                fullWidth
              />
              <Button
                title="Ghost Button"
                onPress={handleButtonPress}
                variant="ghost"
                fullWidth
              />
            </View>
          </Card>

          {/* Typography Showcase */}
          <Card variant="flat" style={styles.section}>
            <Text variant="title3" color="primary" style={styles.sectionTitle}>
              Typography Scale
            </Text>
            <Text variant="display" color="primary">
              Display Text
            </Text>
            <Text variant="title1" color="secondary">
              Title 1 - Large Titles
            </Text>
            <Text variant="title2" color="secondary">
              Title 2 - Section Headers
            </Text>
            <Text variant="headline" color="primary">
              Headline - Emphasized Body
            </Text>
            <Text variant="body" color="secondary">
              Body - Standard paragraph text with comfortable line height.
            </Text>
            <Text variant="caption1" color="tertiary">
              Caption 1 - Small metadata text
            </Text>
          </Card>

          {/* Cards Showcase */}
          <Text variant="title3" color="primary" style={[styles.sectionTitle, styles.marginTop]}>
            Card Variants
          </Text>

          <Card variant="elevated" onPress={handleButtonPress}>
            <Text variant="headline" color="primary">
              Elevated Card (Pressable)
            </Text>
            <Text variant="body" color="secondary" style={styles.paragraph}>
              Press me to feel the spring animation and haptic feedback!
            </Text>
          </Card>

          <Card variant="default" style={styles.marginTop}>
            <Text variant="headline" color="primary">
              Default Card (Static)
            </Text>
            <Text variant="body" color="secondary" style={styles.paragraph}>
              Standard elevation for most content containers.
            </Text>
          </Card>

          <Card variant="flat" style={styles.marginTop}>
            <Text variant="headline" color="primary">
              Flat Card (Subtle)
            </Text>
            <Text variant="body" color="secondary" style={styles.paragraph}>
              Minimal shadow for nested content.
            </Text>
          </Card>

          {/* Status */}
          <View style={styles.footer}>
            <Text variant="caption1" color="tertiary" style={styles.centered}>
              Foundation Phase Complete ✅
            </Text>
            <Text variant="caption2" color="quaternary" style={styles.centered}>
              Next: Navigation, Homescreen, Logger, Games
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  gestureContainer: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  subtitle: {
    marginTop: 8,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  paragraph: {
    marginBottom: 12,
  },
  featureList: {
    gap: 8,
    marginTop: 8,
  },
  hint: {
    marginBottom: 16,
    fontStyle: 'italic',
  },
  buttonGroup: {
    gap: 12,
  },
  marginTop: {
    marginTop: 16,
  },
  footer: {
    marginTop: 32,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#E8E7E5',
  },
  centered: {
    textAlign: 'center',
    marginBottom: 4,
  },
});
