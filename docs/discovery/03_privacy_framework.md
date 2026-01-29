# Privacy, Data Handling & Risk Mitigations

> Framework for mental health content safety and user data protection

---

## Core Privacy Principle

**Anonymous-First Design**: No user accounts, no server-side data storage, no tracking.

This is the strongest privacy stance for a mental health self-evaluation tool:
- Users cannot be identified
- No data breaches possible (nothing to breach)
- No subpoenas or legal requests can extract user data
- Maximum user trust from day one

---

## Data Handling Architecture

### What We DO NOT Collect

| Data Type | Collected? | Notes |
|-----------|------------|-------|
| Personal identifiers | ❌ No | No name, email, phone |
| IP addresses | ❌ No | Not logged server-side |
| Device fingerprints | ❌ No | No tracking scripts |
| Assessment responses | ❌ No | Not transmitted to server |
| Location data | ❌ No | Not requested |
| Usage patterns | ❌ No | No analytics |
| Cookies | ❌ No | No tracking cookies |

### What We MAY Collect (with consent)

| Data Type | Purpose | Consent |
|-----------|---------|---------|
| Anonymous crash reports | App stability | Opt-in only |
| Feature usage counts | Improve UX | Opt-in, aggregated only |
| Language preference | Serve correct content | Local storage only |

### Local Storage Strategy (Phase 2+)

If progress tracking is added in future phases:

```javascript
// All data stays on device
localStorage.setItem('selfeval_progress', JSON.stringify({
  lastCategory: 'anxiety',
  completedModules: ['anxiety_intro'],
  // NO responses stored - only completion flags
}));

// User can clear anytime
localStorage.removeItem('selfeval_progress');
```

**Key Principle**: Even local storage stores only structural progress (what modules completed), never assessment responses.

---

## Anonymous Mode Trade-Offs

### Benefits of Anonymous-Only

| Benefit | Impact |
|---------|--------|
| Maximum privacy | Users feel safe exploring sensitive topics |
| No data liability | No breach risk, no legal exposure |
| Lower friction | No signup barrier, instant access |
| Trust signal | "We don't collect your data" is powerful |

### Limitations of Anonymous-Only

| Limitation | Mitigation |
|------------|------------|
| No saved progress | Clear session indicators; short modules |
| No longitudinal tracking | Encourage journaling; export summaries |
| No personalisation | Category recommendations based on session |
| No professional sharing | PDF export option (user-initiated) |

### Future Consideration: Optional Accounts

If accounts are added in Phase 3+:

- **Minimal data**: Email only (no name required)
- **End-to-end encryption**: Responses encrypted with user key
- **User-controlled deletion**: One-click data wipe
- **No third-party auth**: Avoid Google/Facebook linking
- **Transparent data export**: Users can download all data

---

## High-Risk Content Handling

### Risk Level Classification

| Risk Level | Trigger | Response |
|------------|---------|----------|
| **Critical** | Suicidal ideation, self-harm intent | Immediate crisis intervention |
| **High** | Severe distress indicators | Prominent professional referral |
| **Medium** | Moderate symptom frequency | Encourage professional consultation |
| **Low** | Educational exploration | Standard resource links |

### Critical Risk Protocol

When a user indicates suicidal thoughts or self-harm intent:

1. **Immediate Popup**: Full-screen crisis resource modal
2. **Cannot Dismiss Easily**: Requires explicit "I understand" action
3. **Multiple Resources**: 
   - Arabic helplines by region
   - Text-based support options
   - Emergency numbers
4. **Gentle Language**: "You're not alone. Help is available."
5. **No Data Captured**: We don't know who they are, can't intervene directly

### Crisis Resources (Arabic-Speaking Regions)

| Region | Resource | Contact |
|--------|----------|---------|
| UAE | Befrienders Worldwide UAE | 04-6575 555 |
| Saudi Arabia | National Mental Health Helpline | 920033360 |
| Egypt | Befrienders Cairo | 762 0602 |
| Jordan | Mental Health Helpline | 110 |
| Lebanon | Embrace Lifeline | 1564 |
| International | International Association for Suicide Prevention | [Website](https://www.iasp.info/resources/Crisis_Centres/) |

### High-Risk Question Handling

For depression criterion 9 (suicidal ideation):

```
Question: "هل راودتك أفكار بأنك ستكون أفضل حالاً ميتاً، أو أفكار بإيذاء نفسك؟"
(Have you had thoughts that you would be better off dead, or of hurting yourself?)

Response Options:
- لم تراودني أبداً (Never)
- راودتني أحياناً (Sometimes)
- راودتني كثيراً (Often)
- راودتني يومياً تقريباً (Almost daily)

IF response != "Never":
  → Show crisis modal
  → Still allow user to continue (don't lock them out)
  → Resources remain visible throughout session
```

---

## Content Safety Guidelines

### Language Framing

| Avoid | Use Instead |
|-------|-------------|
| "You have depression" | "Your responses suggest patterns often seen in depression" |
| "Severe anxiety" | "Your responses indicate significant distress" |
| "Diagnosis" | "Self-reflection", "awareness", "patterns" |
| "Symptoms" | "Experiences", "feelings", "patterns" |
| "Treatment" | "Support", "help", "professional guidance" |

### Visual Safety

| Avoid | Use Instead |
|-------|-------------|
| Distressed faces | Calm, neutral illustrations |
| Clinical imagery | Nature, abstract shapes |
| Red warning colours (overuse) | Warm amber for caution |
| Medical symbols | Supportive hand icons |
| Before/after comparisons | Journey metaphors |

### Disclaimers (Required Placements)

1. **App Entry**: Full disclaimer screen before first use
2. **Each Category**: Brief reminder at category start
3. **Results Screen**: Prominent "This is not a diagnosis" statement
4. **Footer**: Persistent link to professional resources

### Disclaimer Template (Arabic)

```markdown
## إخلاء المسؤولية

هذا التطبيق أداة للتأمل الذاتي والتوعية، وليس تشخيصاً طبياً.

لا يمكن لهذا التطبيق:
- تشخيص أي اضطراب نفسي
- استبدال الاستشارة المهنية
- تقديم علاج أو وصفات طبية

إذا كنت تعاني من ضائقة، يرجى التحدث إلى متخصص في الصحة النفسية.

[روابط المساعدة والدعم]
```

---

## Legal & Compliance Considerations

### Not Medical Device

This app is explicitly NOT:
- A diagnostic tool
- A medical device
- A replacement for professional care
- FDA/CE regulated (by design)

### Terms of Service Highlights

- No warranty of accuracy
- Educational purpose only
- User assumes responsibility for seeking professional help
- No liability for decisions based on app content

### Regional Compliance

| Region | Consideration |
|--------|--------------|
| **GCC** | No specific mental health app regulations; follow general data protection |
| **EU (Arabic speakers)** | GDPR applies; anonymous model is compliant by default |
| **USA (Arabic speakers)** | HIPAA does not apply (no health data collected) |

### Content Licensing

- DSM-5-TR criteria are copyrighted by APA
- This app uses **educational fair use** and **paraphrasing**
- No direct reproduction of APA materials
- Original question wording and presentation

---

## Risk Mitigation Summary

| Risk | Mitigation | Owner |
|------|------------|-------|
| User self-diagnosis | Strong disclaimers, gentle language | Content team |
| Crisis without support | Immediate resource popups | UX team |
| Data breach | No data to breach (anonymous) | Architecture |
| Misuse by clinicians | Not marketed to professionals | Marketing |
| Cultural insensitivity | Regional review, diverse imagery | Design team |
| Accessibility gaps | WCAG compliance, screen reader testing | Dev team |

---

## Implementation Checklist

### MVP Launch Requirements

- [ ] Full disclaimer flow before first use
- [ ] Crisis resource modal implemented
- [ ] Regional helpline numbers verified
- [ ] No analytics or tracking scripts
- [ ] Privacy policy page (simple, Arabic)
- [ ] Terms of service page (simple, Arabic)
- [ ] Content review by Arabic-speaking mental health professional
- [ ] Language review for cultural sensitivity

### Post-Launch Monitoring

- [ ] Community feedback channel (anonymous)
- [ ] Regular helpline number verification
- [ ] Content updates based on user feedback
- [ ] Accessibility audits quarterly
