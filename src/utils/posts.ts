import type { MarkdownInstance } from "astro";
import type { PostMetadata } from "../types";

export const getPosts = () => {
    const allPosts = Object.values(import.meta.glob<MarkdownInstance<PostMetadata>>("../pages/posts/**/*.md", { eager: true }));
    allPosts.sort((a, b) => Date.parse(b.frontmatter.pubDate) - Date.parse(a.frontmatter.pubDate));
    const selectedPosts = allPosts.filter(p => import.meta.env.PROD ? p.frontmatter.status === 'published' : true)
    return selectedPosts;
}