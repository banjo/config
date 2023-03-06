import { RuleTester } from "@typescript-eslint/utils/dist/ts-eslint";
import { it } from "vitest";
import rule, { RULE_NAME } from "./module-exports";

const valids = [`module.exports = {}`];

const invalids = [["module.export = {}", "module.exports = {}"]];

it("runs", () => {
    const ruleTester: RuleTester = new RuleTester({
        parser: require.resolve("@typescript-eslint/parser"),
    });

    ruleTester.run(RULE_NAME, rule, {
        valid: valids,
        invalid: invalids.map((i) => ({
            code: i[0],
            output: i[1],
            errors: [{ messageId: "moduleExports" }],
        })),
    });
});
