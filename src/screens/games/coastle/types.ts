/**
 * Coastle Game - TypeScript Type Definitions
 * Complete type system for the roller coaster guessing game
 */

/**
 * Coaster Type Enum
 * Represents the category/style of roller coaster
 */
export enum CoasterType {
  STEEL = 'Steel',
  WOODEN = 'Wooden',
  HYBRID = 'Hybrid',
  INVERTED = 'Inverted',
  WING = 'Wing',
  DIVE = 'Dive',
  HYPER = 'Hyper',
  GIGA = 'Giga',
  LAUNCHED = 'Launched',
  FLOORLESS = 'Floorless',
  FLYING = 'Flying',
  SUSPENDED = 'Suspended',
}

/**
 * Coaster Stats
 * Numeric statistics for roller coaster performance
 */
export interface CoasterStats {
  height: number; // feet
  speed: number; // mph
  length: number; // feet
  year: number; // year opened
  inversions: number; // count (0 if none)
}

/**
 * Mystery Coaster
 * Complete coaster object with all attributes
 */
export interface MysteryCoaster {
  id: string;
  name: string;
  park: string;
  country: string;
  manufacturer: string;
  type: CoasterType;
  stats: CoasterStats;
  imageUrl?: string;
}

/**
 * Stat Type Enum
 * Represents which stat is being compared
 */
export enum StatType {
  HEIGHT = 'height',
  SPEED = 'speed',
  LENGTH = 'length',
  YEAR = 'year',
  INVERSIONS = 'inversions',
  COUNTRY = 'country',
  MANUFACTURER = 'manufacturer',
  TYPE = 'type',
  PARK = 'park',
}

/**
 * Feedback Type Enum
 * Represents the comparison result for a stat
 */
export enum FeedbackType {
  CORRECT = 'correct', // ✓ Exact match
  HIGHER = 'higher', // ↑ Guess is too low
  LOWER = 'lower', // ↓ Guess is too high
  WRONG = 'wrong', // ✗ Completely wrong
}

/**
 * Grid Feedback
 * Feedback for a single cell in the 3x3 grid
 */
export interface GridFeedback {
  cell: number; // 0-8 (position in grid)
  stat: StatType;
  feedback: FeedbackType;
  value: string; // Displayed value (e.g., "325 ft")
  displayValue?: string; // Optional formatted value
}

/**
 * Guess
 * A single guess attempt with its feedback
 */
export interface Guess {
  coaster: MysteryCoaster;
  gridFeedback: GridFeedback[]; // 9 items (one per cell)
  timestamp: Date;
}

/**
 * Game Status Enum
 */
export enum GameStatus {
  IN_PROGRESS = 'in_progress',
  WON = 'won',
  LOST = 'lost',
}

/**
 * Game Mode Enum
 */
export enum GameMode {
  DAILY = 'daily',
  PRACTICE = 'practice',
}

/**
 * Game State
 * Complete state of the Coastle game
 */
export interface GameState {
  dailyNumber: number; // e.g., "Coastle #123"
  mysteryCoaster: MysteryCoaster;
  guesses: Guess[];
  currentGuessIndex: number; // 0-5
  status: GameStatus;
  mode: GameMode;
}

/**
 * Autocomplete Result
 * Search result for coaster autocomplete
 */
export interface AutocompleteResult {
  id: string;
  name: string;
  park: string;
  country: string;
  imageUrl?: string;
}

/**
 * Cell State
 * Visual state of a grid cell
 */
export interface CellState {
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  icon: string;
  iconColor: string;
  iconSize: number;
  lineHeight: number;
}

/**
 * Stat Display Labels
 * Human-readable labels for stats
 */
export const STAT_LABELS: Record<StatType, string> = {
  [StatType.HEIGHT]: 'HEIGHT',
  [StatType.SPEED]: 'SPEED',
  [StatType.LENGTH]: 'LENGTH',
  [StatType.YEAR]: 'YEAR',
  [StatType.INVERSIONS]: 'INVERSIONS',
  [StatType.COUNTRY]: 'COUNTRY',
  [StatType.MANUFACTURER]: 'MANUFACTURER',
  [StatType.TYPE]: 'TYPE',
  [StatType.PARK]: 'PARK',
};

/**
 * Grid Layout
 * Defines the order of stats in the 3x3 grid (row by row)
 */
export const GRID_LAYOUT: StatType[] = [
  // Row 1: Numeric stats
  StatType.HEIGHT,
  StatType.SPEED,
  StatType.LENGTH,
  // Row 2: Mixed stats
  StatType.YEAR,
  StatType.INVERSIONS,
  StatType.COUNTRY,
  // Row 3: Categorical stats
  StatType.MANUFACTURER,
  StatType.TYPE,
  StatType.PARK,
];

/**
 * Game Constants
 */
export const GAME_CONSTANTS = {
  MAX_GUESSES: 6,
  GRID_SIZE: 9, // 3x3
  CELL_ANIMATION_STAGGER: 100, // ms between each cell flip
  FLIP_DURATION: 300, // ms for flip animation
} as const;
