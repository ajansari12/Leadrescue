# LeadRescue Bolt Handoff

This repo is ready to import into Bolt as a frontend-first product shell. The next work should happen inside Bolt Cloud using Bolt Database, Authentication, Secrets, and Server Functions.

## What Exists Now

- Public marketing site under `/leadrescue-ai`.
- Private app shell under `/app`.
- Route-based app screens for command center, leads, pipeline, automations, templates, integrations, reports, and settings.
- Typed frontend data in `src/app/types.ts`.
- Demo seed data in `src/app/sampleData.ts`.
- Local browser persistence in `src/hooks/usePersistentState.ts`.

## What Must Become Backend-backed

Replace local persistence with Bolt Database tables for:

- Workspaces
- Users and roles
- Leads
- Lead events/timeline
- Notes
- Automation rules
- Follow-up sequences
- Templates
- Integration connection status
- Messages and delivery logs
- Audit reports

## Bolt Cloud Direction

Use Bolt Cloud defaults for a new project:

- Bolt Hosting for publish/share.
- Bolt Database for production data.
- Bolt Authentication for signups, login, roles, and password reset.
- Bolt Secrets for private values.
- Bolt Server Functions for private backend actions.

Use Supabase only if you intentionally want a separately claimed Supabase project. Bolt support docs say new Claude Agent projects use Bolt Database by default, while Supabase remains an option.

## Secrets Rule

Never put private provider keys in React/Vite client code.

Safe for browser:

- `VITE_APP_NAME`
- `VITE_PUBLIC_APP_URL`
- public feature flags

Server-function only:

- `OPENAI_API_KEY`
- `TWILIO_AUTH_TOKEN`
- `RESEND_API_KEY`
- `STRIPE_SECRET_KEY`
- CRM webhook secrets
- calendar provider secrets
- service-role database credentials

## Recommended Bolt Build Order

1. Create Bolt Database tables and auth roles.
2. Replace `usePersistentState` with database reads/writes.
3. Protect `/app/*` behind authentication.
4. Add server functions for lead create/update/stage transitions.
5. Add server function for OpenAI draft replies and handoff summaries.
6. Add message approval model before SMS/email sending.
7. Add Twilio/Resend server functions.
8. Add webhook receivers for forms, missed calls, CRM, calendar, and payments.
9. Add reporting queries.
10. Publish private preview with Bolt Share, then public production with Bolt Hosting.

## Production Safety Rules

- AI may draft replies, but humans approve before sending.
- Store opt-out state before enabling SMS.
- Log every message attempt, result, and provider response.
- Keep provider secrets in Bolt Secrets.
- Keep generated replies tied to the lead and workspace for auditability.
- Add role checks to every server function.

## Official Bolt References

- Bolt Cloud overview: https://support.bolt.new/cloud/bolt-cloud
- Bolt Database: https://support.bolt.new/cloud/database
- Bolt Secrets: https://support.bolt.new/cloud/database/secrets
- Bolt Server Functions: https://support.bolt.new/cloud/database/server-functions
- Supabase option in Bolt: https://support.bolt.new/integrations/supabase
- Sharing projects: https://support.bolt.new/building/using-bolt/sharing
