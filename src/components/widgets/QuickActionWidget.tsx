/**
 * Quick Action Widget - TrackR
 * Rectangular action widgets for the 2×2 homescreen grid
 * Landscape orientation (16:9 aspect ratio)
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@/components/base';
import { Widget } from './Widget';
import { useTheme } from '@/hooks';

export interface QuickActionWidgetProps {
  title: string;
  icon: string; // Emoji placeholder for now, will be replaced with proper icons
  color: string; // Accent color from theme
  onPress: () => void;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

export const QuickActionWidget: React.FC<QuickActionWidgetProps> = ({
  title,
  icon,
  color,
  onPress,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const theme = useTheme();

  return (
    <Widget
      onPress={onPress}
      aspectRatio={16 / 9}
      style={styles.widget}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={accessibilityHint}
    >
      <View style={styles.content}>
        <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
          <Text style={{ fontSize: 20, color }}>{icon}</Text>
        </View>
        <Text variant="callout" color="primary" style={styles.title}>
          {title}
        </Text>
      </View>
    </Widget>
  );
};

const styles = StyleSheet.create({
  widget: {
    width: '48%', // Two columns with gap
    padding: 12,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  content: {
    width: '100%',
    gap: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: '600',
  },
});

export default QuickActionWidget;
