import rss, { type RSSFeedItem } from '@astrojs/rss';
import type { MarkdownInstance, APIRoute } from "astro";
import type { PostMetadata } from "../types";

const MAX_ITEMS = 20;

export const GET: APIRoute = async (context) => {

    const allPosts = Object.values(import.meta.glob<MarkdownInstance<PostMetadata>>("./posts/**/*.md", { eager: true }));
    const feedPosts = allPosts
        .sort((a, b) => Date.parse(b.frontmatter.pubDate) - Date.parse(a.frontmatter.pubDate))
        .slice(0, MAX_ITEMS)
        .map<RSSFeedItem>(post => ({
            title: post.frontmatter.title,
            link: post.url,
            pubDate: new Date(post.frontmatter.pubDate),
            description: post.frontmatter.description
        }))
    ;

    return rss({
        title: 'Andrew Betts',
        description: 'Web technologies, travel, maker stuff',
        site: context.site,
        items: feedPosts
    });
}