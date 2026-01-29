/**
 * Assessment Context
 * 
 * Session-only state management for assessment responses.
 * No data is persisted to localStorage or backend.
 */

'use client';

import * as React from 'react';
import type {
  AssessmentSession,
  QuestionResponse,
  AssessmentModule,
  PatternScore,
  ResponseValue,
  AssessmentResults,
} from '@/types/assessment';
import {
  calculateModulePatterns,
  getVisibleQuestions,
} from '@/lib/pattern-calculator';

interface AssessmentContextValue {
  // Current session
  session: AssessmentSession | null;
  
  // Actions
  startAssessment: (module: AssessmentModule, disorderId: string) => void;
  recordResponse: (questionId: string, value: ResponseValue) => void;
  goToNextQuestion: () => void;
  goToPreviousQuestion: () => void;
  exitAssessment: () => void;
  completeAssessment: () => void;
  
  // Computed state
  currentQuestionIndex: number;
  totalQuestions: number;
  progress: number; // 0-100
  canGoBack: boolean;
  canGoNext: boolean;
  
  // Results
  results: AssessmentResults | null;
  getPatternScores: (module: AssessmentModule) => PatternScore[];
}

const AssessmentContext = React.createContext<AssessmentContextValue | undefined>(
  undefined
);

export function AssessmentProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = React.useState<AssessmentSession | null>(null);
  const [results, setResults] = React.useState<AssessmentResults | null>(null);
  const [moduleData, setModuleData] = React.useState<AssessmentModule | null>(null);

  /**
   * Start a new assessment session
   */
  const startAssessment = React.useCallback((module: AssessmentModule, disorderId: string) => {
    setModuleData(module);
    setSession({
      module_id: module.module.id,
      disorder_id: disorderId,
      started_at: Date.now(),
      responses: [],
      current_question_index: 0,
      completed: false,
    });
    setResults(null);
  }, []);

  /**
   * Record a response to the current question
   */
  const recordResponse = React.useCallback((questionId: string, value: ResponseValue) => {
    setSession((prev) => {
      if (!prev) return prev;

      const existingIndex = prev.responses.findIndex(
        (r) => r.question_id === questionId
      );

      const newResponse: QuestionResponse = {
        question_id: questionId,
        value,
        timestamp: Date.now(),
      };

      const responses =
        existingIndex >= 0
          ? prev.responses.map((r, i) => (i === existingIndex ? newResponse : r))
          : [...prev.responses, newResponse];

      return {
        ...prev,
        responses,
      };
    });
  }, []);

  /**
   * Navigate to next question
   */
  const goToNextQuestion = React.useCallback(() => {
    setSession((prev) => {
      if (!prev || !moduleData) return prev;

      const disorder = moduleData.disorders.find(d => d.id === prev.disorder_id);
      if (!disorder) return prev;

      const visibleQuestions = getVisibleQuestions(disorder, prev.responses);
      const nextIndex = prev.current_question_index + 1;

      if (nextIndex >= visibleQuestions.length) {
        return prev; // Already at last question
      }

      return {
        ...prev,
        current_question_index: nextIndex,
      };
    });
  }, [moduleData]);

  /**
   * Navigate to previous question
   */
  const goToPreviousQuestion = React.useCallback(() => {
    setSession((prev) => {
      if (!prev) return prev;

      const prevIndex = prev.current_question_index - 1;
      if (prevIndex < 0) return prev;

      return {
        ...prev,
        current_question_index: prevIndex,
      };
    });
  }, []);

  /**
   * Exit assessment (clear session)
   */
  const exitAssessment = React.useCallback(() => {
    setSession(null);
    setResults(null);
    setModuleData(null);
  }, []);

  /**
   * Complete assessment and generate results
   */
  const completeAssessment = React.useCallback(() => {
    if (!session || !moduleData) return;

    const patternScores = calculateModulePatterns(moduleData, session.responses);

    setResults({
      module_id: session.module_id,
      module_title: moduleData.module.title,
      completed_at: Date.now(),
      pattern_scores: patternScores,
      total_questions: moduleData.disorders.reduce(
        (sum, d) => sum + d.questions.length,
        0
      ),
      total_responses: session.responses.length,
    });

    setSession((prev) => (prev ? { ...prev, completed: true } : prev));
  }, [session, moduleData]);

  /**
   * Get pattern scores for current session
   */
  const getPatternScores = React.useCallback(
    (module: AssessmentModule): PatternScore[] => {
      if (!session) return [];
      setModuleData(module);
      return calculateModulePatterns(module, session.responses);
    },
    [session]
  );

  /**
   * Computed values
   */
  const currentQuestionIndex = session?.current_question_index ?? 0;
  
  const totalQuestions = React.useMemo(() => {
    if (!session || !moduleData) return 0;
    const disorder = moduleData.disorders.find(d => d.id === session.disorder_id);
    if (!disorder) return 0;
    return getVisibleQuestions(disorder, session.responses).length;
  }, [session, moduleData]);

  const progress = React.useMemo(() => {
    if (totalQuestions === 0) return 0;
    return Math.round((currentQuestionIndex / totalQuestions) * 100);
  }, [currentQuestionIndex, totalQuestions]);

  const canGoBack = currentQuestionIndex > 0;
  const canGoNext = session ? currentQuestionIndex < totalQuestions - 1 : false;

  const value: AssessmentContextValue = {
    session,
    startAssessment,
    recordResponse,
    goToNextQuestion,
    goToPreviousQuestion,
    exitAssessment,
    completeAssessment,
    currentQuestionIndex,
    totalQuestions,
    progress,
    canGoBack,
    canGoNext,
    results,
    getPatternScores,
  };

  return (
    <AssessmentContext.Provider value={value}>
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const context = React.useContext(AssessmentContext);
  if (context === undefined) {
    throw new Error('useAssessment must be used within AssessmentProvider');
  }
  return context;
}
