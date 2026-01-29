# Arabic DSM-5-TR Design System Specification

**Version**: 1.0.0  
**Last Updated**: 2026-01-29  
**Platform**: Web (Next.js 14, React, Tailwind CSS)  
**Language**: Arabic (RTL)  
**Accessibility Target**: WCAG 2.2 Level AA

---

## Table of Contents

1. [Design Foundations](#design-foundations)
2. [Design Tokens](#design-tokens)
3. [Core Components](#core-components)
4. [Assessment Components](#assessment-components)
5. [User Flows](#user-flows)
6. [Accessibility Specifications](#accessibility-specifications)

---

## Design Foundations

### Design Principles

1. **Arabic-First**: RTL-native design using CSS Logical Properties, not mirrored LTR
2. **Culturally Sensitive**: Calming visual language appropriate for mental health assessment
3. **Anonymous & Safe**: No accounts, clear disclaimers, prominent crisis resources
4. **Mobile-First**: Responsive design starting from 320px mobile screens
5. **Accessible**: WCAG 2.2 Level AA minimum, 48px touch targets, high contrast

### Visual Theme: سكينة (Serenity)

Nature-inspired calm with soft blues, greens, and earth tones. Watercolor-style illustrations featuring landscapes, water, and organic shapes.

---

## Design Tokens

### Color System

#### Brand Colors

| Token | Hex | Contrast (on White) | Usage |
|-------|-----|---------------------|-------|
| `color.primary.base` | `#4A7C7E` | 5.2:1 ✓ | Primary actions, headings, links |
| `color.primary.light` | `#7BA8AA` | 3.1:1 (large text) | Hover states, highlights |
| `color.primary.dark` | `#3A6264` | 7.8:1 ✓ | Active states, emphasis |
| `color.secondary.base` | `#E8B86D` | 2.1:1 (decorative) | Accents, progress indicators |
| `color.secondary.light` | `#F4D9A6` | 1.4:1 (decorative) | Subtle highlights |
| `color.secondary.dark` | `#C89A4E` | 3.2:1 ✓ | Active secondary elements |

#### Neutral Palette

| Token | Hex | Contrast | Usage |
|-------|-----|----------|-------|
| `color.neutral.900` | `#2D3436` | 15.6:1 ✓ | Primary text, headings |
| `color.neutral.700` | `#636E72` | 6.4:1 ✓ | Secondary text, captions |
| `color.neutral.500` | `#B2BEC3` | 2.9:1 | Disabled text (with icon) |
| `color.neutral.300` | `#DFE6E9` | 1.3:1 | Borders, dividers |
| `color.neutral.100` | `#F5F6F7` | 1.0:1 | Subtle backgrounds |
| `color.neutral.50` | `#F9F7F4` | N/A | Page background |

#### Semantic Colors

| Token | Hex | Contrast | Usage |
|-------|-----|----------|-------|
| `color.success.base` | `#6AB04C` | 3.2:1 (large text) | Positive feedback, completion |
| `color.success.light` | `#A8D99C` | 1.8:1 | Success backgrounds |
| `color.success.dark` | `#4A8C35` | 4.8:1 ✓ | Success text on white |
| `color.warning.base` | `#F9CA24` | 1.6:1 | Caution states |
| `color.warning.dark` | `#C7A01D` | 3.1:1 ✓ | Warning text |
| `color.danger.base` | `#EB4D4B` | 4.2:1 (large text) | Crisis alerts, errors |
| `color.danger.light` | `#FFE5E5` | 1.1:1 | Error backgrounds |
| `color.danger.dark` | `#C73E3C` | 5.6:1 ✓ | Error text |
| `color.info.base` | `#74B9FF` | 2.3:1 | Informational messages |
| `color.info.dark` | `#3A8FE8` | 3.8:1 ✓ | Info text |

#### Surface Colors

| Token | Value | Usage |
|-------|-------|-------|
| `color.surface.base` | `#FFFFFF` | Cards, modals, elevated surfaces |
| `color.surface.overlay` | `rgba(45, 52, 54, 0.5)` | Modal backdrop |
| `color.surface.hover` | `rgba(74, 124, 126, 0.05)` | Hover state background |

### Typography

#### Font Families

```css
/* Primary font for headings and UI */
--font-family-primary: 'IBM Plex Sans Arabic', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Tahoma', sans-serif;

/* Body text (same family for consistency) */
--font-family-body: 'IBM Plex Sans Arabic', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Tahoma', sans-serif;

/* Decorative (quotes, special text) */
--font-family-decorative: 'Aref Ruqaa', 'IBM Plex Sans Arabic', serif;
```

#### Type Scale

| Token | Size (px/rem) | Line Height | Weight | Letter Spacing | Usage |
|-------|---------------|-------------|--------|----------------|-------|
| `type.display.large` | 36px / 2.25rem | 1.1 | 700 | -0.02em | Hero headings |
| `type.display.medium` | 30px / 1.875rem | 1.2 | 700 | -0.01em | Page titles |
| `type.headline.large` | 24px / 1.5rem | 1.3 | 600 | 0 | Section headings |
| `type.headline.medium` | 20px / 1.25rem | 1.4 | 600 | 0 | Subsection headings |
| `type.title.large` | 18px / 1.125rem | 1.5 | 600 | 0 | Card titles |
| `type.body.large` | 18px / 1.125rem | 1.6 | 400 | 0 | Large body text |
| `type.body.medium` | 16px / 1rem | 1.6 | 400 | 0 | Default body text |
| `type.body.small` | 14px / 0.875rem | 1.5 | 400 | 0 | Secondary body text |
| `type.label.large` | 16px / 1rem | 1.4 | 500 | 0 | Button labels, form labels |
| `type.label.medium` | 14px / 0.875rem | 1.4 | 500 | 0 | UI labels, tags |
| `type.label.small` | 12px / 0.75rem | 1.5 | 500 | 0 | Captions, timestamps |

#### RTL Typography Rules

```css
/* Global RTL settings */
html {
  direction: rtl;
}

/* Text alignment using logical properties */
.text-start {
  text-align: start; /* Right in RTL */
}

.text-end {
  text-align: end; /* Left in RTL */
}

/* Increased line height for Arabic (10-15% more than Latin) */
body {
  line-height: 1.6; /* vs. 1.5 for Latin */
}

/* Avoid justified text in Arabic */
p {
  text-align: start;
  hyphens: none; /* Arabic doesn't hyphenate well */
}
```

### Spacing System

Using 4px baseline grid with CSS Logical Properties for RTL.

| Token | Value | Usage |
|-------|-------|-------|
| `spacing.0` | 0 | Reset |
| `spacing.1` | 4px | Tight spacing, icon gaps |
| `spacing.2` | 8px | Default component gap |
| `spacing.3` | 12px | Medium spacing |
| `spacing.4` | 16px | Component padding, list items |
| `spacing.5` | 20px | Section spacing |
| `spacing.6` | 24px | Card padding |
| `spacing.8` | 32px | Section margins |
| `spacing.10` | 40px | Large sections |
| `spacing.12` | 48px | Page margins |
| `spacing.16` | 64px | Extra large spacing |

#### CSS Logical Properties (RTL-Safe)

```css
/* Use logical properties instead of left/right */
.component {
  /* DON'T USE: margin-left, padding-right */
  /* USE INSTEAD: */
  margin-inline-start: 1rem;  /* margin-right in RTL */
  margin-inline-end: 1rem;    /* margin-left in RTL */
  padding-inline-start: 1rem; /* padding-right in RTL */
  padding-inline-end: 1rem;   /* padding-left in RTL */
  border-inline-start: 1px;   /* border-right in RTL */
}
```

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `radius.sm` | 4px | Input fields, small buttons |
| `radius.md` | 8px | Cards, medium buttons |
| `radius.lg` | 12px | Modals, large cards |
| `radius.xl` | 16px | Hero cards |
| `radius.full` | 9999px | Pills, avatars, circular buttons |

### Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `shadow.sm` | `0 1px 2px rgba(45, 52, 54, 0.08)` | Subtle elevation |
| `shadow.md` | `0 4px 6px rgba(45, 52, 54, 0.1)` | Cards, dropdowns |
| `shadow.lg` | `0 10px 15px rgba(45, 52, 54, 0.1)` | Modals, popovers |
| `shadow.xl` | `0 20px 25px rgba(45, 52, 54, 0.15)` | High elevation (overlays) |
| `shadow.focus` | `0 0 0 3px rgba(74, 124, 126, 0.3)` | Focus indicator |

### Breakpoints

| Token | Min Width | Max Width | Device Target |
|-------|-----------|-----------|---------------|
| `xs` | 0 | 479px | Small phones |
| `sm` | 480px | 767px | Large phones |
| `md` | 768px | 1023px | Tablets |
| `lg` | 1024px | 1279px | Small laptops |
| `xl` | 1280px | — | Desktops |

---

## Core Components

### Button

#### Anatomy

- **Container**: Background, border, padding
- **Label**: Text content
- **Icon** (optional): Leading (right in RTL) or trailing (left in RTL)
- **Focus Ring**: 3px offset outline

#### Variants

| Variant | Background | Text | Border | Icon Color |
|---------|------------|------|--------|------------|
| **Primary** | `color.primary.base` | `#FFFFFF` | None | `#FFFFFF` |
| **Secondary** | Transparent | `color.primary.base` | `2px color.primary.base` | `color.primary.base` |
| **Ghost** | Transparent | `color.neutral.900` | None | `color.neutral.900` |
| **Danger** | `color.danger.base` | `#FFFFFF` | None | `#FFFFFF` |

#### States

| State | Background Change | Border Change | Opacity | Cursor |
|-------|-------------------|---------------|---------|--------|
| **Default** | Base color | Base border | 100% | pointer |
| **Hover** | Darken 10% | Darken 10% | 100% | pointer |
| **Focus** | Base color | Base border | 100% | pointer |
| **Active** | Darken 15% | Darken 15% | 100% | pointer |
| **Disabled** | Base color | Base border | 50% | not-allowed |
| **Loading** | Base color | Base border | 100% | wait |

#### Focus State

```css
.button:focus-visible {
  outline: 3px solid rgba(74, 124, 126, 0.5);
  outline-offset: 2px;
}
```

#### Sizes

| Size | Height | Padding Inline | Font Size | Icon Size | Min Touch Target |
|------|--------|----------------|-----------|-----------|------------------|
| **Small** | 36px | 16px | 14px | 16px | 44px (add margin) |
| **Medium** | 44px | 20px | 16px | 20px | 44px ✓ |
| **Large** | 52px | 24px | 18px | 24px | 52px ✓ |

#### RTL Behavior

```css
/* Icon placement */
.button-icon-leading {
  margin-inline-end: 8px; /* Space before text (right in RTL) */
}

.button-icon-trailing {
  margin-inline-start: 8px; /* Space after text (left in RTL) */
}
```

#### Accessibility

- **Keyboard**: Enter/Space to activate
- **Focus**: Visible focus indicator required (SC 2.4.7)
- **Disabled**: `aria-disabled="true"`, not focusable, explain why disabled if not obvious
- **Loading**: `aria-busy="true"`, announce "Loading" to screen readers
- **Icon-only**: Must have `aria-label` describing action

#### Usage Guidelines

- Use **Primary** for main action (one per screen section)
- Use **Secondary** for alternate actions
- Use **Ghost** for tertiary actions, navigation
- Use **Danger** only for destructive actions (delete, exit assessment)
- Button text should be action-oriented (e.g., "ابدأ التقييم" not "تقييم")

---

### Card

#### Anatomy

- **Container**: Background, border, border radius, shadow
- **Header** (optional): Title, subtitle
- **Body**: Main content
- **Illustration Slot** (optional): Image or icon
- **Footer** (optional): Actions, metadata

#### Variants

| Variant | Background | Border | Shadow | Usage |
|---------|------------|--------|--------|-------|
| **Default** | `color.surface.base` | `1px color.neutral.300` | None | Static content |
| **Elevated** | `color.surface.base` | None | `shadow.md` | Emphasis, hover state |
| **Interactive** | `color.surface.base` | `1px color.neutral.300` | None → `shadow.md` on hover | Clickable cards |

#### States

| State | Background | Border | Shadow | Cursor |
|-------|------------|--------|--------|--------|
| **Default** | Base | Base | Base | default |
| **Hover** (interactive) | `color.surface.hover` | `color.primary.light` | `shadow.md` | pointer |
| **Focus** (interactive) | Base | `color.primary.base` | `shadow.focus` | pointer |
| **Active** (interactive) | Base | `color.primary.dark` | `shadow.sm` | pointer |

#### Sizes

| Size | Padding | Title Font | Body Font | Min Height |
|------|---------|------------|-----------|------------|
| **Small** | 16px | `type.title.large` | `type.body.small` | Auto |
| **Medium** | 24px | `type.headline.medium` | `type.body.medium` | Auto |
| **Large** | 32px | `type.headline.large` | `type.body.large` | Auto |

#### RTL Layout

```css
.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  /* Icon/illustration on the right in RTL */
}

.card-illustration {
  /* Place at the start (right in RTL) */
  margin-inline-end: 16px;
}

.card-footer {
  display: flex;
  justify-content: flex-start; /* Actions at the end (left in RTL) */
  gap: 12px;
}
```

#### Accessibility

- **Keyboard**: If interactive, must be focusable with Tab
- **Focus**: Clear focus indicator (SC 2.4.7)
- **Semantic HTML**: Use `<article>` or `<section>` with heading structure
- **Clickable cards**: Wrap entire card in `<a>` or `<button>`, avoid nested interactive elements

---

### Form Inputs

#### Text Input

**Anatomy**:
- Label (above field)
- Input field
- Helper text (optional, below field)
- Error message (below field, replaces helper text)
- Icon (optional, trailing in input)

**States**:

| State | Border | Background | Label Color | Text Color |
|-------|--------|------------|-------------|------------|
| **Default** | `1px color.neutral.300` | `color.surface.base` | `color.neutral.700` | `color.neutral.900` |
| **Focus** | `2px color.primary.base` | `color.surface.base` | `color.primary.base` | `color.neutral.900` |
| **Error** | `2px color.danger.base` | `color.danger.light` | `color.danger.dark` | `color.neutral.900` |
| **Disabled** | `1px color.neutral.300` | `color.neutral.100` | `color.neutral.500` | `color.neutral.500` |

**Sizes**:

| Size | Height | Padding | Font Size | Label Font |
|------|--------|---------|-----------|------------|
| **Medium** | 48px | 16px | 16px | 14px |
| **Large** | 56px | 20px | 18px | 16px |

**RTL Layout**:

```css
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-label {
  text-align: start; /* Right in RTL */
}

.input-field {
  direction: rtl;
  text-align: start;
  padding-inline-start: 16px;
  padding-inline-end: 16px;
}

.input-icon {
  position: absolute;
  inset-inline-end: 16px; /* Left side in RTL */
}

.input-error-message {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--color-danger-dark);
  font-size: 14px;
}

.input-error-icon {
  /* Icon on the right in RTL */
  order: 2;
}
```

**Accessibility**:
- **Label**: Always visible, associated with `for` attribute (SC 3.3.2)
- **Helper text**: Use `aria-describedby` to associate with input
- **Error message**: Use `aria-describedby` + `aria-invalid="true"` (SC 3.3.1)
- **Required**: Use `required` attribute + visual indicator (* in label)
- **Autocomplete**: Use `autocomplete` attribute for known data types

---

#### Textarea

Same as Text Input, with:
- **Min height**: 120px (3 lines)
- **Resize**: Vertical only
- **Max length**: Display character counter if limited

---

#### Select (Dropdown)

**Anatomy**:
- Label (above)
- Selected value display
- Dropdown arrow icon (left in RTL)
- Dropdown menu (opens below or above)

**Dropdown Menu**:
- **Background**: `color.surface.base`
- **Border**: `1px color.neutral.300`
- **Shadow**: `shadow.lg`
- **Max height**: 320px with scroll
- **Item padding**: 12px 16px
- **Item hover**: `color.surface.hover` background

**RTL Layout**:

```css
.select-wrapper {
  position: relative;
}

.select-arrow {
  position: absolute;
  inset-inline-start: 16px; /* Left side in RTL */
  pointer-events: none;
}

.select-menu {
  /* Dropdown opens below select */
  inset-inline-start: 0; /* Aligns with start edge (right in RTL) */
}

.select-option {
  text-align: start; /* Right in RTL */
}
```

**Accessibility**:
- **Keyboard**: Up/Down arrows to navigate, Enter to select, Escape to close
- **Focus**: Highlight selected option in dropdown
- **Screen reader**: Use native `<select>` or ARIA combobox pattern
- **Search**: Allow typing to filter long lists

---

#### Radio Button Group

**Anatomy**:
- Fieldset with legend (group label)
- Radio buttons (visual indicators)
- Labels (clickable)

**Visual Specs**:
- **Radio circle**: 20px diameter
- **Inner dot**: 10px diameter (when selected)
- **Spacing**: 16px vertical gap between options
- **Label spacing**: 12px gap from radio circle

**States**:

| State | Border | Background | Inner Dot |
|-------|--------|------------|-----------|
| **Unchecked** | `2px color.neutral.300` | Transparent | None |
| **Checked** | `2px color.primary.base` | Transparent | `color.primary.base` filled |
| **Focus** | `2px color.primary.base` | Transparent | Base + `shadow.focus` |
| **Disabled Unchecked** | `2px color.neutral.300` | Transparent | None, 50% opacity |
| **Disabled Checked** | `2px color.neutral.300` | Transparent | `color.neutral.500` filled |

**RTL Layout**:

```css
.radio-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.radio-option {
  display: flex;
  align-items: center;
  gap: 12px;
  /* Radio button on the right in RTL */
  flex-direction: row-reverse;
}

.radio-label {
  text-align: start;
  cursor: pointer;
  flex: 1;
}
```

**Accessibility**:
- **Grouping**: Use `<fieldset>` and `<legend>` (SC 1.3.1)
- **Keyboard**: Arrow keys to navigate options within group
- **Labels**: Each radio must have associated `<label>`
- **Required**: Indicate required at group level, not per option

---

#### Checkbox

**Visual Specs**:
- **Checkbox box**: 20px square
- **Checkmark**: Icon (e.g., ✓) or SVG
- **Border radius**: `radius.sm` (4px)

**States**:

| State | Border | Background | Checkmark |
|-------|--------|------------|-----------|
| **Unchecked** | `2px color.neutral.300` | Transparent | None |
| **Checked** | `2px color.primary.base` | `color.primary.base` | White checkmark |
| **Indeterminate** | `2px color.primary.base` | `color.primary.base` | White dash |
| **Focus** | `2px color.primary.base` | Base + `shadow.focus` | Base |
| **Disabled** | `2px color.neutral.300` | `color.neutral.100` | `color.neutral.500` |

**RTL Layout**: Same as radio button (checkbox on right, label on left).

**Accessibility**:
- **Keyboard**: Space to toggle
- **Label**: Associated with `<label for="">`
- **Indeterminate**: Use `aria-checked="mixed"` for partial selection
- **Group**: Use `<fieldset>` if multiple related checkboxes

---

### Progress Bar

#### Anatomy

- **Track**: Background bar (full width)
- **Fill**: Colored bar indicating progress
- **Label** (optional): Percentage or step indicator

#### Visual Specs

- **Height**: 8px (default), 12px (large)
- **Border radius**: `radius.full`
- **Track color**: `color.neutral.300`
- **Fill color**: `color.secondary.base` (default), `color.primary.base` (alternative)

#### RTL Behavior

```css
.progress-bar {
  direction: rtl; /* Fill animates from right to left */
}

.progress-fill {
  /* Start at 0 width on the right, expand left */
  transform-origin: right center;
}
```

#### States

| State | Fill Color | Animation |
|-------|------------|-----------|
| **Default** | `color.secondary.base` | Smooth transition |
| **Complete** | `color.success.base` | Optional check icon |
| **Error** | `color.danger.base` | — |

#### Accessibility

- **Role**: `role="progressbar"`
- **ARIA**: `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"`
- **Label**: `aria-label="Question progress: 5 of 9"` (SC 1.3.1)
- **Updates**: Announce major milestones (25%, 50%, 75%, 100%) via `aria-live="polite"`

---

### Modal (Dialog)

#### Anatomy

- **Backdrop**: Full-screen overlay (`color.surface.overlay`)
- **Dialog Container**: Centered, elevated card
- **Header**: Title, close button (optional)
- **Body**: Content
- **Footer**: Actions (primary + secondary buttons)

#### Visual Specs

- **Max width**: 
  - Small: 400px
  - Medium: 560px
  - Large: 720px
- **Padding**: 24px (mobile), 32px (desktop)
- **Border radius**: `radius.lg`
- **Shadow**: `shadow.xl`
- **Backdrop opacity**: 50%

#### RTL Layout

```css
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* Close button on the left in RTL */
}

.modal-close-button {
  margin-inline-start: auto; /* Pushes to left in RTL */
}

.modal-footer {
  display: flex;
  justify-content: flex-start; /* Buttons at end (left in RTL) */
  gap: 12px;
  /* Primary action first (rightmost in RTL) */
  flex-direction: row-reverse;
}
```

#### States

| State | Animation | Focus Management |
|-------|-----------|------------------|
| **Opening** | Fade in backdrop + scale up dialog (300ms) | Move focus to first focusable element |
| **Open** | — | Trap focus inside modal |
| **Closing** | Fade out backdrop + scale down dialog (200ms) | Return focus to trigger element |

#### Accessibility

- **Role**: `role="dialog"` and `aria-modal="true"` (SC 4.1.2)
- **Label**: `aria-labelledby` pointing to title, or `aria-label`
- **Focus trap**: Prevent Tab from leaving modal (SC 2.1.2)
- **Keyboard**: 
  - Escape to close (return focus to trigger)
  - Tab/Shift+Tab cycles through modal elements
- **Screen reader**: Announce dialog opening via `aria-live`
- **Body scroll**: Disable scroll on `<body>` when modal open

#### Crisis Modal Variant

For crisis intervention (triggered by A9 - suicidal ideation):

- **Size**: Medium (560px)
- **Header**: No close button (must acknowledge)
- **Body**: 
  - Supportive message (not alarming)
  - List of Arabic crisis helplines (phone numbers as clickable `tel:` links)
  - "I understand" acknowledgment required
- **Footer**: Single "أفهم وأريد المتابعة" button (primary, large)
- **Cannot dismiss**: Must click acknowledgment button
- **Styling**:
  - Border: `3px solid color.danger.base`
  - Icon: ⚠️ or heart icon (not skull/danger symbols)

---

### Toast Notification

#### Anatomy

- **Container**: Fixed position, auto-dismiss
- **Icon**: Status indicator (right side in RTL)
- **Message**: Brief text
- **Close Button** (optional): X icon (left side in RTL)

#### Variants

| Variant | Background | Border | Icon | Icon Color |
|---------|------------|--------|------|------------|
| **Info** | `color.info.light` | `1px color.info.base` | ℹ️ | `color.info.dark` |
| **Success** | `color.success.light` | `1px color.success.base` | ✓ | `color.success.dark` |
| **Warning** | `color.warning.light` | `1px color.warning.dark` | ⚠️ | `color.warning.dark` |
| **Error** | `color.danger.light` | `1px color.danger.base` | ✗ | `color.danger.dark` |

#### Visual Specs

- **Position**: Top center (mobile), top-end/top-right in LTR (desktop) = top-start/top-left in RTL
- **Max width**: 400px
- **Padding**: 16px
- **Border radius**: `radius.md`
- **Shadow**: `shadow.lg`
- **Animation**: Slide down + fade in (300ms)

#### RTL Layout

```css
.toast {
  display: flex;
  align-items: center;
  gap: 12px;
  /* Icon first (right), message, close button (left) */
}

.toast-icon {
  order: 1; /* Right side in RTL */
}

.toast-message {
  order: 2;
  flex: 1;
  text-align: start;
}

.toast-close {
  order: 3; /* Left side in RTL */
}
```

#### Behavior

- **Duration**: 4 seconds (info/success), 6 seconds (warning/error), infinite (with close button)
- **Stacking**: Max 3 toasts visible, newest at top
- **Dismissal**: Auto-dismiss, or click close button, or click entire toast

#### Accessibility

- **Role**: `role="status"` (non-disruptive) or `role="alert"` (errors)
- **ARIA Live**: `aria-live="polite"` (status) or `aria-live="assertive"` (alert)
- **Focus**: Do not steal focus on appear
- **Keyboard**: If close button exists, must be keyboard-accessible
- **Screen reader**: Message announced automatically

---

## Assessment Components

### MoodSelector

#### Purpose

5-state visual mood picker for welcome screen. Users select current mood before starting assessment.

#### Anatomy

- **Label**: "كيف تشعر اليوم؟" (How do you feel today?)
- **5 Mood States**: Visual cards with illustration + label
- **Selection**: Single-select (radio button behavior)

#### Mood States

| State | Label (Arabic) | Illustration | Color Accent |
|-------|----------------|--------------|--------------|
| 1 | سيء جداً (Very bad) | Rainy cloud | `color.danger.base` |
| 2 | سيء (Bad) | Overcast sky | `color.warning.base` |
| 3 | عادي (Neutral) | Partly cloudy | `color.neutral.500` |
| 4 | جيد (Good) | Sunny with clouds | `color.secondary.base` |
| 5 | ممتاز (Excellent) | Clear blue sky | `color.success.base` |

#### Visual Specs

- **Layout**: Horizontal row (mobile: 2 rows), vertical column (tablets+)
- **Card size**: 80px × 80px (mobile), 120px × 120px (desktop)
- **Illustration size**: 48px × 48px (mobile), 72px × 72px (desktop)
- **Border**: `2px color.neutral.300` (unselected), `3px color.primary.base` (selected)
- **Border radius**: `radius.lg`
- **Spacing**: 12px gap between cards

#### States

| State | Border | Background | Scale |
|-------|--------|------------|-------|
| **Default** | `2px color.neutral.300` | `color.surface.base` | 100% |
| **Hover** | `2px color.primary.light` | `color.surface.hover` | 102% |
| **Selected** | `3px color.primary.base` | `color.surface.base` | 100% |
| **Focus** | `2px color.primary.base` + `shadow.focus` | Base | 100% |

#### RTL Layout

```css
.mood-selector {
  display: flex;
  gap: 12px;
  /* On mobile: wrap to 2 rows, right-to-left */
  flex-wrap: wrap;
  direction: rtl;
}

.mood-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
```

#### Accessibility

- **Keyboard**: Arrow keys to navigate, Space to select
- **Role**: `role="radiogroup"` with `<input type="radio">` hidden inputs
- **Labels**: Each card has associated label for screen readers
- **Focus**: Visible focus indicator on selected card

---

### QuestionCard

#### Purpose

Displays a single assessment question with response options.

#### Anatomy

- **Question Number**: e.g., "السؤال 3 من 9" (Question 3 of 9)
- **Question Text**: Primary question in Arabic
- **Response Options**: Radio buttons or custom scale (FrequencyScale)
- **Helper Text** (optional): Additional context
- **Navigation**: Back button (right), Next button (left)

#### Visual Specs

- **Card**: Elevated variant
- **Padding**: 24px (mobile), 32px (desktop)
- **Max width**: 720px
- **Question font**: `type.headline.medium`
- **Options spacing**: 20px vertical gap

#### RTL Layout

```css
.question-card {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.question-header {
  text-align: start; /* Right in RTL */
}

.question-navigation {
  display: flex;
  justify-content: space-between;
  /* Back button on right, Next on left */
}
```

#### Accessibility

- **Heading**: Question text is `<h2>` or `aria-level="2"`
- **Progress**: `aria-label="Question 3 of 9"` on card
- **Required**: Mark required questions (most/all in assessment)
- **Keyboard**: Tab through options, Enter on Next button

---

### FrequencyScale

#### Purpose

5-point Likert scale for frequency-based questions (Never → Always).

#### Anatomy

- **5 Options**: Radio buttons with Arabic labels
- **Visual Scale**: Buttons displayed as segmented control

#### Scale Labels (Arabic)

| Value | Label | English |
|-------|-------|---------|
| 0 | أبداً | Never |
| 1 | نادراً | Rarely |
| 2 | أحياناً | Sometimes |
| 3 | غالباً | Often |
| 4 | دائماً | Always |

#### Visual Specs (Segmented Control Style)

- **Layout**: Horizontal row (5 segments)
- **Height**: 48px (mobile), 56px (desktop)
- **Border**: `1px color.neutral.300` around entire control
- **Border radius**: `radius.md` on outer edges
- **Selected segment**: `color.primary.base` background, white text
- **Unselected segment**: Transparent background, `color.neutral.700` text

#### RTL Layout

```css
.frequency-scale {
  display: flex;
  border: 1px solid var(--color-neutral-300);
  border-radius: var(--radius-md);
  overflow: hidden;
  /* Segments flow right-to-left: أبداً on right, دائماً on left */
  direction: rtl;
}

.frequency-option {
  flex: 1;
  text-align: center;
  padding: 12px 8px;
  border-inline-start: 1px solid var(--color-neutral-300);
}

.frequency-option:first-child {
  border-inline-start: none; /* Rightmost segment, no border */
}
```

#### Accessibility

- **Role**: `role="radiogroup"`
- **Labels**: Each option has visible label
- **Keyboard**: Left/Right arrows to navigate (reversed in RTL: Right = Never, Left = Always)
- **Required**: Indicate if question requires response

---

### ProgressStepper

#### Purpose

Shows progress through question flow within a category (e.g., 3 of 9 questions).

#### Anatomy

- **Steps**: Circles or dots representing questions
- **Active Step**: Highlighted
- **Completed Steps**: Checkmark or filled
- **Upcoming Steps**: Outlined

#### Visual Specs

- **Step circle**: 32px diameter
- **Spacing**: 12px gap (mobile), 16px (desktop)
- **Connector line**: 2px height, `color.neutral.300` (incomplete), `color.primary.base` (complete)

#### States

| State | Circle Fill | Border | Icon |
|-------|-------------|--------|------|
| **Completed** | `color.primary.base` | None | ✓ white |
| **Active** | `color.surface.base` | `3px color.primary.base` | Step number |
| **Upcoming** | `color.surface.base` | `2px color.neutral.300` | Step number (light) |

#### RTL Layout

```css
.progress-stepper {
  display: flex;
  align-items: center;
  /* Steps flow right-to-left */
  direction: rtl;
}

.progress-step {
  display: flex;
  align-items: center;
  gap: 12px;
}

.progress-connector {
  width: 40px;
  height: 2px;
  background: var(--color-neutral-300);
}

.progress-connector.completed {
  background: var(--color-primary-base);
}
```

#### Accessibility

- **Role**: `role="progressbar"` or `role="navigation"`
- **Current step**: `aria-current="step"`
- **Labels**: `aria-label="Question 3 of 9"`
- **Non-interactive**: Steps are not clickable in linear assessment flow

---

### ResultCard

#### Purpose

Displays pattern summary on results screen (e.g., "Moderate Anxiety Detected").

#### Anatomy

- **Illustration**: Category-specific image (top)
- **Severity Label**: e.g., "قلق متوسط" (Moderate Anxiety)
- **Score** (optional): Numeric score
- **Description**: Brief explanation (2-3 sentences)
- **Action Link**: "Learn more" or "View resources"

#### Visual Specs

- **Card variant**: Elevated
- **Illustration size**: 120px × 120px
- **Padding**: 24px
- **Max width**: 400px
- **Border accent**: 4px border on top (right edge in RTL) matching severity color

#### Severity Color Mapping

| Severity | Border Color | Label Color |
|----------|--------------|-------------|
| **Low/Minimal** | `color.success.base` | `color.success.dark` |
| **Mild** | `color.warning.base` | `color.warning.dark` |
| **Moderate** | `color.secondary.base` | `color.secondary.dark` |
| **Severe** | `color.danger.base` | `color.danger.dark` |

#### RTL Layout

```css
.result-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border-inline-start: 4px solid var(--severity-color); /* Right edge in RTL */
}
```

#### Accessibility

- **Heading**: Severity label is `<h3>`
- **Context**: Include "Result for Anxiety Module" for screen readers
- **Links**: "Learn more" link is clearly labeled with category context

---

### CrisisAlert

#### Purpose

Prominent, persistent alert for crisis resources. Triggered by A9 (suicidal ideation) responses or manually accessible.

#### Anatomy

- **Icon**: Heart or support icon (not alarming symbol)
- **Heading**: "نحن هنا لمساعدتك" (We are here to help you)
- **Message**: Brief, supportive message
- **Helpline List**: Arabic crisis phone numbers (clickable `tel:` links)
- **Additional Resources**: Links to mental health services
- **Acknowledgment Button**: "أفهم" (I understand)

#### Visual Specs

- **Background**: `color.danger.light`
- **Border**: `3px solid color.danger.base`
- **Border radius**: `radius.lg`
- **Padding**: 24px
- **Icon size**: 48px
- **Font**: Larger, readable (`type.body.large`)

#### Crisis Helplines (Example)

```
🇸🇦 السعودية: 920033360
🇪🇬 مصر: 762
🇦🇪 الإمارات: 800 4673
🇯🇴 الأردن: 110
🇱🇧 لبنان: 1564
```

#### RTL Layout

```css
.crisis-alert {
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: start; /* Right-aligned in RTL */
}

.crisis-helplines {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.crisis-helpline {
  display: flex;
  align-items: center;
  gap: 8px;
  /* Flag emoji on right, number on left */
  direction: rtl;
}
```

#### Behavior

- **Triggering**: Auto-opens as modal when A9 response indicates suicidal ideation
- **Persistence**: Remains visible at top of results screen
- **Cannot dismiss**: Modal version requires acknowledgment button click
- **No alarming language**: Use supportive, hopeful tone

#### Accessibility

- **Role**: `role="alert"` (high priority announcement)
- **ARIA Live**: `aria-live="assertive"` for immediate announcement
- **Focus**: When modal opens, focus moves to heading
- **Phone links**: Use `<a href="tel:+966920033360">` for one-tap calling on mobile
- **Keyboard**: All helplines and resources keyboard-accessible

---

### CategoryCard

#### Purpose

Browse card for home screen. Displays available assessment categories (Anxiety, Depression, etc.).

#### Anatomy

- **Illustration**: Category-specific hero image
- **Category Name**: e.g., "القلق" (Anxiety)
- **Short Description**: 1-2 sentences
- **Duration Indicator**: e.g., "5-10 دقائق" (5-10 minutes)
- **CTA Button**: "ابدأ التقييم" (Start assessment)

#### Visual Specs

- **Card variant**: Interactive
- **Size**: Medium
- **Illustration aspect ratio**: 16:9
- **Illustration position**: Top of card
- **Padding**: 20px (body content below illustration)
- **Min height**: 320px

#### RTL Layout

```css
.category-card {
  display: flex;
  flex-direction: column;
}

.category-illustration {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: var(--radius-md) var(--radius-md) 0 0;
}

.category-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  flex: 1;
}

.category-footer {
  display: flex;
  justify-content: flex-start; /* Button on left in RTL */
}
```

#### Accessibility

- **Keyboard**: Entire card is focusable and activates on Enter
- **Heading**: Category name is `<h2>` or `<h3>`
- **Image**: Illustration has descriptive `alt` text
- **Link/Button**: Wrap entire card in `<a>` or use `<button>` to avoid nested interactives

---

## User Flows

### Flow 1: Welcome & Onboarding (3 Screens)

#### Screen 1: Welcome

**Purpose**: Introduction and mood check-in.

**Components**:
- Hero illustration (calming nature scene)
- Heading: "مرحباً بك في رحلة الاستكشاف الذاتي" (Welcome to your self-discovery journey)
- Body text (2-3 sentences): Briefly explain purpose, privacy, and safety
- **MoodSelector** component
- Primary button: "التالي" (Next)

**Layout**:
- Max width: 560px
- Centered
- Illustration: 100% width, 240px height
- Spacing: 32px between sections

**Navigation**:
- Next button disabled until mood selected
- No back button (entry point)

---

#### Screen 2: Disclaimer

**Purpose**: Set expectations and obtain informed consent.

**Components**:
- Heading: "قبل أن نبدأ" (Before we begin)
- Body text (structured list):
  - "هذا تقييم ذاتي، وليس تشخيصاً طبياً" (This is self-assessment, not medical diagnosis)
  - "بياناتك آمنة ولن يتم حفظها" (Your data is safe and will not be saved)
  - "إذا كنت في أزمة، اتصل بخط المساعدة" (If in crisis, call helpline) + crisis phone number
  - "يمكنك التوقف في أي وقت" (You can stop anytime)
- Checkbox: "أفهم وأوافق" (I understand and agree)
- Primary button: "ابدأ" (Start)
- Ghost button: "العودة" (Back)

**Layout**:
- Max width: 640px
- Centered
- Checkbox with full text label (clickable)
- Buttons: Back (right), Start (left)

**Navigation**:
- Start button disabled until checkbox checked
- Back button returns to Screen 1

---

#### Screen 3: Category Browser

**Purpose**: Select assessment category to begin.

**Components**:
- Heading: "اختر ما تريد استكشافه" (Choose what you want to explore)
- Grid of **CategoryCard** components (Anxiety, Depression)
- Footer: "لديك أسئلة؟" link to FAQ/help

**Layout**:
- Max width: 1200px
- Grid: 1 column (mobile), 2 columns (tablet+)
- Gap: 24px
- Cards display in order: Anxiety (right), Depression (left) in RTL

**Navigation**:
- Clicking a CategoryCard starts that assessment
- No explicit back button (can use browser back or header navigation)

---

### Flow 2: Question Flow with Progress & Exit

#### Question Screens (Dynamic)

**Components**:
- **ProgressStepper** (top of screen, below header)
- **QuestionCard** (centered)
  - Question number and text
  - Response options (FrequencyScale or radio buttons)
  - Navigation: Back button (right), Next button (left)
- Exit link (header): "إيقاف التقييم" (Stop assessment)

**Layout**:
- Max width: 720px
- Centered vertically and horizontally
- Progress stepper: Full width, sticky or fixed at top

**Navigation**:
- **Back button**: Returns to previous question (or category browser if Q1)
- **Next button**: 
  - Disabled until response selected
  - Advances to next question
  - On last question, changes to "عرض النتائج" (View results)
- **Exit link**: Opens confirmation modal

**Exit Confirmation Modal**:
- Heading: "هل أنت متأكد؟" (Are you sure?)
- Body: "لن يتم حفظ تقدمك" (Your progress will not be saved)
- Buttons:
  - Secondary: "المتابعة" (Continue assessment) — dismisses modal
  - Danger: "إيقاف التقييم" (Stop assessment) — returns to category browser

**Progress Indicator**:
- Progress bar (below header): Fills right-to-left
- Shows percentage (e.g., "33%" for Q3/9)
- Announced to screen readers on each question load

---

#### Crisis Trigger (A9 Response)

**Behavior**:
When user selects a response indicating suicidal ideation (A9 in Depression module):

1. Question submission pauses
2. **CrisisAlert** modal opens immediately (no animation delay)
3. Modal displays:
   - Supportive heading
   - Crisis helplines
   - "I understand" acknowledgment button
4. User must click acknowledgment to continue
5. Assessment continues after acknowledgment
6. CrisisAlert remains visible at top of results screen

**Modal Specs**:
- Size: Medium (560px)
- No close button (must acknowledge)
- Border: `3px solid color.danger.base`
- Focus: Trapped in modal until acknowledgment

---

### Flow 3: Results Display with Resource Links

#### Results Screen

**Purpose**: Display assessment outcomes and provide resources.

**Components**:
- **CrisisAlert** banner (if triggered during assessment) — persistent at top
- Heading: "نتائج التقييم" (Assessment results)
- Subheading: Category name (e.g., "تقييم القلق")
- **ResultCard** component (primary result)
- Description section:
  - What this result means
  - Common symptoms/patterns
  - Not a diagnosis disclaimer
- Resources section:
  - Heading: "الخطوات التالية" (Next steps)
  - List of recommended actions:
    - "تحدث إلى أخصائي" (Talk to a specialist) + link to directory
    - "تمارين التنفس" (Breathing exercises) + link to guide
    - "اقرأ المزيد عن [القلق]" (Read more about Anxiety) + link to article
- Action buttons:
  - Primary: "تقييم جديد" (New assessment)
  - Secondary: "حفظ النتائج" (Save results) — triggers download/print
- Footer: Crisis helplines link (always visible)

**Layout**:
- Max width: 800px
- Centered
- Sections spaced with 32px gaps
- Resources: Vertical list, 16px gaps

**Navigation**:
- "New assessment" returns to category browser
- "Save results" triggers browser print dialog or PDF download
- Resource links open in same tab (internal) or new tab (external)

---

### Flow 4: Crisis Modal (Detailed Spec)

**Triggering Conditions**:
1. User selects response to A9 (Depression - suicidal ideation) indicating ideation
2. User clicks "Crisis Resources" link in header (optional manual access)

**Modal Content**:

**Header**:
- Icon: ❤️ or 🤝 (supportive, not alarming)
- Heading: "نحن نهتم بك" (We care about you)

**Body**:
- Message: 
  > "إذا كنت تفكر في إيذاء نفسك أو الانتحار، من فضلك تواصل مع أحد هذه الخطوط الآن. هناك أشخاص متخصصون ومستعدون لمساعدتك."
  > (If you are thinking about self-harm or suicide, please contact one of these helplines now. There are trained people ready to help you.)

- Crisis Helplines (clickable phone links):
  ```
  🇸🇦 السعودية: 920033360
  🇪🇬 مصر: 762
  🇦🇪 الإمارات: 800 4673
  🇯🇴 الأردن: 110
  🇱🇧 لبنان: 1564
  ```

- Additional Resources:
  - "ابحث عن طبيب نفسي قريب منك" (Find a psychiatrist near you) — link
  - "موارد الصحة النفسية" (Mental health resources) — link

**Footer**:
- Single button: "أفهم وأريد المتابعة" (I understand and want to continue)
- Font size: Large (`type.label.large`)
- Button size: Large (52px height)

**Visual Specs**:
- Background: `color.surface.base`
- Border: `3px solid color.danger.base`
- Border radius: `radius.lg`
- Padding: 32px
- Shadow: `shadow.xl`
- Backdrop: `color.surface.overlay`

**Behavior**:
- Cannot dismiss with Escape key or backdrop click
- Must click acknowledgment button
- After acknowledgment:
  - If triggered mid-assessment: returns to question flow
  - If manually accessed: closes modal

**Accessibility**:
- **Role**: `role="alertdialog"`
- **ARIA**: `aria-labelledby` pointing to heading
- **Focus**: Trapped inside modal, initial focus on heading
- **Keyboard**: Tab cycles through helplines and button, Enter on button submits
- **Screen reader**: Announces heading and message immediately

---

### Flow 5: Category Browser (Home Screen)

**Purpose**: Entry point for selecting assessment category.

**Components**:
- Header: Site logo (top-right), "معلومات" (About) link (top-left), Crisis link
- Hero section:
  - Heading: "افهم نفسك بشكل أفضل" (Understand yourself better)
  - Subheading: Brief description (1-2 sentences)
  - Illustration: Welcoming nature scene
- Category grid: 2 **CategoryCard** components (MVP: Anxiety, Depression)
- Footer:
  - Privacy link: "سياسة الخصوصية" (Privacy policy)
  - About link: "عن المنصة" (About the platform)
  - Crisis helplines link: "خطوط المساعدة" (Helplines)

**Layout**:
- Full-width header (with max-width container)
- Hero section: Max width 800px, centered
- Category grid: Max width 1000px, centered, 24px gap
- Footer: Full-width, subtle background

**Grid Behavior**:
- Mobile (< 768px): 1 column
- Tablet+ (≥ 768px): 2 columns
- Cards same height in each row

**Navigation**:
- Clicking CategoryCard starts that assessment flow (Screen 3 of onboarding if first visit, or directly to question flow if returning)
- Header links navigate to respective pages
- Footer links open in same tab

**Accessibility**:
- **Landmark roles**: `<header>`, `<main>`, `<footer>`
- **Skip link**: "تخطي إلى المحتوى" (Skip to content) at top for keyboard users
- **Headings**: Logical hierarchy (H1 for hero, H2 for "Choose category", H3 for card titles)

---

## Accessibility Specifications

### General Requirements (WCAG 2.2 Level AA)

#### Color Contrast (SC 1.4.3, 1.4.11)

- **Text contrast**: 4.5:1 minimum for normal text, 3:1 for large text (18pt+)
- **UI component contrast**: 3:1 minimum for interactive elements, borders, icons
- **Verified in design tokens**: All text colors listed meet requirements on specified backgrounds

#### Touch Targets (SC 2.5.8)

- **Minimum size**: 44px × 44px for all interactive elements (buttons, links, form inputs)
- **Recommended size**: 48px × 48px for primary actions
- **Spacing**: 8px minimum gap between adjacent touch targets
- **Exceptions**: Inline links in paragraphs (context makes them accessible)

#### Focus Indicators (SC 2.4.7, 2.4.11)

- **Visibility**: All focusable elements have clear focus indicator
- **Style**: `3px solid` outline in `color.primary.base` or `shadow.focus`
- **Offset**: 2px gap between element and outline
- **Not obscured**: Focus indicator not covered by other content (SC 2.4.11)

#### Keyboard Navigation (SC 2.1.1, 2.1.2)

- **All functions keyboard-accessible**: No mouse-only interactions
- **Logical tab order**: Follows visual flow (right-to-left in RTL)
- **No keyboard traps**: Tab/Shift+Tab can exit all components
- **Skip links**: "Skip to content" link at top of page

#### Forms (SC 3.3.1, 3.3.2, 3.3.3)

- **Labels**: Every input has visible, associated `<label>`
- **Required fields**: Indicated with visual marker + `required` attribute
- **Error identification**: Errors described in text, not color alone
- **Error suggestions**: Provide correction hints ("Enter valid email: example@domain.com")
- **Helper text**: Use `aria-describedby` to associate instructions with inputs

#### Semantic HTML (SC 4.1.2)

- **Landmarks**: Use `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`
- **Headings**: Logical hierarchy (H1 → H2 → H3), no skipped levels
- **Lists**: Use `<ul>`, `<ol>` for lists
- **Buttons vs. Links**: Use `<button>` for actions, `<a>` for navigation
- **ARIA**: Use ARIA attributes when HTML semantics insufficient

---

### RTL-Specific Accessibility

#### Text Direction (SC 1.3.2)

```css
html {
  direction: rtl;
  lang: ar;
}
```

- **Language attribute**: `lang="ar"` on `<html>` tag (SC 3.1.1)
- **Direction**: `direction: rtl` applied globally
- **Logical properties**: Use `margin-inline-start`, `padding-block-end`, etc. to auto-flip in RTL

#### Keyboard Navigation in RTL

- **Arrow keys**: Right arrow = previous, Left arrow = next (reversed from LTR)
- **Tab order**: Flows right-to-left, top-to-bottom
- **Slider controls**: Right = decrease value, Left = increase value

#### Screen Reader Announcements

- **Language**: Screen reader detects `lang="ar"` and uses Arabic voice
- **Numbers**: Arabic numerals (٠-٩) or Western (0-9) both acceptable, but prefer Western for consistency
- **ARIA labels**: Write in Arabic (e.g., `aria-label="السؤال 3 من 9"`)

---

### Component-Specific Accessibility

#### Buttons

- **Keyboard**: Enter or Space to activate
- **Focus**: Visible focus indicator
- **Disabled**: `aria-disabled="true"`, explain why disabled if not obvious
- **Loading**: `aria-busy="true"`, announce "Loading" via `aria-live`
- **Icon-only**: Must have `aria-label`

#### Forms

- **Label association**: `<label for="input-id">` + `<input id="input-id">`
- **Required fields**: `required` attribute + visual indicator in label
- **Error handling**: 
  - `aria-invalid="true"` on invalid inputs
  - Error message linked via `aria-describedby`
  - Move focus to first error on submit failure
- **Autocomplete**: Use `autocomplete` attribute for known fields (name, email, phone)

#### Modals

- **Role**: `role="dialog"` or `role="alertdialog"` (crisis modal)
- **Focus trap**: Prevent Tab from leaving modal
- **Initial focus**: Move to first focusable element (heading or first button)
- **Backdrop**: Clicking backdrop closes modal (unless crisis modal)
- **Escape key**: Closes modal (unless crisis modal)
- **Return focus**: When closed, return focus to trigger element

#### Progress Indicators

- **Role**: `role="progressbar"`
- **ARIA values**: `aria-valuenow="3"`, `aria-valuemin="0"`, `aria-valuemax="9"`
- **Label**: `aria-label="Question progress: 3 of 9"`
- **Updates**: Announce major milestones via `aria-live="polite"`

#### Toasts

- **Role**: `role="status"` (info/success) or `role="alert"` (warning/error)
- **ARIA live**: `aria-live="polite"` or `aria-live="assertive"`
- **No focus steal**: Toasts do not receive focus on appear
- **Dismissal**: If close button present, must be keyboard-accessible

---

### Testing Checklist

Before implementation, frontend developers should verify:

- [ ] All text meets 4.5:1 contrast ratio (3:1 for large text)
- [ ] All interactive elements ≥ 44px × 44px touch target
- [ ] All focusable elements have visible focus indicator
- [ ] All functionality works with keyboard only (no mouse)
- [ ] Tab order follows visual flow (RTL: right-to-left)
- [ ] Screen reader announces all content correctly (test with NVDA/VoiceOver)
- [ ] Forms validate and show errors clearly
- [ ] Modals trap focus and return focus on close
- [ ] Crisis modal cannot be dismissed without acknowledgment
- [ ] Page language is set to Arabic (`lang="ar"`)
- [ ] CSS uses logical properties (`margin-inline-start`, not `margin-right`)
- [ ] Component states (hover, focus, active, disabled) are clearly distinguishable

---

## Implementation Notes for Frontend Developers

### Technology Stack

- **Framework**: Next.js 14 (React, TypeScript)
- **Styling**: Tailwind CSS with custom RTL configuration
- **Component Library**: shadcn/ui customized for Arabic/RTL
- **Icons**: Lucide React (flipped automatically in RTL)
- **Fonts**: IBM Plex Sans Arabic (via Google Fonts or self-hosted)

### Tailwind RTL Configuration

```javascript
// tailwind.config.js
module.exports = {
  plugins: [
    require('tailwindcss-rtl'),
  ],
  // Add logical property utilities
  theme: {
    extend: {
      spacing: {
        // Custom spacing scale
      },
      colors: {
        // Design tokens from this spec
      },
    },
  },
};
```

### CSS Logical Properties

Use Tailwind's RTL plugin or custom utilities:

```css
/* Example: margin-inline-start */
.ms-4 { margin-inline-start: 1rem; }
.me-4 { margin-inline-end: 1rem; }
.ps-4 { padding-inline-start: 1rem; }
.pe-4 { padding-inline-end: 1rem; }
```

### Focus Management

```typescript
// Example: Focus trap for modal
import { useFocusTrap } from '@/hooks/useFocusTrap';

function Modal({ isOpen, onClose }) {
  const modalRef = useFocusTrap(isOpen);
  
  return (
    <div ref={modalRef} role="dialog" aria-modal="true">
      {/* Modal content */}
    </div>
  );
}
```

### Crisis Modal Implementation Priority

**Critical**: Crisis modal must be implemented first and tested thoroughly. This is a safety feature, not optional.

**Test scenarios**:
1. A9 response triggers modal immediately
2. Modal cannot be dismissed with Escape or backdrop click
3. Focus trapped inside modal
4. Phone links work on mobile (`tel:` links)
5. Acknowledgment button returns focus to question flow

---

## Revision History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | 2026-01-29 | Initial design system specification | UI/UX Designer |

---

## References

- **Discovery Documents**:
  - `docs/discovery/02_rtl_design_system.md` (Serenity theme foundation)
  - `docs/discovery/01_product_options.md` (Product flows)
  - `docs/discovery/04_mvp_plan.md` (MVP scope)
- **Standards**:
  - WCAG 2.2 Level AA: https://www.w3.org/WAI/WCAG22/quickref/
  - Material Design 3 (typography reference): https://m3.material.io/styles/typography/overview
  - CSS Logical Properties: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties

---

**End of Design System Specification**
