import { visit } from "unist-util-visit";
import type { RemarkPlugin } from "@astrojs/markdown-remark";
import type { ContainerDirective } from "mdast-util-directive";
import type { Image, Paragraph } from "mdast";

type Figure = {
	name: 'figure',
	type: 'containerDirective',
	data: { hName: 'figure' },
	children: [ Image, Paragraph ]
}

export const remarkFigure: RemarkPlugin = () => {

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
				node.data = { hName: 'figure' }; 
				node.children = [imageNode, { 
					type: 'paragraph', 
					data: { hName: 'figcaption' }, 
					children: childList.filter(n => n.type !== 'image')
				}];
			}
		});
	};
};
