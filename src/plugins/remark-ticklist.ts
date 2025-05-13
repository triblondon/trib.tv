import type { ListItem } from "mdast";
import type { RemarkPlugin } from "@astrojs/markdown-remark";
import { visit } from "unist-util-visit";
import { u } from "unist-builder";

export const remarkTickList: RemarkPlugin = () => {
  return (tree) => {
    visit(tree, "listItem", (node: ListItem, idx, parent) => {
      if (typeof node.checked !== "boolean") return;

      const tickbox = u("html", `<span class='tickbox ${node.checked ? 'checked' : ''}'></span>`);

      // Prepend the tickbox to the existing children
      node.children.unshift(tickbox);

      // Remove the `checked` property so the renderer doesn't add a checkbox
      delete node.checked;

      parent.data = { hProperties: { class: "tickbox-list" } };
    });
  };
};
