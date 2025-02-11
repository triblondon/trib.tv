/// <reference types="mdast-util-directive" />

import { visit } from "unist-util-visit";

const PATTERN = /^https:\/\/www\.youtube\.com/;

export const remarkYouTube = () => {

    return (tree) => {
        visit(tree, "paragraph", (node) => {
            if (node.children.length !== 1 || node.children[0].type !== 'text') return;

            const content = node.children[0].value;
            const matches = content.match(PATTERN);
            const videoID = matches[1];

            if (matches) {
                node.type = 'html';
                node.value = `<iframe class="youtube" src="https://www.youtube.com/embed/${videoID}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen=""></iframe>`;
                delete node.children;
            }
        });
    };
};
