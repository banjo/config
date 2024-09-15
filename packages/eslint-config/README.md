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

For eslint v9:

```js
import eslintConfig from "@banjoanton/eslint-config";

export default [...eslintConfig];
```
