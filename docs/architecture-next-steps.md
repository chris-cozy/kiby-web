# Architecture / Next Steps

This stub intentionally separates routing, layout, content loading, and page concerns so future features can be added without structural rewrites.

## Current Foundation

- `src/app/router.tsx` defines route structure and route-level error handling.
- `src/app/layout/` contains shared shell components (`HeaderNav`, `Footer`, `Layout`).
- `src/pages/` contains route-level page components only.
- `src/content/policies.ts` centralizes policy Markdown loading.
- `src/components/Seo.tsx` centralizes metadata and canonical URL behavior.

## Recommended Expansion Path

1. Add authentication boundaries.
- Introduce `AuthProvider` in app root and protect `/dashboard/*` routes via a route guard.
- Keep unauthenticated legal routes (`/privacy`, `/terms`) publicly accessible.

2. Add API integration layer.
- Add `src/lib/api/client.ts` for typed HTTP calls.
- Keep data fetching in route/page adapters, not shared UI primitives.

3. Expand dashboard routes incrementally.
- Move from `/dashboard` placeholder to nested routes:
  - `/dashboard/overview`
  - `/dashboard/progression`
  - `/dashboard/settings`
- Reuse `Layout` and add dashboard sub-navigation component only within dashboard route tree.

4. Introduce app state boundaries.
- Keep server state in a query/cache layer (for example TanStack Query).
- Keep transient UI state local to components.
- Avoid mixing API state with visual state in one store.

5. Add observability and resilience.
- Add client error reporting for route errors and fetch failures.
- Add loading and retry boundaries around API-driven views.

6. Strengthen testing strategy.
- Keep unit tests for route/content behavior.
- Add Playwright E2E once authenticated flows are introduced.
- Add accessibility checks for dashboard interactions.

## Compatibility Notes

- Keep `content/*.md` as the legal source contract; changing this should be treated as a breaking content interface change.
- Keep `SITE_URL` as canonical base URL contract across deployments.
- Preserve current public route paths so legal links remain stable.
