import eslintConfigPrettier from "@banjoanton/eslint-config-prettier";
import { fixupPluginRules } from "@eslint/compat";
import js from "@eslint/js";
import banjo from "eslint-plugin-banjo";
import globals from "globals";

const ERROR = "error";
const WARN = "warn";

const has = pkg => {
    try {
        import.meta.resolve(pkg, import.meta.url);
        return true;
    } catch {
        return false;
    }
};

const hasTypeScript = has("typescript");
const hasReact = has("react");

export const config = [
    {
        ignores: ["**/.cache/**", "**/node_modules/**", "**/build/**", "**/dist/**"],
    },

    js.configs.recommended,

    // all files
    {
        plugins: {
            import: (await import("eslint-plugin-import-x")).default,
            banjo,
        },
        extends: [],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        rules: {
            "no-warning-comments": [ERROR, { terms: ["FIXME"], location: "anywhere" }],
            "import/no-duplicates": [WARN, { "prefer-inline": true }],
        },
    },

    // JSX/TSX files
    hasReact
        ? {
              files: ["**/*.tsx", "**/*.jsx"],
              plugins: {
                  react: (await import("eslint-plugin-react")).default,
              },
              languageOptions: {
                  parser: (await import("typescript-eslint")).parser,
                  parserOptions: {
                      jsx: true,
                  },
              },
              rules: {
                  "react/jsx-key": WARN,
              },
          }
        : null,

    // react-hook rules are applicable in ts/js/tsx/jsx, but only with React as a dep
    hasReact
        ? {
              files: ["**/*.ts?(x)", "**/*.js?(x)"],
              plugins: {
                  "react-hooks": fixupPluginRules(await import("eslint-plugin-react-hooks")),
              },
              rules: {
                  "react-hooks/rules-of-hooks": ERROR,
                  "react-hooks/exhaustive-deps": WARN,
              },
          }
        : null,

    // JS and JSX files
    {
        files: ["**/*.js?(x)"],
        rules: {
            // TS handles this better
            "no-unused-vars": [
                WARN,
                {
                    args: "after-used",
                    argsIgnorePattern: "^_",
                    ignoreRestSiblings: true,
                    varsIgnorePattern: "^ignored",
                },
            ],
        },
    },

    // TS and TSX files
    hasTypeScript
        ? {
              files: ["**/*.ts?(x)"],
              languageOptions: {
                  parser: (await import("typescript-eslint")).parser,
                  parserOptions: {
                      projectService: true,
                  },
              },
              plugins: {
                  "@typescript-eslint": (await import("typescript-eslint")).plugin,
              },
              rules: {
                  "@typescript-eslint/no-unused-vars": [
                      WARN,
                      {
                          args: "after-used",
                          argsIgnorePattern: "^_",
                          ignoreRestSiblings: true,
                          varsIgnorePattern: "^ignored",
                      },
                  ],
                  "@typescript-eslint/consistent-type-imports": [
                      WARN,
                      {
                          prefer: "type-imports",
                          disallowTypeAnnotations: true,
                          fixStyle: "inline-type-imports",
                      },
                  ],
                  "@typescript-eslint/no-misused-promises": ["error", { checksVoidReturn: false }],
                  "@typescript-eslint/no-floating-promises": "error",
              },
          }
        : null,
    eslintConfigPrettier, // should be last
].filter(Boolean);

// this is for backward compatibility
export default config;
