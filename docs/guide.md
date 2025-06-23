# Guide

## Folder Structure

```
portfolio/
  ├── app/           # Next.js app directory
  ├── components/    # React components
  ├── hooks/         # Custom hooks
  ├── lib/           # Data and utilities
  ├── public/        # Static assets
  ├── styles/        # Global styles
  ├── types/         # TypeScript types
  ├── docs/          # Documentation (this folder)
```

## Adding New Pages
- To add a new main page (e.g., About), create a new component in `components/` and add a route in `app/`.
- For Docsify docs, add a new `.md` file in `docs/` (e.g., `usage.md`).

## Adding Components
- Place new React components in `components/`.
- Use or extend UI primitives in `components/ui/`.

## Deployment
- Deploy to Vercel, Netlify, or any Node.js host.
- For Vercel: just connect your repo and deploy.
- For GitHub Pages (docs only): push to `docs/` and ensure `.nojekyll` is present.

---

[Back to Home](README.md) 