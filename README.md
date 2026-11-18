# PaisaGuard

PaisaGuard is a privacy-first AI financial assistant prototype built with Next.js App Router, TypeScript, and Tailwind CSS. It helps people explore spending summaries, recurring subscriptions, and transaction explanations without connecting a bank account.

> **Prototype note:** The analysis currently uses deterministic sample responses. Firebase AI Logic is not connected yet. The privacy settings are interface controls and are not persisted or enforced by the demo analysis function.

## Features

- **Landing page** with product overview, privacy benefits, and workflow steps.
- **Transaction dashboard** with paste-in text or `.txt` / `.csv` upload, analysis tabs, loading/empty/error states, and a collapsible privacy log.
- **PII redaction utility** for phone numbers, account-like digit sequences, and UPI IDs, implemented in `lib/redact.ts`.
- **AI integration stub** in `lib/ai.ts` returning typed sample results and a source label.
- **Privacy settings UI** for on-device preference, cloud fallback, and maximum input length.
- Responsive layouts and mobile-friendly navigation.

## Routes

- `/` — landing page
- `/app` — financial analysis dashboard
- `/settings` — privacy preferences

## Getting started

Install dependencies and start the development server:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```text
app/
  app/page.tsx          # Dashboard route
  settings/page.tsx     # Privacy settings route
  page.tsx              # Landing page
  globals.css           # Theme and shared styles
components/
  paisa-guard.tsx       # Shared UI components and page experiences
lib/
  ai.ts                 # Typed analysis stub (Firebase AI Logic TODO)
  redact.ts             # PII redaction helpers
```

## Analysis integration

Replace the deterministic implementation in `lib/ai.ts` with Firebase AI Logic when wiring the real model. Keep the `analyze(text, task)` response shape:

```ts
type AnalysisResult = {
  result: string
  source: 'on-device' | 'cloud'
  redactions: string[]
}
```

Before sending data to a cloud model, apply the redactor in `lib/redact.ts` and ensure the chosen processing source reflects the actual runtime behavior. The current source selection and privacy log are demo behavior, not a guarantee of on-device execution or data deletion.

## Validation

```bash
pnpm exec tsc --noEmit
```
