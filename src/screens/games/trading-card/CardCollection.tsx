/**
 * Trading Card Game - Card Collection Screen
 * Grid view of all 50 cards with filtering
 */

import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Text, Button } from '@/components/base';
import { useTheme, useHaptic, HapticType } from '@/hooks';
import { CoasterCard, CardRarity } from './types';
import { CardDisplay } from './CardDisplay';
import { ALL_CARDS } from './cardData';

interface CardCollectionProps {
  userCards: CoasterCard[];
  onCardPress?: (card: CoasterCard) => void;
  onClose: () => void;
}

type FilterType = 'all' | CardRarity | 'owned' | 'locked';

export const CardCollection: React.FC<CardCollectionProps> = ({
  userCards,
  onCardPress,
  onClose,
}) => {
  const theme = useTheme();
  const { trigger } = useHaptic();
  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedCard, setSelectedCard] = useState<CoasterCard | null>(null);

  // Create a map of owned card IDs
  const ownedCardIds = new Set(userCards.map(card => card.id));

  // Apply filter
  const filteredCards = ALL_CARDS.filter(card => {
    switch (filter) {
      case 'all':
        return true;
      case 'owned':
        return ownedCardIds.has(card.id);
      case 'locked':
        return !ownedCardIds.has(card.id);
      case 'common':
      case 'rare':
      case 'epic':
      case 'legendary':
        return card.rarity === filter;
      default:
        return true;
    }
  });

  // Calculate collection stats
  const totalCards = ALL_CARDS.length;
  const ownedCount = userCards.length;
  const legendaryCount = userCards.filter(c => c.rarity === 'legendary').length;
  const totalLegendaries = ALL_CARDS.filter(c => c.rarity === 'legendary').length;

  const handleCardPress = (card: CoasterCard) => {
    if (ownedCardIds.has(card.id)) {
      trigger(HapticType.LIGHT);
      setSelectedCard(card);
      onCardPress?.(card);
    }
  };

  const handleFilterChange = (newFilter: FilterType) => {
    trigger(HapticType.SELECTION);
    setFilter(newFilter);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text variant="title1" color="primary" style={styles.title}>
            Card Collection
          </Text>
          <Button
            title="✕"
            onPress={onClose}
            variant="ghost"
            size="small"
          />
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text variant="title2" color="primary">
              {ownedCount}/{totalCards}
            </Text>
            <Text variant="caption1" color="secondary">
              Total Cards
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text variant="title2" color="primary">
              {legendaryCount}/{totalLegendaries}
            </Text>
            <Text variant="caption1" color="secondary">
              Legendaries
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text variant="title2" color="primary">
              {Math.round((ownedCount / totalCards) * 100)}%
            </Text>
            <Text variant="caption1" color="secondary">
              Complete
            </Text>
          </View>
        </View>

        {/* Filter Buttons */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          <FilterButton
            label="All"
            active={filter === 'all'}
            onPress={() => handleFilterChange('all')}
            theme={theme}
          />
          <FilterButton
            label="Owned"
            active={filter === 'owned'}
            onPress={() => handleFilterChange('owned')}
            theme={theme}
          />
          <FilterButton
            label="Locked"
            active={filter === 'locked'}
            onPress={() => handleFilterChange('locked')}
            theme={theme}
          />
          <FilterButton
            label="Common"
            active={filter === 'common'}
            onPress={() => handleFilterChange('common')}
            theme={theme}
          />
          <FilterButton
            label="Rare"
            active={filter === 'rare'}
            onPress={() => handleFilterChange('rare')}
            theme={theme}
          />
          <FilterButton
            label="Epic"
            active={filter === 'epic'}
            onPress={() => handleFilterChange('epic')}
            theme={theme}
          />
          <FilterButton
            label="Legendary"
            active={filter === 'legendary'}
            onPress={() => handleFilterChange('legendary')}
            theme={theme}
          />
        </ScrollView>
      </View>

      {/* Card Grid */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.gridContainer}
      >
        {filteredCards.map(card => (
          <Pressable
            key={card.id}
            onPress={() => handleCardPress(card)}
            style={styles.cardItem}
          >
            <CardDisplay
              card={{ ...card, isUnlocked: ownedCardIds.has(card.id) }}
              scale={0.5}
              showStats={false}
            />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

/**
 * Filter Button Component
 */
const FilterButton: React.FC<{
  label: string;
  active: boolean;
  onPress: () => void;
  theme: ReturnType<typeof useTheme>;
}> = ({ label, active, onPress, theme }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.filterButton,
        {
          backgroundColor: active
            ? theme.colors.primary.blue
            : theme.colors.background.secondary,
          borderColor: active
            ? theme.colors.primary.blue
            : theme.colors.border.medium,
        },
      ]}
    >
      <Text
        variant="callout"
        style={{
          color: active ? '#FFFFFF' : theme.colors.text.primary,
          fontWeight: active ? '600' : '400',
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // Header
  header: {
    padding: 16,
    gap: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: '700',
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 16,
  },
  statItem: {
    alignItems: 'center',
    gap: 4,
  },

  // Filter Buttons
  filterScroll: {
    gap: 8,
    paddingRight: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 2,
  },

  // Card Grid
  scrollView: {
    flex: 1,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
    gap: 16,
    justifyContent: 'center',
  },
  cardItem: {
    // Card width at 0.5 scale = 140px
    // Add margin for spacing
  },
});

export default CardCollection;
