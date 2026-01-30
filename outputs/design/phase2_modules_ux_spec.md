# Phase 2 Modules UX Specification

**Version**: 1.0.0  
**Date**: 2026-01-29  
**Target Modules**: OCD, ADHD, PTSD  
**Design System**: Serenity (v1.0.0)  
**Accessibility**: WCAG 2.2 Level AA

---

## Table of Contents

1. [Overview](#overview)
2. [OCD Module Specification](#ocd-module-specification)
3. [ADHD Module Specification](#adhd-module-specification)
4. [PTSD Module Specification](#ptsd-module-specification)
5. [Safety & Disclaimer Patterns](#safety--disclaimer-patterns)
6. [Component Adjustments](#component-adjustments)
7. [Accessibility Requirements](#accessibility-requirements)

---

## Overview

### Purpose

Define UX guidance for three Phase 2 assessment modules (OCD, ADHD, PTSD) to ensure consistency with existing Anxiety and Depression modules while addressing unique safety, educational, and interaction requirements for each disorder category.

### Design Principles (from Serenity Design System)

1. **Arabic-First**: RTL-native design using CSS Logical Properties
2. **Culturally Sensitive**: Calming visual language appropriate for mental health content
3. **Anonymous & Safe**: No accounts, clear disclaimers, prominent crisis resources
4. **Mobile-First**: Responsive design from 320px
5. **Accessible**: WCAG 2.2 Level AA minimum, 48px touch targets, high contrast

### Scope

- **In scope**: Module card design, hero themes, safety badges, disclaimers, educational copy guidance, component variants
- **Out of scope**: Detailed question content (Content Agent), visual illustration assets (Visual Assets Agent), frontend implementation (Frontend Agent)

---

## OCD Module Specification

### Module Identity

**Arabic Title**: الوسواس القهري والاضطرابات ذات الصلة  
**English**: Obsessive-Compulsive and Related Disorders  
**Category ID**: `ocd`

### Hero Theme

**Visual Concept**: "Order & Calm"

- **Primary imagery**: Organized natural patterns — symmetrical leaf arrangements, balanced stone stacks, flowing water in structured channels
- **Color palette**: Cool greens (#6AB04C family) and neutrals (#636E72, #DFE6E9) to convey structure without rigidity
- **Mood**: Balanced, orderly, calming, non-judgmental
- **Cultural considerations**: Avoid religious imagery or symbols; focus on nature-based patterns

**Illustration guidance for Visual Assets Agent:**
- 2 hero illustrations (2000×1200px, WebP, 2x resolution)
  - Hero A: "Balanced Stones" — smooth stones stacked in calm water, symmetry, soft gradients
  - Hero B: "Leaf Pattern" — organized leaf arrangement in nature, radial or bilateral symmetry
- Category card illustration (800×600px, WebP, 2x)
  - Simplified version of Hero A or abstract pattern suggesting order
- Style: Watercolor aesthetic matching existing Serenity illustrations (anxiety/depression)

### Category Card (Home Page)

**Location**: `/home` page, 4-card grid alongside Anxiety, Depression, ADHD

**Card Structure:**

```
┌─────────────────────────────────────┐
│  [Hero Image: Balanced Stones]      │  ← 800×600px, aspect-video, rounded-t-lg
│                                      │
├─────────────────────────────────────┤
│  الوسواس القهري والاضطرابات ذات الصلة │  ← H3, text-xl, font-bold
│                                      │
│  أفكار متكررة وسلوكيات قهرية تؤثر    │  ← Short description (2-3 lines)
│  على الحياة اليومية.                │
│                                      │
│  ⏱ 15-20 دقيقة  |  📋 15-25 سؤالاً  │  ← Metadata row
│                                      │
│  [بدء التقييم] ──────────────────►   │  ← Primary button, RTL arrow
└─────────────────────────────────────┘
```

**Copy Guidance:**

| Element | Arabic | Notes |
|---------|--------|-------|
| **Title** | الوسواس القهري والاضطرابات ذات الصلة | From DSM-5-TR category name |
| **Short Description** | أفكار متكررة وسلوكيات قهرية تؤثر على الحياة اليومية. تقييم يركز على الأفكار الوسواسية والأفعال القهرية. | 2 sentences max, explain obsessions & compulsions simply |
| **Duration** | 15-20 دقيقة | Est. based on question count |
| **Question Count** | 15-25 سؤالاً | Depends on disorder; show range |
| **CTA Button** | بدء التقييم | Consistent with existing modules |

**States:**

- **Available**: Full color, hero image visible, clickable
- **Hover**: `color.surface.hover` overlay, scale 1.02 transform
- **Focus**: 2px solid `color.primary.base` outline, 4px offset
- **Active**: Scale 0.98 transform

### Module Landing Page

**Route**: `/assessment/ocd`

**Layout Structure:**

```
┌─────────────────────────────────────────────┐
│  [Full-width Hero: Balanced Stones]         │  ← 1920×400px hero (responsive)
│  الوسواس القهري والاضطرابات ذات الصلة         │  ← H1 overlaid, text-shadow
│  تقييم ذاتي وفقاً لمنهجية DSM-5-TR            │  ← Subtitle
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│  [⚠️ Safety Banner]                          │  ← Alert component, variant="warning"
│  هذا التقييم للتوعية الذاتية فقط ولا يُعتبر   │
│  تشخيصًا طبيًا. إذا كانت الأعراض تؤثر على     │
│  حياتك، استشر أخصائي صحة نفسية.             │
└─────────────────────────────────────────────┘

┌───────────────────────────────────────────┐
│  [ℹ️ Educational Introduction]             │  ← Card, padding-6
│  ما هو الوسواس القهري؟                      │  ← H2
│  الوسواس القهري يتميز بـ:                   │
│  • أفكار متكررة غير مرغوبة (وساوس)         │  ← Bullet list, 3-5 points
│  • سلوكيات أو أفعال ذهنية متكررة (قهريات)   │
│  • محاولة تقليل القلق أو منع حدث مخيف       │
└───────────────────────────────────────────┘

┌───────────── Disorder Cards ─────────────┐
│  [Card 1: OCD]          [Card 2: BDD]     │  ← Grid: 2 cols tablet, 1 col mobile
│  [Card 3: Hoarding]     [Card 4: Hair]    │
│  [Card 5: Skin Picking]                   │
└───────────────────────────────────────────┘
```

**Disorder Cards** (5 total):

1. **الوسواس القهري** (Obsessive-Compulsive Disorder)
2. **اضطراب تشوه الجسم** (Body Dysmorphic Disorder)
3. **اضطراب الاكتناز** (Hoarding Disorder)
4. **اضطراب نتف الشعر** (Trichotillomania/Hair-Pulling Disorder)
5. **اضطراب حك الجلد** (Excoriation/Skin-Picking Disorder)

**Disorder Card Structure** (consistent with Anxiety/Depression):

```
┌─────────────────────────────────────┐
│  [Hero Thumbnail: 400×300px]         │  ← Unique per disorder
├─────────────────────────────────────┤
│  اضطراب الوسواس القهري              │  ← H3
│                                      │
│  وساوس متكررة أو قهريات تستغرق وقتاً │  ← Body text (3-4 lines)
│  طويلاً وتسبب ضيقاً كبيراً.          │
│                                      │
│  النقاط الرئيسية:                   │  ← H4
│  • أفكار أو صور متطفلة               │  ← 3 bullet points
│  • سلوكيات متكررة                    │
│  • استغراق ساعة أو أكثر يومياً       │
│                                      │
│  📋 18 سؤالاً  ⏱ 12-15 دقيقة        │  ← Metadata
│                                      │
│  [بدء التقييم] ──────────────────►   │  ← Primary button
└─────────────────────────────────────┘
```

**Safety Badge** (for specific disorders if needed):

- **Location**: Top-right corner of disorder card (RTL: top-left)
- **Content**: `⚠️ محتوى حساس` (Sensitive Content)
- **Style**: Small badge, `bg-warning-light`, `text-warning-dark`, rounded-full, px-3 py-1, text-xs
- **Use case**: Apply to BDD, Hoarding, or Skin Picking if content includes potentially triggering themes
- **Alternative**: No badge for standard OCD card unless crisis triggers present

### Safety & Disclaimer Copy

**Pre-Assessment Disclaimer** (before question flow starts):

```markdown
## قبل أن تبدأ

هذا التقييم الذاتي يساعدك على فهم الأعراض التي قد تتوافق مع اضطرابات الوسواس القهري وفقاً لمنهجية DSM-5-TR. **هذا ليس تشخيصاً طبياً.**

### ⚠️ ملاحظات هامة:

- لا تستخدم هذا التقييم كبديل عن الاستشارة الطبية.
- إذا كانت الأعراض تؤثر بشكل كبير على حياتك اليومية، يُنصح بمراجعة أخصائي صحة نفسية.
- إجاباتك مجهولة تماماً ولن يتم حفظها أو مشاركتها.

[متابعة إلى الأسئلة] [العودة]
```

**Post-Assessment Disclaimer** (on results page):

```markdown
## 📊 نتائج التقييم الذاتي

**تذكير هام:** هذه النتائج للتوعية الذاتية فقط ولا تُعتبر تشخيصاً. الوسواس القهري يتطلب تقييماً شاملاً من قبل أخصائي مؤهل.

### 🔍 الخطوات التالية المقترحة:

- إذا كانت الأعراض تسبب ضيقاً كبيراً، استشر طبيب نفسي أو أخصائي نفسي سريري.
- يمكنك حفظ هذه النتائج (PDF) ومشاركتها مع معالجك.
- العلاج السلوكي المعرفي (CBT) وأدوية SSRI فعّالة في علاج الوسواس القهري.

[تصدير النتائج] [تقييم آخر] [العودة للرئيسية]
```

---

## ADHD Module Specification

### Module Identity

**Arabic Title**: اضطراب نقص الانتباه وفرط النشاط  
**English**: Attention-Deficit/Hyperactivity Disorder  
**Category ID**: `adhd`

### Hero Theme

**Visual Concept**: "Focus & Flow"

- **Primary imagery**: Motion in nature — flowing streams, leaves in gentle breeze, birds in organized flight patterns, compass or path finding
- **Color palette**: Warm secondary tones (#E8B86D family) mixed with primary blues (#4A7C7E) to suggest energy + calm
- **Mood**: Dynamic but grounded, purposeful movement, finding direction
- **Cultural considerations**: Avoid chaotic or overstimulating visuals; balance energy with serenity

**Illustration guidance for Visual Assets Agent:**
- 2 hero illustrations (2000×1200px, WebP, 2x resolution)
  - Hero A: "Stream & Stones" — flowing water around stepping stones, suggests navigation and focus
  - Hero B: "Compass in Nature" — illustrated compass on natural background, finding direction theme
- Category card illustration (800×600px, WebP, 2x)
  - Abstract flowing pattern or simplified compass motif
- Style: Watercolor aesthetic, warm earth tones, soft movement without chaos

### Category Card (Home Page)

**Card Structure:** (Same layout as OCD; see template above)

**Copy Guidance:**

| Element | Arabic | Notes |
|---------|--------|-------|
| **Title** | اضطراب نقص الانتباه وفرط النشاط | DSM-5-TR category name |
| **Short Description** | صعوبة في التركيز والانتباه أو فرط في النشاط والاندفاعية. تقييم يركز على الأعراض الأساسية. | 2 sentences, explain inattention + hyperactivity/impulsivity |
| **Duration** | 10-15 دقيقة | Shorter than OCD (fewer disorders) |
| **Question Count** | 18-24 سؤالاً | Based on 3 presentations |
| **CTA Button** | بدء التقييم | Consistent |

### Module Landing Page

**Route**: `/assessment/adhd`

**Layout Structure:** (Same as OCD template)

**Disorder Cards** (3 total):

1. **نقص الانتباه السائد** (Predominantly Inattentive Presentation)
2. **فرط النشاط-الاندفاعية السائد** (Predominantly Hyperactive-Impulsive Presentation)
3. **النوع المشترك** (Combined Presentation)

**Educational Introduction Copy:**

```markdown
## ما هو اضطراب نقص الانتباه وفرط النشاط؟

اضطراب نقص الانتباه وفرط النشاط (ADHD) يتميز بنمط مستمر من:

• **نقص الانتباه**: صعوبة الحفاظ على التركيز، النسيان، سهولة التشتت
• **فرط النشاط**: حركة مفرطة، عدم القدرة على البقاء ساكناً
• **الاندفاعية**: التصرف دون تفكير، مقاطعة الآخرين، صعوبة الانتظار

تبدأ الأعراض عادةً في الطفولة وقد تستمر في مرحلة البلوغ.
```

**Safety & Disclaimer Copy:**

Same structure as OCD, adjusted for ADHD context:

```markdown
### ⚠️ ملاحظات هامة:

- تشخيص ADHD يتطلب تقييماً شاملاً يشمل تاريخ الطفولة والأداء في عدة بيئات.
- هذا التقييم يساعدك على فهم الأعراض الحالية فقط.
- إذا كنت تعاني من صعوبة كبيرة في التركيز أو التنظيم، استشر أخصائي.
```

**Special Considerations for ADHD:**

- **Age Context**: Include optional question: "هل لاحظت هذه الأعراض منذ الطفولة؟" (non-scored, informational)
- **Multi-Context Note**: Remind users that ADHD diagnosis requires symptoms in multiple settings (work, home, social)
- **No Crisis Triggers**: ADHD module does NOT require crisis modal; safety notes are informational only

---

## PTSD Module Specification

### Module Identity

**Arabic Title**: اضطرابات الصدمة والضغوط  
**English**: Trauma- and Stressor-Related Disorders  
**Category ID**: `ptsd`

### Hero Theme

**Visual Concept**: "Shelter & Resilience"

- **Primary imagery**: Safe natural spaces — sheltered cove, protective tree canopy, dawn breaking after storm, roots anchoring a tree
- **Color palette**: Soft blues and earth tones, gradual light (hope), grounded greens
- **Mood**: Safety, recovery, resilience, gradual hope, grounded
- **Cultural considerations**: Avoid war/violence imagery; focus on recovery and shelter metaphors

**Illustration guidance for Visual Assets Agent:**
- 2 hero illustrations (2000×1200px, WebP, 2x resolution)
  - Hero A: "Dawn After Storm" — clearing skies, first light, calm water after rain
  - Hero B: "Sheltered Grove" — protective tree canopy, safe natural space
- Category card illustration (800×600px, WebP, 2x)
  - Abstract shelter motif or gentle sunrise
- Style: Watercolor aesthetic, calming transitions from shadow to light

### Category Card (Home Page)

**Card Structure:** (Same layout as OCD; see template)

**Copy Guidance:**

| Element | Arabic | Notes |
|---------|--------|-------|
| **Title** | اضطرابات الصدمة والضغوط | DSM-5-TR category name |
| **Short Description** | ردود فعل نفسية وجسدية بعد التعرض لحدث صادم أو مجهد. تقييم يركز على أعراض ما بعد الصدمة. | 2 sentences, emphasize "after traumatic event" |
| **Duration** | 12-18 دقيقة | Mid-length module |
| **Question Count** | 20-30 سؤالاً | Based on PTSD + Acute Stress |
| **CTA Button** | بدء التقييم | Consistent |
| **Safety Badge** | ⚠️ محتوى حساس | **Required** for PTSD card |

### Module Landing Page

**Route**: `/assessment/ptsd`

**Layout Structure:** (Same as OCD template)

**⚠️ Enhanced Safety Banner** (REQUIRED for PTSD):

```
┌─────────────────────────────────────────────┐
│  [⚠️ Safety Warning - PTSD Module]           │  ← Alert, variant="danger"
│                                              │
│  **محتوى حساس**: يتضمن هذا التقييم أسئلة عن │
│  أحداث صادمة وأعراضها. قد يكون بعض المحتوى   │
│  مزعجاً للأشخاص الذين مروا بتجارب صعبة.     │
│                                              │
│  **إذا كنت تشعر بضيق أو عدم أمان:**         │
│  • توقف في أي وقت باستخدام زر "الخروج"     │
│  • تواصل مع أخصائي أو خط دعم                │
│  • لا تجبر نفسك على إكمال التقييم           │
│                                              │
│  [🆘 أرقام الطوارئ والدعم]  [متابعة]        │  ← Link + Primary button
└─────────────────────────────────────────────┘
```

**Styling:**
- Background: `color.danger.light` (#FFE5E5)
- Text: `color.danger.dark` (#C73E3C)
- Border: 2px solid `color.danger.base`
- Padding: 6 (24px)
- Icon: ⚠️ large (24×24px)
- Dismissible: **No** (always visible on module landing page)

**Disorder Cards** (2-3 total):

1. **اضطراب ما بعد الصدمة (PTSD)** (Post-Traumatic Stress Disorder)
2. **اضطراب الضغط الحاد** (Acute Stress Disorder)
3. *(Optional)* **اضطراب التكيف** (Adjustment Disorder) — if content available

**Educational Introduction Copy:**

```markdown
## ما هي اضطرابات الصدمة والضغوط؟

تحدث هذه الاضطرابات بعد التعرض لحدث صادم أو شديد الضغط، مثل:

• حوادث خطيرة أو كوارث طبيعية
• تجارب عنف أو تهديد بالأذى
• فقدان مفاجئ أو أحداث حياة صعبة

**الأعراض الشائعة:**

• ذكريات متطفلة أو كوابيس
• تجنب التذكيرات بالحدث
• حالة تأهب عالية أو سهولة الاستثارة
• تغيرات في المزاج والأفكار
```

**Safety & Disclaimer Copy** (Pre-Assessment):

```markdown
## قبل أن تبدأ

### ⚠️ تنبيه هام للسلامة النفسية:

هذا التقييم يتضمن أسئلة عن أحداث صادمة وأعراضها. قد يؤدي التفكير في هذه الأحداث إلى إزعاج نفسي لبعض الأشخاص.

**يُرجى التوقف فوراً إذا:**
- شعرت بضيق شديد أو قلق متزايد
- بدأت تعاني من ذكريات حادة أو تفكير انتحاري
- شعرت بعدم الأمان النفسي

**خيارات الدعم:**
- يمكنك إيقاف التقييم في أي وقت بدون حفظ الإجابات
- راجع [صفحة موارد الأزمات] للحصول على دعم فوري
- تواصل مع أخصائي صحة نفسية متخصص في الصدمات

### ✓ موافقة على المتابعة:

- [ ] أفهم أن هذا التقييم يتضمن محتوى عن الصدمات
- [ ] أشعر بالأمان النفسي للمتابعة الآن
- [ ] أعرف كيفية الوصول إلى الدعم إذا احتجت

[متابعة إلى الأسئلة] [العودة]
```

**PTSD-Specific Component Behavior:**

1. **Consent Checkbox**: Required before proceeding (not stored, session-only)
2. **Persistent Exit Button**: Always visible, prominent, red/warning color
3. **Progress Indicator**: Show progress but allow jumping to end/results
4. **Crisis Modal Trigger**: If questions include suicidal ideation or severe dissociation, trigger crisis modal (same as Depression)
5. **Results Page Safety**: Emphasize professional consultation more strongly than other modules

---

## Safety & Disclaimer Patterns

### Badge Taxonomy

| Badge | Arabic | Use Case | Style |
|-------|--------|----------|-------|
| **Sensitive Content** | ⚠️ محتوى حساس | PTSD module, BDD card | `bg-warning-light`, `text-warning-dark` |
| **Crisis Support** | 🆘 دعم الأزمات | Depression (A9), PTSD (if SI question) | `bg-danger-light`, `text-danger-dark` |
| **Educational Only** | ℹ️ تعليمي فقط | All module landing pages | `bg-info-light`, `text-info-dark` |

### Disclaimer Hierarchy

1. **Module Landing Page**: Educational disclaimer (Alert component, variant="info")
2. **Pre-Assessment Modal**: Safety notes + consent (Modal component, cannot skip)
3. **Crisis Trigger**: Crisis modal with helpline numbers (Modal, non-dismissible until acknowledged)
4. **Results Page**: Final disclaimer + next steps (Card component)

### Crisis Modal Integration

**Trigger Conditions** (from question metadata):

- Depression A9: Any non-zero response to suicidal ideation question
- PTSD: Any "severe" response to self-harm or dissociation questions (if content includes these)

**Modal Behavior** (existing component; see `src/components/assessment/crisis-modal.tsx`):

- Non-dismissible until acknowledged
- Arabic helpline numbers (5 regional crisis hotlines)
- Options: "Exit Assessment" or "Continue with Support"
- Persistent indicator after acknowledgement

**No Changes Required** for existing crisis modal; reuse for PTSD module.

---

## Component Adjustments

### New Components

#### 1. Safety Badge Component

**Location**: `src/components/ui/safety-badge.tsx`

**Variants:**

- `sensitive`: ⚠️ محتوى حساس (warning colors)
- `crisis`: 🆘 دعم الأزمات (danger colors)
- `educational`: ℹ️ تعليمي فقط (info colors)

**Props:**

```typescript
interface SafetyBadgeProps {
  variant: 'sensitive' | 'crisis' | 'educational';
  label?: string; // Custom label, fallback to defaults
  className?: string;
}
```

**Styling:**

- Size: `text-xs`, `px-3`, `py-1`
- Shape: `rounded-full`
- Position: Absolute in top-right (RTL: top-left) of card, `top-4`, `left-4` (or `right-4` for LTR)
- Colors: Semantic color tokens from design system

#### 2. Enhanced Alert Component

**Location**: Extend existing `src/components/ui/alert.tsx`

**New Variant**: `danger` (high-severity warnings)

**Props Addition:**

```typescript
variant?: 'info' | 'warning' | 'danger' | 'success';
dismissible?: boolean; // Default true, set false for PTSD landing page
```

**Styling for `danger`:**

- Background: `color.danger.light`
- Border: `2px solid color.danger.base`
- Text: `color.danger.dark`
- Icon: ⚠️ or 🆘 (24×24px)

#### 3. Consent Checkbox Group

**Location**: `src/components/assessment/consent-checkbox.tsx` (new)

**Use Case**: PTSD pre-assessment consent

**Structure:**

```typescript
interface ConsentCheckboxProps {
  items: Array<{ id: string; label: string; required: boolean }>;
  onAllChecked: (allChecked: boolean) => void;
}
```

**Behavior:**

- Render list of checkboxes with Arabic labels
- Emit `onAllChecked(true)` when all required items checked
- Disable "Continue" button until all required consents checked
- Styling: Standard checkbox component, `space-y-3` gap

### Modified Components

#### 1. Category Card Component

**File**: `src/components/assessment/category-card.tsx`

**Addition**: Optional `safetyBadge` prop

```typescript
interface CategoryCardProps {
  // ...existing props
  safetyBadge?: 'sensitive' | 'crisis' | 'educational' | null;
}
```

**Rendering:**

If `safetyBadge` is provided, render `<SafetyBadge variant={safetyBadge} />` in top-right corner.

#### 2. Question Flow Component

**File**: `src/components/assessment/question-flow.tsx`

**No Changes Required** for Phase 2 modules; existing crisis detection logic works for PTSD.

**Validation**: Ensure `crisis_trigger` configuration in PTSD content JSON triggers modal correctly.

### Layout Adjustments

#### 1. Module Landing Page Layout

**File**: `src/app/assessment/[moduleId]/page.tsx` (template)

**Adjustments for PTSD:**

- Add conditional rendering for enhanced safety banner:

```typescript
{moduleId === 'ptsd' && (
  <Alert variant="danger" dismissible={false}>
    {/* PTSD safety warning content */}
  </Alert>
)}
```

- Insert safety banner **above** educational introduction
- Ensure banner is visible on mobile (no truncation)

#### 2. Pre-Assessment Modal

**File**: Create `src/components/assessment/pre-assessment-modal.tsx` (new)

**Use Case**: PTSD consent modal, reusable for future sensitive modules

**Structure:**

```typescript
interface PreAssessmentModalProps {
  moduleId: string;
  title: string;
  content: React.ReactNode; // Disclaimer + consent checkboxes
  onContinue: () => void;
  onCancel: () => void;
}
```

**Behavior:**

- Modal shown immediately after user clicks "Start Assessment" on PTSD disorder card
- Must complete consent checkboxes before "Continue" enabled
- "Cancel" returns to module landing page
- Non-dismissible (no X button, no backdrop click)

---

## Accessibility Requirements

### WCAG 2.2 Level AA Compliance

All Phase 2 modules must meet the following criteria:

#### Color & Contrast

- **SC 1.4.3**: Text contrast ≥4.5:1 (≥3:1 for large text 18pt+)
  - Safety badges: Verify `text-warning-dark` on `bg-warning-light` meets 4.5:1
  - Danger alerts: Verify `text-danger-dark` on `bg-danger-light` meets 4.5:1
- **SC 1.4.11**: Non-text contrast ≥3:1
  - Safety badge borders, focus indicators, icon outlines

#### Keyboard & Focus

- **SC 2.1.1**: All interactive elements keyboard accessible
  - Module cards: `<button>` or `<a>` with `onClick`/`href`
  - Consent checkboxes: Native `<input type="checkbox">`
  - Modal actions: Tab order = [Checkbox 1, Checkbox 2, Cancel, Continue]
- **SC 2.4.7**: Focus indicator visible
  - 2px solid `color.primary.base` outline, 4px offset
  - Safety badge links: same focus style
- **SC 2.4.11**: Focus not obscured (WCAG 2.2)
  - Modal focus trap: Ensure focus stays within modal, no elements behind modal focusable

#### Touch Targets

- **SC 2.5.8**: Touch targets ≥44×44px (WCAG 2.2)
  - Module card buttons: `min-h-12` (48px)
  - Consent checkboxes: 24×24px input + padding = 44×44px touch area
  - Safety badge links: Minimum 44×44px clickable area

#### Screen Reader

- **SC 1.1.1**: All images have meaningful alt text
  - Hero images: `alt="رسم توضيحي لفئة [ModuleName] يُظهر [brief description]"`
  - Safety badge icons: `aria-label="تحذير: محتوى حساس"`
- **SC 4.1.2**: Custom components have name, role, value
  - Safety badges: `role="status"` or `role="img"` depending on function
  - Consent checkboxes: `aria-required="true"` for required items
- **SC 4.1.3**: Status messages announced
  - PTSD consent: Announce "يجب الموافقة على جميع العناصر للمتابعة" when Continue disabled

#### RTL & Language

- **SC 3.1.1**: Page language declared
  - `<html lang="ar" dir="rtl">` for all module pages
- **SC 3.1.2**: Language changes marked
  - If any English terms used (e.g., "ADHD"), wrap in `<span lang="en">ADHD</span>`

### Testing Checklist

- [ ] Manual keyboard navigation (Tab, Enter, Esc) for all module pages
- [ ] Screen reader test (NVDA/VoiceOver) with Arabic voice
- [ ] Color contrast check (WebAIM, Lighthouse)
- [ ] Touch target size verification on mobile (320px viewport)
- [ ] Focus trap validation in PTSD consent modal
- [ ] RTL layout verification (no mirrored icons except directional arrows)

---

## Implementation Handoffs

### Content Agent

- Deliver full Arabic copy for:
  - OCD: 5 disorder cards (title, description, key points)
  - ADHD: 3 presentation cards (title, description, key points)
  - PTSD: 2-3 disorder cards + enhanced safety warnings
- Provide educational introduction text for each module landing page
- Verify Arabic translations for all safety disclaimers and consent text
- Include metadata: question counts, estimated duration per disorder

### Visual Assets Agent

- Create 6 hero illustrations (2 per module: OCD, ADHD, PTSD)
- Create 3 category card thumbnails (800×600px)
- Follow Serenity watercolor style and color palette
- Ensure cultural sensitivity (no religious symbols, war imagery)
- Deliver WebP format, 2x resolution for retina displays

### Frontend Developer

- Implement new components:
  - `SafetyBadge` component with 3 variants
  - `PreAssessmentModal` component for PTSD consent
  - Extended `Alert` component with `danger` variant
- Modify existing components:
  - Add `safetyBadge` prop to `CategoryCard`
  - Conditional safety banner rendering in module landing pages
- Create module pages:
  - `/assessment/ocd/page.tsx`
  - `/assessment/adhd/page.tsx`
  - `/assessment/ptsd/page.tsx`
- Integrate content JSON and hero images
- Validate accessibility requirements (see checklist above)

### QA Agent

- Verify WCAG 2.2 Level AA compliance for all new components and pages
- Test RTL layout correctness (icons, spacing, focus indicators)
- Validate crisis modal triggers for PTSD module
- Test PTSD consent flow (checkboxes required, modal non-dismissible)
- Cross-browser testing (Chrome, Firefox, Safari, Edge)
- Mobile responsiveness testing (320px, 768px, 1024px+ viewports)

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-01-29 | Initial specification for OCD, ADHD, PTSD modules |

---

**Document Owner**: UI/UX Designer Agent  
**Reviewers**: Software Solution Architect, Frontend Developer, Content Specialist  
**Next Review**: After Phase 2 module implementation
