# منصة التقييم الذاتي | Arabic DSM-5-TR Self-Evaluation Platform

A privacy-first, RTL-native web application for mental health self-assessment based on DSM-5-TR criteria, designed for Arabic-speaking users.

## 🌟 Features

- **Arabic-First RTL Design**: Native right-to-left layout using CSS Logical Properties
- **Privacy-First Architecture**: No backend, no accounts, session-only state (ADR-001)
- **Culturally Sensitive**: Designed for Arabic-speaking populations with appropriate visual language
- **Accessibility**: WCAG 2.1 AA compliant with Arabic screen reader support
- **Mobile-First Responsive**: Optimized for mobile, tablet, and desktop
- **Crisis Intervention**: Built-in safety protocols and resource signposting

## 🛠️ Tech Stack

- **Framework**: Next.js 16.1.6 with App Router
- **React**: 19.2.3 with React Server Components
- **TypeScript**: Strict mode enabled
- **Styling**: Tailwind CSS v4 with Oxide engine
- **Fonts**: IBM Plex Sans Arabic via next/font
- **Design System**: Theme A "Serenity" (سكينة) - nature-inspired calm

## 📁 Project Structure

```
.
├── docs/
│   └── discovery/         # Discovery phase outputs
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # Reusable UI components
│   ├── lib/             # Utilities, hooks, types
│   └── content/         # Static content and questions
└── public/              # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ 
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## 🎨 Design System

The platform uses Theme A "Serenity" (سكينة), a nature-inspired design system with:

- **Primary Color**: `#4A7C7E` (Teal) - Calming, trustworthy
- **Secondary Color**: `#E8B86D` (Gold) - Warm accents
- **Typography**: IBM Plex Sans Arabic with Cairo and Noto Sans Arabic fallbacks
- **RTL Layout**: CSS Logical Properties (`margin-inline-start`, `padding-inline-end`)

See `docs/discovery/02_rtl_design_system.md` for full specifications.

## ♿ Accessibility

- WCAG 2.1 AA compliance minimum
- Keyboard navigation support
- Screen reader tested (NVDA, VoiceOver with Arabic)
- 4.5:1 color contrast ratios
- 48px minimum touch targets
- Focus visible indicators on all interactive elements

## 📋 Development Guidelines

- Follow the `docs/discovery/01_product_options.md` for UX patterns
- Respect the anonymous-first architecture (ADR-001)
- Use CSS Logical Properties for RTL support
- Include Arabic text samples in components
- Test with Arabic screen readers
- Follow mental health content safety protocols

## 🔒 Privacy & Safety

- **No Backend**: All processing happens client-side
- **No Accounts**: Anonymous by default
- **Session-Only**: State cleared on browser close
- **Crisis Protocols**: Immediate resource signposting for distress indicators
- **Not a Diagnosis**: Clear disclaimers throughout

## 📝 License

This project is for the Arabic-speaking community's mental health awareness.

## 🤝 Contributing

Please ensure all contributions:
- Support RTL layout natively
- Include Arabic translations
- Follow accessibility guidelines
- Respect cultural sensitivities
- Maintain privacy-first architecture

---

**Built with ❤️ for the Arabic-speaking community**
