# Question Flow Engine

Core assessment engine for the Arabic DSM-5-TR self-evaluation platform.

## Overview

The question flow engine renders assessment questions, captures user responses, tracks progress, and calculates pattern scores based on DSM-5-TR criteria without providing medical diagnoses.

## Features

### ✅ Response Types
- **Frequency Scale (5-point Likert)**: never → rarely → sometimes → often → always
- **Yes/No**: Binary choice questions
- **Duration Scale**: Time period selection (2 weeks → 6+ months)
- **Multi-Select**: Multiple choice with checkboxes

### ✅ Progress Tracking
- Question counter (e.g., "سؤال 5 من 15")
- Progress bar (0-100%)
- Visual completion indicator

### ✅ Navigation
- **Back/Next buttons**: Navigate between questions
- **Exit option**: Confirmation dialog before exiting
- **Keyboard support**: Escape to exit, Arrow keys for response selection

### ✅ Conditional Logic
- Questions can depend on previous answers
- Supports comparisons: `>=`, `>`, `<=`, `<`, exact match
- Example: "How long?" only shows if frequency >= "sometimes"

### ✅ Pattern Calculation
- Scores responses by DSM-5-TR criterion (A, B, C1, etc.)
- Groups patterns by disorder
- Calculates symptom presence (frequency >= "sometimes" or yes = present)
- Generates non-diagnostic summary text

### ✅ Data Privacy
- **Session-only storage**: React Context (no localStorage, no backend)
- Data cleared on exit or page refresh
- Complies with anonymous-first architecture (ADR-001)

### ✅ Accessibility (WCAG 2.2 Level AA)
- Semantic HTML with proper ARIA attributes
- Keyboard navigation (Arrow keys, Enter, Escape)
- Screen reader support with live regions
- Large touch targets (48px minimum)
- Focus indicators on all interactive elements
- RTL-aware layout

## Architecture

```
src/
├── types/
│   └── assessment.ts          # TypeScript types for questions, responses, patterns
├── lib/
│   └── pattern-calculator.ts  # Pattern scoring and conditional logic
├── contexts/
│   └── assessment-context.tsx # React Context for session state
├── components/assessment/
│   ├── frequency-scale.tsx     # 5-point Likert scale
│   ├── yes-no-response.tsx     # Binary choice
│   ├── duration-scale.tsx      # Time period selection
│   ├── multi-select-response.tsx # Multiple choice
│   ├── question-renderer.tsx   # Question display orchestrator
│   └── question-flow.tsx       # Navigation and progress container
└── app/
    ├── assessment/[moduleId]/[disorderId]/page.tsx  # Assessment route
    └── results/[moduleId]/page.tsx                  # Results display (placeholder)
```

## Usage

### 1. Content Structure

Questions are defined in JSON files under `/content/`:

```json
{
  "module": {
    "id": "anxiety",
    "title": "اضطرابات القلق",
    "description": "استكشف أنماط القلق..."
  },
  "disorders": [
    {
      "id": "gad",
      "name": "اضطراب القلق المعمم",
      "educational_intro": { ... },
      "questions": [
        {
          "id": "gad_q1",
          "criterion": "A",
          "text": "هل تشعر بالقلق أو الانشغال...",
          "help_text": "فكر في الأسابيع الأخيرة...",
          "response_type": "frequency_5point",
          "required": true
        },
        {
          "id": "gad_q2",
          "criterion": "A",
          "text": "منذ متى وأنت تشعر بهذا القلق؟",
          "response_type": "duration",
          "required": true,
          "conditional": {
            "depends_on": "gad_q1",
            "show_if": ">=2"
          }
        }
      ]
    }
  ]
}
```

### 2. Starting an Assessment

Navigate to: `/assessment/{moduleId}/{disorderId}`

Example: `/assessment/anxiety/gad`

### 3. Using the Context

```tsx
import { useAssessment } from '@/contexts/assessment-context';

function MyComponent() {
  const {
    session,              // Current session state
    startAssessment,      // Start new assessment
    recordResponse,       // Save answer
    goToNextQuestion,     // Navigate forward
    goToPreviousQuestion, // Navigate backward
    exitAssessment,       // Clear session
    completeAssessment,   // Finish and calculate
    currentQuestionIndex, // 0-based index
    totalQuestions,       // Visible question count
    progress,             // 0-100 percentage
    canGoBack,            // Boolean
    canGoNext,            // Boolean
    results,              // Pattern scores after completion
  } = useAssessment();
}
```

### 4. Rendering Questions

```tsx
import { QuestionRenderer } from '@/components/assessment';

<QuestionRenderer
  question={currentQuestion}
  value={currentResponse}
  onChange={handleResponseChange}
/>
```

## Pattern Calculation Logic

### Frequency to Score Mapping
- `never` → 0
- `rarely` → 1
- `sometimes` → 2
- `often` → 3
- `always` → 4

### Symptom Presence Threshold
A symptom is considered "present" if:
- Frequency score >= 2 ("sometimes" or higher)
- Yes/No = "yes"

### Criterion Scoring
Each DSM-5-TR criterion (A, B, C1, etc.) is scored by averaging all related question responses.

### Pattern Score Output
```typescript
{
  disorder_id: "gad",
  disorder_name: "اضطراب القلق المعمم",
  criterion_scores: { "A": 3.2, "B": 2.8, "C1": 3.0 },
  total_symptoms: 7,
  max_symptoms: 10,
  percentage: 70
}
```

## Conditional Question Logic

Questions can show/hide based on previous answers:

```typescript
{
  "conditional": {
    "depends_on": "gad_q1",     // Must answer this first
    "show_if": ">=2"            // Show if frequency >= "sometimes"
  }
}
```

Supported operators:
- `>=`, `>`, `<=`, `<` for frequency comparisons
- Exact string match (e.g., `"yes"`, `"no"`)

## Testing Checklist

- [ ] All response types render correctly
- [ ] Keyboard navigation works (Arrow keys, Enter, Escape)
- [ ] Progress bar updates accurately
- [ ] Back/Next buttons enable/disable correctly
- [ ] Exit confirmation dialog appears on exit
- [ ] Conditional questions show/hide correctly
- [ ] Pattern calculation matches criteria mapping
- [ ] No data persists after exit (check React DevTools)
- [ ] Screen reader announces progress and errors
- [ ] Touch targets are at least 48px
- [ ] RTL layout displays correctly

## Dependencies

- React 19 (with hooks)
- Next.js 16 (App Router)
- Tailwind CSS v4 (RTL utilities)
- shadcn/ui components (Button, Dialog, Progress)

## Future Enhancements (Out of Scope for This Task)

- [ ] Question validation with error messages
- [ ] Save/resume session (requires user accounts)
- [ ] Detailed results display with recommendations
- [ ] Crisis intervention system for depression module
- [ ] Analytics tracking for question completion rates
- [ ] Accessibility testing with real screen readers

## Related Tasks

- **Content Task**: Provided Arabic question content in JSON format
- **RTL Component Library**: Provided base UI components
- **Anxiety Module**: Will integrate this question engine
- **Depression Module**: Will integrate with crisis system
- **Results Display**: Separate task for full results UI

## References

- [DSM-5-TR Criteria Mapping](../../docs/discovery/05_criteria_mapping.md)
- [Anonymous-First Architecture](../../docs/ADR-001-anonymous-first-architecture.md)
- [WCAG 2.2 Level AA](https://www.w3.org/WAI/WCAG22/quickref/)
- [React Context API](https://react.dev/reference/react/useContext)
