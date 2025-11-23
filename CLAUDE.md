# CLAUDE.md

You are professional React developer with 10+ years experience.

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **Munar Client** - an AI-powered Web3 copilot for token swaps and bridges across 599+ blockchains. Built with React 19, TypeScript, Vite, and TailwindCSS v4.

## Development Commands

```bash
pnpm install    # Install dependencies (use pnpm, not npm/yarn)
pnpm dev        # Start development server (Vite)
pnpm build      # Production build
pnpm preview    # Preview production build
pnpm api        # Regenerate API client from OpenAPI spec
```

## Critical Architectural Patterns

### 1. Object.assign Pattern for UI Components (MANDATORY)

**ALWAYS** use the Object.assign pattern when creating compound components in `src/shared/ui/`:

```typescript
// CORRECT - Always use this pattern
const ComponentRoot = (props: ComponentProps) => {
  /* implementation */
};
const SubComponent = (props: SubComponentProps) => {
  /* implementation */
};

const Component = Object.assign(ComponentRoot, {
  SubComponent: SubComponent,
  // ... other subcomponents
});

export { Component as ComponentName };
```

This pattern is used extensively in: Dialog, DropdownMenu, Sheet, Avatar, Card, Tooltip, Collapsible, Sidebar, and others.

### 2. TypeScript Conventions (STRICT)

- **NEVER use `interface`** - always use `type` for all type definitions
- Use `as const` with `keyof typeof` for runtime-safe type unions
- Example:

```typescript
// CORRECT
type ButtonProps = {
  variant?: "primary" | "destructive" | "outline";
};

// WRONG - Never use interface
interface ButtonProps {
  variant?: "primary" | "destructive" | "outline";
}
```

### 3. Component Structure

All UI components in `src/shared/ui/` follow this structure:

1. Named exports only (no default exports)
2. CVA for variant management
3. `cn()` utility for className merging
4. Full TypeScript typing
5. Forwardref when appropriate

Example:

```typescript
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva('base-classes', {
  variants: {
    variant: { primary: 'classes', secondary: 'classes' },
    size: { sm: 'classes', default: 'classes' }
  },
  defaultVariants: { variant: 'primary', size: 'default' }
})

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
)
Button.displayName = 'Button'

export { Button }
```

## Technology Stack

- **React 19.1.1** with React Compiler enabled
- **TypeScript 5.7.3** (strict mode)
- **Vite 7** (bundler)
- **TanStack Router** (file-based routing, NOT Next.js)
- **TanStack Query v5** (server state)
- **TailwindCSS v4** with OKLCH colors
- **Radix UI** (accessible primitives)
- **CVA** (variant management)
- **React Hook Form + Zod** (forms)
- **Dynamic Labs + Wagmi + Viem** (Web3)
- **Orval** (OpenAPI client generation)

## Project Structure

```
src/
├── api/           # Generated API client (DO NOT EDIT MANUALLY)
├── features/      # Feature modules (auth, chat, swap, etc.)
├── shared/
│   ├── ui/        # UI components with Object.assign pattern
│   └── helpers/   # Utility functions
├── hooks/         # Custom React hooks
├── layouts/       # Layout components
├── providers/     # React context providers
├── routes/        # TanStack Router pages (*.route.tsx)
├── state/         # State management
└── widgets/       # Page-level components
```

## API Integration

- API client is auto-generated from `openapi.json` using Orval
- Run `pnpm api` to regenerate after OpenAPI changes
- Uses custom axios instance with interceptors for auth
- All API hooks are in `src/api/index.ts` (generated)

## Routing

- File-based routing with TanStack Router
- Routes: `src/routes/*.route.tsx`
- Auto-generates `routeTree.gen.ts` (DO NOT EDIT)
- Layout wrapping in `__root.tsx`

## State Management

- **Server state**: TanStack Query (auto-generated hooks)
- **Client auth**: Token class in localStorage
- **Context**: Sidebar (with cookies), Profile, Auth
- **Forms**: React Hook Form + Zod schemas

## Styling Guidelines

- Use TailwindCSS classes directly
- Use `cn()` utility for conditional classes
- CSS variables defined in `index.css` for theming
- OKLCH color space for better color manipulation
- Poppins font (Medium 500, Bold 700)

## Code Conventions

- **Files**: kebab-case (e.g., `swap-input.tsx`)
- **Components**: PascalCase exports (e.g., `SwapInput`)
- **Hooks**: camelCase with `use` prefix (e.g., `useDisclosure`)
- **Types**: PascalCase with suffix (e.g., `SwapFormType`, `ButtonProps`)
- **Constants**: SCREAMING_SNAKE_CASE
- **Data attributes**: Use `data-slot` for component identification

## Important Notes

1. This is a Vite project, NOT Next.js - use TanStack Router patterns
2. Always use `type` instead of `interface`
3. Always use Object.assign for compound components in shared/ui
4. API client is generated - never edit `src/api/index.ts` manually
5. Use pnpm as package manager, not npm or yarn
6. React Compiler is enabled - avoid unnecessary memoization
7. Strict TypeScript - no `any` types
8. All components should be accessible (using Radix UI primitives where possible)
