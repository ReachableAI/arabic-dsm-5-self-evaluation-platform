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
import type {
  Question,
  ResponseValue,
  ResponseScale,
  CompositeResponseValue,
} from '@/types/assessment';
import { FrequencyScale } from './frequency-scale';
import { YesNoResponse } from './yes-no-response';
import { DurationScale } from './duration-scale';
import { MultiSelectResponse } from './multi-select-response';
import { OptionListResponse } from './option-list-response';

export interface QuestionRendererProps {
  question: Question;
  value?: ResponseValue;
  onChange?: (value: ResponseValue) => void;
  className?: string;
  responseScales?: Record<string, ResponseScale>;
}

export function QuestionRenderer({
  question,
  value,
  onChange,
  className,
  responseScales,
}: QuestionRendererProps) {
  const questionId = `question-${question.id}`;
  const helpId = `help-${question.id}`;
  const scale = responseScales?.[question.response_type];
  const compositeValue =
    value && typeof value === 'object' && !Array.isArray(value)
      ? (value as CompositeResponseValue)
      : {};

  const mappedMultiSelectOptions =
    question.options
      ?.map((option) => ({
        value: option.value ?? option.id ?? option.text ?? '',
        label: option.label ?? option.text ?? option.value ?? option.id ?? '',
      }))
      .filter((option) => option.value && option.label) ?? [];

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
            value={value as string | number}
            onChange={onChange}
            aria-label={question.text}
            options={
              scale?.options?.map((option) => ({
                value: option.value,
                label: option.label,
                shortLabel: option.label,
              }))
            }
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
            value={value as string | number}
            onChange={onChange}
            aria-label={question.text}
            options={
              scale?.options?.map((option) => ({
                value: option.value,
                label: option.label,
              })) ?? undefined
            }
          />
        )}

        {question.response_type === 'impairment_scale' && scale?.options && (
          <OptionListResponse
            options={scale.options.map((option) => ({
              value: option.value,
              label: option.label,
              description: option.description,
            }))}
            value={value as string | number}
            onChange={onChange}
            aria-label={question.text}
          />
        )}

        {question.response_type === 'sleep_change' && scale?.options && (
          <OptionListResponse
            options={scale.options.map((option) => ({
              value: option.value,
              label: option.label,
              description: option.description,
            }))}
            value={value as string | number}
            onChange={onChange}
            aria-label={question.text}
          />
        )}

        {question.response_type === 'time_consumed' && scale?.options && (
          <OptionListResponse
            options={scale.options.map((option) => ({
              value: option.value,
              label: option.label,
              description: option.description,
            }))}
            value={value as string | number}
            onChange={onChange}
            aria-label={question.text}
          />
        )}

        {question.response_type === 'insight_level' && scale?.options && (
          <OptionListResponse
            options={scale.options.map((option) => ({
              value: option.value,
              label: option.label,
              description: option.description,
            }))}
            value={value as string | number}
            onChange={onChange}
            aria-label={question.text}
          />
        )}

        {question.response_type === 'symptom_duration' && scale?.options && (
          <OptionListResponse
            options={scale.options.map((option) => ({
              value: option.value,
              label: option.label,
              description: option.description,
            }))}
            value={value as string | number}
            onChange={onChange}
            aria-label={question.text}
          />
        )}

        {question.response_type === 'trauma_duration' && scale?.options && (
          <OptionListResponse
            options={scale.options.map((option) => ({
              value: option.value,
              label: option.label,
              description: option.description,
            }))}
            value={value as string | number}
            onChange={onChange}
            aria-label={question.text}
          />
        )}

        {question.response_type === 'yes_no_frequency' && scale?.parts && (
          <div className="flex flex-col gap-4">
            <YesNoResponse
              value={compositeValue.occurrence as 'yes' | 'no' | undefined}
              onChange={(nextValue) => {
                const nextComposite: CompositeResponseValue = {
                  ...compositeValue,
                  occurrence: nextValue,
                };
                if (nextValue === 'no') {
                  delete nextComposite.frequency;
                }
                onChange?.(nextComposite);
              }}
              aria-label={question.text}
            />

            {compositeValue.occurrence === 'yes' && (
              <OptionListResponse
                options={
                  scale.parts
                    .find((part) => part.id === 'frequency')
                    ?.options.map((option) => ({
                      value: option.value,
                      label: option.label,
                      description: option.description,
                    })) ?? []
                }
                value={compositeValue.frequency}
                onChange={(nextValue) => {
                  onChange?.({
                    ...compositeValue,
                    occurrence: 'yes',
                    frequency: Number(nextValue),
                  });
                }}
                aria-label="مدى تكرار النوبات"
              />
            )}
          </div>
        )}

        {question.response_type === 'yes_no_duration' && scale?.parts && (
          <div className="flex flex-col gap-4">
            <YesNoResponse
              value={compositeValue.occurrence as 'yes' | 'no' | undefined}
              onChange={(nextValue) => {
                const nextComposite: CompositeResponseValue = {
                  ...compositeValue,
                  occurrence: nextValue,
                };
                if (nextValue === 'no') {
                  delete nextComposite.duration;
                }
                onChange?.(nextComposite);
              }}
              aria-label={question.text}
            />

            {compositeValue.occurrence === 'yes' && (
              <OptionListResponse
                options={
                  scale.parts
                    .find((part) => part.id === 'duration')
                    ?.options.map((option) => ({
                      value: option.value,
                      label: option.label,
                      description: option.description,
                    })) ?? []
                }
                value={compositeValue.duration}
                onChange={(nextValue) => {
                  onChange?.({
                    ...compositeValue,
                    occurrence: 'yes',
                    duration: Number(nextValue),
                  });
                }}
                aria-label="مدة استمرار المشاعر"
              />
            )}
          </div>
        )}

        {question.response_type === 'weight_appetite_change' && scale?.parts && (
          <div className="flex flex-col gap-4">
            <OptionListResponse
              options={
                scale.parts
                  .find((part) => part.id === 'changed')
                  ?.options.map((option) => ({
                    value: option.value,
                    label: option.label,
                    description: option.description,
                  })) ?? []
              }
              value={compositeValue.changed}
              onChange={(nextValue) => {
                const nextComposite: CompositeResponseValue = {
                  ...compositeValue,
                  changed: nextValue as CompositeResponseValue['changed'],
                };
                if (nextValue === 'no_change') {
                  delete nextComposite.direction;
                }
                onChange?.(nextComposite);
              }}
              aria-label="تغير الوزن أو الشهية"
            />

            {compositeValue.changed === 'changed' && (
              <OptionListResponse
                options={
                  scale.parts
                    .find((part) => part.id === 'direction')
                    ?.options.map((option) => ({
                      value: option.value,
                      label: option.label,
                      description: option.description,
                    })) ?? []
                }
                value={compositeValue.direction}
                onChange={(nextValue) => {
                  onChange?.({
                    ...compositeValue,
                    changed: 'changed',
                    direction: nextValue as CompositeResponseValue['direction'],
                  });
                }}
                aria-label="اتجاه التغير"
              />
            )}
          </div>
        )}

        {question.response_type === 'multi_select' && mappedMultiSelectOptions.length > 0 && (
          <MultiSelectResponse
            options={mappedMultiSelectOptions}
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
