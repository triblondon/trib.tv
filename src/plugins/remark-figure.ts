import { visit } from "unist-util-visit";
import type { RemarkPlugin } from "@astrojs/markdown-remark";
import type { ContainerDirective } from "mdast-util-directive";
import type { Node, Image, Paragraph } from "mdast";

type Figure = {
	name: 'figure',
	type: 'containerDirective',
	data: { hName: 'figure' },
	children: [ Image, Paragraph? ]
}

const CAPTION_PREFIX = 'Caption: ';

export const remarkFigureFromContainerDirective: RemarkPlugin = () => {

	return (tree) => {
		visit(tree, "containerDirective", (node: ContainerDirective | Figure) => {
			if (node.name !== "figure") return;
			if (node.children.length === 0 || node.children[0].type !== 'paragraph') return;

			// Unwrap a nested paragraph element
			const paraNode = node.children[0];
			const childList = paraNode.children;

			// Rewrite the children of the figure to have exactly two - the image and the caption
			const imageNode = childList.find(n => n.type === 'image');
			if (imageNode) {
				node.data = { hName: 'figure', hProperties: { className: 'with-caption' } }; 
				node.children = [imageNode, { 
					type: 'paragraph', 
					data: { hName: 'figcaption' }, 
					children: childList.filter(n => n.type !== 'image')
				}];
			}
		});
	};
};

export const remarkFigureFromParagraph: RemarkPlugin = () => {

	return (tree) => {
		visit(tree, "paragraph", (node: Paragraph | Figure, _idx, parent: Node) => {
			if (parent.type !== 'root' || node.children.length !== 1 || node.children[0].type !== 'image') return;
			const imageNode = node.children[0];
			const caption = imageNode.alt.startsWith(CAPTION_PREFIX) ? imageNode.alt.replace(CAPTION_PREFIX, '') : null;
			node.data = { hName: 'figure', hProperties: { className: caption ? "with-caption" : "" } }; 
			node.children = [imageNode];
			if (caption) {
				node.children[1] = {
					type: 'paragraph', 
					data: { hName: 'figcaption' }, 
					children: [ { type: 'text', value: caption } ]
				};
			}
		});
	};
};
