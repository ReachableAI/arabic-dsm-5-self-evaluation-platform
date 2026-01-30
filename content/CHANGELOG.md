# Content Change Log

> Record of all content updates, maintenance, and governance approvals

**Purpose**: Track all changes to assessment modules, safety content, and UI copy  
**Maintained by**: Content Team  
**Review Frequency**: Updated with every content PR merge

---

## How to Use This Log

1. **Before creating a content PR**: Add a new entry below with status "In Review"
2. **During review process**: Update approval checkboxes as each stage completes
3. **After merge**: Update deployment dates and mark status as "Deployed"
4. **For maintenance**: Add entries for helpline updates, link fixes, and disclaimer changes

---

## Change Log Entries

### 2026-01-30 — Content Governance Workflow Documentation

**Module/File**: `docs/planning/content_governance_workflow.md`  
**Change Type**: New Documentation  
**Date**: 2026-01-30  
**Author**: Writing Agent

#### Changes Made

- **Added**: Content governance workflow with 7-stage approval process
- **Added**: Safety maintenance cadence (quarterly helpline checks, annual link verification)
- **Added**: Content approval checklist template
- **Added**: Change log template and examples

#### Reason

Phase 2 requirement to formalize review process for new modules (OCD, ADHD, PTSD) and ongoing safety maintenance.

#### Review Status

- [x] Drafted — Initial version created
- [ ] Team Review — Pending approval from Project Lead
- [ ] Deployed to Main — Pending

#### Deployment

- **Deployed to Main**: [Pending]
- **Live in Production**: [Pending]

#### Notes

First formal governance documentation. Will serve as template for Phase 2 module approvals.

---

## Template for New Entries

Copy this template for each new change:

```markdown
### [YYYY-MM-DD] — [Change Type: New Module | Update | Fix | Maintenance]

**Module/File**: `content/[module]/[file].json`  
**Change Type**: [New Module | Update | Fix | Maintenance]  
**Date**: [YYYY-MM-DD]  
**Author**: [Name]

#### Changes Made

- **Added**: [Description of new content]
- **Updated**: [Description of modified content]
- **Removed**: [Description of deleted content]
- **Fixed**: [Description of bug fix or correction]

#### Reason

[Why was this change necessary? Clinical update, user feedback, helpline change, regulatory requirement, etc.]

#### Review Status

- [ ] Arabic Review — Approved by [Name] on [Date]
- [ ] Safety Review — Approved by [Name] on [Date]
- [ ] Schema Validation — Passed on [Date]
- [ ] Integration Review — Approved by [Name] on [Date]
- [ ] QA Testing — Passed on [Date]
- [ ] Production Approval — Approved by [Name] on [Date]

#### Deployment

- **Deployed to Main**: [YYYY-MM-DD]
- **Live in Production**: [YYYY-MM-DD]

#### Notes

[Any additional context, known issues, or follow-up required]

---
```

---

## Maintenance Schedule (Quick Reference)

| Task | Frequency | Next Due | Responsible |
|------|-----------|----------|-------------|
| Helpline verification | Quarterly (Jan, Apr, Jul, Oct) | 2026-04-01 | Safety Lead |
| Resource link check | Annual (January) | 2027-01-01 | Content Maintainer |
| Disclaimer review | As-needed | — | Project Lead |
| Schema validation | Every PR | — | QA Agent (automated in Phase 2) |
| Accessibility audit | Every new module | — | QA Agent |

---

## Archived Changes (Before This Log)

### 2026-01-29 — Depression Module (MVP Phase 1)

**Module/File**: `content/depression/depression_module.json`  
**Change Type**: New Module  
**Date**: 2026-01-29  

**Summary**: Initial depression module with MDD and PDD. Includes suicidal ideation question (mdd_q9) with crisis trigger.

**Review**: Approved by team; deployed to production.

---

### 2026-01-28 — Anxiety Module (MVP Phase 1)

**Module/File**: `content/anxiety/anxiety_module.json`  
**Change Type**: New Module  
**Date**: 2026-01-28  

**Summary**: Initial anxiety module with GAD, Panic Disorder, and Social Anxiety. 20 questions total.

**Review**: Approved by team; deployed to production.

---

### 2026-01-27 — Safety Disclaimers (MVP Phase 1)

**Module/File**: `content/safety/safety_disclaimers.json`  
**Change Type**: New Module  
**Date**: 2026-01-27  

**Summary**: Pre-assessment disclaimer, crisis intervention modals, regional helplines (6 regions verified).

**Review**: Approved by Safety Lead; deployed to production.

---

### 2026-01-26 — UI Copy (MVP Phase 1)

**Module/File**: `content/ui/app_copy.json`  
**Change Type**: New Module  
**Date**: 2026-01-26  

**Summary**: Welcome flow, category browser, assessment UI, results templates (Arabic, RTL-ready).

**Review**: Approved by UX Designer; deployed to production.

---

## Related Documentation

- **Governance Workflow**: `docs/planning/content_governance_workflow.md`
- **Content Structure**: `content/README.md`
- **Criteria Mapping**: `docs/discovery/05_criteria_mapping.md`
