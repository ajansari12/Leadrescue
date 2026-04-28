# Bolt Secret Checklist

Add these in Bolt through Database > Secrets when the matching feature is being built.

## AI

- `OPENAI_API_KEY`
- `OPENAI_MODEL`

## SMS

- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_FROM_NUMBER`

## Email

- `RESEND_API_KEY`
- `EMAIL_FROM`

## CRM / Webhooks

- `CRM_WEBHOOK_URL`
- `CRM_WEBHOOK_SECRET`

## Calendar

- `CALENDAR_PROVIDER_API_KEY`
- `BOOKING_WEBHOOK_SECRET`

## Payments Later

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`

## Rules

- Do not create these in `.env` with real values.
- Do not prefix private values with `VITE_`.
- Do not read these from React components.
- Only server functions should read private secrets.
