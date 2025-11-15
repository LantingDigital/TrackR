/**
 * Trivia Answer Modal
 * Shows feedback after answering a question with explanation
 * User must press "Next Question" to continue
 */

import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { Text, Card } from '@/components/base';
import { useTheme, useHaptic, HapticType } from '@/hooks';

type AnswerResult = 'correct' | 'incorrect' | 'timeout';

interface TriviaAnswerModalProps {
  /** Whether modal is visible */
  visible: boolean;
  /** Type of result */
  result: AnswerResult;
  /** Explanation text */
  explanation?: string;
  /** Points earned (if correct) */
  pointsEarned?: number;
  /** Callback when next button is pressed */
  onNext: () => void;
}

export const TriviaAnswerModal: React.FC<TriviaAnswerModalProps> = ({
  visible,
  result,
  explanation,
  pointsEarned,
  onNext,
}) => {
  const theme = useTheme();
  const { trigger } = useHaptic();

  const handleNext = () => {
    trigger(HapticType.SELECTION);
    onNext();
  };

  // Get message and styling based on result type
  const getResultContent = () => {
    switch (result) {
      case 'correct':
        return {
          emoji: '🎉',
          message: "That's right!",
          color: theme.colors.semantic.success,
        };
      case 'incorrect':
        return {
          emoji: '😔',
          message: 'Not quite!',
          color: theme.colors.semantic.error,
        };
      case 'timeout':
        return {
          emoji: '⏱️',
          message: 'Time ran out!',
          color: theme.colors.semantic.warning,
        };
    }
  };

  const content = getResultContent();

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleNext}
    >
      <View style={styles.overlay}>
        <Animated.View entering={SlideInDown.springify().damping(15).stiffness(150).mass(0.8)}>
          <Card
            variant="elevated"
            style={[
              styles.modalCard,
              {
                backgroundColor: theme.colors.background.primary,
                borderRadius: theme.borderRadius.xl,
                ...theme.shadows.xl,
              },
            ]}
          >
            {/* Result header */}
            <View style={styles.header}>
              <Text
                variant="largeTitle"
                style={{
                  fontSize: 40,
                  lineHeight: 50,
                  textAlign: 'center',
                }}
              >
                {content.emoji}
              </Text>
              <Text
                variant="title1"
                style={[
                  styles.resultText,
                  {
                    color: content.color,
                  },
                ]}
              >
                {content.message}
              </Text>

              {/* Points earned (if correct) */}
              {result === 'correct' && pointsEarned !== undefined && (
                <View
                  style={[
                    styles.pointsBadge,
                    {
                      backgroundColor: theme.colors.semantic.success,
                      borderRadius: theme.borderRadius.md,
                    },
                  ]}
                >
                  <Text
                    variant="headline"
                    style={{ ...styles.pointsText, color: '#FFFFFF' }}
                  >
                    +{pointsEarned} points
                  </Text>
                </View>
              )}
            </View>

            {/* Explanation */}
            {explanation && (
              <View style={styles.explanationContainer}>
                <Text variant="body" style={styles.explanationText}>
                  {explanation}
                </Text>
              </View>
            )}

            {/* Next button */}
            <TouchableOpacity
              style={[
                styles.nextButton,
                {
                  backgroundColor: theme.colors.primary.blue,
                  borderRadius: theme.borderRadius.md,
                  ...theme.shadows.md,
                },
              ]}
              onPress={handleNext}
              activeOpacity={0.8}
            >
              <Text variant="headline" style={{ ...styles.nextButtonText, color: '#FFFFFF' }}>
                Next Question →
              </Text>
            </TouchableOpacity>
          </Card>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalCard: {
    width: Math.min(Dimensions.get('window').width - 32, 400),
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
    gap: 8,
  },
  resultText: {
    textAlign: 'center',
    fontWeight: '700',
  },
  pointsBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 8,
  },
  pointsText: {
    fontWeight: '700',
  },
  explanationContainer: {
    marginBottom: 24,
  },
  explanationText: {
    textAlign: 'center',
    fontStyle: 'italic',
  },
  nextButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  nextButtonText: {
    fontWeight: '700',
  },
});

export default TriviaAnswerModal;
