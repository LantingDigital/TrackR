/**
 * Trading Card Game - TypeScript Type Definitions
 * Complete type system for the coaster card battler
 */

export type CardRarity = 'common' | 'rare' | 'epic' | 'legendary';
export type CoasterType = 'steel' | 'wood' | 'hybrid';
export type Manufacturer = 'intamin' | 'rmc' | 'b&m' | 'arrow' | 'vekoma' | 'mack' | 'gci' | 'giovanola';
export type StatType = 'height' | 'speed' | 'intensity';
export type BattleWinner = 'player' | 'opponent' | 'tie';

/**
 * Manufacturer Perk Effect
 * Defines how manufacturer abilities modify stats
 */
export interface PerkEffect {
  type: 'static' | 'conditional';
  heightBonus?: number;
  speedBonus?: number;
  intensityBonus?: number;
  special?: string; // Description of special mechanics
}

/**
 * Manufacturer Perk
 * Special abilities granted by coaster manufacturer
 */
export interface ManufacturerPerk {
  name: string;
  description: string;
  icon: string; // Emoji icon
  effect: PerkEffect;
}

/**
 * Coaster Card Stats
 * Core 3-stat system (1-10 scale)
 */
export interface CardStats {
  height: number;    // 1-10 scale
  speed: number;     // 1-10 scale
  intensity: number; // 1-10 scale
}

/**
 * Coaster Card
 * Complete card data including stats, rarity, and metadata
 */
export interface CoasterCard {
  id: string;
  name: string;
  park: string;
  country: string;
  manufacturer: Manufacturer;
  type: CoasterType;
  rarity: CardRarity;
  stats: CardStats;
  perk: ManufacturerPerk;
  imageUrl?: string; // Optional, will use placeholder if not provided
  flavor: string; // Fun fact about the coaster
  isUnlocked: boolean;
}

/**
 * Battle Round
 * Single round in a 3-round battle
 */
export interface BattleRound {
  roundNumber: number; // 1, 2, or 3
  statCompared: StatType;
  playerCard: CoasterCard;
  opponentCard: CoasterCard;
  playerScore: number; // After perks applied
  opponentScore: number; // After perks applied
  winner: BattleWinner;
}

/**
 * Battle State
 * Complete battle session state
 */
export enum BattleStatus {
  DECK_SELECTION = 'deck_selection',
  MATCHMAKING = 'matchmaking',
  IN_PROGRESS = 'in_progress',
  ROUND_REVEAL = 'round_reveal',
  COMPLETED = 'completed',
}

export interface BattleState {
  id: string;
  playerDeck: CoasterCard[]; // 3 cards
  opponentDeck: CoasterCard[]; // 3 cards
  rounds: BattleRound[]; // Max 3 rounds
  currentRoundIndex: number; // 0-2
  scores: {
    player: number; // 0-3
    opponent: number; // 0-3
  };
  status: BattleStatus;
  winner?: BattleWinner;
}

/**
 * Player Collection
 * User's card collection and battle deck
 */
export interface PlayerCollection {
  userId: string;
  cards: CoasterCard[];
  deckSlots: string[]; // 3 card IDs for battle deck
  totalCards: number;
  totalLegendaries: number;
  coins: number;
  xp: number;
}

/**
 * Card Pack
 * Purchasable card pack (100 coins each)
 */
export interface CardPack {
  id: string;
  cards: CoasterCard[];
  opened: boolean;
}

/**
 * Rarity Drop Rates
 * Pack opening probabilities
 */
export const RARITY_ODDS: Record<CardRarity, number> = {
  common: 0.50,    // 50%
  rare: 0.30,      // 30%
  epic: 0.15,      // 15%
  legendary: 0.05, // 5%
};

/**
 * Card Visual Config
 * Dimensions and styling constants
 */
export const CARD_CONFIG = {
  width: 280,
  height: 400,
  borderRadius: 16,
  aspectRatio: 0.7,
  imageHeight: 200, // Top 50% of card
};

/**
 * Battle Rewards
 */
export const BATTLE_REWARDS = {
  win: {
    coins: 50,
    xp: 10,
  },
  loss: {
    coins: 10,
    xp: 5,
  },
};
