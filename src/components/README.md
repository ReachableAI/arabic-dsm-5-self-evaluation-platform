# UI Components

This directory contains reusable UI components for the Arabic DSM-5-TR Self-Evaluation Platform.

## Structure

- `ui/` - Core UI components (buttons, cards, inputs, etc.)
- `assessment/` - Assessment-specific components (MoodSelector, QuestionCard, etc.)
- `layout/` - Layout components (headers, footers, navigation)

## Guidelines

- All components should support RTL layout using CSS Logical Properties
- Follow WCAG 2.1 AA accessibility standards
- Use Tailwind CSS v4 with design tokens from globals.css
- Include TypeScript types for all props
- Prefer composition over inheritance
