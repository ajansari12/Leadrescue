# LeadRescue

LeadRescue is a React/Vite product prototype with a public marketing site and a private SaaS-style app shell for rescuing missed leads.

## Routes

- `/leadrescue-ai` - public marketing homepage
- `/leadrescue-ai/how-it-works` - public workflow page
- `/leadrescue-ai/industries` - public industry examples
- `/leadrescue-ai/examples` - public use cases
- `/app` - private app command center
- `/app/leads` - lead inbox and manual intake
- `/app/pipeline` - stage pipeline
- `/app/automations` - rules and follow-up sequences
- `/app/templates` - industry workflow templates
- `/app/integrations` - backend and secrets handoff map
- `/app/reports` - recovery and source reporting
- `/app/settings` - workspace settings

## Current State

The frontend is demo-ready and uses local browser persistence for app state. It does not yet have production auth, database, server functions, SMS/email sending, CRM sync, calendar booking, or live AI calls.

## Bolt Handoff

Before importing this repo into Bolt, read:

- `docs/bolt-handoff.md`
- `docs/backend-architecture.md`
- `docs/bolt-build-prompt.md`
- `.env.example`

These files define the backend handoff, secrets, implementation order, and a ready-to-paste Bolt prompt.

## Run Locally

```bash
npm install
npm run dev
```

Then open `http://localhost:5173/leadrescue-ai` or `http://localhost:5173/app`.

## Build

```bash
npm run build
```
