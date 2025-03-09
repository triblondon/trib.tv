import type { MarkdownInstance } from "astro";
import type { ContentItem, PostMetadata } from "../types";

export const getPosts = () => {
    const allPosts = Object.values(import.meta.glob<MarkdownInstance<PostMetadata>>("../pages/posts/**/*.md", { eager: true }));
    allPosts.sort((a, b) => Date.parse(b.frontmatter.pubDate) - Date.parse(a.frontmatter.pubDate));

    // Include posts in lists only if published, not unlisted or draft (in non prod env, always include)
    const selectedPosts = allPosts.filter(p => import.meta.env.PROD ? !p.frontmatter.status || p.frontmatter.status === 'published' : true)
    return selectedPosts;
}

export const postsToContentList = (posts: MarkdownInstance<PostMetadata>[]): ContentItem[] => {
    return posts.map((post) => ({
        title: post.frontmatter.title,
        url: post.url,
        pubDate: post.frontmatter.pubDate,
        wordCount: post.frontmatter.readingTime.words,
        description: post.frontmatter.description,
        isDraft:
            (post.frontmatter.status && post.frontmatter.status !== "published") ||
            false,
    }));
    
}