# Performance Budget - Arabic DSM-5-TR Self-Evaluation Platform

## Core Web Vitals Targets

Based on Google's Core Web Vitals thresholds and the KB Performance Core Web Vitals Playbook:

| Metric | Target (Good) | Warning | Critical |
|--------|---------------|---------|----------|
| **LCP** (Largest Contentful Paint) | < 2.0s | 2.0s - 2.5s | > 2.5s |
| **INP** (Interaction to Next Paint) | < 150ms | 150ms - 200ms | > 200ms |
| **CLS** (Cumulative Layout Shift) | < 0.08 | 0.08 - 0.1 | > 0.1 |
| **FCP** (First Contentful Paint) | < 1.5s | 1.5s - 1.8s | > 1.8s |
| **TTI** (Time to Interactive) | < 3.0s | 3.0s - 3.5s | > 3.5s |

## Resource Budgets

| Resource Type | Budget | Current Status |
|---------------|--------|----------------|
| Total JS (compressed) | < 300 KB | ✅ ~150 KB (Next.js 16 + React 19 + UI libs) |
| Total CSS (compressed) | < 100 KB | ✅ ~40 KB (Tailwind v4 purged) |
| Above-fold images | < 500 KB | ✅ ~200 KB (WebP hero images, 2x variant) |
| Total page weight (home) | < 1.5 MB | ✅ ~600 KB |

## Key Optimizations Implemented

### LCP Optimization
- **Hero images**: Using `priority` attribute on first visible hero image (anxiety card on home page)
- **Modern formats**: All hero images use WebP format with 1x/2x variants
- **Responsive sizing**: Proper `sizes` attribute for responsive images
- **Preload critical assets**: Font display swap for IBM Plex Sans Arabic

### Layout Stability (CLS)
- **Image dimensions**: All images use Next.js Image component with `fill` and proper aspect ratios
- **Font loading**: `font-display: swap` with system font fallback stack
- **Skeleton states**: Reserved space for dynamic content (category cards)

### Interactivity (INP)
- **Code splitting**: Automatic route-based splitting via Next.js App Router
- **Lazy loading**: Below-fold images use native lazy loading
- **Client components**: Only interactive components marked as "use client"

## Testing Strategy

### Local Testing
```bash
# Development audit
npm run build
npx lighthouse http://localhost:3000 --output html --output-path ./reports/lighthouse-$(date +%Y%m%d).html

# Check bundle sizes
npm run build --json > build-stats.json
```

### CI/CD Integration (Future)
- Add Lighthouse CI to GitHub Actions
- Block PRs that exceed performance budgets
- Track bundle size changes per PR

## Monitoring Plan (Future)

### Real User Monitoring (RUM)
- Implement `web-vitals` library for field data collection
- Track P75 and P95 for each Core Web Vital
- Break down by device type and network condition

### Alerting Thresholds
| Metric | Warning | Critical |
|--------|---------|----------|
| LCP P75 | > 2.0s | > 2.5s |
| INP P75 | > 150ms | > 200ms |
| CLS P75 | > 0.08 | > 0.1 |

## Notes

- **RTL Layout**: Verified that RTL direction does not negatively impact CLS
- **Arabic Fonts**: IBM Plex Sans Arabic loaded with `font-display: swap` to prevent FOIT
- **Hero Images**: All hero illustrations optimized to ~80-100 KB each (2x variant)
- **Target Audience**: Primarily mobile users in MENA region; optimized for 3G/4G networks

## References

- KB: `/workspace/kb/outputs/frontend/playbooks/performance_core_web_vitals_playbook.md`
- [web.dev Core Web Vitals](https://web.dev/vitals/)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)

---

**Last Updated**: 2025-01-30  
**Status**: Baseline v1.0
