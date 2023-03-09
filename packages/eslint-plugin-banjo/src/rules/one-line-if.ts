import { createEslintRule } from "../utils";

export const RULE_NAME = "one-line-if";
export type MessageIds = "oneLineIf" | "tooLongIf";
export type Options = [];

export default createEslintRule<Options, MessageIds>({
    name: RULE_NAME,
    meta: {
        type: "suggestion",
        docs: {
            description: "Newline after if",
            recommended: "error",
        },
        fixable: "code",
        schema: [],
        messages: {
            oneLineIf: "Short if statements should be on one line",
            tooLongIf: "If statement is too long to be on one line",
        },
    },
    defaultOptions: [],

    create: (context) => {
        const thresholdForExpression = 70;
        const sourceCode = context.getSourceCode();

        const shouldBeOneLine = ({ consequent, hasCurlyBraces, oneLineIf }) => {
            return (
                oneLineIf.length < thresholdForExpression &&
                hasCurlyBraces &&
                consequent.type === "BlockStatement" &&
                consequent.body.length === 1
            );
        };

        const shouldHaveCurlyBraces = ({
            consequent,
            hasCurlyBraces,
            ifCode,
        }) => {
            return (
                !hasCurlyBraces &&
                ifCode.length > thresholdForExpression &&
                consequent.type !== "BlockStatement"
            );
        };

        const possibleOneLineIf = ({ consequentCode, testCode }) => {
            const consequentWithoutBraces = consequentCode.slice(
                1,
                consequentCode.length - 1
            );

            return `if (${testCode}) ${consequentWithoutBraces.trim()}`;
        };

        return {
            IfStatement: (node) => {
                const consequent = node.consequent;
                const consequentCode = sourceCode.getText(consequent);
                const testCode = sourceCode.getText(node.test);
                const ifCode = sourceCode.getText(node);

                const hasCurlyBraces =
                    consequentCode.startsWith("{") &&
                    consequentCode.endsWith("}");

                const oneLineIf = possibleOneLineIf({
                    consequentCode,
                    testCode,
                });

                if (
                    shouldBeOneLine({
                        consequent,
                        hasCurlyBraces,
                        oneLineIf,
                    })
                ) {
                    context.report({
                        node,
                        messageId: "oneLineIf",
                        fix: (fixer) => {
                            return fixer.replaceText(node, oneLineIf);
                        },
                    });
                    return;
                }

                if (
                    shouldHaveCurlyBraces({
                        consequent,
                        hasCurlyBraces,
                        ifCode,
                    })
                ) {
                    const toReturn = `if (${testCode}) {\n\t${consequentCode}\n}`;
                    context.report({
                        node,
                        messageId: "tooLongIf",
                        fix: (fixer) => {
                            return fixer.replaceText(node, toReturn);
                        },
                    });
                }
            },
        };
    },
});
