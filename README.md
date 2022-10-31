# NX monorepo

This is the app using the [Nx build tools](https://nx.dev/getting-started/intro)

## What's inside?

This repo uses [npm](https://www.npmjs.com/) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `api`: a simple express app to host a tRPC server
- `web`: another [Next.js](https://nextjs.org) app
- `components`: a stub React component library used in the `web` application
- `theme`: a collection of SCSS functions & mixins used by `web` to build styles & themes
- `trpc-server`: a tRPC server that is shared with both `api` and `web` applications
- `utils`: a collection of utility functions written in TS

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This repo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
npm run build
```

### Develop

To develop all apps and packages, run the following command:

```
npm run dev
```
