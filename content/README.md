# Arabic Assessment Content — README

## Overview

This directory contains all Arabic content for the DSM-5-TR Self-Evaluation Platform MVP (Phase 1). Content is structured as JSON for easy integration with the Next.js frontend.

## Content Structure

```
content/
├── anxiety/
│   └── anxiety_module.json          # Anxiety disorders questions & educational content
├── depression/
│   └── depression_module.json       # Depression disorders questions & educational content
├── safety/
│   └── safety_disclaimers.json      # Crisis intervention, disclaimers, helplines
├── ui/
│   └── app_copy.json                # Welcome flow, navigation, results templates
└── README.md                         # This file
```

## File Descriptions

### `anxiety/anxiety_module.json`

**Coverage**: 3 anxiety disorders (MVP Phase 1)
- Generalized Anxiety Disorder (GAD) — 10 questions
- Panic Disorder — 4 questions
- Social Anxiety Disorder — 6 questions

**Mapped to DSM-5-TR Criteria**: See `docs/discovery/05_criteria_mapping.md`

**Features**:
- Educational intros for each disorder (gentle, supportive Arabic)
- 5-point frequency scale responses
- Duration and impairment questions
- Multi-select symptom checklist (Panic Disorder)
- Conditional logic (questions shown based on previous answers)

### `depression/depression_module.json`

**Coverage**: 2 depression disorders (MVP Phase 1)
- Major Depressive Disorder (MDD) — 11 questions
- Persistent Depressive Disorder (PDD) — 8 questions

**Mapped to DSM-5-TR Criteria**: See `docs/discovery/05_criteria_mapping.md`

**Features**:
- Educational intros with safety notes
- Criterion A9 (suicidal ideation) with **CRITICAL risk flag**
- Crisis modal trigger on any non-zero A9 response
- Composite response types (weight/appetite, sleep changes)
- Duration scales up to 2+ years (PDD)

### `safety/safety_disclaimers.json`

**Coverage**: All safety and legal content
- Pre-assessment disclaimer (4 sections + acknowledgment)
- In-flow safety reminders (3 types)
- Crisis intervention modal (suicidal ideation + general distress)
- Results screen disclaimer
- Regional helplines (UAE, Saudi, Egypt, Jordan, Lebanon, International)

**Features**:
- Crisis modal with **6 regional helplines** verified
- Persistent crisis footer (sticky on high-risk responses)
- Language framing guidelines (avoid/use-instead)
- Tone guidelines for supportive content

### `ui/app_copy.json`

**Coverage**: All UI text
- Welcome flow (3 screens)
- Category browser (4 categories, 2 available + 2 coming soon)
- Assessment UI (progress, navigation, validation)
- Results templates (pattern-based, not diagnostic)
- General UI (loading, errors, footer, accessibility)

**Features**:
- RTL-ready (language: "ar", direction: "rtl")
- Accessibility labels (screen reader support)
- Export option (PDF summary)
- Educational resource links

## Usage Guide

### Integration with Next.js

**Recommended approach**: Import JSON as static data or use as content API.

```typescript
// Example: Load anxiety module
import anxietyModule from '@/content/anxiety/anxiety_module.json';

// Access disorder
const gad = anxietyModule.disorders.find(d => d.id === 'gad');
console.log(gad.educational_intro.title); // "ما هو اضطراب القلق المعمم؟"

// Render questions
gad.questions.forEach(q => {
  console.log(q.text); // Arabic question text
});
```

### Response Scale Reference

All modules use shared response scales defined in each JSON file under `response_scales`:

- `frequency_5point`: 0 (Never) → 4 (Almost always)
- `duration`: 1 (< 2 weeks) → 7 (> 2 years)
- `impairment_scale`: 0 (No impact) → 4 (Severe impact)
- `yes_no`: Simple yes/no
- `yes_no_frequency`: Composite (occurrence + frequency if yes)
- `multi_select`: Checkbox list (Panic symptoms)
- `weight_appetite_change`: Composite (changed? + direction)
- `sleep_change`: Radio (normal/insomnia/hypersomnia/both)

### Conditional Logic

Questions with `conditional` field should only be shown if dependency is met:

```json
{
  "id": "gad_q2",
  "conditional": {
    "depends_on": "gad_q1",
    "show_if": ">=2"
  }
}
```

**Logic**: Show `gad_q2` only if `gad_q1` response value is >= 2 (Sometimes or higher).

### Crisis Trigger

Depression module question `mdd_q9` (suicidal ideation) has a crisis trigger:

```json
{
  "id": "mdd_q9",
  "risk_flag": "CRITICAL",
  "crisis_trigger": {
    "show_modal_if": ">=1",
    "modal_type": "suicidal_ideation"
  }
}
```

**Implementation**:
1. Check response value after user answers `mdd_q9`
2. If value >= 1 (any frequency), show `safety/safety_disclaimers.json` → `crisis_intervention_modal.suicidal_ideation`
3. Allow user to continue or view resources
4. Enable persistent crisis footer for remainder of session

## Content Quality Assurance

### Language Review

- [x] Native Arabic speaker review (Dr. Anwar Al-Hammadi translation used as reference)
- [x] Gentle, supportive tone throughout
- [x] No clinical jargon in user-facing content
- [x] Clear educational intros for each disorder

### DSM-5-TR Criteria Mapping

All questions mapped to specific DSM-5-TR criteria per `docs/discovery/05_criteria_mapping.md`:

| Module | Disorders | Questions | Criteria Coverage |
|--------|-----------|-----------|-------------------|
| Anxiety | GAD, Panic, Social | 20 total | A, B, C (1-6), D |
| Depression | MDD, PDD | 19 total | A (1-9), B (1-6), C, duration, impairment |

### Safety Compliance

- [x] Pre-assessment disclaimer (required acknowledgment)
- [x] Crisis intervention modal (suicidal ideation)
- [x] 6 regional helplines verified (as of Jan 2026)
- [x] Results disclaimer ("not a diagnosis")
- [x] Privacy notice (anonymous architecture)

### Accessibility

- [x] RTL-native Arabic layout
- [x] Screen reader labels (`accessibility` section in `ui/app_copy.json`)
- [x] Keyboard navigation text
- [x] Skip links and ARIA labels

## Maintenance

For detailed governance and maintenance procedures, see:
- **Content Governance Workflow**: `docs/planning/content_governance_workflow.md`
- **Content Change Log**: `content/CHANGELOG.md`

### Quick Reference

**Helpline Verification**: Quarterly (Jan, Apr, Jul, Oct) — verify all regional helplines  
**Resource Links**: Annual (January) — check all external links  
**New Module Approval**: Follow 7-stage governance workflow (Arabic review, safety review, schema validation, integration review, QA testing)

### Updating Helplines

Helplines should be verified quarterly. Update `safety/safety_disclaimers.json` → `regional_helplines.regions`.

See detailed procedure in `docs/planning/content_governance_workflow.md` → Safety Maintenance Cadence.

### Adding New Disorders

To add ADHD or OCD (Phase 2):

1. Create `content/adhd/adhd_module.json` or `content/ocd/ocd_module.json`
2. Follow same structure as `anxiety_module.json`
3. Map questions to criteria in `docs/discovery/05_criteria_mapping.md`
4. Add to `ui/app_copy.json` → `category_browser.categories` (change status from "قريباً" to active)
5. Update this README

### Translation (Phase 2)

For English or other languages:
1. Duplicate each JSON file (e.g., `anxiety_module.en.json`)
2. Translate all `text`, `title`, `body`, `description` fields
3. Keep `id`, `criterion`, `response_type` unchanged
4. Update `ui/app_copy.json` → `meta.language` and `meta.direction`

## Related Documentation

- `docs/discovery/05_criteria_mapping.md` — Question-to-DSM-5-TR criteria mapping
- `docs/discovery/03_privacy_framework.md` — Safety and privacy guidelines
- `docs/discovery/02_rtl_design_system.md` — Typography and visual design
- `docs/planning/mvp_implementation_plan.md` — Technical implementation roadmap

## License & Attribution

Content based on DSM-5-TR translation by Dr. Anwar Al-Hammadi (educational fair use).

Original question wording and educational content by HeyProduct (2026).

Not for clinical use. For educational self-reflection only.
