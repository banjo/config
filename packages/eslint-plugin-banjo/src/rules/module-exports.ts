import { createEslintRule } from "../utils";

export const RULE_NAME = "module-exports";
export type MessageIds = "moduleExports";
export type Options = [];

export default createEslintRule<Options, MessageIds>({
    name: RULE_NAME,
    meta: {
        type: "problem",
        docs: {
            description: "Newline after if",
            recommended: "error",
        },
        fixable: "code",
        schema: [],
        messages: {
            moduleExports: "module.export should be module.exports",
        },
    },
    defaultOptions: [],

    create: context => ({
        AssignmentExpression: node => {
            if (node.left.type !== "MemberExpression") return;
            if (node.left.object.type !== "Identifier") return;
            if (node.left.property.type !== "Identifier") return;

            const isModule = node.left.object.name === "module";
            const propertyName = node.left.property.name;

            if (isModule && propertyName === "export") {
                context.report({
                    node,
                    loc: {
                        start: node.loc.end,
                        end: node.loc.start,
                    },
                    messageId: "moduleExports",
                    fix: fixer => {
                        if (node.left.type !== "MemberExpression") return null;
                        if (node.left.object.type !== "Identifier") return null;
                        if (node.left.property.type !== "Identifier") return null;

                        return fixer.replaceText(node.left.property, "exports");
                    },
                });
            }
        },
    }),
});
