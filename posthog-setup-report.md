<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the **Dev Event** Next.js App Router project. Here's a summary of all changes made:

- **`instrumentation-client.ts`** _(new file)_ — Initializes PostHog client-side using the Next.js 15.3+ recommended `instrumentation-client` approach. Configured with a reverse proxy (`/ingest`), automatic exception/error tracking (`capture_exceptions: true`), and debug mode in development.
- **`next.config.ts`** _(updated)_ — Added reverse proxy rewrites for `/ingest/static/*` and `/ingest/*` routes pointing to PostHog's US ingestion servers. Also added `skipTrailingSlashRedirect: true` as required by PostHog.
- **`components/ExploreBtn.tsx`** _(updated)_ — Added `posthog.capture('explore_events_clicked')` inside the existing `onClick` handler to track when users click the hero CTA button.
- **`components/EventCart.tsx`** _(updated)_ — Added `"use client"` directive and `posthog.capture('event_card_clicked', {...})` on the `Link` component's `onClick`, with rich properties (`event_title`, `event_slug`, `event_location`, `event_date`) for downstream analysis.
- **`.env.local`** _(updated)_ — `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` environment variables set (covered by `.gitignore`).

## Events instrumented

| Event Name | Description | File |
|---|---|---|
| `explore_events_clicked` | User clicked the "Explore Events" hero CTA button | `components/ExploreBtn.tsx` |
| `event_card_clicked` | User clicked an event card to view event details (includes title, slug, location, date as properties) | `components/EventCart.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- 📊 **Dashboard — Analytics basics**: https://us.posthog.com/project/321582/dashboard/1301803
- 📈 **Daily Event Engagement** (trends: both events over 30 days): https://us.posthog.com/project/321582/insights/ZNLKTgSG
- 🔽 **Event Discovery Funnel** (Explore → Card Click conversion): https://us.posthog.com/project/321582/insights/M7PtIcc6
- 👤 **Unique Users Exploring Events** (DAU on Explore button): https://us.posthog.com/project/321582/insights/jRn22rcV
- 🏆 **Most Clicked Events** (event card clicks broken down by title): https://us.posthog.com/project/321582/insights/wKPcGxq8

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/posthog-integration-nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
