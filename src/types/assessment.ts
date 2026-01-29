/**
 * Assessment type definitions
 * 
 * Supports multiple response types:
 * - frequency_5point: 5-point Likert scale (never → always)
 * - yes_no: Binary choice
 * - multi_select: Multiple options
 * - duration: Time period selection
 */

export type ResponseType = 
  | 'frequency_5point'
  | 'yes_no'
  | 'yes_no_frequency'
  | 'yes_no_duration'
  | 'multi_select'
  | 'duration'
  | 'weight_appetite_change'
  | 'sleep_change'
  | 'impairment_scale';

export type FrequencyValue = 'never' | 'rarely' | 'sometimes' | 'often' | 'always';
export type YesNoValue = 'yes' | 'no';
export type DurationValue = 'less_2_weeks' | '2_4_weeks' | '1_3_months' | '3_6_months' | '6_months_plus';

export interface CompositeResponseValue {
  occurrence?: YesNoValue;
  duration?: number;
  frequency?: number;
  changed?: 'no_change' | 'changed';
  direction?: 'decreased' | 'increased';
}

export type ResponseValue =
  | FrequencyValue
  | YesNoValue
  | DurationValue
  | number
  | string
  | string[]
  | CompositeResponseValue;

export interface ResponseScaleOption {
  value: string | number;
  label: string;
  label_en?: string;
  description?: string;
}

export interface ResponseScalePart {
  id: string;
  type: 'radio';
  conditional?: {
    show_if: string;
  };
  options: ResponseScaleOption[];
}

export interface ResponseScale {
  type: 'radio' | 'checkbox' | 'composite';
  options?: ResponseScaleOption[];
  parts?: ResponseScalePart[];
  min_selections?: number;
  max_selections?: number | null;
}

/**
 * Conditional display logic for questions
 */
export interface QuestionConditional {
  depends_on: string; // Question ID
  show_if: string; // Condition (e.g., ">=2", "yes", etc.)
}

/**
 * Question definition
 */
export interface Question {
  id: string;
  criterion: string; // DSM-5-TR criterion (e.g., "A", "B", "C1")
  text: string; // Arabic question text
  help_text?: string; // Helper text
  response_type: ResponseType;
  required: boolean;
  conditional?: QuestionConditional;
  options?: Array<{
    id?: string;
    value?: string;
    label?: string;
    text?: string;
    criterion?: string;
  }>;
  risk_flag?: 'CRITICAL' | 'HIGH' | 'MODERATE'; // Risk level for crisis detection
  crisis_trigger?: {
    show_modal_if: string; // Condition (e.g., ">=1")
    modal_type: 'suicidal_ideation' | 'self_harm' | 'general_distress';
  };
}

/**
 * Educational intro for disorders
 */
export interface EducationalIntro {
  title: string;
  body: string;
  key_points: string[];
  safety_note?: string; // Optional safety warning
}

/**
 * Disorder definition
 */
export interface Disorder {
  id: string;
  name: string;
  name_en: string;
  educational_intro: EducationalIntro;
  questions: Question[];
}

/**
 * Assessment module (e.g., Anxiety, Depression)
 */
export interface AssessmentModule {
  module: {
    id: string;
    title: string;
    title_en: string;
    description: string;
    icon: string;
    color: string;
  };
  disorders: Disorder[];
  response_scales?: Record<string, ResponseScale>;
}

/**
 * User response to a question
 */
export interface QuestionResponse {
  question_id: string;
  value: ResponseValue;
  timestamp: number;
}

/**
 * Pattern score for a disorder
 */
export interface PatternScore {
  disorder_id: string;
  disorder_name: string;
  disorder_name_en: string;
  criterion_scores: Record<string, number>; // e.g., {"A": 3, "B": 2}
  total_symptoms: number;
  max_symptoms: number;
  percentage: number;
}

/**
 * Assessment session state
 */
export interface AssessmentSession {
  module_id: string;
  disorder_id: string;
  started_at: number;
  responses: QuestionResponse[];
  current_question_index: number;
  completed: boolean;
}

/**
 * Assessment results summary
 */
export interface AssessmentResults {
  module_id: string;
  module_title: string;
  completed_at: number;
  pattern_scores: PatternScore[];
  total_questions: number;
  total_responses: number;
}
