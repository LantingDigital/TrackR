/**
 * Trading Card Game Screen - TrackR
 * Collectible card game with stat-based battles
 * Complete production implementation
 */

import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { TradingCardScreen } from './games/trading-card';

export const TradingCardGameScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleClose = () => {
    navigation.goBack();
  };

  return <TradingCardScreen onClose={handleClose} />;
};

export default TradingCardGameScreen;
