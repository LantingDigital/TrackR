/**
 * Root Navigator - TrackR
 * Main navigation structure with tabs and modal screens
 * Includes gesture-based navigation with spring animations
 */

import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Platform, TouchableOpacity } from 'react-native';
import { BottomTabNavigator } from './BottomTabNavigator';
import {
  LoggerScreen,
  WalletScreen,
  GamesHubScreen,
  CoastleGameScreen,
  TriviaGameScreen,
  TradingCardGameScreen,
  BlackjackGameScreen,
} from '@/screens';
import { RootStackParamList } from './types';
import { useTheme } from '@/hooks';
import { Text } from '@/components/base';

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
        options={({ navigation }) => ({
          ...modalOptions,
          title: 'MINIGAMES',
          presentation: 'fullScreenModal',
          headerTitleStyle: {
            ...theme.typography.title3,
            color: theme.colors.text.primary,
            fontWeight: '700',
            letterSpacing: 1,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                paddingLeft: 8,
                paddingRight: 16,
                paddingVertical: 8,
              }}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text
                variant="title3"
                style={{
                  color: theme.colors.text.primary,
                  fontWeight: '600',
                  lineHeight: 30,
                }}
              >
                ←
              </Text>
            </TouchableOpacity>
          ),
        })}
      />

      {/* Individual Game Screens */}
      <Stack.Screen
        name="CoastleGame"
        component={CoastleGameScreen}
        options={{
          ...modalOptions,
          title: 'MINIGAMES',
          presentation: 'fullScreenModal',
          headerTitleStyle: {
            ...theme.typography.title3,
            color: theme.colors.text.primary,
            fontWeight: '700',
            letterSpacing: 1,
          },
        }}
      />

      <Stack.Screen
        name="TriviaGame"
        component={TriviaGameScreen}
        options={{
          ...modalOptions,
          title: 'MINIGAMES',
          presentation: 'fullScreenModal',
          headerTitleStyle: {
            ...theme.typography.title3,
            color: theme.colors.text.primary,
            fontWeight: '700',
            letterSpacing: 1,
          },
        }}
      />

      <Stack.Screen
        name="TradingCardGame"
        component={TradingCardGameScreen}
        options={{
          ...modalOptions,
          title: 'MINIGAMES',
          presentation: 'fullScreenModal',
          headerTitleStyle: {
            ...theme.typography.title3,
            color: theme.colors.text.primary,
            fontWeight: '700',
            letterSpacing: 1,
          },
        }}
      />

      <Stack.Screen
        name="BlackjackGame"
        component={BlackjackGameScreen}
        options={{
          ...modalOptions,
          title: 'MINIGAMES',
          presentation: 'fullScreenModal',
          headerTitleStyle: {
            ...theme.typography.title3,
            color: theme.colors.text.primary,
            fontWeight: '700',
            letterSpacing: 1,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
