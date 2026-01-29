# MVP Plan & Phased Roadmap

> Phased delivery plan with success metrics

---

## MVP Scope Summary

### MVP (Phase 1): Foundation + 2 Categories

**Timeline**: 6-8 weeks

**Core Deliverables**:
1. Responsive RTL web app (mobile/tablet/desktop)
2. 2 complete assessment modules: **Anxiety** + **Depression**
3. Welcome flow with mood check-in
4. Educational content for each disorder
5. Results summary with resources
6. Crisis intervention system
7. Full Arabic content

### Why Start with Anxiety + Depression?

| Factor | Anxiety | Depression | ADHD | OCD |
|--------|---------|------------|------|-----|
| Prevalence | Very High | Very High | Medium | Lower |
| Public familiarity | High | High | Growing | Medium |
| Question complexity | Low | Low | Medium | Medium |
| Screening precedent | PHQ-GAD | PHQ-9 | Adult ASRS | Y-BOCS |
| Risk factors | Moderate | High (suicidal) | Low | Low |

Starting with the most prevalent, familiar categories maximises early user value and allows refinement before tackling more complex modules.

---

## Phase 1: MVP (Weeks 1-8)

### Week 1-2: Foundation

| Deliverable | Owner | Acceptance |
|-------------|-------|------------|
| Project setup (Next.js, RTL config) | Frontend | Builds, deploys |
| Design system implementation | Frontend | Components documented |
| Arabic typography system | Frontend | Readable on all devices |
| Base component library | Frontend | 10 core components |

### Week 3-4: Core UX

| Deliverable | Owner | Acceptance |
|-------------|-------|------------|
| Welcome/onboarding flow | Frontend | 3-screen flow |
| Mood check-in component | Frontend | 5-state selector works |
| Category browser (home) | Frontend | 4 category cards |
| Question flow engine | Frontend | Renders questions, captures responses |
| Progress indicator | Frontend | Shows completion % |

### Week 5-6: Content + Safety

| Deliverable | Owner | Acceptance |
|-------------|-------|------------|
| Anxiety module content | Content | 15 questions + educational |
| Depression module content | Content | 15 questions + educational |
| Arabic copy review | Content | Native speaker approved |
| Crisis modal system | Frontend | Triggers on risk responses |
| Disclaimer flows | Frontend | Pre-use, in-flow, results |

### Week 7-8: Visual Assets + QA

| Deliverable | Owner | Acceptance |
|-------------|-------|------------|
| Hero illustrations (2 categories) | Image Agent | 4+ illustrations per category |
| Mood state illustrations | Image Agent | 5 mood visuals |
| UI illustrations (empty states, etc.) | Image Agent | 6+ UI illustrations |
| Accessibility audit | QA | WCAG 2.1 AA pass |
| Cross-browser/device testing | QA | Major browsers + devices |
| Content accuracy review | QA | Criteria mapping verified |

### MVP Feature List

#### Must-Have (MVP)

- [ ] RTL responsive layout (mobile-first)
- [ ] Welcome + disclaimer flow
- [ ] Mood check-in (optional entry point)
- [ ] Category browser (4 categories visible, 2 active)
- [ ] Anxiety assessment module (7 disorders, ~15 questions)
- [ ] Depression assessment module (4 disorders, ~15 questions)
- [ ] Educational content per disorder
- [ ] Results summary (patterns, not scores)
- [ ] Crisis intervention modal
- [ ] Resource links (helplines, articles)
- [ ] Arabic-only (English Phase 2)
- [ ] AI-generated hero illustrations
- [ ] Basic analytics-free setup

#### Nice-to-Have (MVP Stretch)

- [ ] Quick check mode (5-question screener)
- [ ] Category recommendation based on mood
- [ ] Shareable summary (PDF export)
- [ ] Light/dark mode toggle

---

## Phase 2: Expansion (Weeks 9-14)

### Goals
- Add ADHD + OCD modules
- Implement progress tracking (local storage)
- Add English language support
- Enhance visual polish

### Deliverables

| Deliverable | Timeline | Notes |
|-------------|----------|-------|
| ADHD module | Week 9-10 | 3 presentations, age of onset considerations |
| OCD module | Week 11-12 | 5 disorders, time-based criteria |
| Local progress tracking | Week 10-11 | Stores completion, not responses |
| English translation | Week 12-13 | Full content localisation |
| Quick check mode | Week 13-14 | 5-question screeners per category |
| Additional illustrations | Week 9-14 | ADHD + OCD hero images |

### Phase 2 Feature List

- [ ] ADHD assessment module
- [ ] OCD & Related assessment module
- [ ] Local storage progress (optional)
- [ ] English language toggle
- [ ] Quick check mode (2-min screeners)
- [ ] Category recommendations engine
- [ ] Enhanced results with comparisons
- [ ] More illustrations and visual polish

---

## Phase 3: Maturity (Weeks 15-24)

### Goals
- Add remaining categories (Trauma, Bipolar, etc.)
- Implement companion/guide feature
- Add optional accounts (encrypted)
- Professional referral network (optional)

### Potential Deliverables

| Feature | Complexity | Value |
|---------|------------|-------|
| Trauma & Stress module | Medium | High demand |
| Bipolar module | High | Complex criteria |
| Companion feature | High | Engagement, retention |
| Optional accounts | High | Progress sync, sharing |
| Therapist directory | Medium | Monetisation potential |
| Community features | High | Peer support |

---

## Success Metrics

### Primary Metrics (MVP)

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Module Completion Rate** | >60% | Users who finish started assessment |
| **Return Usage (7-day)** | >20% | Anonymous: returning device fingerprint-free |
| **Time to First Insight** | <3 min | Time from landing to first result |
| **Crisis Resource Views** | Track only | Number of crisis modal impressions |

### Secondary Metrics (Phase 2+)

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Multi-Category Exploration** | >30% | Users who try 2+ categories |
| **Quick Check Engagement** | >40% | Quick check → full assessment conversion |
| **Progress Tracking Opt-In** | >25% | Users who enable local storage |
| **Language Toggle Usage** | Track | Arabic vs English sessions |

### Qualitative Metrics

| Metric | Method |
|--------|--------|
| **User Satisfaction** | Optional feedback form (1-5 stars + comment) |
| **Content Helpfulness** | "Was this helpful?" per module |
| **Clarity Rating** | "Was this easy to understand?" |
| **Cultural Resonance** | Feedback on imagery and language |

### Anti-Metrics (What We DON'T Optimise)

| Anti-Metric | Reason |
|-------------|--------|
| Session duration | Don't want users lingering in distress |
| Daily active users | Not a habit-forming app |
| Viral sharing | Privacy > growth |
| Conversion to accounts | Anonymous is the goal |

---

## Technical Stack (Recommended)

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS v4 with RTL plugin
- **Components**: shadcn/ui (customised for RTL)
- **State**: React Context (no Redux needed for anonymous)
- **i18n**: next-intl (Arabic-first, English Phase 2)

### Deployment
- **Hosting**: Vercel (optimised for Next.js)
- **CDN**: Vercel Edge (global, fast Arabic-region delivery)
- **Domain**: Custom domain with SSL

### Content
- **CMS**: None (static content in repo)
- **Markdown**: MDX for educational content
- **Images**: WebP, served from Vercel

### Why This Stack?
- Zero backend = zero data collection
- Static-first = fast, private, cheap
- Vercel = excellent Middle East CDN presence
- Next.js = proven RTL support, great DX

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Content accuracy concerns | Medium | High | Professional review before launch |
| Cultural missteps in imagery | Medium | Medium | Regional review panel |
| Low initial adoption | Medium | Medium | Soft launch, gather feedback |
| Scope creep | High | Medium | Strict phase boundaries |
| Accessibility gaps | Low | High | Early WCAG testing |
| Crisis mishandling | Low | Critical | Legal review, expert input |

---

## Budget Considerations (Estimate)

### MVP Development (Phase 1)

| Category | Estimate | Notes |
|----------|----------|-------|
| Frontend development | 160-200 hours | Next.js, components, flows |
| Content creation | 40-60 hours | Questions, educational, Arabic |
| Visual assets (AI) | 20-30 hours | Illustrations, icons |
| QA & accessibility | 30-40 hours | Testing, fixes |
| Project management | 20-30 hours | Coordination |
| **Total** | **270-360 hours** | |

### Ongoing Costs (Post-Launch)

| Item | Monthly Cost | Notes |
|------|--------------|-------|
| Vercel hosting | $0-20 | Free tier likely sufficient |
| Domain | ~$15/year | .com or regional TLD |
| Content updates | Variable | As needed |
| **Total** | **~$20/month** | Very low for anonymous static app |

---

## Launch Checklist

### Pre-Launch

- [ ] Legal review of disclaimers and terms
- [ ] Content review by Arabic mental health professional
- [ ] Accessibility audit passed (WCAG 2.1 AA)
- [ ] Crisis helpline numbers verified and current
- [ ] Cross-browser testing complete
- [ ] Mobile device testing complete
- [ ] Performance audit (<3s load time)
- [ ] RTL layout verified on all screens

### Soft Launch

- [ ] Limited release to test group
- [ ] Feedback collection mechanism ready
- [ ] Bug tracking system active
- [ ] Content update process defined

### Public Launch

- [ ] All soft launch feedback addressed
- [ ] Analytics-free deployment confirmed
- [ ] Social media presence (optional, minimal)
- [ ] Support email for feedback
