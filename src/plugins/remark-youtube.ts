import type { Node, Paragraph } from "mdast";
import type { RemarkPlugin } from "@astrojs/markdown-remark";
import { visit } from "unist-util-visit";

const PATTERN = /^https:\/\/www\.youtube\.com/;

export const remarkYouTube: RemarkPlugin = () => {

    return (tree) => {
        visit(tree, "paragraph", (node: Paragraph, _idx, parent: Node) => {
            if (parent.type !== 'root' || node.children.length !== 1 || node.children[0].type !== 'link') return;

            const content = String(node.children[0].url);
            if (PATTERN.test(content)) {
                const videoURL = new URL(content);
                const videoID = videoURL.searchParams.get('v');

                videoURL.searchParams.delete('v');

                // Convert node from a Paragraph type to an Html type (there's likely a better way than this)
                (node as any).type = 'html';
                (node as any).value = `<div class='youtube'><div class='loader'></div><iframe src="https://www.youtube.com/embed/${videoID}?${videoURL.searchParams.toString()}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen=""></iframe></div>`;
                delete node.children;
            }
        });
    };
};
