# Frontend Monorepo

pnpm workspace containing two React apps and a shared package.

## Structure

```
frontend/
├── apps/
│   ├── pn7-bg
│   └── pn7-cro/
├── packages/
│   └── shared/              # shared UI, hooks, utils, API client
├── pnpm-workspace.yaml
├── package.json             # Root workspace scripts
├── tsconfig.base.json       # Shared TypeScript config
└── eslint.config.js         # Shared ESLint config
```

## Commands

```bash
# Install all dependencies
pnpm install

# Dev servers
pnpm dev:bg             # http://localhost:5173
pnpm dev:cro            # http://localhost:5174
pnpm dev                # Both in parallel

# Build
pnpm build:bg
pnpm build:cro
pnpm build:all           # Both sequentially

# Lint
pnpm lint                # All packages

# Format
pnpm format              # All code
```

## Package Details

### `@pn7/shared` (`packages/shared/`)

Raw TypeScript source — no build step. Apps import `.ts`/`.tsx` directly; Vite transforms on-the-fly.

**Contains:**

- `src/components/ui/` — Reusable UI primitives (Button, Input, Modal, Card, etc.)
- `src/lib/utils.ts` — `cn()` (clsx + tailwind-merge)
- `src/theme.css` — Design tokens (@theme block, shadcn CSS variables)

**Imports:** Apps use `@pn7/shared/` paths:

```typescript
import Button from "@pn7/shared/components/ui/Button";
import { cn } from "@pn7/shared/lib/utils";
```

React is a `peerDependency` — each app provides it, pnpm hoists to root.

## Conventions

- **Shared imports** use `@pn7/shared/` paths. App-specific imports use `@/` alias (maps to `./src/`).
- **Tailwind CSS 4:** Each app's `index.css` must include `@source "../../packages/shared/src"` to scan shared components for utility classes.
- **Design tokens** live in `packages/shared/src/theme.css` — imported by both apps.
- **Dependencies used directly** by app code (lucide-react, zod, sonner, etc.) must be listed in that app's `package.json` even if also in shared — pnpm strict mode requires this.

## Adding a New Shared Component

1. Create the component in `packages/shared/src/components/ui/`
2. Use relative imports within shared (e.g., `../../lib/utils`)
3. Import from apps via `@pn7/shared/components/ui/ComponentName`
4. Run `pnpm build:all` to verify both apps compile
