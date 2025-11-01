import getReadingTime from 'reading-time';
import type { ContentItem } from "../types";
import { getCollection, type CollectionEntry } from 'astro:content';

export const getPosts = async (): Promise<CollectionEntry<'posts'>[]> => {
  const allPosts = (await getCollection('posts')).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );

  // Include posts in lists only if published, not unlisted or draft (in non prod env, always include)
  const selectedPosts = allPosts.filter(p => import.meta.env.PROD ? !p.data.status || p.data.status === 'published' : true)
  return selectedPosts;
}

export const postToContentItem = (post: CollectionEntry<'posts'>): ContentItem => {
    const readingTime = getReadingTime(post.body);
    return {
      title: post.data.title,
      url: "/posts/" + post.slug,
      pubDate: post.data.pubDate,
      wordCount: readingTime.words,
      wordCountString: numberWithCommas(readingTime.words),
      readingTime: readingTime.text,
      description: post.data.description,
      tags: post.data.tags || [],
      isDraft:
        (post.data.status && post.data.status !== "published") ||
        false,
    }
}

const numberWithCommas = (x: number): string => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}