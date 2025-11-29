/**
 * Success Overlay - TrackR
 * Global success animation that renders above all navigation
 * Clean flow: animation plays → text reveals → fades to home
 */

import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import LottieView from 'lottie-react-native';

import { Text } from '@/components/base';
import { useTheme } from '@/hooks';
import { useSuccessOverlay } from '@/contexts/SuccessOverlayContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Timing constants
const REVEAL_DELAY = 300;
const REVEAL_DURATION = 450;
const HOLD_DURATION = 1200;
const FADE_OUT_DURATION = 300;

const SMOOTH_EASING = {
  duration: REVEAL_DURATION,
  easing: Easing.bezier(0.34, 1.56, 0.64, 1),
};

export const SuccessOverlay: React.FC = () => {
  const theme = useTheme();
  const { isVisible, data, hideSuccess } = useSuccessOverlay();
  const lottieRef = useRef<LottieView>(null);

  const [phase, setPhase] = useState<'playing' | 'revealing' | 'holding' | 'fading'>('playing');
  const revealProgress = useSharedValue(0);
  const overlayOpacity = useSharedValue(1);

  // Reset when overlay becomes visible
  useEffect(() => {
    if (isVisible) {
      setPhase('playing');
      revealProgress.value = 0;
      overlayOpacity.value = 1;
    }
  }, [isVisible]);

  const handleLottieComplete = () => {
    setTimeout(() => {
      setPhase('revealing');
      revealProgress.value = 1;

      setTimeout(() => {
        setPhase('holding');

        setTimeout(() => {
          setPhase('fading');
          overlayOpacity.value = withTiming(0, { duration: FADE_OUT_DURATION }, (finished) => {
            if (finished) {
              runOnJS(hideSuccess)();
            }
          });
        }, HOLD_DURATION);
      }, REVEAL_DURATION);
    }, REVEAL_DELAY);
  };

  const checkmarkStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: withTiming(-revealProgress.value * 25, SMOOTH_EASING) },
      { scale: withTiming(1 - revealProgress.value * 0.05, SMOOTH_EASING) },
    ],
  }));

  const textStyle = useAnimatedStyle(() => {
    // Use raw value (no animation) when at 0 to prevent flash on mount
    const opacity = revealProgress.value === 0
      ? 0
      : withTiming(revealProgress.value, { duration: REVEAL_DURATION * 0.8 });
    const translateY = revealProgress.value === 0
      ? 20
      : withTiming((1 - revealProgress.value) * 20, SMOOTH_EASING);

    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  const containerStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }));

  if (!isVisible) return null;

  return (
    <Animated.View
      style={[
        styles.overlay,
        { backgroundColor: theme.colors.background.primary },
        containerStyle,
      ]}
      pointerEvents="auto"
    >
      <View style={styles.content}>
        <Animated.View style={[styles.checkmarkWrapper, checkmarkStyle]}>
          <LottieView
            ref={lottieRef}
            source={require('../../assets/Success-Check.json')}
            autoPlay
            loop={false}
            onAnimationFinish={handleLottieComplete}
            style={styles.checkmarkAnimation}
          />
        </Animated.View>

        <Animated.View style={[styles.textWrapper, textStyle]}>
          <Text style={{ ...styles.title, color: theme.colors.text.primary }}>
            {data?.title || 'Success!'}
          </Text>
          <Text style={{ ...styles.subtitle, color: theme.colors.text.secondary }}>
            {data?.subtitle || ''}
          </Text>
        </Animated.View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  checkmarkWrapper: {},
  checkmarkAnimation: {
    width: SCREEN_WIDTH * 0.77,
    height: SCREEN_WIDTH * 0.77,
  },
  textWrapper: {
    alignItems: 'center',
    marginTop: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: -0.3,
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 17,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 24,
  },
});

export default SuccessOverlay;
