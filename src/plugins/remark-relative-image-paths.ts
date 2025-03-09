import type { Image } from "mdast";
import type { RemarkPlugin } from "@astrojs/markdown-remark";
import { visit } from 'unist-util-visit';

const imageBase = 'assets/images/post-content';
const iconBase = 'assets/images/icons';
const postPathPattern = /^.*?\/src\/(pages\/posts(?:\/.+))\/([^\/]+)\.md/;

export const remarkRelativeImagePaths: RemarkPlugin = () => {
  return (tree, file) => {
    visit(tree, 'image', (node: Image) => {
      if (!node.url.includes('/')) {
        const postPathMatch = file.history[0].match(postPathPattern);
        if (!postPathMatch) return;
        const postPath = postPathMatch[1];
        const basePostName = postPathMatch[2];
        const pathSegCount = postPath.split('/').length;
        let imgPath = "../".repeat(pathSegCount)+imageBase+'/'+basePostName+'/'+node.url;
        if (node.url.startsWith('icons:')) {
          imgPath = "../".repeat(pathSegCount)+iconBase+'/'+node.url.replace('icons:', '');
        }
        //console.log('image', postPath, basePostName, node.url, imgPath);
        node.url = imgPath;
      }
    });
  };
}