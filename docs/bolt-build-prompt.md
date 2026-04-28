# Bolt Build Prompt

Paste this into Bolt after importing the repo.

```text
You are continuing the LeadRescue repo. Keep the public marketing routes under /leadrescue-ai and keep the app under /app/*.

Before coding, read:
- README.md
- docs/bolt-handoff.md
- docs/backend-architecture.md
- .env.example
- src/app/types.ts
- src/app/sampleData.ts
- src/pages/LeadRescueAppPage.tsx

Goal:
Convert the current frontend-only app shell into a Bolt Cloud production app using Bolt Database, Bolt Auth, Bolt Secrets, and Bolt Server Functions.

Do not remove the existing design system or public site. Do not put OpenAI, Twilio, Resend, Stripe, CRM, or calendar secrets in browser code. Any provider calls must happen in server functions.

Phase 1:
1. Add Bolt Authentication.
2. Protect /app/* behind login.
3. Create workspace-aware tables for workspaces, members, leads, lead_events, lead_notes, automation_rules, sequences, templates, integrations, message_drafts, messages, and reports.
4. Replace localStorage persistence with database reads/writes.
5. Keep the current seed data as initial demo data for a new workspace.
6. Add role checks for Owner, Manager, and Responder.
7. Preserve the UI routes and interactions already present.

Phase 2:
1. Add server function ai-draft-reply using OPENAI_API_KEY from Bolt Secrets.
2. Add message draft and human approval flow.
3. Do not send SMS or email automatically.

Phase 3:
1. Add Twilio and email server functions.
2. Add opt-out/contact-preference handling.
3. Log provider responses in message_events.

When you need secrets, stop and tell me exactly which secret names to add in Bolt Secrets and where each value comes from.
```
