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
    <View
      style={[
        styles.widget,
        {
          backgroundColor: color + '30',
        },
      ]}
    >
      <Text style={{ fontSize: 28, lineHeight: 36 }}>{icon}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  widget: {
    flex: 1,
    aspectRatio: 16 / 9,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QuickActionWidget;
