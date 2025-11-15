import { visit } from "unist-util-visit";
import type { RemarkPlugin } from "@astrojs/markdown-remark";
import type { Blockquote, Image } from "mdast";

const PREFIXES_PATTERN = /^(WARNING|INFO|HINT):$/;

export const remarkAside: RemarkPlugin = () => {

    return (tree) => {
        visit(tree, "blockquote", (node: Blockquote) => {
            if (node.children.length === 0 || node.children[0].type !== 'paragraph') return;
            const paraNode = node.children[0];
            if (paraNode.children.length === 0 || paraNode.children[0].type !== 'strong') return;
            const strongNode = paraNode.children[0];
            if (strongNode.children.length === 0 || strongNode.children[0].type !== 'text') return;
            const textNode = strongNode.children[0];
            
            if (PREFIXES_PATTERN.test(textNode.value)) {
                const asideType = textNode.value.toLowerCase().replace(':', '');
                const className = 'aside-' + asideType;
				node.data = { hName: 'aside', hProperties: { className } };
                const iconImageNode: Image = { type: 'image', url: "icons:" + asideType + ".svg", data: { hProperties: { class: 'icon', alt: '' } } };
                paraNode.children[0] = iconImageNode; // Replace the strong node with the image node
            }
        });
    };
};
