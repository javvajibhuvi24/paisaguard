# PaisaGuard — Your Private AI Financial Assistant

**Financial clarity, without the trade-off.**

PaisaGuard is a privacy-first financial assistant that helps people understand spending, spot recurring subscriptions, and explain transactions without connecting a bank account.

> **Hackathon prototype:** PaisaGuard is wired to Firebase AI Logic hybrid inference. Live AI requests require enabling Firebase AI Logic in the Firebase Console. On-device execution is available only on supported desktop Chrome configurations; see setup below. The assistant provides information, not financial advice.

**Live demo:** https://paisaguard-beta.vercel.app/

## Features

- Paste bank SMS messages or upload `.txt` and `.csv` statements.
- Explore summaries, recurring payments, and charge explanations.
- Redact detected phone numbers, account-like digit sequences, and UPI IDs before sending prompts to either inference path.
- Prefer Chrome on-device inference with cloud inference available according to the privacy settings.
- Show the actual inference source and redactions in the privacy badge and request log.
- Adjust on-device preference, cloud fallback permission, and maximum on-device input length.
- Use the responsive landing page, dashboard, and settings routes without linking a bank account.

Privacy preferences currently last for the active app session. PII redaction is pattern-based and cannot guarantee detection of every sensitive value. Avoid using real financial data in demos.

## Routes

- `/` — landing page
- `/app` — financial analysis dashboard
- `/settings` — privacy preferences

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Firebase AI Logic setup

1. Create or select a Firebase project and register a Web app.
2. In Firebase Console, open **AI Services → AI Logic**, click **Get started**, and finish setup with the Gemini Developer API. This enables the `firebasevertexai.googleapis.com` API. Keep App Check enforcement enabled for Firebase AI Logic.
3. Configure these Firebase Web app values in the project environment (Settings → Vars in v0):
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
   - `NEXT_PUBLIC_FIREBASE_APPCHECK_SITE_KEY` — the reCAPTCHA v3 site key registered for the app's domain
4. In local development, App Check debug mode is enabled automatically. Analyze once and find the generated debug token in the browser console; register it under Firebase Console → **App Check → Apps → Manage debug tokens**. Keep the token private and never commit it.
5. For on-device inference, use desktop Chrome 139+ and enable `chrome://flags/#prompt-api-for-gemini-nano-multimodal-input`. Chrome may need to download its local model the first time. If the local model is unavailable, the SDK uses cloud inference only when the privacy settings permit it.

`lib/ai.ts` uses Firebase AI Logic's hybrid inference APIs, with `gemini-3.8-flash` configured for cloud inference. It reads the SDK's `inferenceSource` response field to report whether a request ran on-device or in the cloud. Every prompt is passed through `lib/redact.ts` first. The typed analysis response is:

```ts
type AnalysisResult = {
  result: string
  source: 'on-device' | 'cloud'
  redactions: string[]
}
```

For production, configure App Check attestation for the deployed domain. Never ship the development debug token.

## Project structure

```text
app/
  app/page.tsx          # Dashboard route
  settings/page.tsx     # Privacy settings route
  page.tsx              # Landing page
  globals.css           # Theme and shared styles
components/
  paisa-guard.tsx       # Shared UI and page experiences
  privacy-preferences.tsx # Session-scoped inference preferences
lib/
  ai.ts                 # Firebase AI Logic hybrid inference + App Check
  redact.ts             # PII redaction helpers
```

## Hackathon submission checklist

The brief requires a working demo, a **public** GitHub or GitLab repository with an open-source license, a project description detailing what was built during the hackathon and how Firebase AI Logic runs at runtime, and a public YouTube demo no longer than 3 minutes (English or English subtitles). A hosted project URL is strongly encouraged. Confirm repository visibility, add an open-source license, enable Firebase AI Logic and App Check, and prepare the submission description and demo video before submitting.

## Validation

```bash
pnpm install --frozen-lockfile
pnpm exec tsc --noEmit
```
