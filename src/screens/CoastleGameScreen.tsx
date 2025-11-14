/**
 * Coastle Game Screen - TrackR
 * Wordle-style game with roller coasters (3×3 grid)
 * Phase 5A - Complete Implementation
 */

import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { CoastleScreen } from './games/coastle';

export const CoastleGameScreen: React.FC = () => {
  const navigation = useNavigation();

  return <CoastleScreen navigation={navigation} />;
};

export default CoastleGameScreen;
