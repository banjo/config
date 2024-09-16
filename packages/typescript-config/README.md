# Config for Typescript

My personal Typescript config.

## Install

```bash
pnpm install @banjoanton/typescript-config
```

## Usage

Create a `tsconfig.json` file in your project root with the following content:

```json
{
    "extends": ["@banjoanton/typescript-config"],
    "include": ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    "compilerOptions": {
        // ...
    }
}
```

For a monorepo, I recommend [@total-typescript/tsconfig](https://github.com/total-typescript/tsconfig) for specific tsconfigs.

```json
{
    // My code runs in the DOM:
    "extends": "@total-typescript/tsconfig/bundler/dom/app", // For an app
    "extends": "@total-typescript/tsconfig/bundler/dom/library", // For a library
    "extends": "@total-typescript/tsconfig/bundler/dom/library-monorepo", // For a library in a monorepo

    // My code _doesn't_ run in the DOM (for instance, in Node.js):
    "extends": "@total-typescript/tsconfig/bundler/no-dom/app", // For an app
    "extends": "@total-typescript/tsconfig/bundler/no-dom/library", // For a library
    "extends": "@total-typescript/tsconfig/bundler/no-dom/library-monorepo" // For a library in a monorepo
}
```
