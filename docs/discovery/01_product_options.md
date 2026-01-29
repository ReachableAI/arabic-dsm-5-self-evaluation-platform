# Product Options & UX Flows

> 5 distinct product concepts for the Arabic DSM-5-TR Self-Evaluation Platform

---

## Option 1: "رحلتي" (My Journey) — Guided Linear Flow

### Concept
A step-by-step guided experience that walks users through one category at a time with calming visuals and supportive messaging. Best for users who want structure and don't know where to start.

### Target User
First-time users, those experiencing general distress but unsure of the cause.

### Key Screens
1. **Welcome** — Calming illustration, language selector, disclaimer acceptance
2. **Mood Check-In** — "How are you feeling today?" visual selector (5 mood states)
3. **Category Recommendation** — Based on mood, suggest starting category
4. **Question Flow** — 8-15 questions per category, progress bar, skip option
5. **Reflection Summary** — Visual summary (no scores), key patterns highlighted
6. **Resources** — Relevant articles, crisis lines, "Talk to someone" CTA

### Question Flow Pattern
```
[Mood Check] → [Recommended Category] → [Questions 1-15] → [Summary] → [Resources]
                     ↓
              [Browse Other Categories]
```

### Feedback Style
- Narrative summaries: "Your responses suggest you often feel worried about many things..."
- Visual metaphors: Growing plant for progress, weather for mood states
- No numerical scores or severity labels

### Disclaimers
- Before starting: "This is a self-reflection tool, not a medical assessment"
- After summary: "Consider speaking with a mental health professional"

---

## Option 2: "استكشف" (Explore) — Browse & Select Flow

### Concept
A category browser that lets users choose what they want to learn about. Emphasises education and self-directed exploration over assessment.

### Target User
Curious users, those researching specific topics (e.g., "Do I have ADHD?").

### Key Screens
1. **Home Dashboard** — 4 category cards with illustrations, search bar
2. **Category Overview** — Description, "What you'll explore", time estimate
3. **Sub-category Selector** — E.g., GAD vs Social Anxiety vs Panic
4. **Educational Content** — "What is [condition]?" with illustrations
5. **Self-Check Questions** — Optional, clearly labelled as reflection
6. **Learn More** — Deep-dive content, related categories, resources

### Question Flow Pattern
```
[Browse Categories] → [Select Category] → [Learn About It] → [Optional Self-Check] → [Resources]
                                               ↓
                                    [Related Categories]
```

### Feedback Style
- Educational framing: "People with GAD often experience..."
- Comparison cards: "GAD vs Normal Worry — What's the difference?"
- Community insights: "Many people who selected these responses also found..."

### Disclaimers
- Category cards: "Educational information only"
- Self-check: "This reflection is for your awareness, not diagnosis"

---

## Option 3: "مرآة" (Mirror) — Quick Screening Focus

### Concept
Fast, focused screening tools inspired by validated instruments (PHQ-style). Users get rapid feedback and are encouraged to explore further.

### Target User
Users who want quick answers, those pressed for time.

### Key Screens
1. **Quick Start** — "2-minute check-in" prominent CTA
2. **Rapid Assessment** — 9-10 questions, simple yes/no or frequency scale
3. **Instant Reflection** — Traffic-light indicator (green/yellow/red zones)
4. **Deep Dive Option** — "Want to explore further?" → full assessment
5. **Action Steps** — Clear next steps based on reflection zone

### Question Flow Pattern
```
[Quick Check] → [9 Questions] → [Zone Result] → [Explore More?] → [Full Assessment or Resources]
                                                       ↓
                                              [Save for Later] (anonymous local storage)
```

### Feedback Style
- Zone-based: "Your responses are in the 'worth exploring' zone"
- Action-oriented: "Here's what people in this zone often do next..."
- No clinical terminology

### Disclaimers
- Before: "This is a brief reflection, not a comprehensive assessment"
- Result: "Zones are guides for self-reflection, not diagnoses"

---

## Option 4: "حكايتي" (My Story) — Narrative Journey

### Concept
Story-driven experience using metaphors and scenarios. Questions are embedded in relatable situations rather than clinical language.

### Target User
Users uncomfortable with clinical framing, younger audiences, those who prefer storytelling.

### Key Screens
1. **Character Selection** — Choose an avatar that resonates
2. **Scenario Introduction** — "Let's explore a typical week..."
3. **Situation Cards** — "You're at work and feel overwhelmed. What happens next?"
4. **Pattern Discovery** — "Your character often feels..." (based on choices)
5. **Story Conclusion** — Narrative summary with gentle insights
6. **Character Resources** — "Here's what others like you have found helpful"

### Question Flow Pattern
```
[Choose Character] → [Enter Story] → [Make Choices] → [Discover Patterns] → [Resources for Your Type]
```

### Feedback Style
- Character-based: "Characters like yours often benefit from..."
- Narrative: Story arc with beginning, exploration, insight
- Shareable: "Your story type" (no clinical data shared)

### Disclaimers
- Story intro: "This is a reflection exercise using scenarios"
- Conclusion: "Real life is more complex — consider professional support"

---

## Option 5: "دليلي" (My Guide) — Companion + Progress Tracking

### Concept
An AI-like companion that guides users through multiple sessions, tracking patterns over time (stored locally, anonymously). Emphasises ongoing self-awareness.

### Target User
Users who want to track changes, those working with therapists who want supplementary tools.

### Key Screens
1. **Meet Your Guide** — Friendly avatar introduction, privacy explanation
2. **First Session** — Comprehensive baseline across all 4 categories
3. **Weekly Check-In** — Shorter follow-up, tracks changes
4. **Progress View** — Visual trends (no raw scores), celebration of streaks
5. **Guide Insights** — "Your guide noticed..." personalised observations
6. **Share Summary** — Export anonymised summary for therapist (optional)

### Question Flow Pattern
```
[First Visit: Baseline] → [Weekly Check-Ins] → [Track Progress] → [Guide Insights] → [Export/Share]
                                ↓
                    [Local Storage Only — No Account]
```

### Feedback Style
- Companion voice: "I noticed you've been feeling more energetic this week"
- Trend-based: Visual graphs showing patterns over time
- Encouraging: Celebrates consistency and positive changes

### Disclaimers
- Setup: "All data stays on your device. Nothing is uploaded."
- Progress: "Patterns are for self-awareness, not clinical tracking"

---

## Recommendation

For MVP, we recommend combining elements from **Option 1 (Guided Flow)** and **Option 2 (Browse & Select)**:

### Hybrid Approach: "رحلتي واستكشافي" (My Journey & Exploration)

| Feature | Source | Rationale |
|---------|--------|-----------|
| Welcome + mood check-in | Option 1 | Warm onboarding, sets tone |
| Category browser | Option 2 | Self-directed exploration |
| Guided question flow | Option 1 | Structure for those who need it |
| Educational content | Option 2 | Value beyond assessment |
| Narrative feedback | Option 4 | Gentle, non-clinical framing |
| Quick check option | Option 3 | For return users |

This hybrid serves both exploratory users and those seeking structured guidance, while the anonymous-only model aligns with Option 5's privacy focus without requiring local storage complexity in MVP.

---

## Flow Comparison Matrix

| Feature | Option 1 | Option 2 | Option 3 | Option 4 | Option 5 |
|---------|----------|----------|----------|----------|----------|
| Entry Point | Mood check | Browse | Quick start | Character | Companion |
| Flow Type | Linear | Non-linear | Fast linear | Narrative | Multi-session |
| Feedback | Summary | Educational | Zones | Story | Trends |
| Time Investment | 15-20 min | 5-30 min | 2-5 min | 20-30 min | Ongoing |
| Repeat Use | Low | Medium | High | Low | High |
| Technical Complexity | Low | Medium | Low | High | High |
| MVP Fit | ✅ | ✅ | ✅ | Phase 2 | Phase 3 |
