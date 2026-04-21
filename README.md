# Build Satoshi

Build Satoshi is a guided Bitcoin developer onboarding product built for the Bitcoin Dev Project. It turns the early-stage "what should I build first?" problem into a structured, track-based experience with real project outcomes, milestone pacing, and portfolio-ready artifacts.

The core idea is simple: new Bitcoin developers do better when they can ship something concrete. Build Satoshi narrows the gap between curiosity and contribution by packaging practical Bitcoin projects into 4-8 week tracks with starter code, milestone sequencing, resource links, and a final shareable completion card.

## Why this exists

The Bitcoin Dev Project already helps aspiring contributors learn and connect, but there is still a common onboarding gap:

- many new developers know they want to get involved, but not what to build first
- tutorials often stop before a project becomes public proof of work
- the jump from "I understand the concepts" to "I shipped something real" is still too large

Build Satoshi is an open-source proposal to close that gap with a focused, product-like developer experience.

## What the app includes

- a landing screen for selecting a Bitcoin project track by difficulty
- a track dashboard with milestone progression, starter code, and BDP learning links
- a completion screen with a portfolio card, social post helpers, and next-step CTAs
- client-side progress persistence with Zustand and `localStorage`
- static JSON content only, with no backend, auth, or database

## The three tracks

### 1. Lightning Tip Jar

Beginner track. A small Rust + LDK project that helps a learner accept a first Lightning payment, generate invoices, display a QR code, and listen for payment confirmation.

### 2. Bitcoin Savings App

Intermediate track. A Flutter + BDK + Lightning mobile savings experience aimed at Nigerian users, including time-locked vaults, streaks, and SAT-to-NGN conversion.

### 3. PSBT Signer CLI

Advanced track. A Rust CLI for parsing, validating, signing, and broadcasting PSBTs, designed to deepen understanding of Bitcoin transaction structure and signing flow.

## Tech stack

- Next.js 14 App Router
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Zustand
- highlight.js
- Geist Sans + Geist Mono

## Local setup

```bash
npm install
npm run dev
```

Type-check the project:

```bash
npm run typecheck
```

Build for production:

```bash
npm run build
```

Note: Next.js 14 requires Node.js `>= 18.17.0`.

## Project structure

```text
app/
  page.tsx
  track/[id]/page.tsx
  complete/[id]/page.tsx
components/
data/tracks.json
store/progress.ts
```

## How to add a new track

All track content lives in [`data/tracks.json`](./data/tracks.json).

Each item follows the `Track` shape defined in [`lib/types.ts`](./lib/types.ts):

```ts
type Track = {
  id: string;
  title: string;
  tagline: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  weeks: number;
  stack: Stack[];
  description: string;
  what_you_build: string;
  milestones: Milestone[];
  chatbtc_context: string;
};
```

When adding a new track:

1. Add a unique `id`.
2. Keep milestone week numbers sequential, starting at `1`.
3. Include `starter_code` only when it genuinely helps onboarding.
4. Add relevant learning resources, ideally from BDP and canonical Bitcoin sources.
5. Make sure `chatbtc_context` is a useful, copyable prompt seed for support tooling.

The app routes are generated automatically from the JSON, so new tracks appear without additional route changes.

## Deployment to Vercel

This app is designed to deploy to Vercel with no environment variables and no backend setup.

### One-click path

1. Push the repository to GitHub.
2. Import the repo into Vercel.
3. Deploy.

### CLI path

```bash
vercel
vercel --prod
```

No env vars are required. All app content is static, and all user state is stored locally in the browser.

## Bitcoin Dev Project links

- Bitcoin Dev Project: https://bitcoindevs.xyz/
- BDP project gallery: https://bitcoindevs.xyz/projects
- Grants: https://grants.bitcoindevs.xyz/

## Motivation

This project is meant to help the Bitcoin Dev Project create a stronger bridge between beginner energy and meaningful open-source contribution. Instead of asking learners to invent their own path from scratch, Build Satoshi gives them a visible first win, a clear rhythm, and a real artifact they can show.

## Contributing

This is an open-source proposal for the Bitcoin Dev Project. PRs welcome.

## License

MIT
