/**
 * Navigation Types - TrackR
 * Type-safe navigation structure
 */

import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

/**
 * Root Navigator
 * Main app navigation structure
 */
export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<BottomTabParamList>;
  Logger: undefined; // Modal
  Wallet: undefined; // Modal
  GamesHub: undefined; // Modal
  CoastleGame: undefined;
  TriviaGame: undefined;
  TradingCardGame: undefined;
  BlackjackGame: undefined;
};

/**
 * Bottom Tabs Navigator
 * Main tab bar navigation
 */
export type BottomTabParamList = {
  Home: undefined;
  Social: undefined;
  Trip: undefined;
  More: undefined;
};

/**
 * Home Stack Navigator
 */
export type HomeStackParamList = {
  HomeScreen: undefined;
  CoasterDetail: { coasterId: string };
};

/**
 * Social Stack Navigator
 */
export type SocialStackParamList = {
  SocialFeed: undefined;
  UserProfile: { userId: string };
  PostDetail: { postId: string };
};

/**
 * Trip Stack Navigator
 */
export type TripStackParamList = {
  TripList: undefined;
  TripDetail: { tripId: string };
  TripDayDetail: { tripId: string; dayId: string };
};

/**
 * More Stack Navigator
 */
export type MoreStackParamList = {
  MoreMenu: undefined;
  Settings: undefined;
  Account: undefined;
  Privacy: undefined;
  Help: undefined;
};

/**
 * Screen Props Types
 * Type-safe props for screens
 */

// Root Stack Screen Props
export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

// Bottom Tab Screen Props
export type BottomTabScreenPropsType<T extends keyof BottomTabParamList> = BottomTabScreenProps<
  BottomTabParamList,
  T
>;

// Home Stack Screen Props
export type HomeStackScreenProps<T extends keyof HomeStackParamList> = NativeStackScreenProps<
  HomeStackParamList,
  T
>;

// Social Stack Screen Props
export type SocialStackScreenProps<T extends keyof SocialStackParamList> = NativeStackScreenProps<
  SocialStackParamList,
  T
>;

// Trip Stack Screen Props
export type TripStackScreenProps<T extends keyof TripStackParamList> = NativeStackScreenProps<
  TripStackParamList,
  T
>;

// More Stack Screen Props
export type MoreStackScreenProps<T extends keyof MoreStackParamList> = NativeStackScreenProps<
  MoreStackParamList,
  T
>;

/**
 * Navigation Declaration
 * Extends @react-navigation to provide type safety
 */
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
