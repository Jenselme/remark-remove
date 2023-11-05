import { expect, test, describe } from "vitest";
import remarkRemove from "../index";
import { unified } from "unified";
import remarkParse from "remark-parse";

describe("Remove markdown", () => {
  test("should remove markdown on empty root", () => {
    expect(unified().use(remarkParse).use(remarkRemove).processSync("").value).toEqual("");
  });

  test("should remove markdown no markdown", () => {
    expect(unified().use(remarkParse).use(remarkRemove).processSync("Hello world!").value).toEqual(
      "Hello world!",
    );
  });

  test("should remove markdown invalid markdown", () => {
    expect(unified().use(remarkParse).use(remarkRemove).processSync("Hello *world!").value).toEqual(
      "Hello *world!",
    );
  });

  test("should remove markdown basic markdown", () => {
    expect(
      unified().use(remarkParse).use(remarkRemove).processSync("Hello *world*!").value,
    ).toEqual("Hello world!");
  });

  test.each([
    "Hello *world*!\nI am _writing_ a test.",
    "Hello *world*!\n\nI am _writing_ a test.",
    "Hello *world*!\n\nI am `writing` a test.",
    "Hello *world*!<br>I am _writing_ a test.",
    `Hello *world*!

I am \`writing\` a test.`,
    `# Hello *world*!

I am \`writing\` a test.`,
  ])("should remove markdown from '''%s'''", (markdownString: string) => {
    expect(unified().use(remarkParse).use(remarkRemove).processSync(markdownString).value).toEqual(
      "Hello world!\nI am writing a test.",
    );
  });
});
