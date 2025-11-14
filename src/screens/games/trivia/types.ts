/**
 * Trivia Game - Type Definitions
 * Complete TypeScript interfaces for trivia game system
 */

export type TriviaDifficulty = 'easy' | 'medium' | 'hard';

export type TriviaCategory =
  | 'records'
  | 'history'
  | 'manufacturers'
  | 'parks'
  | 'general';

export interface TriviaQuestion {
  id: string;
  question: string;
  options: string[]; // Array of 4 options
  correctIndex: number; // 0-3
  difficulty: TriviaDifficulty;
  category: TriviaCategory;
  explanation?: string; // Fun fact after answer
}

export interface TriviaAnswer {
  questionId: string;
  selectedIndex: number;
  isCorrect: boolean;
  timeRemaining: number; // 0-10 seconds
  pointsEarned: number;
  difficulty: TriviaDifficulty;
}

export interface TriviaGame {
  questions: TriviaQuestion[]; // Always 5 questions
  currentQuestionIndex: number; // 0-4
  score: number;
  answers: TriviaAnswer[];
  startedAt: Date;
  completedAt?: Date;
}

export interface TriviaGameState {
  phase: 'playing' | 'reviewing' | 'results';
  currentQuestion: TriviaQuestion | null;
  selectedOptionIndex: number | null;
  timeRemaining: number;
  showFeedback: boolean;
}

export const BASE_POINTS: Record<TriviaDifficulty, number> = {
  easy: 500,
  medium: 750,
  hard: 1000,
};

export const QUESTION_TIME_LIMIT = 10; // seconds
export const QUESTIONS_PER_GAME = 5;

// Question difficulty progression
export const DIFFICULTY_PROGRESSION: TriviaDifficulty[] = [
  'easy',
  'easy',
  'medium',
  'hard',
  'hard',
];
