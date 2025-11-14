/**
 * Trading Card Game - Card Display Component
 * Beautiful card with rarity-based visual effects
 * THE signature component - must look absolutely stunning
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Text } from '@/components/base';
import { useTheme, useReducedMotion } from '@/hooks';
import { CoasterCard, CARD_CONFIG } from './types';
import {
  CardEffects,
  getRarityBorderColor,
  getRarityBorderWidth,
} from './cardEffects';
import { getStatBarColor } from './battleLogic';

interface CardDisplayProps {
  card: CoasterCard;
  onPress?: () => void;
  scale?: number;
  style?: ViewStyle;
  showStats?: boolean;
  isFlipped?: boolean;
}

/**
 * StatBar Component
 * Visual stat bar with filled portion (out of 10)
 */
const StatBar: React.FC<{
  label: string;
  value: number;
  color: string;
}> = ({ label, value, color }) => {
  const theme = useTheme();

  return (
    <View style={styles.statBarContainer}>
      <View style={styles.statBarHeader}>
        <Text
          variant="callout"
          color="primary"
          style={styles.statLabel}
        >
          {label.toUpperCase()}:
        </Text>
        <Text
          variant="callout"
          color="primary"
          style={styles.statValue}
        >
          {value}
        </Text>
      </View>
      <View style={[styles.statBarTrack, { backgroundColor: theme.colors.background.tertiary }]}>
        <View
          style={[
            styles.statBarFill,
            {
              width: `${(value / 10) * 100}%`,
              backgroundColor: color,
            },
          ]}
        />
      </View>
    </View>
  );
};

/**
 * CardDisplay Component
 * Main card display with all visual effects
 */
export const CardDisplay: React.FC<CardDisplayProps> = ({
  card,
  onPress,
  scale = 1,
  style,
  showStats = true,
  isFlipped = false,
}) => {
  const theme = useTheme();
  const reducedMotion = useReducedMotion();
  const scaleValue = useSharedValue(scale);

  const handlePressIn = () => {
    if (onPress && !reducedMotion) {
      scaleValue.value = withSpring(scale * 0.95, theme.springs.snappy);
    }
  };

  const handlePressOut = () => {
    if (onPress && !reducedMotion) {
      scaleValue.value = withSpring(scale, theme.springs.snappy);
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleValue.value }],
  }));

  const borderColor = getRarityBorderColor(card.rarity);
  const borderWidth = getRarityBorderWidth(card.rarity);

  // Card back (when flipped)
  if (isFlipped) {
    return (
      <Animated.View
        style={[
          styles.cardContainer,
          {
            width: CARD_CONFIG.width * scale,
            height: CARD_CONFIG.height * scale,
            borderRadius: CARD_CONFIG.borderRadius,
            borderColor,
            borderWidth,
            backgroundColor: theme.colors.background.secondary,
          },
          animatedStyle,
          style,
        ]}
      >
        <View style={styles.cardBack}>
          <Text variant="title1" color="primary" style={styles.cardBackText}>
            🎢
          </Text>
          <Text variant="headline" color="secondary" style={styles.cardBackLabel}>
            TrackR
          </Text>
        </View>
      </Animated.View>
    );
  }

  // Locked card
  if (!card.isUnlocked) {
    return (
      <Animated.View
        style={[
          styles.cardContainer,
          {
            width: CARD_CONFIG.width * scale,
            height: CARD_CONFIG.height * scale,
            borderRadius: CARD_CONFIG.borderRadius,
            borderColor: theme.colors.border.medium,
            borderWidth: 2,
            backgroundColor: theme.colors.background.tertiary,
          },
          animatedStyle,
          style,
        ]}
      >
        <View style={styles.lockedCard}>
          <Text variant="display" style={{ fontSize: 64, lineHeight: 80 }}>
            🔒
          </Text>
          <Text variant="headline" color="tertiary" style={styles.lockedText}>
            Locked
          </Text>
          <Text variant="callout" color="quaternary" style={styles.lockedSubtext}>
            {card.name}
          </Text>
        </View>
      </Animated.View>
    );
  }

  // Full card display
  return (
    <Animated.View
      style={[
        styles.cardContainer,
        {
          width: CARD_CONFIG.width * scale,
          height: CARD_CONFIG.height * scale,
        },
        animatedStyle,
        style,
      ]}
      onTouchStart={onPress ? handlePressIn : undefined}
      onTouchEnd={onPress ? handlePressOut : undefined}
    >
      {/* Rarity Effects */}
      <CardEffects rarity={card.rarity} />

      {/* Card Body */}
      <View
        style={[
          styles.cardBody,
          {
            borderRadius: CARD_CONFIG.borderRadius,
            borderColor,
            borderWidth,
            backgroundColor: theme.colors.background.secondary,
            ...theme.shadows.md,
          },
        ]}
      >
        {/* Image Section (Top 50%) */}
        <View
          style={[
            styles.imageSection,
            {
              borderTopLeftRadius: CARD_CONFIG.borderRadius - borderWidth,
              borderTopRightRadius: CARD_CONFIG.borderRadius - borderWidth,
              backgroundColor: theme.colors.background.tertiary,
            },
          ]}
        >
          {card.imageUrl ? (
            <View style={styles.imagePlaceholder}>
              <Text variant="caption1" color="tertiary">
                [Image: {card.name}]
              </Text>
            </View>
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text style={{ fontSize: 64, lineHeight: 80 }}>🎢</Text>
            </View>
          )}
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          {/* Name - PROMINENT DISPLAY */}
          <Text
            variant="headline"
            color="primary"
            style={styles.coasterName}
            numberOfLines={2}
          >
            {card.name}
          </Text>

          {/* Park & Type with Rating Badge */}
          <View style={styles.parkRow}>
            <Text
              variant="subheadline"
              color="secondary"
              style={styles.parkInfo}
              numberOfLines={1}
            >
              {card.park} • {card.type.charAt(0).toUpperCase() + card.type.slice(1)}
            </Text>
            <View style={[styles.ratingBadge, { backgroundColor: borderColor }]}>
              <Text variant="callout" style={styles.ratingText}>
                {Math.round((card.stats.height + card.stats.speed + card.stats.intensity) / 3)}
              </Text>
            </View>
          </View>

          {/* Stats */}
          {showStats && (
            <View style={styles.statsSection}>
              <StatBar
                label="Height"
                value={card.stats.height}
                color={getStatBarColor('height')}
              />
              <StatBar
                label="Speed"
                value={card.stats.speed}
                color={getStatBarColor('speed')}
              />
              <StatBar
                label="Intensity"
                value={card.stats.intensity}
                color={getStatBarColor('intensity')}
              />
            </View>
          )}

          {/* Manufacturer Perk */}
          <View style={[styles.perkSection, { backgroundColor: theme.colors.background.tertiary }]}>
            <Text style={{ fontSize: 16, lineHeight: 20 }}>{card.perk.icon}</Text>
            <View style={styles.perkTextContainer}>
              <Text variant="caption1" color="primary" style={styles.perkName}>
                [{card.manufacturer.toUpperCase()}] {card.perk.name}
              </Text>
              <Text variant="caption2" color="secondary" style={styles.perkDescription}>
                {card.perk.description}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    position: 'relative',
  },
  cardBody: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },

  // Image Section
  imageSection: {
    height: CARD_CONFIG.imageHeight,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Info Section
  infoSection: {
    flex: 1,
    padding: 12,
    gap: 4,
  },
  coasterName: {
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
  },
  parkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  parkInfo: {
    flex: 1,
  },
  ratingBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  ratingText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },

  // Stats Section
  statsSection: {
    gap: 6,
    marginTop: 4,
  },
  statBarContainer: {
    gap: 4,
  },
  statBarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  statValue: {
    fontSize: 12,
    fontWeight: '700',
  },
  statBarTrack: {
    width: '100%',
    height: 16,
    borderRadius: 4,
    overflow: 'hidden',
  },
  statBarFill: {
    height: '100%',
    borderRadius: 4,
  },

  // Perk Section
  perkSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 8,
    borderRadius: 8,
    marginTop: 4,
  },
  perkTextContainer: {
    flex: 1,
    gap: 2,
  },
  perkName: {
    fontWeight: '700',
    fontSize: 10,
  },
  perkDescription: {
    fontSize: 9,
    lineHeight: 11,
  },

  // Card Back
  cardBack: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  cardBackText: {
    fontSize: 80,
    lineHeight: 100,
  },
  cardBackLabel: {
    fontWeight: '700',
  },

  // Locked Card
  lockedCard: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  lockedText: {
    fontWeight: '700',
  },
  lockedSubtext: {
    textAlign: 'center',
    paddingHorizontal: 16,
  },
});

export default CardDisplay;
