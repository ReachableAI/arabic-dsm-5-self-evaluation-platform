# RTL Design System & Visual Directions

> Design system starter for Arabic (RTL) self-evaluation platform

---

## Design Principles

### 1. Culturally Sensitive
- Arabic-first design, not a translated LTR layout
- Respect regional visual preferences (Middle East, North Africa)
- Avoid Western mental health stereotypes

### 2. Calming & Trustworthy
- Soft, warm colour palettes that reduce anxiety
- Generous whitespace and clear hierarchy
- Professional but approachable aesthetic

### 3. Accessible & Inclusive
- WCAG 2.1 AA minimum compliance
- High contrast options for readability
- Touch-friendly targets (48px minimum)

### 4. Mobile-First RTL
- Designed for mobile then scaled up
- RTL-native layouts, not mirrored LTR
- Arabic typography optimised for screens

---

## Visual Theme A: "سكينة" (Serenity)

### Concept
Nature-inspired calm. Uses soft blues, greens, and earth tones. Imagery features landscapes, water, and organic shapes.

### Colour Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--primary` | `#4A7C7E` | Primary actions, headings |
| `--primary-light` | `#7BA8AA` | Hover states, highlights |
| `--secondary` | `#E8B86D` | Accents, progress indicators |
| `--background` | `#F9F7F4` | Page background |
| `--surface` | `#FFFFFF` | Cards, modals |
| `--text-primary` | `#2D3436` | Body text |
| `--text-secondary` | `#636E72` | Secondary text |
| `--success` | `#6AB04C` | Positive feedback |
| `--warning` | `#F9CA24` | Caution states |
| `--danger` | `#EB4D4B` | Crisis/urgent |

### Visual Assets Direction
- **Illustrations**: Watercolour-style landscapes, desert scenes, olive groves
- **Icons**: Rounded, organic shapes with soft gradients
- **Hero Images**: Calm nature scenes (mountains, sea, gardens)
- **Mood Imagery**: Abstract flowing shapes, not clinical photos

### Typography
- **Headings**: IBM Plex Sans Arabic (Bold, SemiBold)
- **Body**: IBM Plex Sans Arabic (Regular, Light)
- **Decorative**: Aref Ruqaa (for quotes, special text)

---

## Visual Theme B: "نور" (Light)

### Concept
Modern, minimal, and bright. Uses clean whites with subtle purple and coral accents. Geometric patterns inspired by Islamic art.

### Colour Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--primary` | `#6C5CE7` | Primary actions, headings |
| `--primary-light` | `#A29BFE` | Hover states, highlights |
| `--secondary` | `#FD79A8` | Accents, progress |
| `--background` | `#FFFFFF` | Page background |
| `--surface` | `#F8F9FA` | Cards, modals |
| `--text-primary` | `#2D3436` | Body text |
| `--text-secondary` | `#74B9FF` | Links, secondary |
| `--success` | `#00B894` | Positive feedback |
| `--warning` | `#FDCB6E` | Caution states |
| `--danger` | `#E17055` | Crisis/urgent |

### Visual Assets Direction
- **Illustrations**: Flat geometric art, abstract human forms
- **Icons**: Sharp, minimal line icons
- **Hero Images**: Light-filled spaces, geometric patterns
- **Patterns**: Subtle Islamic geometry as backgrounds

### Typography
- **Headings**: Cairo (Bold, SemiBold)
- **Body**: Cairo (Regular, Light)
- **Decorative**: Lateef (for quotes, special text)

---

## RTL Typography Recommendations

### Arabic Font Stack (Priority Order)
```css
font-family: 'IBM Plex Sans Arabic', 'Cairo', 'Noto Sans Arabic', 'Tahoma', sans-serif;
```

### Font Sizing Scale (Mobile-First)

| Token | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `--text-xs` | 12px | 1.5 | Captions, labels |
| `--text-sm` | 14px | 1.5 | Secondary text |
| `--text-base` | 16px | 1.6 | Body text |
| `--text-lg` | 18px | 1.5 | Large body |
| `--text-xl` | 20px | 1.4 | Subheadings |
| `--text-2xl` | 24px | 1.3 | Section headings |
| `--text-3xl` | 30px | 1.2 | Page titles |
| `--text-4xl` | 36px | 1.1 | Hero headings |

### RTL-Specific Adjustments
- Arabic text needs ~10-15% more line height than Latin
- Arabic characters are taller; increase `line-height` for body text
- Avoid justified text — use `text-align: start` (right in RTL)
- Long Arabic words don't hyphenate well; allow natural breaks

---

## RTL Layout Principles

### Direction & Alignment
```css
html {
  direction: rtl;
}

/* Logical properties (preferred) */
.card {
  margin-inline-start: 1rem;  /* margin-right in RTL */
  padding-inline-end: 1rem;   /* padding-left in RTL */
  text-align: start;          /* right in RTL */
}
```

### Navigation
- Logo/brand: Top-right
- Primary nav: Right-to-left order
- Back buttons: Right side (→ becomes ←)
- Progress indicators: Right-to-left fill

### Forms & Inputs
- Labels above or to the right of inputs
- Validation icons: Left side of input
- Submit buttons: Left side (end of form flow)

### Cards & Lists
- Card content flows right-to-left
- List bullets/numbers: Right side
- Swipe gestures: Reversed (swipe left = forward)

---

## Component Library (MVP)

### Core Components

| Component | Description | States |
|-----------|-------------|--------|
| **Button** | Primary, secondary, ghost, danger | Default, hover, active, disabled |
| **Card** | Content container with optional image | Default, elevated, interactive |
| **Input** | Text, textarea, select | Default, focus, error, disabled |
| **Radio/Checkbox** | Single and multi-select | Unchecked, checked, indeterminate |
| **Progress Bar** | Linear progress indicator | Percentage, animated |
| **Modal** | Overlay dialog | Open, closing |
| **Toast** | Notification messages | Info, success, warning, error |
| **Accordion** | Expandable content sections | Collapsed, expanded |

### Assessment-Specific Components

| Component | Description | Usage |
|-----------|-------------|-------|
| **MoodSelector** | Visual mood picker (5 states) | Welcome screen |
| **QuestionCard** | Single question with response options | Question flow |
| **FrequencyScale** | 5-point Likert scale (Never → Always) | Most questions |
| **ProgressStepper** | Category/question progress | Navigation |
| **ResultCard** | Pattern summary with illustration | Results screen |
| **CrisisAlert** | Prominent help resource | Triggered by certain responses |
| **DisclaimerBanner** | Persistent safety messaging | Header/footer |
| **CategoryCard** | Browse card with illustration | Home screen |

---

## Accessibility Requirements

### WCAG 2.1 AA Compliance

| Criterion | Requirement | Implementation |
|-----------|-------------|----------------|
| **1.4.3** Contrast | 4.5:1 for text, 3:1 for large text | Verified colour palette |
| **1.4.11** Non-text Contrast | 3:1 for UI components | Border and icon colours |
| **2.1.1** Keyboard | All functions keyboard accessible | Focus management |
| **2.4.7** Focus Visible | Clear focus indicators | Custom focus styles |
| **3.2.2** On Input | No unexpected context changes | Explicit submit actions |
| **4.1.2** Name, Role, Value | Proper ARIA labels | Semantic HTML + ARIA |

### Arabic-Specific Accessibility
- Screen reader testing with Arabic voices (NVDA, VoiceOver)
- Support for Arabic number formats (Eastern Arabic numerals optional)
- Right-click context menus work correctly in RTL
- Text selection and copy works in RTL

### Device Breakpoints

| Breakpoint | Width | Target |
|------------|-------|--------|
| `xs` | 0-479px | Small phones |
| `sm` | 480-767px | Large phones |
| `md` | 768-1023px | Tablets |
| `lg` | 1024-1279px | Small laptops |
| `xl` | 1280px+ | Desktops |

---

## Visual Asset Requirements (AI-Generated)

### Hero Illustrations (per category)
- **Anxiety**: Person in calm garden, breathing exercises, serene water
- **Depression**: Sunrise scene, supportive hands, light breaking through
- **ADHD**: Organised workspace, focus metaphors, clear path forward
- **OCD**: Balanced scales, peaceful mind, organised patterns

### Mood State Illustrations (5 states)
1. **Very Low**: Cloudy/rainy metaphor (not sad face)
2. **Low**: Overcast sky
3. **Neutral**: Partly cloudy
4. **Good**: Sunny with clouds
5. **Great**: Clear blue sky

### UI Illustrations
- Welcome/onboarding illustrations (3-4 frames)
- Empty states
- Success/completion celebrations
- Error states (gentle, not alarming)
- Loading states (calming animations)

### Image Generation Guidelines
- **Style**: Consistent across all illustrations (watercolour OR flat geometric)
- **Diversity**: Represent diverse Arab populations (skin tones, dress)
- **Sensitivity**: No stereotypes, no clinical imagery, no distressed faces
- **Format**: WebP for web, SVG for icons, PNG fallbacks
- **Sizes**: 1x, 2x, 3x for responsive images

---

## Theme Recommendation

For MVP, we recommend **Theme A: "سكينة" (Serenity)** because:

1. **Calming palette** reduces anxiety for users in distress
2. **Nature imagery** is culturally resonant across Arab regions
3. **Warmer tones** feel less clinical than Theme B's cool purples
4. **IBM Plex Sans Arabic** has excellent screen readability

Theme B ("نور") is a strong alternative for Phase 2 theming or user preference toggle.
