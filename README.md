# Agentura

Agentura is a static Astro marketing site for a consultancy focused on dependable agentic systems.

## Stack

- Astro 6
- Cloudflare deployment target
- Astro content collections for blog content
- Route-local Astro components and styles

## Key routes

- `/`
- `/services`
- `/tao`
- `/blog`
- `/blog/[slug]`

## Local development

```bash
npm install
npm run dev
```

The local dev server runs at `http://localhost:4321` by default.

## Validation

```bash
npm run build
```

## Project shape

```text
.
├── public/
├── src/
│   ├── blog/
│   ├── components/
│   ├── data/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── package.json
└── wrangler.jsonc
```

## Notes

- Global design tokens and shared shell behavior live in `src/layouts/Layout.astro`
- Shared marketing components live in `src/components/`
- Service and site copy helpers live in `src/data/`
