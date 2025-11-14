/**
 * Coastle Game - Centralized Exports
 * Export all Coastle components and utilities
 */

// Main screen
export { CoastleScreen } from './CoastleScreen';

// Components
export { CoastleGrid } from './CoastleGrid';
export { CoastleCell } from './CoastleCell';
export { CoastleSearch } from './CoastleSearch';
export { CoastleGameOver } from './CoastleGameOver';

// Data and logic
export * from './types';
export * from './coastleData';
export * from './coastleLogic';

// Default export
export { default } from './CoastleScreen';
