# Meal Recipe App

Starter scaffold for a full-stack meal-recipe application.

## Stack
- Frontend: React + Vite + TypeScript
- Backend: Fastify + TypeScript
- Database: PostgreSQL + Prisma
- Shared schemas: Zod in `packages/shared-types`
- Testing: Vitest (API + web unit tests), with `tests/e2e` reserved for Playwright

## Repository Structure

```text
.
├─ apps/
│  ├─ api/                # Fastify API + Prisma schema
│  └─ web/                # React app (Vite)
├─ packages/
│  ├─ config/             # Shared ts/eslint/prettier base config
│  └─ shared-types/       # Shared Zod schemas and TS types
├─ infra/
│  ├─ docker-compose.yml  # Local PostgreSQL
│  └─ .env.example
├─ tests/
│  ├─ e2e/
│  └─ contract/
└─ .github/workflows/
```

## Implemented from Roadmap

### Phase 0 (Project setup)
- ✅ Monorepo workspace (`pnpm-workspace.yaml`)
- ✅ Root scripts for dev/build/test/typecheck
- ✅ Base shared config package
- ✅ Dockerized local PostgreSQL and env template

### Phase 1 (Backend foundation)
- ✅ Fastify bootstrap and `GET /health`
- ✅ Prisma schema with initial domain models (`Recipe`, `Ingredient`, `RecipeIngredient`, `MealPlan`, `MealPlanItem`)
- ✅ Seed script placeholder
- ✅ API health test scaffold

### Phase 2 (Frontend foundation)
- ✅ React app shell with routes
- ✅ Initial pages: Home, Create Recipe, Meal Planner
- ✅ React Query provider setup
- ✅ UI smoke test scaffold

### Phase 3+ (Next)
- ⏳ Implement real recipe CRUD endpoints and DB-backed services
- ⏳ Build recipe list/create flows against API
- ⏳ Add meal-planner interactions
- ⏳ Add Playwright E2E flow

## Quick Start

1. Install Node.js 20+ and pnpm 9+.
2. Start Postgres:
   ```bash
   docker compose -f infra/docker-compose.yml up -d
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```
4. Run development mode:
   ```bash
   pnpm dev
   ```

## Useful Commands

```bash
pnpm typecheck
pnpm test
pnpm build
```
