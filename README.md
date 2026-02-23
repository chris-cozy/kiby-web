# Kiby Web Stub

Kiby Web Stub is an initial web client foundation for Kiby. This release includes a Dream Land styled landing page, an in-place Discord feature view toggle on home, legal policy delivery (`/privacy`, `/terms`), and a shared app shell ready for future dashboard/client expansion.

## Features

- Routes: Home, Privacy Policy, Terms of Service, Dashboard placeholder, and 404 page
- Home `Features` header action switches center content in place via `/#features`
- Shared responsive layout with top navigation, footer, and skip-to-content link
- Homepage hero uses pixel-art Dream Land background from `/public/dreamland.png`
- Site icon uses `/public/profile_image_02.png`
- SEO metadata per route with canonical URL support through `SITE_URL`
- Policy content managed as Markdown files in `/content`
- Friendly fallback UI when policy Markdown is missing or unreadable
- Route-level error handling via React Router `errorElement`

## Prerequisites

- Node.js 20+
- npm 10+

## Install

```bash
npm install
```

## Environment

Copy `.env.example` to `.env` and set values as needed:

```bash
cp .env.example .env
```

Environment variables:

- `SITE_URL` (optional): Base public URL used to generate canonical tags

## Run Locally

```bash
npm run dev
```

The Vite dev server prints the local URL (typically `http://localhost:5173`).

## Test

```bash
npm run test
```

## Production Build

```bash
npm run build
```

Output is generated in:

- `/Users/csandery/Documents/Software Projects/kiby-web/dist`

Preview the built output:

```bash
npm run preview
```

## Content Workflow

Policy content is stored in Markdown:

- `/Users/csandery/Documents/Software Projects/kiby-web/content/privacy.md`
- `/Users/csandery/Documents/Software Projects/kiby-web/content/terms.md`

To update policy copy, edit those files directly without touching route/component code.

## Manual Accessibility Checklist

- Tab from page start reaches the skip link first
- Activating skip link moves focus to main content
- Header and footer links are keyboard reachable in a logical order
- Focus outlines are visible for links/buttons on all routes
- Headings follow a sensible hierarchy on Home, Privacy, Terms, Dashboard, and 404 pages

## Architecture / Next Steps

See:

- `/Users/csandery/Documents/Software Projects/kiby-web/docs/architecture-next-steps.md`

This note outlines how to extend the stub into authenticated dashboard and API-driven surfaces.
