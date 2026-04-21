# Build Satoshi

Build Satoshi is a guided Bitcoin developer onboarding platform built with Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion, Zustand, and static JSON data.

## Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Zustand with `localStorage` persistence
- Geist Sans + Geist Mono

## Routes

- `/` overview landing page
- `/tracks` searchable track catalog
- `/tracks/[id]` milestone detail pages
- `/dashboard` local progress dashboard

## Local Development

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

## Content Model

All project content lives in [`data/tracks.json`](./data/tracks.json). Progress state is client-side only and persisted to the browser using Zustand.

## Deployment

The app is deploy-ready for Vercel with no backend services required.
