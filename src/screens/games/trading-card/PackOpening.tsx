/**
 * Trading Card Game - Pack Opening Animation
 * Exciting card pack opening with spring physics and staggered reveals
 */

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  withDelay,
  runOnJS,
} from 'react-native-reanimated';
import { Text, Button } from '@/components/base';
import { useTheme, useHaptic, HapticType, useReducedMotion } from '@/hooks';
import { CoasterCard, CardRarity, RARITY_ODDS } from './types';
import { CardDisplay } from './CardDisplay';
import { ALL_CARDS, getCardsByRarity } from './cardData';

interface PackOpeningProps {
  onComplete: (newCards: CoasterCard[]) => void;
  onClose: () => void;
}

type PackState = 'sealed' | 'opening' | 'revealing' | 'complete';

const CARDS_PER_PACK = 3;

/**
 * Roll a random rarity based on drop rates
 */
const rollRarity = (): CardRarity => {
  const roll = Math.random();

  if (roll < RARITY_ODDS.common) return 'common';
  if (roll < RARITY_ODDS.common + RARITY_ODDS.rare) return 'rare';
  if (roll < RARITY_ODDS.common + RARITY_ODDS.rare + RARITY_ODDS.epic) return 'epic';
  return 'legendary';
};

/**
 * Generate random cards for pack
 */
const generatePackCards = (): CoasterCard[] => {
  const cards: CoasterCard[] = [];

  for (let i = 0; i < CARDS_PER_PACK; i++) {
    const rarity = rollRarity();
    const cardsOfRarity = getCardsByRarity(rarity);
    const randomCard = cardsOfRarity[Math.floor(Math.random() * cardsOfRarity.length)];
    cards.push({ ...randomCard, isUnlocked: true });
  }

  return cards;
};

/**
 * Animated Card Component
 */
const AnimatedCard: React.FC<{
  card: CoasterCard;
  index: number;
  onPress: () => void;
}> = ({ card, index, onPress }) => {
  const reducedMotion = useReducedMotion();
  const scale = useSharedValue(0);
  const translateY = useSharedValue(50);
  const rotation = useSharedValue((Math.random() - 0.5) * 30);
  const translateX = useSharedValue((index - 1) * 120);

  useEffect(() => {
    if (reducedMotion) {
      scale.value = 1;
      translateY.value = 0;
      rotation.value = 0;
      return;
    }

    // Stagger animation based on index
    const delay = index * 200;

    scale.value = withDelay(
      delay,
      withSpring(1, {
        damping: 10,
        stiffness: 200,
        mass: 0.8,
      })
    );

    translateY.value = withDelay(
      delay,
      withSpring(0, {
        damping: 12,
        stiffness: 180,
        mass: 0.8,
      })
    );
  }, [reducedMotion, index, scale, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
      { rotate: `${rotation.value}deg` },
    ],
  }));

  return (
    <Animated.View style={[styles.animatedCard, animatedStyle]}>
      <Pressable onPress={onPress}>
        <CardDisplay card={card} scale={0.75} />
      </Pressable>
    </Animated.View>
  );
};

/**
 * Pack Opening Screen
 */
export const PackOpening: React.FC<PackOpeningProps> = ({ onComplete, onClose }) => {
  const theme = useTheme();
  const { trigger } = useHaptic();
  const reducedMotion = useReducedMotion();

  const [packState, setPackState] = useState<PackState>('sealed');
  const [cards, setCards] = useState<CoasterCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<CoasterCard | null>(null);

  const packScale = useSharedValue(1);
  const packRotation = useSharedValue(0);
  const packOpacity = useSharedValue(1);

  // Handle pack tap (open pack)
  const handlePackTap = () => {
    if (packState !== 'sealed') return;

    trigger(HapticType.HEAVY);
    setPackState('opening');

    if (reducedMotion) {
      // Skip animation
      const newCards = generatePackCards();
      setCards(newCards);
      setPackState('revealing');
      return;
    }

    // Pack opening animation
    packScale.value = withSequence(
      withSpring(1.2, { damping: 10, stiffness: 200 }),
      withSpring(0.8, { damping: 8, stiffness: 250 })
    );

    packRotation.value = withSequence(
      withTiming(15, { duration: 200 }),
      withTiming(-15, { duration: 200 }),
      withTiming(0, { duration: 200 })
    );

    packOpacity.value = withTiming(0, { duration: 400 }, () => {
      // Generate cards after pack disappears
      runOnJS(setPackState)('revealing');
      const newCards = generatePackCards();
      runOnJS(setCards)(newCards);

      // Check for legendary
      const hasLegendary = newCards.some(c => c.rarity === 'legendary');
      if (hasLegendary) {
        runOnJS(trigger)(HapticType.SUCCESS);
      }
    });
  };

  // Handle card tap (enlarge)
  const handleCardTap = (card: CoasterCard) => {
    trigger(HapticType.LIGHT);
    setSelectedCard(card);
  };

  // Handle complete
  const handleComplete = () => {
    trigger(HapticType.MEDIUM);
    onComplete(cards);
  };

  const packAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: packScale.value },
      { rotate: `${packRotation.value}deg` },
    ],
    opacity: packOpacity.value,
  }));

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      {/* Sealed Pack */}
      {packState === 'sealed' && (
        <View style={styles.packContainer}>
          <Text variant="title1" color="primary" style={styles.title}>
            Card Pack
          </Text>
          <Text variant="body" color="secondary" style={styles.subtitle}>
            Tap to open
          </Text>
          <Pressable onPress={handlePackTap}>
            <Animated.View
              style={[
                styles.pack,
                {
                  backgroundColor: theme.colors.background.secondary,
                  ...theme.shadows.lg,
                },
                packAnimatedStyle,
              ]}
            >
              <Text style={{ fontSize: 80, lineHeight: 100 }}>🎴</Text>
              <Text variant="headline" color="primary" style={styles.packLabel}>
                3 Cards
              </Text>
            </Animated.View>
          </Pressable>
          <Button
            title="Cancel"
            onPress={onClose}
            variant="ghost"
          />
        </View>
      )}

      {/* Opening Animation */}
      {packState === 'opening' && (
        <View style={styles.packContainer}>
          <Animated.View
            style={[
              styles.pack,
              {
                backgroundColor: theme.colors.background.secondary,
                ...theme.shadows.lg,
              },
              packAnimatedStyle,
            ]}
          >
            <Text style={{ fontSize: 80, lineHeight: 100 }}>🎴</Text>
          </Animated.View>
        </View>
      )}

      {/* Cards Revealing */}
      {packState === 'revealing' && (
        <View style={styles.revealContainer}>
          <Text variant="title1" color="primary" style={styles.title}>
            Your Cards!
          </Text>
          <View style={styles.cardsRow}>
            {cards.map((card, index) => (
              <AnimatedCard
                key={`${card.id}-${index}`}
                card={card}
                index={index}
                onPress={() => handleCardTap(card)}
              />
            ))}
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Add to Collection"
              onPress={handleComplete}
              variant="primary"
              fullWidth
              size="large"
            />
          </View>
        </View>
      )}

      {/* Selected Card Modal */}
      {selectedCard && (
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setSelectedCard(null)}
        >
          <View style={styles.modalContent}>
            <CardDisplay card={selectedCard} scale={1} />
            <Button
              title="Close"
              onPress={() => setSelectedCard(null)}
              variant="secondary"
            />
          </View>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // Pack Container
  packContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
    padding: 16,
  },
  pack: {
    width: 240,
    height: 340,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  packLabel: {
    fontWeight: '700',
  },
  title: {
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },

  // Reveal Container
  revealContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 32,
    padding: 16,
  },
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    flexWrap: 'wrap',
  },
  animatedCard: {
    margin: 8,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 400,
  },

  // Modal
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    gap: 16,
    alignItems: 'center',
  },
});

export default PackOpening;
