import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import unicorn from "eslint-plugin-unicorn";
import _import from "eslint-plugin-import";
import promise from "eslint-plugin-promise";
import unusedImports from "eslint-plugin-unused-imports";
import json from "eslint-plugin-json";
import banjo from "eslint-plugin-banjo";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default [
    {
        ignores: [
            "**/node_modules",
            "**/dist",
            "**/build",
            "**/coverage",
            "**/libby",
            "**/.github",
            "**/.*",
            "**/*.md",
        ],
    },
    ...fixupConfigRules(
        compat.extends(
            "eslint:recommended",
            "@banjoanton/eslint-config-prettier",
            "plugin:unicorn/recommended",
            "plugin:import/recommended",
            "plugin:promise/recommended",
            "plugin:n/recommended",
            "plugin:@typescript-eslint/recommended"
        )
    ),
    {
        plugins: {
            "@typescript-eslint": fixupPluginRules(typescriptEslint),
            unicorn: fixupPluginRules(unicorn),
            import: fixupPluginRules(_import),
            promise: fixupPluginRules(promise),
            "unused-imports": unusedImports,
            json,
            banjo,
        },

        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },

            parser: tsParser,
            ecmaVersion: "latest",
            sourceType: "module",
        },

        settings: {
            "import/resolver": {
                typescript: true,
                node: true,
            },
        },

        rules: {
            "no-unused-vars": "off",

            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_",
                },
            ],

            "@typescript-eslint/ban-ts-comment": "off",
            "@typescript-eslint/no-empty-function": "off",
            "@typescript-eslint/no-namespace": "off",
            "@typescript-eslint/no-explicit-any": "warn",

            camelcase: [
                "warn",
                {
                    properties: "never",
                },
            ],

            "consistent-return": "off",
            "require-await": "off",
            "array-callback-return": "warn",
            "no-constant-condition": "warn",
            "no-duplicate-imports": "warn",
            "object-shorthand": "warn",
            "arrow-body-style": "warn",
            "no-unmodified-loop-condition": "warn",

            "no-use-before-define": [
                "error",
                {
                    functions: false,
                    classes: false,
                    variables: true,
                    allowNamedExports: false,
                },
            ],

            "require-atomic-updates": "warn",
            complexity: ["warn", 15],
            "dot-notation": "warn",
            eqeqeq: ["error", "always"],
            "max-params": ["warn", 3],
            "no-else-return": "warn",
            "no-empty-function": "off",
            "no-lonely-if": "warn",
            "no-multi-assign": "warn",
            "no-nested-ternary": "error",
            "no-shadow": "warn",
            "no-unneeded-ternary": "warn",
            "no-useless-rename": "warn",
            "no-var": "error",
            "no-useless-return": "warn",
            "prefer-arrow-callback": "warn",
            "prefer-const": "warn",
            "prefer-template": "warn",

            "sort-imports": [
                "warn",
                {
                    ignoreCase: true,
                    ignoreDeclarationSort: true,
                    ignoreMemberSort: false,
                    memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
                },
            ],

            "spaced-comment": [
                "warn",
                "always",
                {
                    markers: ["/"],
                },
            ],

            "unicorn/no-null": "off",
            "unicorn/no-process-exit": "off",

            "unicorn/filename-case": [
                "error",
                {
                    cases: {
                        camelCase: true,
                        pascalCase: true,
                        kebabCase: true,
                        snakeCase: false,
                    },
                },
            ],

            "unicorn/prefer-ternary": "off",
            "unicorn/prevent-abbreviations": "off",
            "unicorn/prefer-module": "off",
            "unicorn/prefer-top-level-await": "off",
            "unicorn/no-useless-undefined": "off",
            "unicorn/consistent-function-scoping": "off",
            "unicorn/no-array-reduce": "warn",
            "unicorn/no-array-callback-reference": "off",
            "unicorn/prefer-query-selector": "warn",
            "unicorn/no-array-for-each": "off",
            "unicorn/prefer-modern-dom-apis": "warn",
            "unicorn/consistent-destructuring": "off",
            "import/named": "off",
            "import/no-unresolved": "off",
            "n/no-missing-import": "off",
            "n/no-unsupported-features/es-syntax": "off",
            "n/no-process-exit": "off",
            "n/shebang": "off",
            "n/no-unpublished-import": "off",
            "n/no-unsupported-features/node-builtins": "off",
            "n/no-unsupported-features/es-builtins": "off",
            "banjo/module-exports": "error",
            "banjo/one-line-if": "off",
            "promise/always-return": "off",
        },
    },
    {
        files: ["**/.*.js", "**/*config.js"],

        rules: {
            "unicorn/prefer-module": "off",
            "banjo/module-exports": "error",
        },
    },
];
