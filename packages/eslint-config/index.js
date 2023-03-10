module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        "eslint:recommended",
        "@banjoanton/eslint-config-prettier",
        "plugin:unicorn/recommended",
        "plugin:import/recommended",
        "plugin:promise/recommended",
        "plugin:n/recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    parser: "@typescript-eslint/parser",
    plugins: [
        "@typescript-eslint",
        "unicorn",
        "import",
        "promise",
        "unused-imports",
        "json",
        "banjo",
    ],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    settings: {
        "import/resolver": {
            typescript: true,
            node: true,
        },
    },
    ignorePatterns: [
        "node_modules",
        "dist",
        "build",
        "coverage",
        "libby",
        ".github",
        ".*",
        "*.md",
    ],
    rules: {
        // typescript
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": ["error"],
        // eslint
        camelcase: ["warn", { properties: "never" }],
        "array-callback-return": "warn",
        "no-constant-condition": "warn",
        "no-duplicate-imports": "warn",
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
        "require-await": "error",
        complexity: ["warn", 15],
        "consistent-return": "warn",
        "dot-notation": "warn",
        eqeqeq: ["error", "always"],
        "max-params": ["error", 3],
        "no-else-return": "warn",
        "no-empty-function": "warn",
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
        "spaced-comment": ["warn", "always", { markers: ["/"] }],
        // unicorn
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
        // import
        "import/no-unresolved": "error",
        "import/named": "off",
        // n
        "n/no-missing-import": "off",
        "n/no-unsupported-features/es-syntax": "off",
        "n/no-process-exit": "off",
        "n/shebang": "off",
        // banjo
        "banjo/module-exports": "error",
        "banjo/one-line-if": "error",
    },
    overrides: [
        {
            files: [".*.js", "*config.js"],
            rules: {
                "unicorn/prefer-module": "off",
                "banjo/module-exports": "error",
            },
        },
    ],
};
