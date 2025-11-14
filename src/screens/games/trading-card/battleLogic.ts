/**
 * Trading Card Game - Battle Logic
 * Handles stat comparison, manufacturer perks, and winner calculation
 */

import { CoasterCard, BattleRound, StatType, BattleWinner, CardStats } from './types';

/**
 * Apply manufacturer perk bonuses to a card's stats
 * @param card - The card to apply perks to
 * @param stat - The stat being compared in current round
 * @param roundNumber - The current round (1-3)
 * @param isWinning - Whether this card's stat is currently winning (for conditional perks)
 * @returns Modified stat value after perks
 */
export const applyManufacturerPerk = (
  card: CoasterCard,
  stat: StatType,
  roundNumber: number,
  isWinning: boolean = false
): number => {
  const baseValue = card.stats[stat];
  const perk = card.perk;

  // Handle static bonuses
  if (perk.effect.type === 'static') {
    let bonus = 0;

    switch (stat) {
      case 'height':
        bonus = perk.effect.heightBonus || 0;
        break;
      case 'speed':
        bonus = perk.effect.speedBonus || 0;
        break;
      case 'intensity':
        bonus = perk.effect.intensityBonus || 0;
        break;
    }

    return Math.max(0, Math.min(10, baseValue + bonus)); // Clamp between 0-10
  }

  // Handle conditional bonuses
  if (perk.effect.type === 'conditional') {
    // GCI - "Timeless": +2 Intensity in Round 3 only
    if (card.manufacturer === 'gci' && stat === 'intensity' && roundNumber === 3) {
      return Math.min(10, baseValue + 2);
    }

    // Vekoma - "Underdog": +1 to stat that would win
    if (card.manufacturer === 'vekoma' && isWinning) {
      return Math.min(10, baseValue + 1);
    }
  }

  return baseValue;
};

/**
 * Calculate the effective stats for both cards and determine winner
 * @param playerCard - Player's card
 * @param opponentCard - Opponent's card
 * @param stat - The stat being compared
 * @param roundNumber - Current round (1-3)
 * @returns Battle round result
 */
export const calculateRoundWinner = (
  playerCard: CoasterCard,
  opponentCard: CoasterCard,
  stat: StatType,
  roundNumber: number
): Omit<BattleRound, 'roundNumber' | 'playerCard' | 'opponentCard'> => {
  // First calculate base stats with static perks
  let playerScore = applyManufacturerPerk(playerCard, stat, roundNumber, false);
  let opponentScore = applyManufacturerPerk(opponentCard, stat, roundNumber, false);

  // Check if Vekoma perk applies (needs to check who's winning)
  if (playerCard.manufacturer === 'vekoma' && playerScore > opponentScore) {
    playerScore = applyManufacturerPerk(playerCard, stat, roundNumber, true);
  }
  if (opponentCard.manufacturer === 'vekoma' && opponentScore > playerScore) {
    opponentScore = applyManufacturerPerk(opponentCard, stat, roundNumber, true);
  }

  // Determine winner
  let winner: BattleWinner;
  if (playerScore > opponentScore) {
    winner = 'player';
  } else if (opponentScore > playerScore) {
    winner = 'opponent';
  } else {
    winner = 'tie';
  }

  return {
    statCompared: stat,
    playerScore,
    opponentScore,
    winner,
  };
};

/**
 * Play a complete 3-round battle
 * @param playerDeck - Player's 3 cards
 * @param opponentDeck - Opponent's 3 cards
 * @returns Array of 3 battle rounds
 */
export const playBattle = (
  playerDeck: CoasterCard[],
  opponentDeck: CoasterCard[]
): BattleRound[] => {
  if (playerDeck.length !== 3 || opponentDeck.length !== 3) {
    throw new Error('Both decks must have exactly 3 cards');
  }

  const rounds: BattleRound[] = [];
  const stats: StatType[] = ['height', 'speed', 'intensity'];

  // Play 3 rounds
  for (let i = 0; i < 3; i++) {
    const roundResult = calculateRoundWinner(
      playerDeck[i],
      opponentDeck[i],
      stats[i],
      i + 1
    );

    rounds.push({
      roundNumber: i + 1,
      playerCard: playerDeck[i],
      opponentCard: opponentDeck[i],
      ...roundResult,
    });
  }

  return rounds;
};

/**
 * Determine overall battle winner (best of 3)
 * @param rounds - Array of 3 battle rounds
 * @returns Overall winner
 */
export const determineBattleWinner = (rounds: BattleRound[]): BattleWinner => {
  let playerWins = 0;
  let opponentWins = 0;

  rounds.forEach(round => {
    if (round.winner === 'player') {
      playerWins++;
    } else if (round.winner === 'opponent') {
      opponentWins++;
    }
  });

  if (playerWins > opponentWins) {
    return 'player';
  } else if (opponentWins > playerWins) {
    return 'opponent';
  } else {
    return 'tie';
  }
};

/**
 * Generate a random opponent deck from unlocked cards
 * @param allCards - Array of all available cards
 * @param playerDeck - Player's deck (to avoid duplicates)
 * @returns Array of 3 random cards for opponent
 */
export const generateOpponentDeck = (
  allCards: CoasterCard[],
  playerDeck: CoasterCard[]
): CoasterCard[] => {
  const playerCardIds = new Set(playerDeck.map(card => card.id));
  const availableCards = allCards.filter(
    card => card.isUnlocked && !playerCardIds.has(card.id)
  );

  if (availableCards.length < 3) {
    throw new Error('Not enough cards available to generate opponent deck');
  }

  // Shuffle and take first 3
  const shuffled = [...availableCards].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
};

/**
 * Get stat display name
 */
export const getStatDisplayName = (stat: StatType): string => {
  return stat.charAt(0).toUpperCase() + stat.slice(1);
};

/**
 * Get stat bar color
 */
export const getStatBarColor = (stat: StatType): string => {
  switch (stat) {
    case 'height':
      return '#5B7C99'; // Blue
    case 'speed':
      return '#C68B5A'; // Orange
    case 'intensity':
      return '#8B7B9E'; // Purple
  }
};
