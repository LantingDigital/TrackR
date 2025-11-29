/**
 * Trading Card Game - Main Hub Screen
 * Central hub for collection, battle, and pack opening
 */

import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable, Alert, TouchableOpacity, Modal, Dimensions } from 'react-native';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { Text, Button, Card } from '@/components/base';
import { useTheme, useHaptic, HapticType } from '@/hooks';
import { CoasterCard, PlayerCollection, BATTLE_REWARDS } from './types';
import { CardDisplay } from './CardDisplay';
import { CardBattle } from './CardBattle';
import { CardCollection } from './CardCollection';
import { PackOpening } from './PackOpening';
import { getStarterCards, ALL_CARDS } from './cardData';
import { generateOpponentDeck } from './battleLogic';

interface TradingCardScreenProps {
  onClose: () => void;
}

type ScreenState = 'hub' | 'collection' | 'deck_builder' | 'battle' | 'pack_opening';

export const TradingCardScreen: React.FC<TradingCardScreenProps> = ({ onClose }) => {
  const theme = useTheme();
  const { trigger } = useHaptic();

  // Player state (in real app, this would come from context/storage)
  const [userCards, setUserCards] = useState<CoasterCard[]>(getStarterCards());
  const [coins, setCoins] = useState<number>(200); // Start with enough for 2 packs
  const [xp, setXp] = useState<number>(0);
  const [selectedDeck, setSelectedDeck] = useState<CoasterCard[]>([]);
  const [opponentDeck, setOpponentDeck] = useState<CoasterCard[]>([]);
  const [screenState, setScreenState] = useState<ScreenState>('hub');
  const [showExitModal, setShowExitModal] = useState(false);

  // Calculate stats
  const totalCards = ALL_CARDS.length;
  const ownedCount = userCards.length;
  const legendaryCount = userCards.filter(c => c.rarity === 'legendary').length;

  // Handle open collection
  const handleOpenCollection = () => {
    trigger(HapticType.LIGHT);
    setScreenState('collection');
  };

  // Handle start deck building
  const handleStartDeckBuilder = () => {
    trigger(HapticType.LIGHT);
    setScreenState('deck_builder');
  };

  // Handle buy pack
  const handleBuyPack = () => {
    if (coins < 100) {
      trigger(HapticType.ERROR);
      alert('Not enough coins! Win battles to earn more.');
      return;
    }

    trigger(HapticType.MEDIUM);
    setCoins(prev => prev - 100);
    setScreenState('pack_opening');
  };

  // Handle pack complete
  const handlePackComplete = (newCards: CoasterCard[]) => {
    trigger(HapticType.SUCCESS);
    // Add new cards to collection (avoid duplicates)
    const existingIds = new Set(userCards.map(c => c.id));
    const uniqueNewCards = newCards.filter(c => !existingIds.has(c.id));
    setUserCards(prev => [...prev, ...uniqueNewCards]);
    setScreenState('hub');
  };

  // Handle deck selection
  const handleDeckCardToggle = (card: CoasterCard) => {
    if (selectedDeck.some(c => c.id === card.id)) {
      // Remove from deck
      setSelectedDeck(prev => prev.filter(c => c.id !== card.id));
      trigger(HapticType.LIGHT);
    } else {
      // Add to deck (max 3)
      if (selectedDeck.length < 3) {
        setSelectedDeck(prev => [...prev, card]);
        trigger(HapticType.MEDIUM);
      } else {
        trigger(HapticType.ERROR);
      }
    }
  };

  // Handle start battle
  const handleStartBattle = () => {
    if (selectedDeck.length !== 3) {
      trigger(HapticType.ERROR);
      alert('Please select exactly 3 cards for your deck');
      return;
    }

    trigger(HapticType.HEAVY);
    const opponent = generateOpponentDeck(userCards, selectedDeck);
    setOpponentDeck(opponent);
    setScreenState('battle');
  };

  // Handle battle complete
  const handleBattleComplete = (
    winner: 'player' | 'opponent' | 'tie',
    rewards: typeof BATTLE_REWARDS.win
  ) => {
    trigger(HapticType.SUCCESS);
    setCoins(prev => prev + rewards.coins);
    setXp(prev => prev + rewards.xp);
    // Reset deck selection
    setSelectedDeck([]);
    setScreenState('hub');
  };

  // Handle exit button press (show modal)
  const handleExitPress = () => {
    trigger(HapticType.SELECTION);
    setShowExitModal(true);
  };

  // Handle confirmed exit
  const handleConfirmExit = () => {
    trigger(HapticType.SELECTION);
    setShowExitModal(false);
    setTimeout(() => onClose(), 0);
  };

  // Handle cancel exit
  const handleCancelExit = () => {
    trigger(HapticType.SELECTION);
    setShowExitModal(false);
  };

  // Render different screens
  if (screenState === 'collection') {
    return (
      <CardCollection
        userCards={userCards}
        onClose={() => setScreenState('hub')}
      />
    );
  }

  if (screenState === 'pack_opening') {
    return (
      <PackOpening
        onComplete={handlePackComplete}
        onClose={() => setScreenState('hub')}
      />
    );
  }

  if (screenState === 'battle') {
    return (
      <CardBattle
        playerDeck={selectedDeck}
        opponentDeck={opponentDeck}
        onBattleComplete={handleBattleComplete}
        onExit={() => setScreenState('hub')}
      />
    );
  }

  if (screenState === 'deck_builder') {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
        <View style={styles.header}>
          <Text variant="title1" color="primary" style={styles.title}>
            Build Your Deck
          </Text>
          <Text variant="headline" color="primary" style={styles.deckCounter}>
            {selectedDeck.length}/3 Cards Selected
          </Text>
          <Text variant="callout" color="secondary" style={styles.subtitle}>
            Tap cards below to add or remove them from your battle deck
          </Text>
        </View>

        {/* Selected Deck Preview */}
        <View style={styles.selectedDeck}>
          <Text variant="headline" color="primary" style={styles.sectionTitle}>
            Your Deck
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.deckPreview}
          >
            {selectedDeck.map((card, index) => (
              <Pressable
                key={`${card.id}-${index}`}
                onPress={() => handleDeckCardToggle(card)}
              >
                <CardDisplay card={card} scale={0.5} showStats={false} />
              </Pressable>
            ))}
            {/* Empty slots */}
            {Array.from({ length: 3 - selectedDeck.length }).map((_, i) => (
              <View
                key={`empty-${i}`}
                style={[
                  styles.emptySlot,
                  { backgroundColor: theme.colors.background.tertiary, borderColor: theme.colors.border.medium },
                ]}
              >
                <Text variant="headline" color="quaternary">
                  +
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Available Cards */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.availableCards}
        >
          <Text variant="headline" color="primary" style={styles.sectionTitle}>
            Your Collection
          </Text>
          <View style={styles.cardGrid}>
            {userCards.map(card => {
              const isSelected = selectedDeck.some(c => c.id === card.id);
              return (
                <Pressable
                  key={card.id}
                  onPress={() => handleDeckCardToggle(card)}
                >
                  <View
                    style={[
                      styles.cardWrapper,
                      isSelected && styles.cardWrapperSelected,
                      !isSelected && styles.cardWrapperUnselected,
                    ]}
                  >
                    <CardDisplay card={card} scale={0.5} showStats={false} />
                    {isSelected && (
                      <View style={styles.selectedBadge}>
                        <Text style={styles.selectedBadgeText}>✓</Text>
                      </View>
                    )}
                  </View>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Button
            title="Cancel"
            onPress={() => {
              setSelectedDeck([]);
              setScreenState('hub');
            }}
            variant="secondary"
            fullWidth
          />
          <Button
            title="Start Battle!"
            onPress={handleStartBattle}
            variant="primary"
            fullWidth
            disabled={selectedDeck.length !== 3}
          />
        </View>
      </View>
    );
  }

  // Hub Screen
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* Header */}
        <View
          style={[
            styles.header,
            { paddingHorizontal: theme.spacing.sm },
          ]}
        >
          <View style={styles.headerLeft}>
            <Text variant="title1">Trading Cards</Text>
          </View>
          <TouchableOpacity
            onPress={handleExitPress}
            style={[
              styles.exitButton,
              {
                borderColor: theme.colors.text.primary,
              },
            ]}
            accessibilityLabel="Exit game"
            accessibilityRole="button"
          >
            <Text
              variant="title3"
              style={{
                ...styles.exitIcon,
                lineHeight: 30,
                color: theme.colors.text.primary,
              }}
            >
              ✕
            </Text>
          </TouchableOpacity>
        </View>

        <Text variant="body" color="secondary" style={styles.subtitle}>
          Collect 50 famous coasters, build decks, and battle!
        </Text>

        {/* Player Stats */}
        <Card variant="elevated" style={styles.statsCard}>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={{ fontSize: 24, lineHeight: 30 }}>💰</Text>
              <Text variant="title2" color="primary">
                {coins}
              </Text>
              <Text variant="caption1" color="secondary">
                Coins
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={{ fontSize: 24, lineHeight: 30 }}>⭐</Text>
              <Text variant="title2" color="primary">
                {xp}
              </Text>
              <Text variant="caption1" color="secondary">
                XP
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={{ fontSize: 24, lineHeight: 30 }}>🎴</Text>
              <Text variant="title2" color="primary">
                {ownedCount}/{totalCards}
              </Text>
              <Text variant="caption1" color="secondary">
                Cards
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={{ fontSize: 24, lineHeight: 30 }}>✨</Text>
              <Text variant="title2" color="primary">
                {legendaryCount}
              </Text>
              <Text variant="caption1" color="secondary">
                Legendary
              </Text>
            </View>
          </View>
        </Card>

        {/* Quick Actions */}
        <View style={styles.actionsGrid}>
          <Card
            variant="elevated"
            onPress={handleStartDeckBuilder}
            style={styles.actionCard}
          >
            <Text style={{ fontSize: 40, lineHeight: 50 }}>⚔️</Text>
            <Text variant="headline" color="primary" style={styles.actionTitle}>
              Battle
            </Text>
            <Text variant="callout" color="secondary" style={styles.actionDesc}>
              Pick 3 cards & compete
            </Text>
          </Card>

          <Card
            variant="elevated"
            onPress={handleOpenCollection}
            style={styles.actionCard}
          >
            <Text style={{ fontSize: 40, lineHeight: 50 }}>📚</Text>
            <Text variant="headline" color="primary" style={styles.actionTitle}>
              Collection
            </Text>
            <Text variant="callout" color="secondary" style={styles.actionDesc}>
              View all {totalCards} cards
            </Text>
          </Card>

          <Card
            variant="elevated"
            onPress={handleBuyPack}
            style={{
              ...styles.actionCard,
              ...(coins < 100 && { opacity: 0.5 }),
            }}
          >
            <Text style={{ fontSize: 40, lineHeight: 50 }}>🎁</Text>
            <Text variant="headline" color="primary" style={styles.actionTitle}>
              Buy Pack
            </Text>
            <Text variant="callout" color="secondary" style={styles.actionDesc}>
              100 coins • 3 cards
            </Text>
          </Card>
        </View>

        {/* Featured Cards */}
        <View style={styles.featuredSection}>
          <Text variant="title3" color="primary" style={styles.sectionTitle}>
            Your Legendary Cards
          </Text>
          {legendaryCount > 0 ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featuredCards}
            >
              {userCards
                .filter(c => c.rarity === 'legendary')
                .map(card => (
                  <CardDisplay key={card.id} card={card} scale={0.65} />
                ))}
            </ScrollView>
          ) : (
            <Card variant="default" style={styles.emptyState}>
              <Text variant="body" color="tertiary" style={styles.emptyText}>
                No legendary cards yet. Keep opening packs!
              </Text>
            </Card>
          )}
        </View>

        {/* How to Play */}
        <Card variant="default" style={styles.infoCard}>
          <Text variant="headline" color="primary" style={styles.infoTitle}>
            How to Play
          </Text>
          <Text variant="callout" color="secondary" style={styles.infoText}>
            • Build a deck of 3 cards
          </Text>
          <Text variant="callout" color="secondary" style={styles.infoText}>
            • Battle in 3 rounds (Height, Speed, Intensity)
          </Text>
          <Text variant="callout" color="secondary" style={styles.infoText}>
            • Manufacturer perks boost your stats
          </Text>
          <Text variant="callout" color="secondary" style={styles.infoText}>
            • Win battles to earn coins and XP
          </Text>
          <Text variant="callout" color="secondary" style={styles.infoText}>
            • Collect all 50 famous coasters!
          </Text>
        </Card>
      </ScrollView>

      {/* Exit confirmation modal */}
      <Modal
        visible={showExitModal}
        transparent
        animationType="fade"
        onRequestClose={handleCancelExit}
      >
        <View style={styles.modalOverlay}>
          <Animated.View entering={SlideInDown.springify().damping(17).stiffness(135)}>
            <Card
              variant="elevated"
              style={[
                styles.exitModalCard,
                {
                  backgroundColor: theme.colors.background.primary,
                  borderRadius: theme.borderRadius.xl,
                  ...theme.shadows.xl,
                },
              ]}
            >
              {/* Warning emoji */}
              <Text
                style={{
                  fontSize: 48,
                  lineHeight: 60,
                  textAlign: 'center',
                  marginBottom: 16,
                }}
              >
                ⚠️
              </Text>

              {/* Title */}
              <Text
                variant="title2"
                style={[
                  styles.modalTitle,
                  {
                    color: theme.colors.text.primary,
                  },
                ]}
              >
                Exit Game?
              </Text>

              {/* Message */}
              <Text
                variant="body"
                color="secondary"
                style={styles.modalMessage}
              >
                Your progress will be lost. Are you sure you want to exit?
              </Text>

              {/* Buttons */}
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[
                    styles.modalButton,
                    styles.cancelButton,
                    {
                      backgroundColor: theme.colors.background.secondary,
                      borderRadius: theme.borderRadius.md,
                    },
                  ]}
                  onPress={handleCancelExit}
                  activeOpacity={0.8}
                >
                  <Text
                    variant="headline"
                    style={{
                      color: theme.colors.text.primary,
                      fontWeight: '600',
                    }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.modalButton,
                    styles.exitButtonConfirm,
                    {
                      backgroundColor: theme.colors.semantic.error,
                      borderRadius: theme.borderRadius.md,
                      ...theme.shadows.md,
                    },
                  ]}
                  onPress={handleConfirmExit}
                  activeOpacity={0.8}
                >
                  <Text
                    variant="headline"
                    style={{
                      color: '#FFFFFF',
                      fontWeight: '600',
                    }}
                  >
                    Exit Game
                  </Text>
                </TouchableOpacity>
              </View>
            </Card>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 24,
  },

  // Header
  header: {
    height: 64,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  exitButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  exitIcon: {
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  exitModalCard: {
    width: Math.min(Dimensions.get('window').width - 32, 400),
    padding: 24,
  },
  modalTitle: {
    textAlign: 'center',
    fontWeight: '700',
    marginBottom: 12,
  },
  modalMessage: {
    textAlign: 'center',
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  cancelButton: {
    // Styles applied inline
  },
  exitButtonConfirm: {
    // Styles applied inline
  },
  title: {
    fontWeight: '700',
  },
  deckCounter: {
    fontWeight: '700',
    textAlign: 'center',
    color: '#5B7C99',
  },
  subtitle: {
    textAlign: 'center',
  },

  // Stats Card
  statsCard: {
    padding: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 16,
  },
  statItem: {
    alignItems: 'center',
    gap: 4,
  },

  // Actions Grid
  actionsGrid: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  actionCard: {
    flex: 1,
    minWidth: 100,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  actionTitle: {
    fontWeight: '700',
    textAlign: 'center',
  },
  actionDesc: {
    textAlign: 'center',
  },

  // Featured Section
  featuredSection: {
    gap: 12,
  },
  sectionTitle: {
    fontWeight: '700',
  },
  featuredCards: {
    gap: 12,
    paddingRight: 16,
  },
  emptyState: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
  },

  // Info Card
  infoCard: {
    padding: 20,
    gap: 12,
  },
  infoTitle: {
    fontWeight: '700',
    marginBottom: 4,
  },
  infoText: {
    marginLeft: 8,
  },

  // Deck Builder
  selectedDeck: {
    padding: 16,
    gap: 12,
  },
  deckPreview: {
    gap: 12,
    paddingRight: 16,
  },
  emptySlot: {
    width: 140,
    height: 200,
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  availableCards: {
    padding: 16,
    gap: 12,
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'center',
  },
  cardWrapper: {
    position: 'relative',
  },
  cardWrapperSelected: {
    borderWidth: 4,
    borderColor: '#5B7C99',
    borderRadius: 16,
    padding: 0,
    shadowColor: '#5B7C99',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  cardWrapperUnselected: {
    opacity: 0.6,
  },
  selectedBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6B9B6B',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  selectedBadgeText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 30,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
  },
});

export default TradingCardScreen;
