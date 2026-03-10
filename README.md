# Daycare Directories

**Find Trusted Childcare — City by City**

A professional directory site for daycare and childcare facilities across the USA and Canada. Built with Next.js, TypeScript, and Tailwind CSS. Deploy target: Vercel.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Data

- Facility data lives in the `/data` folder as JSON files.
- One file per state: `[state]_facilities.json` (e.g. `florida_facilities.json`).
- Each file is a flat array of facility objects with: `name`, `address`, `city`, `state`, `phone`, `website`, `rating`, `reviews`, `care_type`, `recommended`, `latitude`, `longitude` (and optional `featured`, `premium`).
- The site builds successfully with empty arrays; add real data as you complete each state.

## Routes

- **Homepage** `/` — Hero, stats, state grid, Canada section, featured facilities
- **State** `/[state-slug]` — Facility count, care type breakdown, city listing, recommended vs review carefully
- **City** `/[state-slug]/[city-slug]` — All facilities for that city with badges
- **Canada** `/canada` — Province listing
- **Canada Province** `/canada/[province-slug]` — Province page (city data extensible later)
- **Canada City** `/canada/[province-slug]/[city-slug]` — Placeholder for city-level Canada data
- **Advertise** `/advertise` — Featured ($49/mo) and Premium ($99/mo) options; Stripe links to be added

## Deploy on Vercel

1. Push the repo to GitHub (or connect your Git provider).
2. In [Vercel](https://vercel.com), import the project. Next.js is auto-detected.
3. Deploy. The `data` folder is included in the build; add or update JSON files and redeploy as you add states.

```bash
npm run build   # verify production build locally
```

## Tech

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Static/SSG where possible; state and city pages use `generateStaticParams`
