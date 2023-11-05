import type { Literal, Parent, Root, RootContent } from "mdast";
import type { VFile } from "vfile";

type Options = {} | null | undefined;

export default function remarkRemove(options?: Options) {
  const self = this;

  self.compiler = compiler;

  const compileChildren = (children: RootContent[]): string => {
    return children.map(compileChild).reduce((acc, text) => acc + text, "");
  };

  const compileChild = (child: RootContent): string => {
    return (child as Parent).children !== undefined
      ? compileChildren((child as Parent).children)
      : (child as Literal).value ?? "";
  };

  function compiler(root: Root, file: VFile): string {
    return compileChildren(root.children);
  }
}
