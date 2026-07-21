# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

World Invaders 2.0 — a mobile AR arcade/survival shooter built with Ionic React + Capacitor, rendered with react-three-fiber + @react-three/xr (WebXR immersive-ar). The design doc is `GDD-world-invaders-2.md` (in Portuguese); note it describes a 2D canvas game, but the actual implementation is AR. Code comments and commit messages are written in Portuguese.

## Commands

- `npm run dev` — Vite dev server. Serves over **HTTPS with a self-signed cert** (WebXR requires a secure context) at `https://localhost:5173`, with `host: true` so a phone on the LAN can connect.
- `npm run build` — `tsc && vite build`. Use this to type-check; there is no separate typecheck script.
- `npm run test.unit` — Vitest in watch mode. Single pass: `npx vitest run`; single file: `npx vitest run src/game/playerStats.test.ts`. Tests use jsdom with setup in `src/setupTests.ts`; in test mode the XR store is created with `emulate: false`.
- `npm run test.e2e` — Cypress, expects the dev server already running at `https://localhost:5173`.
- `npm run lint` — ESLint (flat config in `eslint.config.js`); pass a path, e.g. `npm run lint -- src`.

## Architecture

**Screens (Ionic + react-router v5)** — `src/App.tsx` routes to `src/pages/`: Home, Settings, Arsenal (shop), Gameplay, GameOver. The router `basename` comes from `import.meta.env.BASE_URL` because of the GitHub Pages subpath (see Deploy).

**Gameplay flow** — `GameplayScreen` mounts `src/components/gameplay/Game.tsx`, which owns a module-level `XRStore` (`createXRStore`) and auto-enters an AR session. When the player is hit, `applyMatchResult(kills)` from `src/game/playerStats.ts` credits coins (`COINS_PER_KILL`), updates the record in localStorage (`wi2:playerStats`), and the result is passed to `GameOverScreen` via `history.replace("/game-over", result)` — GameOver reads it from location state.

**Game state lives outside React** in module singletons under `src/game/`:
- `invaderRegistry.ts` — registry of live invader `Object3D`s plus segment-vs-sphere hit testing; projectiles call `checkProjectileHit` instead of raycasting through the scene graph.
- `radar.ts` — mutable blip list bridging the R3F world (`components/xr/RadarTracker` writes) and the DOM HUD (`components/gameplay/Radar` reads).
- `playerStats.ts` — persistent coins/best-kills (localStorage).

**Two component layers** — `src/components/xr/` are R3F scene components (Invader, InvaderSpawner, PlayerWeapon, Projectile, Crosshair, RadarTracker, AutoEnterAR); `src/components/gameplay/` and the rest are DOM/Ionic UI. During an AR session only the dom-overlay is visible, so DOM HUD elements must be portaled inside `<XRDomOverlay>` (see `Game.tsx`).

**AR emulation** — outside test mode the XR store enables the IWER emulator (`emulate: { syntheticEnvironment: false }`) so AR sessions work in a desktop browser. `vite.config.ts` has `dedupe: ['three']` because @iwer packages bundle a nested three that otherwise crashes the emulated session — don't remove it.

**i18n** — i18next with `pt` (fallback) and `en` in `src/i18n/locales/`; language detected from localStorage/navigator. User-facing strings go through `useTranslation`.

**Path alias** — `@` → `src/` (vite.config.ts + tsconfig).

## Deploy / base path

GitHub Pages deploys from `main` via `.github/workflows/deploy-pages.yml`, building with `--base=/word-invaders-2.0/`. Local and Capacitor builds use base `/`. Anything referencing a public asset must be prefixed with `import.meta.env.BASE_URL` (see `src/game/assets.ts`) or it will 404 on Pages. Capacitor (`android/`, `capacitor.config.ts`) wraps the `dist` build for mobile.
