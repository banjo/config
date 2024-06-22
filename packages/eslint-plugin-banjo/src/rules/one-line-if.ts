import { createEslintRule } from "../utils";

export const RULE_NAME = "one-line-if";
export type MessageIds = "oneLineIf" | "tooLongIf" | "braces";
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
            braces: "If statement should have curly braces if else is present",
        },
    },
    defaultOptions: [],

    create: context => {
        const thresholdForExpression = 50;
        const sourceCode = context.getSourceCode();

        const shouldBeOneLine = ({
            consequent,
            hasCurlyBraces,
            oneLineIf,
            isSingleIf,
            hasParentIf,
        }) => {
            return (
                oneLineIf.length < thresholdForExpression &&
                hasCurlyBraces &&
                consequent.type === "BlockStatement" &&
                consequent.body.length === 1 &&
                isSingleIf &&
                !hasParentIf
            );
        };

        const shouldHaveCurlyBraces = ({ consequent, hasCurlyBraces, ifCode }) => {
            return (
                !hasCurlyBraces &&
                ifCode.length > thresholdForExpression &&
                consequent.type !== "BlockStatement"
            );
        };

        const possibleOneLineIf = ({ consequentCode, testCode }) => {
            const consequentWithoutBraces = consequentCode.slice(1, consequentCode.length - 1);

            return `if (${testCode}) ${consequentWithoutBraces.trim()}`;
        };

        return {
            IfStatement: node => {
                const consequent = node.consequent;
                const consequentCode = sourceCode.getText(consequent);
                const testCode = sourceCode.getText(node.test);
                const ifCode = sourceCode.getText(node);

                const isSingleIf = node.alternate === null;
                const hasParentIf = node?.parent?.type === "IfStatement";

                const hasCurlyBraces = (code: string) => code.startsWith("{") && code.endsWith("}");

                const oneLineIf = possibleOneLineIf({
                    consequentCode,
                    testCode,
                });

                if (
                    shouldBeOneLine({
                        consequent,
                        hasCurlyBraces: hasCurlyBraces(consequentCode),
                        oneLineIf,
                        isSingleIf,
                        hasParentIf,
                    })
                ) {
                    context.report({
                        node,
                        messageId: "oneLineIf",
                        fix: fixer => {
                            return fixer.replaceText(node, oneLineIf);
                        },
                    });
                    return;
                }

                const isOneLineIfWithElse = !isSingleIf && !hasCurlyBraces(consequentCode);

                if (
                    shouldHaveCurlyBraces({
                        consequent,
                        hasCurlyBraces: hasCurlyBraces(consequentCode),
                        ifCode,
                    }) ||
                    isOneLineIfWithElse
                ) {
                    let toReturn = `if (${testCode}) {\n\t${consequentCode}\n}`;

                    if (node.alternate) {
                        const alternateSourceCode = sourceCode.getText(node.alternate);

                        const isNotIf = node.alternate.type !== "IfStatement";
                        const hasCurly = hasCurlyBraces(alternateSourceCode);

                        if (isNotIf && !hasCurly) {
                            toReturn += ` else {\n\t${alternateSourceCode}\n}`;
                        } else {
                            toReturn += ` else ${alternateSourceCode}`;
                        }
                    }

                    context.report({
                        node,
                        messageId: isSingleIf ? "tooLongIf" : "braces",
                        fix: fixer => {
                            return fixer.replaceText(node, toReturn);
                        },
                    });
                }
            },
        };
    },
});
