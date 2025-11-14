/**
 * Trading Card Game - Card Battle Screen
 * 3-round battle system with simultaneous reveals
 */

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button } from '@/components/base';
import { useTheme, useHaptic, HapticType } from '@/hooks';
import { CoasterCard, BattleRound, StatType, BATTLE_REWARDS } from './types';
import { CardDisplay } from './CardDisplay';
import { playBattle, determineBattleWinner, getStatDisplayName } from './battleLogic';

interface CardBattleProps {
  playerDeck: CoasterCard[];
  opponentDeck: CoasterCard[];
  onBattleComplete: (winner: 'player' | 'opponent' | 'tie', rewards: typeof BATTLE_REWARDS.win) => void;
  onExit: () => void;
}

type BattlePhase = 'ready' | 'revealing' | 'round_result' | 'battle_complete';

export const CardBattle: React.FC<CardBattleProps> = ({
  playerDeck,
  opponentDeck,
  onBattleComplete,
  onExit,
}) => {
  const theme = useTheme();
  const { trigger } = useHaptic();

  const [rounds, setRounds] = useState<BattleRound[]>([]);
  const [currentRound, setCurrentRound] = useState<number>(0);
  const [phase, setPhase] = useState<BattlePhase>('ready');
  const [playerScore, setPlayerScore] = useState<number>(0);
  const [opponentScore, setOpponentScore] = useState<number>(0);
  const [showOpponentCard, setShowOpponentCard] = useState<boolean>(false);

  // Initialize battle
  useEffect(() => {
    const battleRounds = playBattle(playerDeck, opponentDeck);
    setRounds(battleRounds);
  }, [playerDeck, opponentDeck]);

  // Handle reveal button press
  const handleReveal = () => {
    if (phase !== 'ready') return;

    trigger(HapticType.MEDIUM);
    setPhase('revealing');
    setShowOpponentCard(true);

    // Show result after animation
    setTimeout(() => {
      setPhase('round_result');

      const round = rounds[currentRound];
      if (round.winner === 'player') {
        setPlayerScore(prev => prev + 1);
        trigger(HapticType.SUCCESS);
      } else if (round.winner === 'opponent') {
        setOpponentScore(prev => prev + 1);
        trigger(HapticType.ERROR);
      } else {
        trigger(HapticType.LIGHT);
      }
    }, 800);
  };

  // Handle next round
  const handleNextRound = () => {
    if (currentRound < 2) {
      setCurrentRound(prev => prev + 1);
      setPhase('ready');
      setShowOpponentCard(false);
      trigger(HapticType.LIGHT);
    } else {
      // Battle complete
      setPhase('battle_complete');
      const winner = determineBattleWinner(rounds);
      trigger(winner === 'player' ? HapticType.SUCCESS : HapticType.ERROR);
    }
  };

  // Handle battle complete
  const handleComplete = () => {
    const winner = determineBattleWinner(rounds);
    const rewards = winner === 'player' ? BATTLE_REWARDS.win : BATTLE_REWARDS.loss;
    onBattleComplete(winner, rewards);
  };

  if (rounds.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
        <Text variant="headline" color="primary">
          Preparing battle...
        </Text>
      </View>
    );
  }

  const round = rounds[currentRound];
  const statName = getStatDisplayName(round.statCompared);

  // Battle Complete Screen
  if (phase === 'battle_complete') {
    const winner = determineBattleWinner(rounds);
    const isPlayerWinner = winner === 'player';
    const rewards = isPlayerWinner ? BATTLE_REWARDS.win : BATTLE_REWARDS.loss;

    return (
      <ScrollView
        style={[styles.container, { backgroundColor: theme.colors.background.primary }]}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.resultContainer}>
          <Text variant="display" style={{ fontSize: 48, lineHeight: 60 }}>
            {isPlayerWinner ? '🎉' : '😔'}
          </Text>
          <Text variant="title1" color="primary" style={styles.resultTitle}>
            {isPlayerWinner ? 'VICTORY!' : winner === 'tie' ? 'TIE!' : 'DEFEAT'}
          </Text>
          <Text variant="title2" color="secondary" style={styles.resultScore}>
            You Won {playerScore} - {opponentScore}
          </Text>

          {/* Rewards */}
          <View style={[styles.rewardsCard, { backgroundColor: theme.colors.background.secondary, ...theme.shadows.md }]}>
            <Text variant="headline" color="primary" style={styles.rewardsTitle}>
              Rewards
            </Text>
            <View style={styles.rewardsRow}>
              <View style={styles.rewardItem}>
                <Text style={{ fontSize: 32, lineHeight: 40 }}>💰</Text>
                <Text variant="title3" color="primary">
                  +{rewards.coins}
                </Text>
                <Text variant="caption1" color="secondary">
                  Coins
                </Text>
              </View>
              <View style={styles.rewardItem}>
                <Text style={{ fontSize: 32, lineHeight: 40 }}>⭐</Text>
                <Text variant="title3" color="primary">
                  +{rewards.xp}
                </Text>
                <Text variant="caption1" color="secondary">
                  XP
                </Text>
              </View>
            </View>
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <Button
              title="Play Again"
              onPress={handleComplete}
              variant="primary"
              fullWidth
            />
            <Button
              title="Exit"
              onPress={onExit}
              variant="secondary"
              fullWidth
            />
          </View>
        </View>
      </ScrollView>
    );
  }

  // Battle In Progress
  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background.primary }]}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text variant="title2" color="primary" style={styles.roundTitle}>
          Round {currentRound + 1} of 3: {statName.toUpperCase()}
        </Text>
        <Text variant="callout" color="secondary" style={styles.roundSubtitle}>
          Highest {statName} stat wins this round
        </Text>
        <View style={styles.scoreRow}>
          <Text variant="headline" color="primary">
            You: {playerScore}
          </Text>
          <Text variant="headline" color="secondary">
            |
          </Text>
          <Text variant="headline" color="primary">
            Opponent: {opponentScore}
          </Text>
        </View>
      </View>

      {/* Opponent Card */}
      <View style={styles.cardSection}>
        <Text variant="headline" color="secondary" style={styles.cardLabel}>
          Opponent{showOpponentCard ? `: ${round.opponentCard.name}` : ''}
        </Text>
        <View style={styles.cardWrapper}>
          <CardDisplay
            card={round.opponentCard}
            scale={0.85}
            isFlipped={!showOpponentCard}
            showStats={showOpponentCard}
          />
          {showOpponentCard && phase === 'round_result' && (
            <View
              style={[
                styles.statHighlight,
                {
                  backgroundColor:
                    round.winner === 'opponent'
                      ? theme.colors.semantic.success
                      : round.winner === 'player'
                      ? theme.colors.semantic.error
                      : theme.colors.border.medium,
                },
              ]}
            >
              <Text variant="headline" style={styles.statHighlightText}>
                {statName}: {round.opponentScore}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* VS Divider */}
      <View style={styles.vsDivider}>
        <View style={[styles.dividerLine, { backgroundColor: theme.colors.border.medium }]} />
        <Text variant="title2" color="primary" style={styles.vsText}>
          VS
        </Text>
        <View style={[styles.dividerLine, { backgroundColor: theme.colors.border.medium }]} />
      </View>

      {/* Player Card */}
      <View style={styles.cardSection}>
        <Text variant="headline" color="secondary" style={styles.cardLabel}>
          You: {round.playerCard.name}
        </Text>
        <View style={styles.cardWrapper}>
          <CardDisplay
            card={round.playerCard}
            scale={0.85}
            showStats={true}
          />
          {phase === 'round_result' && (
            <View
              style={[
                styles.statHighlight,
                {
                  backgroundColor:
                    round.winner === 'player'
                      ? theme.colors.semantic.success
                      : round.winner === 'opponent'
                      ? theme.colors.semantic.error
                      : theme.colors.border.medium,
                },
              ]}
            >
              <Text variant="headline" style={styles.statHighlightText}>
                {statName}: {round.playerScore}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Result Message */}
      {phase === 'round_result' && (
        <View style={styles.resultMessage}>
          <Text variant="title2" color="primary" style={styles.resultMessageText}>
            {round.winner === 'player'
              ? '🎉 You Win This Round!'
              : round.winner === 'opponent'
              ? '😔 Opponent Wins This Round'
              : '🤝 Tie Round'}
          </Text>
        </View>
      )}

      {/* Action Button */}
      <View style={styles.actionButton}>
        {phase === 'ready' && (
          <Button
            title="Reveal Cards"
            onPress={handleReveal}
            variant="primary"
            fullWidth
            size="large"
          />
        )}
        {phase === 'round_result' && (
          <Button
            title={currentRound < 2 ? 'Next Round →' : 'View Results'}
            onPress={handleNextRound}
            variant="primary"
            fullWidth
            size="large"
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 24,
  },

  // Header
  header: {
    gap: 8,
    alignItems: 'center',
  },
  roundTitle: {
    fontWeight: '700',
    textAlign: 'center',
  },
  roundSubtitle: {
    textAlign: 'center',
    fontStyle: 'italic',
  },
  scoreRow: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },

  // Card Section
  cardSection: {
    gap: 8,
    alignItems: 'center',
  },
  cardLabel: {
    textAlign: 'center',
    fontWeight: '600',
  },
  cardWrapper: {
    position: 'relative',
    alignItems: 'center',
  },
  statHighlight: {
    position: 'absolute',
    bottom: -16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  statHighlightText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  // VS Divider
  vsDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginVertical: 8,
  },
  dividerLine: {
    flex: 1,
    height: 2,
  },
  vsText: {
    fontWeight: '700',
  },

  // Result Message
  resultMessage: {
    alignItems: 'center',
    marginTop: 8,
  },
  resultMessageText: {
    fontWeight: '700',
    textAlign: 'center',
  },

  // Action Button
  actionButton: {
    marginTop: 8,
  },

  // Battle Complete
  resultContainer: {
    alignItems: 'center',
    gap: 16,
  },
  resultTitle: {
    fontWeight: '700',
    textAlign: 'center',
  },
  resultScore: {
    textAlign: 'center',
  },
  rewardsCard: {
    width: '100%',
    padding: 24,
    borderRadius: 16,
    gap: 16,
    marginTop: 8,
  },
  rewardsTitle: {
    fontWeight: '700',
    textAlign: 'center',
  },
  rewardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 32,
  },
  rewardItem: {
    alignItems: 'center',
    gap: 4,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
    marginTop: 8,
  },
});

export default CardBattle;
