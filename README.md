# Guestbook
> A Guestbook to illustrate the Multiplayer.app

Minimalist Nuxt app styled with Tailwind CSS v4 (CSS-first, no JS config).

## Styling

- Tailwind v4, zero-config by default
- Theme tokens live in `assets/css/tailwind.css` under `@theme`
- One primary color (`--color-primary: #2563eb`) with a neutral palette
- No gradients; simple hierarchy similar to GitHub/Vercel

### Files

- `nuxt.config.ts` — wires `assets/css/tailwind.css`
- `assets/css/tailwind.css` — `@import "tailwindcss"` and `@theme` tokens
- `app/app.vue`, `app/pages/**` — use token-based utilities (e.g., `bg-primary`, `text-muted`, `border-border`)

## Develop

Install deps and run the dev server:

```bash
pnpm install
pnpm dev
```
