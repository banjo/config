import tseslint from "typescript-eslint";
import tsParser from "@typescript-eslint/parser";

export default [
    ...tseslint.configs.recommended,
    {
        files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
        ignores: ["eslint.config.js"],
        languageOptions: {
            parser: tsParser,
            ecmaVersion: "latest",
            sourceType: "module",
        },
        rules: {
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
            "@typescript-eslint/no-empty-interface": "off",
            "@typescript-eslint/no-empty-object-type": "off",

            "@typescript-eslint/consistent-type-definitions": ["warn", "type"],
            "func-style": ["warn", "expression"],
            "no-restricted-syntax": [
                "warn",
                {
                    selector: "TSEnumDeclaration",
                    message:
                        "Avoid enums. Use an `as const` object and derive the type: `type X = (typeof X)[keyof typeof X]`.",
                },
                {
                    selector:
                        ":function > :matches(Identifier, ObjectPattern) > TSTypeAnnotation > TSTypeLiteral",
                    message:
                        "Declare the parameter type as a named type directly above the function, for example `type GetUserProps`.",
                },
                {
                    selector: "Literal[raw='null']",
                    message: "Prefer `undefined` over `null`.",
                },
            ],
        },
    },
];
