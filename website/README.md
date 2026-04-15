# Valorant API — Documentation site

This directory contains the [Fumadocs](https://fumadocs.dev/)-powered documentation site. It is published to GitHub Pages by `.github/workflows/docs.yml` on every push to `main`.

## Local development

```bash
cd website
npm install
npm run dev
```

The `predev` and `prebuild` hooks run [`typedoc`](https://typedoc.org/) with [`typedoc-plugin-markdown`](https://www.npmjs.com/package/typedoc-plugin-markdown) to generate the API reference into `content/docs/api/` from the JSDoc comments in `../src`.

## Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Fumadocs dev server at <http://localhost:3000> |
| `npm run build` | Generate the API reference and produce a static export in `out/` |
| `npm run docs:api` | Regenerate the API reference MDX files only |

## Layout

```
website/
├── app/                # Next.js App Router (Fumadocs UI + routes)
├── components/         # MDX components, search, theming
├── content/docs/       # Authored MDX + generated API reference (gitignored)
├── lib/                # Fumadocs source loader & shared config
├── scripts/
│   └── add-frontmatter.mjs   # Post-processes TypeDoc output for Fumadocs
├── source.config.ts    # fumadocs-mdx collection definition
├── next.config.mjs
└── typedoc.json
```
