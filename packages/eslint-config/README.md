# Config for ESLint

My personal ESlint config.

## Install

```bash
pnpm install @banjoanton/eslint-config
```

## Usage

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
