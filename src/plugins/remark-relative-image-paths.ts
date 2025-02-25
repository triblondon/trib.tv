import { visit } from 'unist-util-visit';

const imageBase = 'assets/images/post-content';
const postPathPattern = /^.*?\/src\/(pages\/posts(?:\/.+))\/([^\/]+)\.md/;

export const remarkRelativeImagePaths = () => {
  return (tree, file) => {
    visit(tree, 'image', (node) => {
      if (!node.url.includes('/')) {
        const postPathMatch = file.history[0].match(postPathPattern);
        if (!postPathMatch) return;
        const postPath = postPathMatch[1];
        const basePostName = postPathMatch[2];
        const pathSegCount = postPath.split('/').length;
        const imgPath = "../".repeat(pathSegCount)+imageBase+'/'+basePostName+'/'+node.url;
        //console.log('image', postPath, basePostName, node.url, imgPath);
        node.url = imgPath;
      }
    });
  };
}