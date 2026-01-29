/**
 * Question Renderer Component
 * 
 * Flexible question rendering supporting multiple response types:
 * - frequency_5point: 5-point Likert scale
 * - yes_no: Binary choice
 * - multi_select: Multiple options
 * - duration: Time period selection
 * 
 * Features:
 * - RTL layout
 * - Accessible markup
 * - Help text support
 * - Required field indicators
 */

'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import type { Question, ResponseValue } from '@/types/assessment';
import { FrequencyScale } from './frequency-scale';
import { YesNoResponse } from './yes-no-response';
import { DurationScale } from './duration-scale';
import { MultiSelectResponse } from './multi-select-response';

export interface QuestionRendererProps {
  question: Question;
  value?: ResponseValue;
  onChange?: (value: ResponseValue) => void;
  className?: string;
}

export function QuestionRenderer({
  question,
  value,
  onChange,
  className,
}: QuestionRendererProps) {
  const questionId = `question-${question.id}`;
  const helpId = `help-${question.id}`;

  return (
    <div
      className={cn('flex flex-col gap-6', className)}
      role="group"
      aria-labelledby={questionId}
      aria-describedby={question.help_text ? helpId : undefined}
    >
      {/* Question text */}
      <div className="flex flex-col gap-2">
        <h3
          id={questionId}
          className="text-xl sm:text-2xl font-semibold text-text-primary leading-snug"
        >
          {question.text}
          {question.required && (
            <span className="text-primary mr-1" aria-label="مطلوب">
              *
            </span>
          )}
        </h3>
        
        {question.help_text && (
          <p
            id={helpId}
            className="text-base text-text-secondary leading-relaxed"
          >
            {question.help_text}
          </p>
        )}
      </div>

      {/* Response component based on type */}
      <div className="w-full">
        {question.response_type === 'frequency_5point' && (
          <FrequencyScale
            value={value as string}
            onChange={onChange}
            aria-label={question.text}
          />
        )}

        {question.response_type === 'yes_no' && (
          <YesNoResponse
            value={value as 'yes' | 'no'}
            onChange={onChange}
            aria-label={question.text}
          />
        )}

        {question.response_type === 'duration' && (
          <DurationScale
            value={value as string}
            onChange={onChange}
            aria-label={question.text}
          />
        )}

        {question.response_type === 'multi_select' && question.options && (
          <MultiSelectResponse
            options={question.options}
            value={value as string[]}
            onChange={onChange}
            aria-label={question.text}
          />
        )}
      </div>

      {/* Criterion indicator (subtle, for debugging/transparency) */}
      <div className="text-xs text-text-tertiary" aria-hidden="true">
        معيار: {question.criterion}
      </div>
    </div>
  );
}
