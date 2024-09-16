# Config for ESLint

My personal ESlint config.

## Install

```bash
pnpm install @banjoanton/eslint-config
```

## Usage

Add this to your eslint file:

```json
{
    "extends": ["@banjoanton/eslint-config"]
}
```

Full config with eslint v9:

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
