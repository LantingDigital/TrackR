/**
 * Root Navigator - TrackR
 * Main navigation structure with tabs and modal screens
 * Includes gesture-based navigation with spring animations
 */

import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Platform } from 'react-native';
import { BottomTabNavigator } from './BottomTabNavigator';
import { LoggerScreen, WalletScreen, GamesHubScreen } from '@/screens';
import { RootStackParamList } from './types';
import { useTheme } from '@/hooks';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  const theme = useTheme();

  // Common modal options with spring animations
  const modalOptions: NativeStackNavigationOptions = {
    presentation: 'modal',
    animation: 'slide_from_bottom',
    gestureEnabled: true,
    gestureDirection: 'vertical',
    headerShown: true,
    headerStyle: {
      backgroundColor: theme.colors.background.secondary,
    },
    headerTitleStyle: {
      ...theme.typography.title3,
      color: theme.colors.text.primary,
    },
    headerShadowVisible: false,
    headerBackTitleVisible: false,
    contentStyle: {
      backgroundColor: theme.colors.background.primary,
    },
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'default',
      }}
    >
      {/* Main Tabs (Home, Social, Trip, More) */}
      <Stack.Screen
        name="MainTabs"
        component={BottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />

      {/* Modal Screens */}
      <Stack.Screen
        name="Logger"
        component={LoggerScreen}
        options={{
          ...modalOptions,
          title: 'Log a Ride',
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />

      <Stack.Screen
        name="Wallet"
        component={WalletScreen}
        options={{
          ...modalOptions,
          title: 'Wallet',
          presentation: 'fullScreenModal',
        }}
      />

      <Stack.Screen
        name="GamesHub"
        component={GamesHubScreen}
        options={{
          ...modalOptions,
          title: 'Games',
          presentation: 'fullScreenModal',
        }}
      />

      {/* Individual Game Screens - Coming in Phase 5 */}
      {/* TODO: Add Coastle, Trivia, Trading Card, Blackjack screens */}
    </Stack.Navigator>
  );
};

export default RootNavigator;
