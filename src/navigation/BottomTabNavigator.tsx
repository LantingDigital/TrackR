/**
 * Bottom Tab Navigator - TrackR
 * Main tab bar navigation with custom styling and haptic feedback
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, Text as RNText } from 'react-native';
import { HomeScreen, SocialScreen, TripScreen, MoreScreen } from '@/screens';
import { BottomTabParamList } from './types';
import { useTheme, useHaptic, HapticType } from '@/hooks';

const Tab = createBottomTabNavigator<BottomTabParamList>();

export const BottomTabNavigator: React.FC = () => {
  const theme = useTheme();
  const { trigger } = useHaptic();

  const handleTabPress = () => {
    trigger(HapticType.LIGHT);
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: theme.colors.background.secondary,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border.light,
        },
        headerTitleStyle: {
          ...theme.typography.title3,
          color: theme.colors.text.primary,
        },
        tabBarStyle: {
          backgroundColor: theme.colors.background.secondary,
          borderTopWidth: 1,
          borderTopColor: theme.colors.border.light,
          height: Platform.OS === 'ios' ? 88 : 64,
          paddingBottom: Platform.OS === 'ios' ? 24 : 8,
          paddingTop: 8,
          ...theme.shadows.sm,
        },
        tabBarActiveTintColor: theme.colors.primary.blue,
        tabBarInactiveTintColor: theme.colors.text.tertiary,
        tabBarLabelStyle: {
          ...theme.typography.caption1,
          marginTop: 4,
        },
        tabBarItemStyle: {
          paddingTop: 4,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon="🏠" color={color} focused={focused} />
          ),
        }}
        listeners={{
          tabPress: handleTabPress,
        }}
      />

      <Tab.Screen
        name="Social"
        component={SocialScreen}
        options={{
          title: 'Social',
          tabBarLabel: 'Social',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon="👥" color={color} focused={focused} />
          ),
        }}
        listeners={{
          tabPress: handleTabPress,
        }}
      />

      <Tab.Screen
        name="Trip"
        component={TripScreen}
        options={{
          title: 'Trips',
          tabBarLabel: 'Trip',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon="🗺️" color={color} focused={focused} />
          ),
        }}
        listeners={{
          tabPress: handleTabPress,
        }}
      />

      <Tab.Screen
        name="More"
        component={MoreScreen}
        options={{
          title: 'More',
          tabBarLabel: 'More',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon="⚙️" color={color} focused={focused} />
          ),
        }}
        listeners={{
          tabPress: handleTabPress,
        }}
      />
    </Tab.Navigator>
  );
};

// Simple icon component using emoji
interface TabIconProps {
  icon: string;
  color: string;
  focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ icon }) => {
  return (
    <RNText style={{ fontSize: 24 }}>{icon}</RNText>
  );
};

export default BottomTabNavigator;
