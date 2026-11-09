# Config for lanelint

My lanelint config. It is [Astra](https://github.com/banjo/lanelint/blob/main/docs/presets/astra.md)
with kebab-case directories.

## Install

```bash
pnpm add -D lanelint @banjoanton/lanelint-config
```

## Usage

```ts
// lanelint.config.ts
import { banjo } from "@banjoanton/lanelint-config";
import { defineConfig } from "lanelint";

export default defineConfig({
    extends: [banjo()],
});
```

For a monorepo app: `banjo({ root: "apps/:app/src" })`.

## Structure

```
src/
  features/<feature>/   index.ts + role directories
  common/<domain>/      same, must not import features
    components/   UserCard.tsx            dumb components
    containers/   UserListContainer.tsx   smart components
    contexts/     UserContext.tsx
    hooks/        useUser.ts
    stores/       UserStore.ts            zustand stores, same level as hooks (useUserStore.ts also works)
    constants/    UserConstants.ts
    mappers/      UserMapper.ts
    models/       User.ts, UserSchema.ts  types, Zod schemas
    services/     UserService.ts          side effects
    repositories/ UserRepository.ts       database access, same level as services
    controllers/  UserController.ts       server functions, same level as services
    utils/        UserUtil.ts             pure functions
    __tests__/    next to the role they test
```

- Directories are kebab-case, files are PascalCase (`UserService.ts`), hooks are `useUser.ts`.
- A file exports one value named after the file (`UserService`).
- Named exports only.
- The roles, including `stores`, `repositories` and `controllers`, come from Astra.
