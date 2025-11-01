---
title: "Progressively less progressive"
pubDate: 2016-06-05
description: At Google I/O the Washington Post launched a new so-called Progressive Web App. It can be hard to see how the word ‘progressive’ can be justified by some of the many things that now lay claim to that term.
author: Andrew Betts
tags: ["WaPO", "Google", "PWA", "ServiceWorker", "Web"]
---

WaPo's new [Progressive Web App](https://pwa.washingtonpost.com/) helps to demonstrate that the “Progressive Web Apps” strategy is spreading and successfully competing with native apps on their turf. 

The new app is impressive, in the right context. That context being specifically an Android phone. Meanwhile the Washington Post (or “WaPo” for short) continues to serve a large and relatively slow responsive website, and native apps for iOS and Android. If I try to use the new app on my desktop browser, I’m told to use a phone.

![WaPo PWA mobile-only](wapo.png)

It also requires JavaScript to render, doesn’t have any ‘real’ URLs, and doesn’t appear to include either advertising or a paywall. So, the new WaPo “progressive” web app works in fewer browsers and on fewer platforms than their non progressive web app, and gains perf advantages by casting aside the features that are required to make it financially viable. So, um. What does progressive mean again?

> **progressive**  
> (adjective) happening or developing gradually or in stages.

That definition does not appear to describe the WaPo app. And while I’m singling out the Post’s app here there are many other examples of sites claiming the PWA mantle which are essentially mobile-only.

### But it’s so fast!

Disregarding the fact that we have a terminology problem, news industry people are super impressed with these new PWAs. Why can’t we have this, they ask. We should start building a progressive web app as well, they say.

We are. At the FT we’ve been doing it for over a year. The very point of the web is to provide an architecture-independent platform for publishing and consuming content, on any device with a web browser, and that’s hard to do well, especially for a really big site like FT.com. As the number of devices-with-a-web-browser has increased, so the task of creating well-formatted web pages has become harder. In the early days, publishers created separate versions of their pages for mobile (so called ‘m-dot sites’) to solve this problem. But that has its own challenges, and through slow and diligent work, publishers upped their game and generally now have good responsive solutions. We are back to **one web**, or at least, we’re getting there.

More features arrive regularly to make this “one web” even better and easier to maintain. Service worker, streams, app manifests, payment request, to name a few. But adding these features one at a time to large, mature applications like WaPo or FT or Nikkei is a slow and painstaking process. That’s why it’s taking us a long time for us to tick off all these new features, and why it seems like madness to try and build the entire app several times over.

However, by creating the concept of PWAs and marketing them as they do, Google is encouraging publishers to ‘start again’. And they’re doing exactly the same thing with [AMP](https://www.ampproject.org/).

I like a lot about AMP, but it’s the polar opposite of progressive. I love the [amp-img](https://github.com/ampproject/amphtml/blob/master/builtins/amp-img.md) component, which lazy loads images as they approach the viewport and ensures that images don’t cause reflows when they pop in. That’s fantastic. But I can’t use this as part of my site, like a normal custom element, unless I adopt the whole AMP runtime, which prevents me writing any JavaScript at all. I feel like I’m building a Lego model and really need a specific type of brick to make it perfect, and someone designed exactly that brick, but they’ll only let me use it if I rebuild the whole model using only the bricks they’ve approved.

This is native app thinking applied to web development. And it’s absolutely not progressive.

### “Installable” web apps

The only proprietary behaviour in “progressive web apps”, once you strip out all the standard technologies which stand alone, is an **app install prompt**, which is activated if you meet certain criteria: secure connection, manifest, service worker, and a heuristic for user engagement. I’ve [previously described this as a ‘bag of carrots’](https://trib.tv/2015/10/11/progressive-apps/) (though it might have been better to say it’s multiple hoops to jump through to get one juicy carrot; I’m not good at headlines). I think it’s far more helpful to focus on this install prompt, because most mature sites could meet these criteria quite easily, and it’s a nice carrot.

What does it even mean to say that a browser has ‘shipped progressive web apps’? The only tangible thing you shipped is the heuristic-based install prompt.

I want to see developers make their sites installable, using whatever criteria is set by browser vendors, and I also want to see them work offline, have fast performance, and so on. I don’t want to see a return to m-dot sites, and **it would truly be a regressive step to start seeing amp-dot appear as well**.

### What can Google do?

Here’s my wish list for Google:

*   Split AMP into parts that are individually usable. Don’t require the all-or-nothing approach.
*   Talk more about installable web apps, which is a real practical thing, and less about progressive web apps, which is increasingly hard to define (or define them better)
*   When holding up examples of great uses of new technologies, make them sites that are cross platform. A mobile-only web experience really shouldn’t be something we’re celebrating in 2016.
*   When building examples and demos, focus on how to add technologies to _mature sites_ with 100k+ LOC, not how “super easy” it is to build something greenfield. We know that. Greenfield is always easy, but that’s not the real world. Some of this stuff can be done easily, if not elegantly, and it’s better than forking and running away

### What can publishers do?

News publishers like getting good press for building best practice tech, because we sure as hell get enough (often well deserved) bad press for building terrible tech. Everyone’s impatient for better solutions. But publishers should resist the temptation to split the web into platform optimised sites.

Instead, look at where we can get most bang for our buck and prioritise. I’d prioritise:

*   Superfast loading using service worker to show we can compete with AMP
*   Meeting the criteria for an install prompt
*   Fixing the generally awful advertising user experience
*   Killing reflows and jank to show we can create web UI with a comparable quality threshold to native UI

### Conclusion

Opinion on whether PWAs need to work in a non-mobile context to be considered ‘good’ is divided, and plenty of respected individuals are happily on the side of mobile only (or at least, platform-specific), including Microsoft’s Christian Heilmann who somewhat bewilderingly explains that [Progressive apps should be regressive by design](https://www.christianheilmann.com/2016/05/31/progressive-web-apps-and-our-regressive-approach/). How Kafkaesque.

Both technical people and business people need to understand that PWAs are inherently cross platform. Right now the whole effort is telling them exactly the opposite. I have spent years patiently nudging my organisation towards a one-web strategy, and if someone wants to promote an alternative, I’ll happily leave them to it but I’d rather it not be called progressive if it isn’t.

---

_Note: this post does not constitute the opinion of either the FT or the TAG. However, there is a [TAG spec review of progressive web apps](https://github.com/w3ctag/spec-reviews/issues/123) on the agenda for an upcoming TAG meeting. For full disclosure, I should also mention that Chris Heilmann gives me hair envy._
