# Config for Prettier

My personal Prettier config.

## Install

```bash
pnpm install @banjoanton/prettier-config @banjoanton/eslint-config-prettier
```

## Usage

To apply `prettier`, in your `package.json`:

```json
{
    //...
    "prettier": "@banjoanton/prettier-config"
}
```

In the `eslint` config:

```json
{
    "extends": ["@banjoanton/eslint-config-prettier"]
}
```
