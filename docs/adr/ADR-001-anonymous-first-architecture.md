# ADR-001: Anonymous-First Architecture for Mental Health Self-Evaluation

> **Status**: Accepted  
> **Date**: 29 January 2026  
> **Decision-makers**: Software Solution Architect  
> **Tags**: architecture, privacy, mental-health, security

---

## Context

The Arabic DSM-5-TR Self-Evaluation Platform handles sensitive mental health data. Users exploring questions about depression, anxiety, and suicidal ideation need maximum assurance that their responses are private and cannot be traced back to them.

We must decide how to handle user data, authentication, and persistence.

## Decision

We will implement an **anonymous-first architecture** with:

1. **No backend database** — All processing happens client-side
2. **No user accounts** — No registration, login, or authentication
3. **Session-only state** — Responses stored in React Context, cleared on page close
4. **No analytics** — No tracking scripts, no cookies, no usage monitoring
5. **Static deployment** — Next.js static export to Vercel

## Consequences

### Positive
- **Maximum privacy**: No data to breach, subpoena, or leak
- **Maximum trust**: "We don't collect your data" is a powerful privacy signal
- **Lower friction**: No signup barriers, instant access
- **Lower cost**: No backend infrastructure to maintain
- **Regulatory simplicity**: No GDPR/data protection compliance concerns

### Negative
- **No saved progress**: Users cannot resume assessments across sessions
- **No longitudinal tracking**: Cannot show patterns over time
- **No personalisation**: Cannot tailor experience to past behaviour
- **No professional sharing**: Cannot generate shareable reports (mitigated by planned PDF export in Phase 2)

### Mitigations for Negative Consequences
- Short, completable modules (~15 questions each)
- Clear session indicators ("Your responses are not saved")
- Optional PDF export in Phase 2 for users who want to share with professionals
- Local storage for structural progress only (module completion flags, not responses) in Phase 2

## Alternatives Considered

### 1. Optional Accounts with E2E Encryption
- Would allow progress tracking and professional sharing
- Adds significant complexity and potential security risks
- Rejected for MVP; may reconsider for Phase 3

### 2. Local Storage for All Responses
- Would allow session recovery across browser closes
- Risk: Family members or employers could access stored mental health data
- Rejected due to privacy concerns in shared device scenarios common in Arab households

### 3. Backend with Anonymous Tokens
- Could enable cross-device sync without accounts
- Adds backend complexity and potential data exposure
- Rejected for MVP; privacy outweighs convenience

## Related Decisions

- Crisis intervention system design (triggers on specific responses)
- RTL-first design system (Arabic-native, not mirrored)
- Static deployment to Vercel (no server-side processing)

## References

- [Privacy Framework](../discovery/03_privacy_framework.md)
- [MVP Plan](../discovery/04_mvp_plan.md)
