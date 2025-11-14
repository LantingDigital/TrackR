/**
 * CoastleGrid Component
 * 3x3 grid displaying coaster stat feedback
 * Renders 9 cells with sequential flip animations
 */

import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '@/hooks';
import { GridFeedback, GAME_CONSTANTS } from './types';
import { CoastleCell } from './CoastleCell';

interface CoastleGridProps {
  /** Feedback for all 9 cells (undefined if not yet guessed) */
  feedback?: GridFeedback[];

  /** Whether to show revealed state (triggers animation) */
  revealed: boolean;

  /** Container width (defaults to 90% of screen width) */
  containerWidth?: number;
}

export const CoastleGrid: React.FC<CoastleGridProps> = ({
  feedback,
  revealed,
  containerWidth,
}) => {
  const theme = useTheme();
  const screenWidth = Dimensions.get('window').width;

  // Calculate grid content width
  // Screen width - horizontal padding (16px each side)
  const horizontalPadding = theme.spacing.sm * 2; // 16 * 2 = 32px
  const availableWidth = containerWidth || (screenWidth - horizontalPadding);

  // Grid internal padding (16px inside the grid container)
  const gridPadding = theme.spacing.sm; // 16px

  // Calculate cell size
  // Available width - grid padding (both sides) - gaps between cells (12px * 2)
  const gap = 12; // 12px between cells (follows 8px grid)
  const contentWidth = availableWidth - (gridPadding * 2);
  const cellSize = (contentWidth - (gap * 2)) / 3;

  // Render cells in 3x3 layout
  const renderGrid = () => {
    const rows = [];

    for (let row = 0; row < 3; row++) {
      const cells = [];

      for (let col = 0; col < 3; col++) {
        const index = row * 3 + col;
        const cellFeedback = feedback?.[index];

        // Calculate stagger delay (left to right, top to bottom)
        const animationDelay = index * GAME_CONSTANTS.CELL_ANIMATION_STAGGER;

        cells.push(
          <CoastleCell
            key={index}
            feedback={cellFeedback}
            revealed={revealed}
            animationDelay={animationDelay}
            size={cellSize}
          />
        );
      }

      rows.push(
        <View key={row} style={[styles.row, { gap }]}>
          {cells}
        </View>
      );
    }

    return rows;
  };

  return (
    <View
      style={[
        styles.container,
        {
          width: availableWidth,
          backgroundColor: theme.colors.background.secondary,
          borderRadius: theme.borderRadius.lg,
          padding: gridPadding,
          gap,
          ...theme.shadows.md,
        },
      ]}
      accessibilityLabel="Coastle game grid"
    >
      {renderGrid()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
  },
});

export default CoastleGrid;
