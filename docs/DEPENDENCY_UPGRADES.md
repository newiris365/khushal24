# IRIS 365 Security Audit & Dependency Upgrade Roadmap

## Active Audit Finding Tracking

| Package | Current Version | Severity | Advisory | Action Plan | Target Milestone |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `next` | `14.2.35` | High | Server-Side Request Forgery (SSRF) / Cache Poisoning in Next.js Server Components | Upgrade to `next@15.x` | Next release cycle (branch: `feature/next-15-upgrade`) |

## Upgrade Strategy & Verification Requirements

1. **Isolation**: Perform testing in dedicated `feature/next-15-upgrade` branch.
2. **Breaking Changes**:
   - `React 19` peer dependency alignment.
   - Async request parameters API (`await params` in dynamic route handlers).
   - Fetch cache defaults changed from default cached to default uncached (`cache: 'no-store'`).
3. **Verification Suite**:
   - Run `npx tsc --noEmit` across all route components.
   - Execute full Cypress / Jest integration tests.
   - Verify SSR page rendering across all 40+ role routes.
