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
      style={styles.widget}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={accessibilityHint}
    >
      <View style={styles.content}>
        <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
          <Text style={{ fontSize: 40, color }}>{icon}</Text>
        </View>
        <Text variant="title3" color="primary" style={styles.title}>
          {title}
        </Text>
      </View>
    </Widget>
  );
};

const styles = StyleSheet.create({
  widget: {
    flex: 1,
    minHeight: 120,
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  content: {
    width: '100%',
    flex: 1,
    gap: 16,
    justifyContent: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: '700',
  },
});

export default QuickActionWidget;
