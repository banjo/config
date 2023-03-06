# Config for Prettier

My personal Prettier config.

## Install

```bash
pnpm install @banjoanton/prettier-config @banjoanton/eslint-config-prettier
```

It is possible to use the `@banjoanton/eslint-config` only, but then all other ESLint rules will be included as well.

## Usage

To apply `prettier`, in your `package.json`:

```json
{
    "prettier": "@banjoanton/prettier-config"
}
```

To enable the `eslint` config:

```json
{
    "extends": ["@banjoanton/eslint-config-prettier"]
}
```
