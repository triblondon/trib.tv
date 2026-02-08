---
title: "High DPI 'Retina' images in Astro"
pubDate: 2025-04-20
description: TODO
author: Andrew Betts
tags: ["Web", "Astro"]
status: draft
---

### High DPI / "Retina" images

Astro's responsive image capabilities are cool but they have some rough edges.  For example, if I take a small screenshot on my Macbook of a fragment of my screen, save it as a PNG and then include it in my article, it renders at twice the size I expect it to.  This probably looks weirdly big to you:

![VS code UI screenshot](vscode-screenshot.2x.png)

That's because my laptop screen uses **double density pixels**, so if I capture a 500x500 screenshot, my Mac will save a 1000x1000 image.  By the time Astro opens it to optimise it, it just sees it as a 1000x1000 image and doesn't know to display it at 500x500.

*It could, though*.  The images saved by Apple's screenshot function are PNGs that include a resolution in DPI.  You can read it with `exiftool`:

```shell
❯ exiftool -json -XResolution image.png 
[{
  "SourceFile": "image.png",
  "XResolution": 144
}]
```

Here, the output of 144 is telling - standard pixel density is considered to be 72 DPI, so 144 is doubled.  Let's try a regular non screenshot PNG like the photo at the top of this article:

```shell
❯ exiftool -json -XResolution IMG_8760.png     
[{
  "SourceFile": "IMG_8760.png",
  "XResolution": 72
}]
```

Lovely. So it SHOULD be possible for Astro to understand the pixel density of my images and use that to tune the `sizes`, `width` and `height` properties accordingly.  At time of writing [there's talk of doing stuff like this](https://github.com/withastro/roadmap/discussions/597) but nothing has shipped in Astro.

I tried all kinds of ideas to fix this:

- could I make [my own image component](https://docs.astro.build/en/recipes/build-custom-img-component/)? Yes but there's no way to get it to be used when Astro processes markdown files.
- could I change to [MDX](https://docs.astro.build/en/guides/integrations-guide/mdx/) or [Markdoc](https://docs.astro.build/en/guides/integrations-guide/markdoc/)?  Yes but I'd need to update all my syntax and write `import` statements in all my articles?  Bleurgh.
- could I write a [rehype](https://docs.astro.build/en/guides/markdown-content/#adding-remark-and-rehype-plugins) plugin like [`astro-rehype-img2pic`](https://github.com/Nakanishi123/astro-rehype-img2pic) does, to write the image tags myself?  Yes but since `astro:assets` is not importable outside of an Astro component, the [`getImage`](https://docs.astro.build/en/reference/modules/astro-assets/#getimage) API is not accessible, so you'd have to replace the entire image pipeline (which is in fact what [`astro-rehype-img2pic`](https://github.com/Nakanishi123/astro-rehype-img2pic) does).  That does seem a BIT excessive.
- could I post-process the output from Astro using a [Vite plugin](https://destiner.io/blog/post/using-vite-plugins-in-astro/)?  Not really, Vite's `transformIndexHtml` hook doesn't get called for Markdown pages in Astro.
- could I post-process the output with a custom Astro integration?  Yes, that both feels like a duct-tape solution and is explictly advised against by Astro's documentation.

Well I have a reputation to maintain so let's do it.


### Zoom / download different source?

OK I'm nearly done, but I'm still bothered by one more thing.  Most browsers offer the option to download or save images to your computer, or view them in a new window or tab.

![Context menu shows Open image in new tab as an option when right-clicking images on my website](image-save-as.2x.png)

When you do this, literally no one wants a WebP or AVIF image, and no-one wants an image that's lower resolution than the best available.  But a browser will typically give you whatver image file has been used to render the *displayed* image.

That kinda sucks, because if someone is on their phone and saves an image they see on my website to their photos app, they are probably not getting the highest available resolution.  Naff.  Also, as nice as webP and AVIF are, these file formats are nowhere near as interoperable as PNG and JPEG.  The browser really ought to do this better when you choose to save an image from the web.

Meanwhile, though, I figured, let's provide a solution.