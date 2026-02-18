# Meal Recipe App — Starter Architecture & Scaffold Plan

This repository is currently a clean slate. Below is a concrete starter structure for a full-stack **meal-recipe** app with:

- Frontend (React + Vite + TypeScript)
- Backend API (Node.js + Fastify + TypeScript)
- Database (PostgreSQL + Prisma)
- Testing (unit, integration, E2E)

---

## 1) Proposed Tech Stack

### Frontend
- **React + Vite + TypeScript**
- **React Router** for routing
- **TanStack Query** for API state
- **Zod** for client-side schema validation
- **Vitest + Testing Library** for component/unit tests

### Backend
- **Node.js + Fastify + TypeScript**
- **Prisma ORM**
- **Zod** for request validation
- **JWT auth** (if auth is needed soon)
- **Vitest** for unit/integration tests

### Database
- **PostgreSQL**
- Prisma migrations and seed scripts

### End-to-end
- **Playwright** for user-flow tests against running frontend/backend

### DevOps / Tooling
- **pnpm workspaces** (monorepo package management)
- **Docker Compose** for local infra (Postgres)
- **ESLint + Prettier**
- **GitHub Actions** for CI

---

## 2) Monorepo Directory Structure

```text
meal-recipe/
├─ apps/
│  ├─ web/                          # React frontend
│  │  ├─ src/
│  │  │  ├─ app/                    # app-level providers/router
│  │  │  ├─ pages/
│  │  │  │  ├─ HomePage.tsx
│  │  │  │  ├─ RecipeDetailPage.tsx
│  │  │  │  ├─ CreateRecipePage.tsx
│  │  │  │  └─ MealPlannerPage.tsx
│  │  │  ├─ components/
│  │  │  │  ├─ recipes/
│  │  │  │  ├─ meals/
│  │  │  │  └─ shared/
│  │  │  ├─ features/
│  │  │  │  ├─ recipes/
│  │  │  │  ├─ ingredients/
│  │  │  │  └─ meal-plans/
│  │  │  ├─ lib/                    # api client, utils
│  │  │  ├─ test/
│  │  │  └─ main.tsx
│  │  ├─ public/
│  │  ├─ vite.config.ts
│  │  └─ package.json
│  │
│  └─ api/                          # Fastify backend
│     ├─ src/
│     │  ├─ app.ts                  # app builder
│     │  ├─ server.ts               # server bootstrap
│     │  ├─ routes/
│     │  │  ├─ health.ts
│     │  │  ├─ recipes.ts
│     │  │  ├─ ingredients.ts
│     │  │  └─ mealPlans.ts
│     │  ├─ modules/
│     │  │  ├─ recipes/
│     │  │  │  ├─ recipe.service.ts
│     │  │  │  ├─ recipe.repo.ts
│     │  │  │  ├─ recipe.schema.ts
│     │  │  │  └─ recipe.test.ts
│     │  │  ├─ ingredients/
│     │  │  └─ meal-plans/
│     │  ├─ plugins/
│     │  │  ├─ prisma.ts
│     │  │  └─ auth.ts
│     │  ├─ lib/
│     │  └─ test/
│     ├─ prisma/
│     │  ├─ schema.prisma
│     │  ├─ migrations/
│     │  └─ seed.ts
│     ├─ package.json
│     └─ tsconfig.json
│
├─ packages/
│  ├─ shared-types/                 # shared DTOs and zod schemas
│  │  ├─ src/
│  │  │  ├─ recipe.ts
│  │  │  ├─ ingredient.ts
│  │  │  └─ mealPlan.ts
│  │  └─ package.json
│  └─ config/                       # shared lint/ts config presets
│     ├─ eslint/
│     ├─ tsconfig/
│     └─ prettier/
│
├─ tests/
│  ├─ e2e/                          # Playwright end-to-end tests
│  │  ├─ recipe-crud.spec.ts
│  │  └─ meal-plan.spec.ts
│  └─ contract/                     # optional API contract tests
│
├─ infra/
│  ├─ docker-compose.yml            # postgres + optional pgadmin
│  └─ .env.example
│
├─ .github/
│  └─ workflows/
│     ├─ ci.yml
│     └─ e2e.yml
│
├─ pnpm-workspace.yaml
├─ package.json
├─ README.md
└─ CONTRIBUTING.md
```

---

## 3) Data Model (Initial)

Use this as the first Prisma model set:

- `User` (optional in v1; include if auth is planned soon)
- `Recipe`
  - `id`, `title`, `description`, `instructions`, `prepTimeMinutes`, `cookTimeMinutes`, `servings`, timestamps
- `Ingredient`
  - `id`, `name`
- `RecipeIngredient` (join table)
  - `recipeId`, `ingredientId`, `quantity`, `unit`
- `MealPlan`
  - `id`, `name`, `startDate`, `endDate`
- `MealPlanItem`
  - `mealPlanId`, `recipeId`, `date`, `mealType` (breakfast/lunch/dinner/snack)

This supports recipe CRUD, ingredient reuse, and weekly meal planning.

---

## 4) API Surface (v1)

### Health
- `GET /health`

### Recipes
- `GET /recipes`
- `GET /recipes/:id`
- `POST /recipes`
- `PATCH /recipes/:id`
- `DELETE /recipes/:id`

### Ingredients
- `GET /ingredients`
- `POST /ingredients`

### Meal plans
- `GET /meal-plans`
- `GET /meal-plans/:id`
- `POST /meal-plans`
- `POST /meal-plans/:id/items`
- `DELETE /meal-plans/:id/items/:itemId`

---

## 5) Testing Strategy

### Backend
- Unit tests for services and validation
- Integration tests for route + DB behavior (test database)

### Frontend
- Component tests for core UI components
- Feature tests for forms and state transitions

### E2E
- “Create recipe → add to meal plan → view plan” happy path
- “Validation errors are shown on invalid recipe input”

### CI gates (minimum)
- Typecheck
- Lint
- Unit/integration tests
- Build
- Optional E2E on PR or nightly

---

## 6) Initial Scaffold Plan (Phased)

### Phase 0 — Project setup (Day 1)
1. Initialize pnpm workspace and root scripts.
2. Create `apps/web`, `apps/api`, `packages/shared-types`, `packages/config`.
3. Add ESLint/Prettier/TypeScript shared config.
4. Add Docker Compose with PostgreSQL and `.env.example`.

**Done when:** `pnpm -r lint`, `pnpm -r test`, and `pnpm -r build` run (even with minimal placeholder code).

### Phase 1 — Backend foundation (Day 1–2)
1. Add Fastify app with `/health`.
2. Configure Prisma + initial migration.
3. Implement recipe module (CRUD).
4. Add backend unit + integration tests.

**Done when:** API serves recipe CRUD and tests pass locally.

### Phase 2 — Frontend foundation (Day 2–3)
1. Setup React Router and app shell.
2. Build recipe list/detail/create pages.
3. Create API client layer and query hooks.
4. Add form validation and error states.

**Done when:** user can create and view recipes from UI.

### Phase 3 — Meal planner feature (Day 3–4)
1. Backend meal-plan endpoints.
2. Frontend meal planner page (calendar/list view).
3. Add recipe-to-plan interactions.
4. Add end-to-end flow tests.

**Done when:** user can build a week plan from existing recipes.

### Phase 4 — Hardening (Day 5)
1. Improve observability (structured logging, request IDs).
2. Add auth if required.
3. Add pagination/filtering/search.
4. CI optimization + caching.

**Done when:** stable PR pipeline and clear release checklist.

---

## 7) Recommended First 10 Tasks

1. Create workspace and package manifests.
2. Add root `README` setup instructions.
3. Add `docker-compose` Postgres service.
4. Bootstrap Fastify API with `GET /health`.
5. Add Prisma schema + first migration.
6. Add recipe CRUD routes and service.
7. Scaffold React app with routes.
8. Build recipe list and create form.
9. Add tests (API integration + UI component).
10. Configure GitHub Actions CI workflow.

---

## 8) Learning Path for New Contributors

1. **Domain first:** understand recipe, ingredient, and meal-plan relationships.
2. **API contracts:** read shared Zod schemas in `packages/shared-types`.
3. **Data lifecycle:** trace one feature end-to-end (UI form → API route → service → DB).
4. **Testing pyramid:** know where to add unit vs integration vs e2e tests.
5. **Operational basics:** env vars, migrations, CI checks, and release flow.

---

## 9) Naming/Design Conventions (starter defaults)

- Feature folders by domain (`recipes`, `ingredients`, `meal-plans`) over technical-only grouping.
- Keep API handlers thin; business logic in services.
- Keep DB logic in repository layer.
- Share request/response schema types between frontend and backend.
- Prefer small, focused tests close to modules.

---

## 10) Optional Near-Term Enhancements

- Search recipes by ingredient tags
- Nutritional metadata per recipe
- Shopping list generation from a meal plan
- Import recipes from URL / markdown
- AI-assisted recipe suggestions (future extension)

