# LeadRescue Backend Architecture

## Product Boundary

LeadRescue has two surfaces:

- Public marketing site: `/leadrescue-ai`
- Authenticated app: `/app/*`

The app should be protected by auth before live customer data is added.

## Core Domains

### Auth and Workspace

Tables:

- `workspaces`
- `workspace_members`
- `roles`
- `invites`

Roles:

- Owner: billing, settings, integrations, all leads
- Manager: rules, templates, reports, assignments
- Responder: lead queue, replies, notes, stage updates

### Leads

Tables:

- `leads`
- `lead_events`
- `lead_notes`
- `lead_assignments`

Lead stages:

- Captured
- Qualified
- Booked
- Follow-up
- Won

Important fields:

- `workspace_id`
- `name`
- `business`
- `industry`
- `source`
- `channel`
- `service`
- `area`
- `stage`
- `value`
- `urgency`
- `temperature`
- `owner_id`
- `next_action`
- `created_at`
- `updated_at`

### Messaging

Tables:

- `message_drafts`
- `message_approvals`
- `messages`
- `message_events`
- `contact_preferences`

Principle:

AI creates drafts. A human approves. Server functions send.

### AI

Server functions:

- `generate-lead-reply`
- `generate-handoff-summary`
- `generate-intake-questions`
- `personalize-template`

Inputs:

- lead fields
- workspace tone
- industry template
- recent timeline

Outputs:

- suggested reply
- missing questions
- summary
- risk flags

### Automation

Tables:

- `automation_rules`
- `automation_conditions`
- `automation_actions`
- `sequence_templates`
- `sequence_enrollments`
- `scheduled_jobs`

Initial triggers:

- lead created
- missed call captured
- stage changed
- quiet lead timeout
- high urgency detected
- lead won

Initial actions:

- assign owner
- create task
- generate draft
- enroll in sequence
- notify owner
- send approved message

### Integrations

Tables:

- `integrations`
- `integration_events`
- `webhook_endpoints`
- `webhook_events`

Priority integrations:

- OpenAI
- SMS provider such as Twilio
- Email provider such as Resend, Postmark, SendGrid, or Mailgun
- Calendar provider
- CRM webhook
- Stripe later

## API / Server Function Plan

Use Bolt Server Functions for backend operations that need secrets, permissions, or provider calls.

Initial functions:

- `leads-create`
- `leads-update`
- `leads-stage`
- `lead-events-list`
- `ai-draft-reply`
- `messages-approve`
- `messages-send-sms`
- `messages-send-email`
- `webhooks-lead-intake`
- `reports-summary`

## Environment / Secret Names

Use `.env.example` as the canonical list. In Bolt, add private values through Secrets.

Required first:

- `OPENAI_API_KEY`
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_FROM_NUMBER`
- `RESEND_API_KEY`
- `EMAIL_FROM`

Later:

- `CRM_WEBHOOK_URL`
- `CRM_WEBHOOK_SECRET`
- `CALENDAR_PROVIDER_API_KEY`
- `BOOKING_WEBHOOK_SECRET`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`

## Frontend Refactor Target

When Bolt adds the database, replace:

- `src/hooks/usePersistentState.ts`
- `src/app/sampleData.ts` as active state

Keep:

- `src/app/types.ts` as the contract reference
- route structure in `src/pages/LeadRescueAppPage.tsx`
- public marketing pages

## Acceptance Criteria For First Backend Milestone

- User can sign up and log in.
- `/app/*` is protected.
- User belongs to a workspace.
- Leads persist after reload and across devices.
- Lead stage changes create timeline events.
- Manual lead creation writes to database.
- Reports read from persisted lead data.
- No private provider key is present in client bundle.
