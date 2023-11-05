# remark-remove

Remark plugin to output a string with all markdown formatting removed

Usage:

```js
import { unified } from "unified";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRemove from "remark-remove";

const transform = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .processSync("*Hello* world.");

// Should display "Hello world."
console.log(transform);
```
