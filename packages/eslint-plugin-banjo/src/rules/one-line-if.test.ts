import { RuleTester } from "@typescript-eslint/utils/dist/ts-eslint";
import { it } from "vitest";
import rule, { RULE_NAME } from "./one-line-if";

const valids = [`if (true) return;`, `if (true) console.log("test");`];

const invalids = [
    ["if (true) { return }", "if (true) return"],
    ["if (true) { console.log('test') }", "if (true) console.log('test')"],
];

it("oneLineIf", () => {
    const ruleTester: RuleTester = new RuleTester({
        parser: require.resolve("@typescript-eslint/parser"),
    });

    ruleTester.run(RULE_NAME, rule, {
        valid: valids,
        invalid: invalids.map((i) => ({
            code: i[0],
            output: i[1],
            errors: [{ messageId: "oneLineIf" }],
        })),
    });
});

const validTooLongIfs = [
    `if ("verylongstringthatisverylongandabsolutelytolongtfefefaefaefefobeononeline") {\n\treturn\n}`,
];

const invalidTooLongIfs = [
    [
        `if ("verylongstringthatisverylongandabsolutelytolongtfefefaefaefefobeononeline") return`,
        `if ("verylongstringthatisverylongandabsolutelytolongtfefefaefaefefobeononeline") {\n\treturn\n}`,
    ],
];

it("tooLongIf", () => {
    const ruleTester: RuleTester = new RuleTester({
        parser: require.resolve("@typescript-eslint/parser"),
    });

    ruleTester.run(RULE_NAME, rule, {
        valid: validTooLongIfs,
        invalid: invalidTooLongIfs.map((i) => ({
            code: i[0],
            output: i[1],
            errors: [{ messageId: "tooLongIf" }],
        })),
    });
});
