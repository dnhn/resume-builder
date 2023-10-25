<h1 align="center">Résumé Builder</h1>

Résumé Builder—which was built on top of Dwarves Foundation’s
[Next.js Boilerplate](https://github.com/dwarvesf/nextjs-boilerplate)—is an
innovative capstone project from the
[front-end development course](https://github.com/dwarvesf/df-frontend-2023)
in 2023. This tool combines the power of artificial intelligence to offer users
comprehensive assistance in refining and enhancing the content of their résumés.

## Quick Start

```bash
git clone --depth=1 git@github.com:dnhn/resume-builder.git my-project-name
cd my-project-name
pnpm install
```

[Vercel KV](https://vercel.com/storage/kv) is used for data storage, follow this
[guide](https://vercel.com/docs/storage/vercel-kv/quickstart) to setup and pull
the environment variables to local for development.

```bash
vercel env pull .env.development.local
```

Then, you can run locally in development mode with live reload:

```bash
pnpm dev
```

Open http://localhost:3000 in your browser to view the project.
