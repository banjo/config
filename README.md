# Configs

My personal config files.

## Install

```bash
pnpm install @banjoanton/eslint-config @banjoanton/prettier-config
```

## Usage

### ESlint

Add this to your eslint file:

```json
{
    "extends": ["@banjoanton/eslint-config"]
}
```

### Prettier

Add the following to your `package.json` file. The ESlint extension includes matching rules.

```json
{
    //...
    "prettier": "@banjoanton/prettier-config"
}
```

If you don't want all ESLint rules, you only need to include `@banjoanton/eslint-config-prettier` instead.