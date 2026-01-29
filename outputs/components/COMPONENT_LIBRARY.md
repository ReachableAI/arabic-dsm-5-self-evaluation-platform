# RTL Component Library Documentation

**Version**: 1.0.0  
**Framework**: Next.js 14 + React 19 + Tailwind CSS v4  
**Language**: Arabic (RTL)  
**Accessibility**: WCAG 2.2 Level AA

---

## Overview

This component library implements a production-ready RTL-first design system for the Arabic DSM-5-TR self-evaluation platform. All components are built with:

- **RTL-native layout** using CSS Logical Properties
- **Minimum 48px touch targets** for WCAG compliance
- **Keyboard navigation** with focus management
- **Accessible ARIA labels** and semantic HTML
- **shadcn/ui foundation** with Radix UI primitives

---

## Core UI Components

### Button

Four variants with size options and icon support.

```tsx
import { Button } from "@/components/ui/button";

// Primary action
<Button variant="primary" size="medium">
  ابدأ التقييم
</Button>

// Secondary action with icon
<Button variant="secondary" iconLeading={<ArrowIcon />}>
  رجوع
</Button>

// Danger action
<Button variant="danger" size="large">
  إنهاء التقييم
</Button>

// Ghost for tertiary actions
<Button variant="ghost" size="small">
  تخطي
</Button>

// Loading state
<Button isLoading disabled>
  جاري الحفظ...
</Button>
```

**Variants**: `primary`, `secondary`, `ghost`, `danger`  
**Sizes**: `small` (36px), `medium` (44px), `large` (52px)  
**Touch Targets**: All sizes meet or exceed 44px minimum

---

### Card

Container component for content with header, body, and footer sections.

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>عنوان البطاقة</CardTitle>
    <CardDescription>وصف مختصر للمحتوى</CardDescription>
  </CardHeader>
  <CardContent>
    <p>محتوى البطاقة الرئيسي</p>
  </CardContent>
  <CardFooter>
    <Button>إجراء</Button>
  </CardFooter>
</Card>
```

**Features**:
- RTL-aware text alignment
- Optional sections (header, footer)
- Elevated shadow on surfaces

---

### Input & Textarea

Form input components with error states and RTL support.

```tsx
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Text input
<Input
  type="text"
  placeholder="أدخل اسمك"
  aria-label="الاسم"
/>

// Input with error
<Input
  type="email"
  error={true}
  aria-invalid="true"
  aria-describedby="email-error"
/>
<p id="email-error" className="text-danger text-sm mt-1">
  البريد الإلكتروني غير صالح
</p>

// Textarea
<Textarea
  placeholder="اكتب رسالتك هنا"
  rows={4}
  aria-label="الرسالة"
/>
```

**Features**:
- 44px minimum height
- Error state styling
- Optional icon support (Input)
- Resize-y for Textarea

---

### Select

Dropdown select component using Radix UI primitives.

```tsx
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

<Select onValueChange={(value) => console.log(value)}>
  <SelectTrigger>
    <SelectValue placeholder="اختر فئة" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>الفئات</SelectLabel>
      <SelectItem value="depression">الاكتئاب</SelectItem>
      <SelectItem value="anxiety">القلق</SelectItem>
      <SelectItem value="stress">التوتر</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
```

**Features**:
- RTL-aware dropdown positioning
- Keyboard navigation
- Accessible with ARIA

---

### RadioGroup & Checkbox

Form controls with large touch targets.

```tsx
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

// Radio group
<RadioGroup onValueChange={(value) => setValue(value)}>
  <div className="flex items-center gap-3">
    <RadioGroupItem value="yes" id="r1" />
    <label htmlFor="r1">نعم</label>
  </div>
  <div className="flex items-center gap-3">
    <RadioGroupItem value="no" id="r2" />
    <label htmlFor="r2">لا</label>
  </div>
</RadioGroup>

// Checkbox
<div className="flex items-center gap-3">
  <Checkbox id="terms" />
  <label htmlFor="terms">أوافق على الشروط والأحكام</label>
</div>
```

**Features**:
- 48px touch targets (24px visible + 12px padding)
- Clear focus indicators
- Accessible keyboard navigation

---

### Progress

Progress bar with RTL-aware fill direction and color variants.

```tsx
import { Progress } from "@/components/ui/progress";

<Progress value={60} variant="primary" />
<Progress value={100} variant="success" aria-label="اكتمال التقييم" />
```

**Variants**: `primary`, `secondary`, `success`, `warning`, `danger`  
**RTL Behavior**: Fills from right to left

---

### Dialog (Modal)

Modal dialog with focus trap and RTL-aware close button.

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

<Dialog>
  <DialogTrigger asChild>
    <Button>فتح النافذة</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>هل أنت متأكد؟</DialogTitle>
      <DialogDescription>
        لا يمكن التراجع عن هذا الإجراء
      </DialogDescription>
    </DialogHeader>
    <div className="flex justify-start gap-2 mt-4">
      <Button variant="primary">تأكيد</Button>
      <Button variant="ghost">إلغاء</Button>
    </div>
  </DialogContent>
</Dialog>
```

**Features**:
- Automatic focus trap
- Escape key to close
- Click outside to close
- Focus returns to trigger on close

---

### Toast

Notification system with variants for different message types.

```tsx
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

// Add <Toaster /> to your layout
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}

// Use in components
function MyComponent() {
  const { toast } = useToast();

  return (
    <Button
      onClick={() => {
        toast({
          title: "تم الحفظ",
          description: "تم حفظ التغييرات بنجاح",
          variant: "success",
        });
      }}
    >
      حفظ
    </Button>
  );
}
```

**Variants**: `default`, `success`, `warning`, `danger`, `info`

---

## Assessment-Specific Components

### MoodSelector

5-state visual mood picker with illustrations.

```tsx
import { MoodSelector } from "@/components/assessment";

const moods = [
  { value: "very-low", label: "منخفض جداً", illustration: <CloudIcon /> },
  { value: "low", label: "منخفض", illustration: <RainIcon /> },
  { value: "moderate", label: "متوسط", illustration: <PartlyCloudyIcon /> },
  { value: "good", label: "جيد", illustration: <SunnyIcon /> },
  { value: "great", label: "ممتاز", illustration: <SunnyBrightIcon /> },
];

<MoodSelector
  options={moods}
  value={selectedMood}
  onChange={setSelectedMood}
  aria-label="اختر حالتك المزاجية"
/>
```

**Features**:
- Visual mood selection with weather/nature metaphors
- Large touch targets (56px)
- Arrow key navigation
- RTL-aware layout

---

### QuestionCard

Container for assessment questions with response options.

```tsx
import { QuestionCard } from "@/components/assessment";
import { FrequencyScale } from "@/components/assessment";

<QuestionCard
  question="هل تشعر بالحزن معظم الوقت؟"
  questionNumber="1 من 9"
  description="اختر الإجابة الأنسب لحالتك"
>
  <FrequencyScale
    value={answer}
    onChange={setAnswer}
  />
</QuestionCard>
```

**Features**:
- Semantic question structure
- Optional numbering and description
- Flexible response slot

---

### FrequencyScale

5-point RTL Likert scale (Never → Always).

```tsx
import { FrequencyScale } from "@/components/assessment";

<FrequencyScale
  value={frequency}
  onChange={setFrequency}
  aria-label="كم مرة تشعر بهذا؟"
/>
```

**Default Options** (RTL order):
- أبداً (Never)
- نادراً (Rarely)
- أحياناً (Sometimes)
- غالباً (Often)
- دائماً (Always)

**Features**:
- RTL-aware scale (right = low, left = high)
- Visual gradient indicator
- 48px touch targets
- Keyboard navigation

---

### ProgressStepper

Question/section progress indicator.

```tsx
import { ProgressStepper } from "@/components/assessment";

<ProgressStepper
  currentStep={3}
  totalSteps={9}
  stepLabels={["البداية", "المنتصف", "النهاية"]}
  showPercentage
/>
```

**Features**:
- RTL-aware progress bar
- Current step indicator
- Optional percentage display
- Optional step labels

---

### CategoryCard

Browse card for assessment categories with hero image.

```tsx
import { CategoryCard } from "@/components/assessment";

<CategoryCard
  title="الاكتئاب"
  description="تقييم أعراض الاكتئاب بناءً على معايير DSM-5-TR"
  heroImage={<img src="/depression-hero.webp" alt="" />}
  icon={<CloudIcon />}
  duration="5-7 دقائق"
  questionCount={9}
  onClick={() => router.push('/assessment/depression')}
/>
```

**Features**:
- Optional hero image slot
- Category metadata (duration, question count)
- Large touch target (entire card)
- Keyboard navigation

---

## Accessibility Compliance

All components meet WCAG 2.2 Level AA:

| Criterion | Implementation |
|-----------|----------------|
| **2.1.1** Keyboard | All interactive elements keyboard accessible |
| **2.4.7** Focus Visible | 2px focus ring with 2px offset on all focusable elements |
| **2.5.5** Target Size | Minimum 44px touch targets (48px for most components) |
| **1.4.3** Contrast | 4.5:1 for text, 3:1 for UI components |
| **4.1.2** Name, Role, Value | Proper ARIA labels and semantic HTML |

---

## RTL Behavior

All components use CSS Logical Properties for RTL support:

```css
/* Physical properties (AVOID) */
margin-left: 1rem;
padding-right: 1rem;
border-left: 1px;

/* Logical properties (USE) */
margin-inline-start: 1rem;  /* margin-right in RTL */
padding-inline-end: 1rem;   /* padding-left in RTL */
border-inline-start: 1px;   /* border-right in RTL */
```

**Text Alignment**: All text uses `text-start` (right in RTL) and `text-end` (left in RTL).

**Icon Placement**: Icons use logical spacing (`gap-2` for flexbox automatically handles RTL).

**Progress & Scales**: Fill and increase directions are reversed for RTL context.

---

## Usage Examples

### Complete Assessment Flow

```tsx
"use client";

import { useState } from "react";
import {
  MoodSelector,
  QuestionCard,
  FrequencyScale,
  ProgressStepper,
} from "@/components/assessment";
import { Button } from "@/components/ui/button";

export default function AssessmentPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const questions = [
    "هل تشعر بالحزن معظم الوقت؟",
    "هل تجد صعوبة في الاستمتاع بالأنشطة؟",
    // ... more questions
  ];

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <ProgressStepper
        currentStep={currentStep}
        totalSteps={questions.length}
        showPercentage
      />

      <QuestionCard
        question={questions[currentStep - 1]}
        questionNumber={`${currentStep} من ${questions.length}`}
      >
        <FrequencyScale
          value={answers[currentStep]}
          onChange={(value) =>
            setAnswers({ ...answers, [currentStep]: value })
          }
        />
      </QuestionCard>

      <div className="flex justify-between gap-4">
        <Button
          variant="ghost"
          onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
          disabled={currentStep === 1}
        >
          رجوع
        </Button>
        <Button
          variant="primary"
          onClick={() =>
            setCurrentStep((s) => Math.min(questions.length, s + 1))
          }
          disabled={!answers[currentStep]}
        >
          {currentStep === questions.length ? "إنهاء" : "التالي"}
        </Button>
      </div>
    </div>
  );
}
```

---

## Testing Checklist

- [ ] All components render correctly in RTL layout
- [ ] Touch targets meet 44px minimum (48px preferred)
- [ ] Focus states visible on all interactive elements
- [ ] Keyboard navigation works (Tab, Arrow keys, Enter, Escape)
- [ ] Screen reader announces content correctly (test with NVDA/VoiceOver)
- [ ] Color contrast meets 4.5:1 for text, 3:1 for UI
- [ ] Components work on mobile (320px), tablet (768px), and desktop (1280px+)

---

## Browser Support

- **Desktop**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile**: iOS Safari 14+, Chrome Android 90+

---

## Dependencies

```json
{
  "dependencies": {
    "@radix-ui/react-checkbox": "latest",
    "@radix-ui/react-dialog": "latest",
    "@radix-ui/react-progress": "latest",
    "@radix-ui/react-radio-group": "latest",
    "@radix-ui/react-select": "latest",
    "@radix-ui/react-slot": "latest",
    "@radix-ui/react-toast": "latest",
    "class-variance-authority": "latest",
    "clsx": "latest",
    "tailwind-merge": "latest"
  }
}
```

---

## Future Enhancements

- [ ] Dark mode support
- [ ] Animation preferences (prefers-reduced-motion)
- [ ] Component Storybook documentation
- [ ] Visual regression testing
- [ ] Additional assessment components (CrisisAlert, DisclaimerBanner)

---

## Contact & Support

For questions or issues, refer to the project documentation or contact the development team.

**Last Updated**: 2026-01-29
