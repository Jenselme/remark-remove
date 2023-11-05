import type { Literal, Parent, Root, RootContent, RootContentMap } from "mdast";
import type { VFile } from "vfile";

type Options = {} | null | undefined;

const typeToSurroundWithBlankLines: Array<keyof RootContentMap> = [
  "blockquote",
  "code",
  "heading",
  "list",
  "table",
  "paragraph",
];

export default function remarkRemove(options?: Options) {
  const self = this;

  self.compiler = compiler;

  const compileChildren = (node: Parent): string => {
    let nodeText = node.children.map(compileChild).reduce((acc, text) => acc + text, "");
    if (typeToSurroundWithBlankLines.includes(node.type as keyof RootContentMap)) {
      nodeText = `\n${nodeText}\n`;
    }

    return nodeText;
  };

  const compileChild = (child: RootContent): string => {
    if ((child as Parent).children !== undefined) {
      return compileChildren(child as Parent);
    } else if (child.type === "html" && (child as Literal).value === "<br>") {
      return "\n";
    }

    return (child as Literal).value ?? "";
  };

  function compiler(root: Root, file: VFile): string {
    return compileChildren(root).replace(/\n+/gm, "\n").trim();
  }
}
