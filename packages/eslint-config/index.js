import tseslint from "typescript-eslint";
import { defaultConfig } from "./default-config.js";
import { reactConfig } from "./react.js";
import { typescriptConfig } from "./typescript.js";

export default tseslint.config(...defaultConfig, ...reactConfig, ...typescriptConfig);
