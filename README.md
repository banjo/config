# Configs

My personal config files.

## Install

```bash
pnpm install @banjoanton/eslint-config @banjoanton/prettier-config
```

## Usage

### ESlint

For ESLint v8:

```json
{
    "extends": ["@banjoanton/eslint-config"]
}
```

For ESLint v9:

```js
import eslintConfig from "@banjoanton/eslint-config";

export default [...eslintConfig];
```

Specific parts of the v9 config:

```js
import reactConfig from "@banjoanton/eslint-config/react";
import typescriptConfig from "@banjoanton/eslint-config/typescript";
import javascriptConfig from "@banjoanton/eslint-config/javascript";

export default [...reactConfig, ...typescriptConfig, ...javascriptConfig];
```

### Prettier

Add the following to your `package.json` file. The ESlint extension includes matching rules.

```json
{
    "prettier": "@banjoanton/prettier-config"
}
```

If you don't want all ESLint rules, you only need to include `@banjoanton/eslint-config-prettier` instead.
