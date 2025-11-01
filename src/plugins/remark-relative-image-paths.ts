import type { Image } from "mdast";
import type { RemarkPlugin } from "@astrojs/markdown-remark";
import { visit } from 'unist-util-visit';

const imageBase = 'assets/images/post-content';
const iconBase = 'assets/images/icons';
const postPathPattern = /\/([^\/]+)\.md/;

export const remarkRelativeImagePaths: RemarkPlugin = () => {
  return (tree, file) => {
    visit(tree, 'image', (node: Image) => {
      if (!node.url.includes('/')) {
        const postPathMatch = file.history[0].match(postPathPattern);
        if (!postPathMatch) return;
        const basePostName = postPathMatch[1];
        let imgPath = basePostName+'/'+node.url;
        if (node.url.startsWith('icons:')) {
          imgPath = "../../../"+iconBase+'/'+node.url.replace('icons:', '');
        }
        //console.log('image', basePostName, node.url, imgPath);
        node.url = imgPath;
      }
    });
  };
}