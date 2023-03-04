# Config for ESLint

My personal ESlint config.

## Install

```bash
pnpm install @banjoanton/eslint-config
```

## Usage


To enable the `eslint` config, add this to `.eslintrc`:

```json
{
    "extends": ["@banjoanton/eslint-config"]
}
```

For TypeScript, you might have to install and add the TypeScript parser:

```json
{
     "parser": "@typescript-eslint/parser"
}
```
