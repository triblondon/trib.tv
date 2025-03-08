/// <reference types="mdast-util-directive" />

import { visit } from "unist-util-visit";

const PREFIXES_PATTERN = /^(WARNING|INFO):$/;

export const remarkAside = () => {

    return (tree) => {
        visit(tree, "blockquote", (node, _idx, parent) => {
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
                strongNode.type = "image";
                strongNode.url = "icons:" + asideType + ".svg";
                strongNode.data = { hProperties: { className: 'icon' } };
                delete strongNode.value;
            }
        });
    };
};
