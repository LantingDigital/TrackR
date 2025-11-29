/**
 * TrackR - Premium Roller Coaster Companion App
 * Main Application Entry Point with Navigation
 */

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './src/navigation';
import { UserProfileProvider, SuccessOverlayProvider } from './src/contexts';
import { SuccessOverlay } from './src/components/SuccessOverlay';

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <UserProfileProvider>
          <SuccessOverlayProvider>
            <NavigationContainer>
              <StatusBar style="auto" />
              <View style={styles.container}>
                <RootNavigator />
                <SuccessOverlay />
              </View>
            </NavigationContainer>
          </SuccessOverlayProvider>
        </UserProfileProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
