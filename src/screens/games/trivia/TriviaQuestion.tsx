/**
 * Trivia Question Component
 * Displays question, timer, and answer options with feedback
 */

import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  FadeIn,
} from 'react-native-reanimated';
import { Text, Card } from '@/components/base';
import { useTheme, useHaptic, HapticType } from '@/hooks';
import { TriviaTimer } from './TriviaTimer';
import { TriviaOptions } from './TriviaOptions';
import { TriviaAnswerModal } from './TriviaAnswerModal';
import { TriviaQuestion as TriviaQuestionType } from './types';
import { formatScore, calculatePoints } from './triviaLogic';

interface TriviaQuestionProps {
  /** Current question data */
  question: TriviaQuestionType;
  /** Question number (1-5) */
  questionNumber: number;
  /** Total questions in game */
  totalQuestions: number;
  /** Current score */
  currentScore: number;
  /** Callback when answer is selected */
  onAnswer: (selectedIndex: number, timeRemaining: number) => void;
}

export const TriviaQuestionScreen: React.FC<TriviaQuestionProps> = ({
  question,
  questionNumber,
  totalQuestions,
  currentScore,
  onAnswer,
}) => {
  const theme = useTheme();
  const { trigger } = useHaptic();

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(10);
  const [timerPaused, setTimerPaused] = useState(false);

  // Use ref to prevent race conditions with timer
  const hasAnsweredRef = useRef(false);

  // Handle timer updates
  const handleTimeUpdate = (time: number) => {
    setTimeRemaining(time);
  };

  // Points animation
  const pointsScale = useSharedValue(0);
  const pointsOpacity = useSharedValue(0);

  // Reset state when question changes
  useEffect(() => {
    setSelectedIndex(null);
    setShowFeedback(false);
    setShowModal(false);
    setPointsEarned(0);
    setTimeRemaining(10);
    setTimerPaused(false);
    hasAnsweredRef.current = false;
    pointsScale.value = 0;
    pointsOpacity.value = 0;
  }, [question.id, pointsScale, pointsOpacity]);

  // Handle timer completion (time ran out)
  const handleTimeUp = () => {
    // Only trigger if user hasn't answered yet
    if (!hasAnsweredRef.current) {
      hasAnsweredRef.current = true;
      setSelectedIndex(-1); // -1 indicates no selection
      setTimerPaused(true);
      handleAnswerSubmit(-1, 0);
    }
  };

  // Handle option selection
  const handleSelectOption = (index: number) => {
    if (showFeedback || hasAnsweredRef.current) return; // Already answered

    // Mark as answered immediately to prevent race conditions
    hasAnsweredRef.current = true;
    setSelectedIndex(index);
    setTimerPaused(true);

    // Submit answer immediately
    handleAnswerSubmit(index, timeRemaining);
  };

  // Handle answer submission and feedback
  const handleAnswerSubmit = (index: number, time: number) => {
    const isCorrect = index === question.correctIndex;

    // Trigger haptic feedback
    if (isCorrect) {
      trigger(HapticType.SUCCESS);
    } else {
      trigger(HapticType.ERROR);
    }

    // Calculate points if correct
    if (isCorrect) {
      const points = calculatePoints(question.difficulty, time);
      setPointsEarned(points);
    }

    // Show feedback
    setShowFeedback(true);

    // Show modal instead of automatic transition
    setShowModal(true);
  };

  // Handle next question from modal
  const handleNextQuestion = () => {
    setShowModal(false);
    onAnswer(selectedIndex!, timeRemaining);
  };

  // Animated styles for points display
  const pointsAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pointsScale.value }],
    opacity: pointsOpacity.value,
  }));

  return (
    <Animated.ScrollView
      entering={FadeIn.duration(400)}
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Question header */}
      <View style={styles.header}>
        <Text variant="body" color="tertiary">
          Question {questionNumber}/{totalQuestions}
        </Text>
        <Text variant="body" color="secondary" style={styles.scoreText}>
          Score: {formatScore(currentScore)}
        </Text>
      </View>

      {/* Timer container */}
      <Card variant="elevated" style={styles.timerCard}>
        <TriviaTimer
          key={question.id}
          duration={10}
          onComplete={handleTimeUp}
          onTimeUpdate={handleTimeUpdate}
          isPaused={timerPaused}
          size={150}
        />

        {/* Question text */}
        <Text
          variant="title3"
          style={{
            ...styles.questionText,
            color: theme.colors.text.primary,
          }}
        >
          {question.question}
        </Text>

        {/* Difficulty badge */}
        <View
          style={[
            styles.difficultyBadge,
            {
              backgroundColor:
                question.difficulty === 'easy'
                  ? '#6B9B6B'
                  : question.difficulty === 'medium'
                  ? '#C9A857'
                  : '#C77C7C',
            },
          ]}
        >
          <Text
            style={{
              ...styles.difficultyText,
              fontSize: 12,
              lineHeight: 16,
              color: '#FEFDFB',
            }}
          >
            {question.difficulty.toUpperCase()}
          </Text>
        </View>
      </Card>

      {/* Answer options */}
      <View style={styles.optionsContainer}>
        <TriviaOptions
          options={question.options}
          selectedIndex={selectedIndex}
          correctIndex={question.correctIndex}
          showFeedback={showFeedback}
          onSelectOption={handleSelectOption}
          disabled={timerPaused}
        />
      </View>

      {/* Answer feedback modal */}
      <TriviaAnswerModal
        visible={showModal}
        result={
          selectedIndex === -1
            ? 'timeout'
            : selectedIndex === question.correctIndex
            ? 'correct'
            : 'incorrect'
        }
        explanation={question.explanation}
        pointsEarned={pointsEarned}
        onNext={handleNextQuestion}
      />
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16, // 8px grid
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreText: {
    fontWeight: '700',
    fontVariant: ['tabular-nums'], // Monospaced numbers
  },
  timerCard: {
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    gap: 16,
    borderRadius: 16,
  },
  questionText: {
    textAlign: 'center',
    marginTop: 8,
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'center',
  },
  difficultyText: {
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  optionsContainer: {
    marginBottom: 16,
  },
  explanationCard: {
    padding: 16,
    borderRadius: 12,
  },
  explanationText: {
    fontStyle: 'italic',
  },
});
