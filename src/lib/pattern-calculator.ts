/**
 * Pattern calculation utilities
 * 
 * Calculates disorder pattern scores based on DSM-5-TR criteria mapping.
 * Uses frequency responses to determine symptom presence without diagnosis.
 */

import type {
  AssessmentModule,
  CompositeResponseValue,
  Disorder,
  Question,
  QuestionResponse,
  PatternScore,
  FrequencyValue,
  ResponseValue,
} from '@/types/assessment';

/**
 * Convert frequency value to numeric score (0-4)
 */
export function frequencyToScore(value: FrequencyValue | string | number): number {
  if (typeof value === 'number') return value;
  const scores: Record<string, number> = {
    never: 0,
    rarely: 1,
    sometimes: 2,
    often: 3,
    always: 4,
  };
  return scores[value] ?? 0;
}

function responseToScore(question: Question, value: ResponseValue): number {
  if (value === null || value === undefined) return 0;

  if (typeof value === 'number') {
    return value;
  }

  if (typeof value === 'string') {
    if (value === 'yes') return 4;
    if (value === 'no') return 0;
    if (value === 'no_change' || value === 'normal') return 0;
    if (value === 'changed') return 4;
    return frequencyToScore(value);
  }

  if (Array.isArray(value)) {
    return value.length > 0 ? 4 : 0;
  }

  const composite = value as CompositeResponseValue;
  if (composite.occurrence) {
    return composite.occurrence === 'yes' ? 4 : 0;
  }
  if (composite.changed) {
    return composite.changed === 'changed' ? 4 : 0;
  }

  return 0;
}

/**
 * Check if a question should be shown based on conditional logic
 */
export function shouldShowQuestion(
  question: Question,
  responses: QuestionResponse[]
): boolean {
  if (!question.conditional) {
    return true;
  }

  const dependsOnResponse = responses.find(
    r => r.question_id === question.conditional!.depends_on
  );

  if (!dependsOnResponse) {
    return false;
  }

  const condition = question.conditional.show_if;
  const value = dependsOnResponse.value;

  // Handle frequency comparisons (e.g., ">=2")
  if (condition.startsWith('>=') || condition.startsWith('>') || 
      condition.startsWith('<=') || condition.startsWith('<')) {
    const operator = condition.match(/^[><=]+/)?.[0];
    const threshold = parseInt(condition.replace(/^[><=]+/, ''), 10);
    const score = frequencyToScore(value as FrequencyValue);

    switch (operator) {
      case '>=': return score >= threshold;
      case '>': return score > threshold;
      case '<=': return score <= threshold;
      case '<': return score < threshold;
      default: return false;
    }
  }

  // Handle exact matches (e.g., "yes")
  if (typeof value === 'string' || typeof value === 'number') {
    return value === condition;
  }

  if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
    const composite = value as CompositeResponseValue;
    if (composite.occurrence) {
      return composite.occurrence === condition;
    }
    if (composite.changed) {
      return composite.changed === condition;
    }
  }

  return false;
}

/**
 * Get all visible questions for a disorder
 */
export function getVisibleQuestions(
  disorder: Disorder,
  responses: QuestionResponse[]
): Question[] {
  return disorder.questions.filter(q => shouldShowQuestion(q, responses));
}

/**
 * Calculate criterion score (average frequency for all questions in criterion)
 */
function calculateCriterionScore(
  criterion: string,
  questions: Question[],
  responses: QuestionResponse[]
): number {
  const criterionQuestions = questions.filter(q => q.criterion === criterion);
  
  if (criterionQuestions.length === 0) {
    return 0;
  }

  const criterionResponses = responses.filter(r =>
    criterionQuestions.some(q => q.id === r.question_id)
  );

  if (criterionResponses.length === 0) {
    return 0;
  }

  const totalScore = criterionResponses.reduce((sum, response) => {
    const question = criterionQuestions.find(q => q.id === response.question_id);
    if (!question) return sum;
    return sum + responseToScore(question, response.value);
  }, 0);

  return totalScore / criterionResponses.length;
}

/**
 * Count symptoms present (frequency >= "sometimes" or yes/no = "yes")
 */
function countSymptoms(
  questions: Question[],
  responses: QuestionResponse[]
): number {
  let count = 0;

  for (const question of questions) {
    const response = responses.find(r => r.question_id === question.id);
    if (!response) continue;

    const score = responseToScore(question, response.value);
    if (score >= 2) { // "sometimes" or higher
      count++;
    }
  }

  return count;
}

/**
 * Calculate pattern score for a single disorder
 */
export function calculatePatternScore(
  disorder: Disorder,
  responses: QuestionResponse[]
): PatternScore {
  const visibleQuestions = getVisibleQuestions(disorder, responses);
  
  // Get unique criteria
  const criteria = Array.from(
    new Set(visibleQuestions.map(q => q.criterion))
  ).sort();

  // Calculate score for each criterion
  const criterion_scores: Record<string, number> = {};
  for (const criterion of criteria) {
    criterion_scores[criterion] = calculateCriterionScore(
      criterion,
      visibleQuestions,
      responses
    );
  }

  // Count total symptoms present
  const total_symptoms = countSymptoms(visibleQuestions, responses);
  const max_symptoms = visibleQuestions.length;
  const percentage = max_symptoms > 0 
    ? Math.round((total_symptoms / max_symptoms) * 100)
    : 0;

  return {
    disorder_id: disorder.id,
    disorder_name: disorder.name,
    disorder_name_en: disorder.name_en,
    criterion_scores,
    total_symptoms,
    max_symptoms,
    percentage,
  };
}

/**
 * Calculate pattern scores for all disorders in a module
 */
export function calculateModulePatterns(
  module: AssessmentModule,
  responses: QuestionResponse[]
): PatternScore[] {
  return module.disorders.map(disorder =>
    calculatePatternScore(disorder, responses)
  );
}

/**
 * Generate non-diagnostic summary text
 */
export function generateSummary(scores: PatternScore[]): string {
  const highestScore = Math.max(...scores.map(s => s.percentage));
  
  if (highestScore < 30) {
    return 'تظهر استجاباتك أنماطاً منخفضة من الأعراض في هذه الفئة. إذا كنت تشعر بضيق، فقد يكون من المفيد التحدث مع متخصص.';
  }
  
  if (highestScore < 60) {
    return 'تظهر استجاباتك بعض الأنماط التي قد تستحق الانتباه. التحدث مع متخصص يمكن أن يساعدك على فهم مشاعرك بشكل أفضل.';
  }
  
  return 'تظهر استجاباتك أنماطاً ملحوظة من الأعراض. نوصي بشدة بالتحدث مع متخصص في الصحة النفسية للحصول على التقييم والدعم المناسبين.';
}
