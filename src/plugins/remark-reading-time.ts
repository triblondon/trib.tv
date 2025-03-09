import getReadingTime from 'reading-time';
import { toString } from 'mdast-util-to-string';
import type { ReadTimeResultsExt } from '../types';

const numberWithCommas = (x: number): string => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const remarkReadingTime = () => {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);

    // Add comma separated version of the word count
    const extReadingTime: ReadTimeResultsExt = { ...readingTime, wordsFormatted: numberWithCommas(readingTime.words) };

    data.astro.frontmatter.readingTime = extReadingTime;
  };
}