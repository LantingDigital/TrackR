/**
 * Slider Component - TrackR
 * Smooth, physics-based slider - FIXED WORKLET ISSUE
 * Phase 4: Logger System
 */

import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Text } from './Text';
import { useTheme, useHaptic, HapticType } from '@/hooks';

export interface SliderProps {
  label?: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  onValueChange?: (value: number) => void; // Called during drag for real-time updates
  onDragStart?: () => void; // Called when drag starts
  onDragEnd?: () => void; // Called when drag ends
  disabled?: boolean;
  showValue?: boolean;
  color?: string;
  locked?: boolean;
  onLockToggle?: () => void;
  dynamicMax?: number; // Dynamic constraint (visual max stays at max prop)
  snapOnRelease?: boolean; // If true, slides freely and snaps to step on release (for ratings)
  allowOverscroll?: boolean; // If true, allows elastic overscroll past dynamicMax
  disableAnimation?: boolean; // If true, updates instantly without spring animation (for auto-balancing)
}

const THUMB_SIZE = 28;
const TRACK_HEIGHT = 8;

const SPRING_CONFIG = {
  damping: 20,
  stiffness: 180,
  mass: 0.5,
};

export const Slider: React.FC<SliderProps> = ({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  onValueChange,
  onDragStart: onDragStartProp,
  onDragEnd: onDragEndProp,
  disabled = false,
  showValue = true,
  color,
  locked = false,
  onLockToggle,
  dynamicMax,
  snapOnRelease = false,
  allowOverscroll = false,
  disableAnimation = false,
}) => {
  const theme = useTheme();
  const { trigger } = useHaptic();

  const [trackWidth, setTrackWidth] = useState(300);
  const [localValue, setLocalValue] = useState(value);

  // Shared values for animations (synchronous on UI thread)
  const thumbPosition = useSharedValue(0);
  const isDragging = useSharedValue(false);
  const lastHapticValue = useSharedValue(value); // Track last value that triggered haptic

  // Effective max (use dynamicMax if provided, otherwise max)
  const effectiveMax = dynamicMax !== undefined ? Math.max(min, dynamicMax) : max;

  // Determine if slider is functionally disabled (effectiveMax = min)
  const isEffectivelyDisabled = disabled || effectiveMax === min;

  const activeColor = color || theme.colors.primary.blue;


  // Convert value to position
  const valueToPosition = useCallback(
    (val: number): number => {
      const clamped = Math.max(min, Math.min(max, val));
      const ratio = (clamped - min) / (max - min);
      return ratio * trackWidth;
    },
    [min, max, trackWidth]
  );

  // Update thumb position when value changes externally (only when NOT dragging)
  React.useEffect(() => {
    if (!isDragging.value) {
      const newPosition = valueToPosition(value);
      // Use instant update (no animation) for auto-balanced sliders, spring for user-released sliders
      if (disableAnimation) {
        thumbPosition.value = newPosition;
      } else {
        thumbPosition.value = withSpring(newPosition, SPRING_CONFIG);
      }
      setLocalValue(value);
    }
  }, [value, valueToPosition, disableAnimation]);

  // Callbacks for gesture (called via runOnJS from UI thread)
  const onDragStart = useCallback(() => {
    trigger(HapticType.LIGHT);
    if (onDragStartProp) {
      onDragStartProp();
    }
  }, [trigger, onDragStartProp]);

  const onDragEnd = useCallback(
    (finalValue: number) => {
      onChange(finalValue);
      if (onDragEndProp) {
        onDragEndProp();
      }
    },
    [onChange, onDragEndProp]
  );

  const updateLocalValue = useCallback((newValue: number) => {
    setLocalValue(newValue);
  }, []);

  // Haptic feedback for whole number crossings
  const triggerLightHaptic = useCallback(() => {
    trigger(HapticType.LIGHT);
  }, [trigger]);

  // Haptic feedback for hitting max constraint
  const triggerMediumHaptic = useCallback(() => {
    trigger(HapticType.MEDIUM);
  }, [trigger]);

  // Real-time value change callback
  const callOnValueChange = useCallback(
    (newValue: number) => {
      if (onValueChange) {
        onValueChange(newValue);
      }
    },
    [onValueChange]
  );

  // Pan gesture - runs entirely on UI thread as worklet
  const panGesture = Gesture.Pan()
    .enabled(!isEffectivelyDisabled && !locked)
    .minDistance(0) // Activate immediately on touch
    .onBegin(() => {
      'worklet';
      // Set dragging flag IMMEDIATELY on UI thread (synchronous)
      isDragging.value = true;

      // Reset haptic tracking to current value
      lastHapticValue.value = Math.floor(value);

      runOnJS(onDragStart)();
    })
    .onUpdate((event) => {
      'worklet';

      // Safety check - if no range available, do nothing
      if (effectiveMax <= min || max <= min || trackWidth <= 0) {
        return;
      }

      // Calculate new position (inline, runs on UI thread)
      const newPosition = Math.max(0, Math.min(trackWidth, event.x));

      // Convert position to unconstrained value (using max for visual range)
      const ratio = Math.max(0, Math.min(1, newPosition / trackWidth));
      const rawValue = min + ratio * (max - min);

      // Apply stepping based on mode
      let valueToUse = rawValue;
      if (!snapOnRelease) {
        // Step during drag (weight sliders)
        valueToUse = Math.round(rawValue / step) * step;
      }

      // Constrain to effectiveMax with optional elastic overscroll
      let constrainedValue = valueToUse;

      if (allowOverscroll && valueToUse > effectiveMax) {
        // Elastic resistance: allow overscroll but with dampening
        const overshoot = valueToUse - effectiveMax;
        const dampenedOvershoot = overshoot * 0.3; // 30% resistance
        constrainedValue = effectiveMax + dampenedOvershoot;
      } else {
        // Hard constraint (no overscroll)
        constrainedValue = Math.max(min, Math.min(effectiveMax, valueToUse));
      }

      // Calculate thumb position from constrained value (for elastic resistance feel)
      const constrainedRatio = (constrainedValue - min) / (max - min);
      const actualPosition = constrainedRatio * trackWidth;

      // Update thumb position
      thumbPosition.value = actualPosition;

      // For display, show the thumb's actual position (can be beyond effectiveMax during overscroll)
      // For callbacks, clamp to effectiveMax (so parent logic doesn't break)
      const displayValue = snapOnRelease ? rawValue : constrainedValue;
      const callbackValue = Math.max(min, Math.min(effectiveMax, displayValue));

      // Check if we crossed a whole number (for haptic feedback)
      const previousValue = lastHapticValue.value;
      const previousWhole = Math.floor(previousValue);
      const currentWhole = Math.floor(callbackValue);

      if (currentWhole !== previousWhole) {
        runOnJS(triggerLightHaptic)();
        lastHapticValue.value = callbackValue;
      }

      // Check if we hit the dynamic max constraint (for boundary haptic)
      if (callbackValue >= effectiveMax && previousValue < effectiveMax) {
        runOnJS(triggerMediumHaptic)();
      }

      // Update display value on JS thread (show clamped value, not overscroll)
      runOnJS(updateLocalValue)(Math.round(callbackValue));

      // Call onValueChange for real-time updates (e.g., weight balancing)
      // Always call if onValueChange is provided (supports real-time balancing with snapOnRelease)
      // Pass clamped value so parent logic doesn't break
      runOnJS(callOnValueChange)(callbackValue);
    })
    .onEnd(() => {
      'worklet';

      // Safety check - if no range available, just clear dragging state
      if (effectiveMax <= min || max <= min || trackWidth <= 0) {
        isDragging.value = false;
        return;
      }

      // Calculate final value from current thumb position
      const ratio = Math.max(0, Math.min(1, thumbPosition.value / trackWidth));
      const rawValue = min + ratio * (max - min);

      // Apply stepping (for snapOnRelease mode, this is the snap-to-nearest behavior)
      const steppedValue = Math.round(rawValue / step) * step;
      const finalValue = Math.max(min, Math.min(effectiveMax, steppedValue));

      // Calculate final position for snap animation (use max for visual range)
      const clampedFinal = Math.max(min, Math.min(effectiveMax, finalValue));
      const finalRatio = (clampedFinal - min) / (max - min);
      const finalPosition = finalRatio * trackWidth;

      // Snap to final position with spring
      thumbPosition.value = withSpring(finalPosition, SPRING_CONFIG);

      // Clear dragging flag BEFORE notifying parent (prevents race condition)
      isDragging.value = false;

      // Notify parent with final snapped value
      runOnJS(onDragEnd)(finalValue);
    });

  // Animated styles
  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: thumbPosition.value - THUMB_SIZE / 2 }],
  }));

  const fillStyle = useAnimatedStyle(() => ({
    width: thumbPosition.value + THUMB_SIZE / 2,
  }));

  return (
    <View style={styles.container}>
      {/* Header */}
      {(label || showValue || onLockToggle) && (
        <View style={styles.header}>
          <View style={styles.labelContainer}>
            {label && (
              <Text variant="callout" color="primary" style={styles.label}>
                {label}
              </Text>
            )}
            {showValue && (
              <Text variant="caption1" color="secondary" style={styles.value}>
                {localValue}
              </Text>
            )}
          </View>

          {onLockToggle && (
            <Pressable onPress={onLockToggle} hitSlop={8}>
              <Text style={styles.lockIcon}>{locked ? '🔒' : '🔓'}</Text>
            </Pressable>
          )}
        </View>
      )}

      {/* Slider Track */}
      <GestureDetector gesture={panGesture}>
        <View
          style={styles.trackContainer}
          onLayout={(e) => {
            const width = e.nativeEvent.layout.width;
            setTrackWidth(width);
            // Initialize thumb position
            const initialPosition = valueToPosition(value);
            thumbPosition.value = initialPosition;
          }}
        >
          {/* Background Track */}
          <View
            style={[
              styles.track,
              {
                backgroundColor: theme.colors.background.tertiary,
                borderRadius: theme.borderRadius.sm,
              },
            ]}
          />

          {/* Fill Track */}
          <Animated.View
            style={[
              styles.fill,
              fillStyle,
              {
                backgroundColor: locked ? theme.colors.text.tertiary : activeColor,
                borderRadius: theme.borderRadius.sm,
                opacity: isEffectivelyDisabled ? 0.3 : 1,
              },
            ]}
          />

          {/* Draggable Thumb */}
          <Animated.View
            style={[
              styles.thumb,
              thumbStyle,
              {
                backgroundColor: locked ? theme.colors.text.tertiary : activeColor,
                ...theme.shadows.lg,
                opacity: isEffectivelyDisabled ? 0.3 : 1,
              },
            ]}
          />
        </View>
      </GestureDetector>
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
    marginBottom: 12,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontWeight: '600',
  },
  value: {
    fontWeight: '700',
  },
  lockIcon: {
    fontSize: 18,
    lineHeight: 24,
  },
  trackContainer: {
    height: THUMB_SIZE + 8,
    justifyContent: 'center',
  },
  track: {
    height: TRACK_HEIGHT,
    width: '100%',
    position: 'absolute',
  },
  fill: {
    height: TRACK_HEIGHT,
    position: 'absolute',
    left: 0,
  },
  thumb: {
    position: 'absolute',
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    left: 0,
    top: (THUMB_SIZE + 8 - THUMB_SIZE) / 2,
  },
});

export default Slider;
