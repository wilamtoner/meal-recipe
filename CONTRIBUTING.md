# Contributing

## Local setup
1. Install Node.js 20+ and pnpm 9+.
2. Copy `infra/.env.example` to `.env`.
3. Start database with `docker compose -f infra/docker-compose.yml up -d`.
4. Install dependencies with `pnpm install`.

## Development
- Start all dev servers: `pnpm dev`
- Run checks before pushing: `pnpm lint && pnpm test && pnpm build`

## Branching
- Keep PRs small and focused by feature.
- Add tests with every behavior change.
