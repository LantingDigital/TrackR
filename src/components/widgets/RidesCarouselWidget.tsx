/**
 * Rides Carousel Widget - TrackR
 * Horizontal scrolling carousel of recently logged rides
 * Phase 3 placeholder with mock data
 */

import React from 'react';
import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import { Text } from '@/components/base';
import { useTheme, useHaptic, HapticType } from '@/hooks';

export interface RideCardData {
  id: string;
  coasterName: string;
  parkName: string;
  date: string;
  rating: number; // 1-5
}

export interface RidesCarouselWidgetProps {
  rides: RideCardData[];
  onRidePress?: (rideId: string) => void;
}

export const RidesCarouselWidget: React.FC<RidesCarouselWidgetProps> = ({
  rides,
  onRidePress,
}) => {
  const theme = useTheme();
  const { trigger } = useHaptic();

  const handleRidePress = (rideId: string) => {
    trigger(HapticType.LIGHT);
    onRidePress?.(rideId);
  };

  const renderStars = (rating: number) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  if (rides.length === 0) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: theme.colors.background.secondary }]}>
        <Text variant="body" color="tertiary" style={styles.emptyText}>
          No rides logged yet. Tap the + button to log your first ride!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="title3" color="primary">
          Last Logged Rides
        </Text>
        <Text variant="caption1" color="tertiary">
          {rides.length} recent
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        decelerationRate="fast"
        snapToInterval={180 + 12} // card width + gap
      >
        {rides.map((ride) => (
          <Pressable
            key={ride.id}
            style={[
              styles.rideCard,
              {
                backgroundColor: theme.colors.background.secondary,
                borderRadius: theme.borderRadius.lg,
                ...theme.shadows.sm,
              },
            ]}
            onPress={() => handleRidePress(ride.id)}
            accessibilityLabel={`${ride.coasterName} at ${ride.parkName}, rated ${ride.rating} stars`}
            accessibilityRole="button"
          >
            {/* Ride Image Placeholder */}
            <View style={[styles.imagePlaceholder, { backgroundColor: theme.colors.primary.blue + '30' }]}>
              <Text style={styles.imagePlaceholderEmoji}>🎢</Text>
            </View>

            {/* Ride Info */}
            <View style={styles.rideInfo}>
              <Text
                variant="callout"
                color="primary"
                numberOfLines={1}
                style={styles.coasterName}
              >
                {ride.coasterName}
              </Text>
              <Text
                variant="caption1"
                color="secondary"
                numberOfLines={1}
              >
                {ride.parkName}
              </Text>
              <View style={styles.rideFooter}>
                <Text variant="caption2" color="tertiary">
                  {ride.date}
                </Text>
                <Text style={styles.rating}>{renderStars(ride.rating)}</Text>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  scrollContent: {
    paddingLeft: 0,
    paddingRight: 16,
    gap: 12,
  },
  rideCard: {
    width: 180,
    overflow: 'hidden',
  },
  imagePlaceholder: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  imagePlaceholderEmoji: {
    fontSize: 40,
  },
  rideInfo: {
    padding: 12,
    gap: 4,
  },
  coasterName: {
    fontWeight: '600',
  },
  rideFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  rating: {
    fontSize: 10,
  },
  emptyContainer: {
    padding: 24,
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
  },
});

export default RidesCarouselWidget;
