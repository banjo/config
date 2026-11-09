import boundaries from "@lanelint/plugin-boundaries";
import conventions from "@lanelint/plugin-conventions";
import { astra, type AstraOptions } from "@lanelint/presets";
import { defineConfigFragment } from "lanelint";

export type BanjoOptions = {
    /** The directory that holds `features/` and `common/`. Defaults to `src`. */
    root?: AstraOptions["root"];
    /** Globs per Astra role. Replaces the default globs of that role. */
    roles?: AstraOptions["roles"];
};

const ROLES = [
    "components",
    "constants",
    "containers",
    "contexts",
    "controllers",
    "hooks",
    "mappers",
    "models",
    "repositories",
    "services",
    "stores",
    "utils",
];

const toGlob = (root: string) => root.replace(/:\w+/g, "*").replace(/\/$/, "");

export const banjo = (options: BanjoOptions = {}) => {
    const root = toGlob(options.root ?? "src");

    const rules = defineConfigFragment({
        plugins: [boundaries, conventions],
        rules: {
            "conventions/allowed-directories": [
                "error",
                {
                    rules: [
                        { directory: `${root}/features/*`, names: [...ROLES, "__tests__"] },
                        { directory: `${root}/common/*`, names: [...ROLES, "__tests__"] },
                    ],
                },
            ],
            "conventions/forbidden-directories": [
                "error",
                {
                    patterns: [
                        { name: "tests", message: "Put tests in __tests__/." },
                        { name: "types", message: "Put types in named files in models/." },
                        {
                            name: "{lib,helpers}",
                            message: "Put the code in a role directory, such as utils/.",
                        },
                        {
                            name: "{component,constant,container,context,controller,hook,mapper,model,repository,service,store,util}",
                            message: "Role directories have plural names, such as services/.",
                        },
                    ],
                },
            ],
            "conventions/forbidden-files": [
                "error",
                {
                    patterns: [
                        { name: "types.ts", message: "Put types in named files in models/." },
                        {
                            name: "{utils,helpers}.ts",
                            message: "Split utils by entity, such as utils/UserUtil.ts.",
                        },
                        {
                            name: "index.tsx",
                            message: "Name the component file after the component.",
                        },
                        {
                            name: `${root}/{features,common}/*/!(index.ts)`,
                            message:
                                "Put the file in a role directory, such as components/ or utils/.",
                        },
                    ],
                },
            ],
            "conventions/root-only-files": ["error", { names: ["index.ts"] }],
            "conventions/file-name-pattern": [
                "error",
                {
                    includeTests: true,
                    rules: [
                        { directory: "components", pattern: "[A-Z]*.tsx" },
                        { directory: "containers", pattern: "[A-Z]*Container{,.stories}.tsx" },
                        { directory: "contexts", pattern: "[A-Z]*Context.tsx" },
                        { directory: "controllers", pattern: "[A-Z]*Controller.ts" },
                        { directory: "hooks", pattern: "use[A-Z]*.{ts,tsx}" },
                        { directory: "mappers", pattern: "[A-Z]*Mapper.ts" },
                        { directory: "models", pattern: "[A-Z]*.ts" },
                        { directory: "repositories", pattern: "[A-Z]*Repository.ts" },
                        { directory: "services", pattern: "[A-Z]*Service.ts" },
                        { directory: "stores", pattern: "{,use}[A-Z]*Store.ts" },
                        { directory: "utils", pattern: "[A-Z]*Util.ts" },
                        { directory: "__tests__", pattern: "*.test.{ts,tsx}" },
                        {
                            directory: "**/containers/__tests__",
                            pattern: "[A-Z]*Container.test.tsx",
                        },
                        {
                            directory: "**/controllers/__tests__",
                            pattern: "[A-Z]*Controller.test.ts",
                        },
                        { directory: "**/hooks/__tests__", pattern: "use[A-Z]*.test.{ts,tsx}" },
                        { directory: "**/mappers/__tests__", pattern: "[A-Z]*Mapper.test.ts" },
                        {
                            directory: "**/repositories/__tests__",
                            pattern: "[A-Z]*Repository.test.ts",
                        },
                        { directory: "**/services/__tests__", pattern: "[A-Z]*Service.test.ts" },
                        { directory: "**/stores/__tests__", pattern: "{,use}[A-Z]*Store.test.ts" },
                        { directory: "**/utils/__tests__", pattern: "[A-Z]*Util.test.ts" },
                    ],
                },
            ],
        },
        overrides: [
            {
                description:
                    "Naming cases apply to source code only, not to files like pnpm-lock.yaml.",
                files: [`${root}/**`],
                rules: {
                    "conventions/directory-case": ["error", { case: "kebab" }],
                    "conventions/file-name-case": ["error", { case: ["camel", "pascal"] }],
                },
            },
            {
                description: "Named exports only, except in stories.",
                files: [`${root}/**`],
                ignore: ["**/*.stories.*"],
                rules: { "conventions/no-default-export": "error" },
            },
            {
                description: "Each file exports a value named after the file, such as UserService.",
                files: [
                    `${root}/**/{components,containers,contexts,controllers,hooks,mappers,repositories,services,stores,utils}/*`,
                ],
                ignore: ["**/*.stories.*"],
                rules: { "conventions/export-matches-filename": ["error", { transform: "none" }] },
            },
        ],
    });

    // lanelint only reads `extends` from the top-level config, so return the fragments in order.
    return [
        boundaries.configs.recommended,
        conventions.configs.recommended,
        astra({
            root: options.root,
            roles: options.roles,
        }),
        rules,
    ] as const;
};
