import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [
    eslintPluginPrettierRecommended,
    {
        rules: {
            "max-len": "off",
        },
    },
];
