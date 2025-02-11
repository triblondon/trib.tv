---
layout: ../../../../layouts/PostLayout.astro
title: "The best of Google I/O 2016"
pubDate: 2016-07-15
description: Serviceworker step by step, CSS containment, credentials and payment APIs, animation techniques, devtools improvements… Google I/O dropped so much web content this year I took a full month to catch up with even a fraction of it. If anything this shows just how fast the web is flying today. I put together some highlights.
author: Andrew Betts
tags: ["CSS", "Google", "PWA", "ServiceWorker", "Web"]
---

It’s been a crazy few years for web development, with browsers offering more and more low level APIs for library authors to play with, we have better tools and more flexibility than any other platform, hands down. I’ve been catching up on content from Google I/O, PWA summit, and the HTTP 203 podcast, and have clipped all the video and audio to exactly the highlighted sections. Enjoy.

### CSS containment: one step closer to element queries?

Wilson Page (now Mozilla, formerly my colleague at FT) [started talking about layout boundaries](http://wilsonpage.co.uk/introducing-layout-boundaries/) three years ago, and changed the way I think about CSS. Understanding how much of a page needs to be repainted when you make a layout change and then ensuring that only that part is actually updated was something of an art form. Well, wonder no more – thanks to the [CSS containment](https://drafts.csswg.org/css-containment/) spec, we have `contain:`, which can granularly control how much isolation to apply to an element. `contain: strict` gives you something akin to an iframe but within your main HTML document and without the overhead of a separate browser context.

So if you have elements that have a predictable size, they’re about to get more efficient layout. Here’s [Paul and Jake in HTTP 203](https://developers.google.com/web/shows/http203/podcast/http-203-springy-css-storage-and-bisecting?hl=en):

<audio class="embedded-audio" src="https://storage.googleapis.com/http-203-podcast/epsiode-5.mp3#t=23:14,31:35" controls="" style="width:100%" preload="metadata"></audio>

Even newer and draft-ier, [ResizeObserver](https://github.com/WICG/ResizeObserver/blob/master/explainer.md) is pointing towards how we might handle resizing elements efficiently when they do need to change size. This is an early draft being incubated in the [Web Incubator Community Group](https://wicg.io/) (a great place to track ideas that might come to the web platform), and as a JavaScript API without a polyfill you can’t use it today. But the great thing about CSS contain is I can stick it on stuff today and it’ll just be ignored in browsers that don’t understand it.

### Security UX

Developers in large organisations continue to be laughably terrible at implementing good password best practice. Maybe we don’t understand it. Maybe we just blindly follow the requirements written by the CEO. Who knows.

> .[@SAP](https://twitter.com/SAP) Possibly the world's worst password security policy ever, this is laughably bad! Case-insensitive?! [#infosec](https://twitter.com/hashtag/infosec?src=hash) [pic.twitter.com/XhFNbxAD9T](https://t.co/XhFNbxAD9T)
> 
> — Ted Sales (@Tedworthy\_) [July 8, 2016](https://twitter.com/Tedworthy_/status/751365313149726720)

Web standards are providing increasingly visible solutions to these problems, and the simplest ones are some of the most effective.

Add [autocomplete attributes](https://developer.mozilla.org/en/docs/Web/HTML/Element/input#attr-autocomplete) to your `input` elements to make password managers like 1Password and LastPass work smoothly and reliably as well as making it possible for the browser itself to suggest a strong password. This is not a new thing but mostly people still don’t do it ([including us](https://accounts.ft.com/login) – bug filed!). It’s so easy this should be a no-brainer for everyone.

https://www.youtube.com/watch?v=MnvUlGFb3GQ

Going further, the [Credential management API](https://w3c.github.io/webappsec-credential-management/#introduction-examples) (Chrome 51+) adds a way for sites to largely do away with sign in forms altogether and allow the site to negotiate directly with the browser for credentials. That seems to cut out the option of using third party password managers so I’m not sure I would do this. \[[Jump to credential API section of talk](https://www.youtube.com/embed/MnvUlGFb3GQ?start=819&end=1510&autoplay=true)\]

Finally, the talk goes on to show that sites which require two multi-factor authentication can even integrate with hardware tokens like [YubiKey](https://www.yubico.com/products/yubikey-hardware/) which is accessible to Chrome via the [MessagePort API](https://developer.mozilla.org/en-US/docs/Web/API/MessagePort).

### ServiceWorker step by step

I’m a big fan of [ServiceWorker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API), and played a small part in the early stages, but lately I feel lost a lot of the time, mostly because it’s one of the great new examples of a web technology that embraces providing low level access to the platform, and it often seems like there isn’t a problem you can’t solve with ServiceWorker. Needless to say, the [hype around this particular feature is insane](https://www.youtube.com/watch?v=QiXLaisCq10).

https://www.youtube.com/watch?v=cmGr0RszHc8

Jake Archibald’s talk, predictably one of the best of I/O, walks through adding a ServiceWorker in small steps to a chat app. This packs in a lot of ServiceWorker recipes (click to jump to that section of the talk):

*   [Adding a custom ‘offline’ error page](https://www.youtube.com/embed/cmGr0RszHc8?start=778&end=980&autoplay=true)
*   [Storing ‘app shell’ offline to speed up render and deal with lie-fi](https://www.youtube.com/embed/cmGr0RszHc8?start=1474&end=1892&autoplay=true)
*   [Storing data offline to allow the chat messages to render offline](https://www.youtube.com/embed/cmGr0RszHc8?start=1916&end=2159&autoplay=true)
*   [Stale while revalidate for avatars](https://www.youtube.com/embed/cmGr0RszHc8?start=2170&end=2349&autoplay=true)
*   [Async data submission with background sync](https://www.youtube.com/embed/cmGr0RszHc8?start=2367&end=2520&autoplay=true)

I wish Google would focus as much attention on ‘normal’ sites that perform navigations as they do on so called ‘app-shell’ (which is just a new name for single-page apps, as far as I can tell), but then many people will be building SPAs and these recipes will make those apps fly. In news publishing we seem to flip flop between traditional page navigations and SPAs, but I’ve never found a SPA news site (or a native app) that I really like more than a normal website. Maybe a really good progressive web app will change that. But I’m not convinced.

Jake did address the SPA point in his next iteration of the talk at PWA summit, focusing on a solution using **streams**:

https://www.youtube.com/watch?v=qDJAz3IIq18

I like streams, but I’m not totally convinced about doing what amounts to templating in a serviceworker. For the moment I’m trying to keep it simple by having my server create _pages_ and then have the browser load them. Dunno, call me old fashioned, but if you do that, it streams perfectly well and has done for a decade.

All this really just underscores how flexible ServiceWorker is and that with it we can disagree on what the right solution is, but we can all get what we want anyway.

### Animation techniques

Material design is full of cool animated UI which helps to maintain context through interactions, and what I love about Paul Lewis’s talk is that there is no smoke and mirrors – he presents all the code needed to make his effects work. This talk covers three common widgets: a collapsible [side nav](https://material.google.com/layout/structure.html#structure-side-nav), a [dismissible card](https://material.google.com/components/cards.html#cards-behavior), and an [expanding view](https://material.google.com/motion/choreography.html#). Paul packs so much into his talks that it’s worth watching pretty much the whole of this, but I’ll trim out his intro because I’m brutally impatient.

https://www.youtube.com/watch?v=thNyy5eYfbc

Bonus points for use of the term ‘Colinkidink’.

### Devtools upgrades

A zippy talk about devtools upgrades gave us a slew of new features, and my highlight covers two of them. The **colour picker** will now offer a palette that is sampled from your page’s colour scheme, and even follows colour variables; The **animation editor** finally offers a Flash-style timeline of transition effects that’s even editable, so you can build animations visually!

https://www.youtube.com/watch?v=x8u0n4dT-WI

### RequestIdleCallback and passive event listeners

A pair of seemingly unrelated features came up in Chris Wilson’s talk and I like them both for the same reason: helping to deliver a smooth UI. The new [RequestIdleCallback API](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback) allows work to be scheduled for an idle time, of the device’s choice, though as I understand it, the work usually still gets done pretty quickly, almost always within a second.

**Passive event listeners** change the syntax of addEventListener so that [the third argument is now an options object](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Parameters) rather than a boolean that no-one can ever remember. The options object provides a `passive:true` option that runs the event handler asynchronously while the event action goes ahead. Normally the default action associated with an event trigger has to wait for the event handler to finish, just in case you decide to call `preventDefault`. Setting passive mode opts out of the ability to do that. The most obvious area to benefit from this is scroll handlers, where using an explicitly passive handler will avoid the device having to use complex heuristics to figure out whether the scroll can be accelerated or not.

Here’s Chris Wilson on those two features:

https://www.youtube.com/watch?v=bK6Ah68jEX8

Chris also wins the award for sheer quantity of topics stuffed into one talk.

### PaymentRequest API

I’m very excited about [PaymentRequest](https://www.w3.org/TR/payment-request/). I did the [TAG spec review](https://github.com/w3ctag/spec-reviews/issues/109#issuecomment-204992438) on it, and at the FT the idea of seamlessly setting up a recurring subscription payment on the web is very near and dear to our hearts. This talk included a walkthough of how PaymentRequest would work:

https://www.youtube.com/watch?v=yelPlCVZLEE

### Preload hints and HTTP/2 push

One of the best recent developments in web performance is the ability to push subresources to the browser early, before the parser knows it needs them. For a while now we’ve had [Resource Hints](https://www.w3.org/TR/resource-hints/), which added the `dns-prefetch`, `preconnect`, `prefetch` and `prerender` relationships to the HTML `<link>` element.

Now we have [Preload](https://www.w3.org/TR/preload/) as well, which allows subresources to be declared and loaded early in the HTML source or even (my preferred option) in the HTTP response headers. An HTTP response header variant would look like:

```http
Link: <https://example.com/other/styles.css>; rel=preload; as=style
```

A trick I came up with recently using preload HTTP headers is to tell a serviceworker what subresources to cache without having to write all your sub-resource paths into the service worker source.

And this in theory gets even better with HTTP/2.0 push. But CDNs are still slowly adding support for H2 and I’m yet to figure out how to use server push effectively if you utilise Edge caching in your architecture, as most news media sites do, though it seems like [preload will be an important enabler for that](https://blog.cloudflare.com/announcing-support-for-http-2-server-push-2/). So for the moment, I’m a convert to the preload feature. Here’s Jake and Paul talking about where those pushed and preloaded resources get stored – because bewilderingly it’s not any of the multitude of caches that browsers already have… introducing the _“limbo cache”_:

<audio class="embedded-audio" src="https://storage.googleapis.com/http-203-podcast/epsiode-5.mp3#t=08:40,13:54" controls="" style="width:100%" preload="metadata"></audio>

### IntersectionObserver

There wasn’t a lot of Google I/O content on IntersectionObserver, which surprised me because it’s very much a Google project, and is huge news for people who build large pages with lots of content below the fold (news sites with advertising, check). In fact, publishers are required to measure how long ads spend in the visible viewport, because we can only charge for ads that are seen. Until now, that has required monumental hacks, and has been one of the few genuine reasons why we might still justify the use of Flash.

IntersectionObserver offers a beautifully simple API for trivially receiving events when an element moves in or out of the visible viewport. So expect to see a lot more lazy loading of below the fold content, and better tracking of scroll depth, among many other superb uses of this feature.

I love it so much that I recently shepherded Google’s polyfill for it into my [polyfill.io service](https://cdn.polyfill.io), so you can use IntersectionObserver today in any browser from literally IE7 onwards, thanks to the amazing coding skills of Philip Walton.

https://www.youtube.com/watch?v=bK6Ah68jEX8

### Conclusion

Oh my. Try and get your head around all that. On the one hand, the web now has so many APIs that it’s hard for one person to ever even be aware of all of them. But on the other hand, they’re increasingly offering more bang for your neurons, because they make a lot more sense and are more mature and simpler than our previous hacks and best practices. Pick the bits of the platform you need, and you can learn some powerful tools very quickly.
