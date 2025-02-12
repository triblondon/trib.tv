/// <reference types="mdast-util-directive" />

import { visit } from "unist-util-visit";

const PATTERN = /^https:\/\/www\.youtube\.com/;

export const remarkYouTube = () => {

    return (tree) => {
        visit(tree, "paragraph", (node, _idx, parent) => {
            if (parent.type !== 'root' || node.children.length !== 1 || node.children[0].type !== 'link') return;

            const content = String(node.children[0].url);
            if (PATTERN.test(content)) {
                const videoURL = new URL(content);
                const videoID = videoURL.searchParams.get('v');

                videoURL.searchParams.delete('v');

                node.type = 'html';
                node.value = `<iframe class="youtube" src="https://www.youtube.com/embed/${videoID}?${videoURL.searchParams.toString()}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen=""></iframe>`;
                delete node.children;
            }
        });
    };
};
