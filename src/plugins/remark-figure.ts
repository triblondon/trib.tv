/// <reference types="mdast-util-directive" />

import { visit } from "unist-util-visit";

export const remarkFigure = () => {

	return (tree) => {
		visit(tree, "containerDirective", (node) => {
			if (node.name !== "figure") return;
			if (node.children.length === 0) return;

			// Unwrap a nested paragraph element by appending its children directly to the root (figure) node
			if (node.children.length === 1 && node.children[0].type === 'paragraph') {
				node.children = node.children[0].children;
			}

			let captionNode = { type: 'paragraph', data: { hName: 'figcaption' }, children: []};

			// Rewrite the children of the figure to have exactly two - the image and the caption
			// Image is the first image element, Caption is all other elements collected into a paragraph wrapper
			const figChildren = node.children.reduce((acc, thisChild) => {
				if (acc.length === 0 && thisChild.type === 'image') {
					acc = [ thisChild, captionNode ];
				} else if (acc.length === 2) {
					acc[1].children.push(thisChild);
				}
				return acc;
			}, []);
	  		
			if (figChildren) {
				node.data = { hName: 'figure' };
				node.children = figChildren;
			}
		});
	};
};
