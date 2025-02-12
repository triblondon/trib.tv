---
layout: ../../../../layouts/PostLayout.astro
title: “Progressive apps” are a bag of carrots
pubDate: 2015-10-11
description: The desire among those who like the web for it to do everything native apps can do has recently led to the idea of "progressive apps", but I’m not convinced this does anything except further overload two terms that are already dangerously ambiguous.
author: Andrew Betts
tags: ["Progressive apps", "PWA", "Web"]
---

This post has been brewing for a couple of weeks, since Mairead Buchan hosted the first of what will hopefully be a new series of London meetups where a dozen web developers with complex use cases from different organisations meet, sit in a circle and talk about a pre-agreed topic, with a moderator and [notes written up](https://docs.google.com/document/d/11hyzjKPletwHSmd9x5fjYgJ4SEQkGliqjvi5lMiJqqA/edit) as we go. I learnt a lot more like this than I do at a conventional tech talk, and hope to be part of more of these in the future.

The topic was progressive apps. What are they, how do they relate to web app manifests, and is it anything to do with progressive enhancement? Who knows. Well, Alex Russell does, since he coined the term, and in his [blog post](https://infrequently.org/2015/06/progressive-apps-escaping-tabs-without-losing-our-soul/) he set out the following criteria (bracketed explanations mine, in an attempt to avoid a jargon disco):

*   Responsive (ie they fit on your screen)
*   Connectivity independent (ie they work offline)
*   App-like-interactions (ie swooosh swipe oooooh pinch)
*   Fresh (ie content and logic are always up to date)
*   Safe (ie delivered over TLS)
*   Discoverable (ie they have a web app manifest)
*   Re-engageable (ie they send, or can opt to send, push notifications)
*   Installable (ie they can be saved to homescreen)
*   Linkable (ie they are a website)

Apps that meet these criteria will be offered a special status by the browser/OS, allowing them to be promoted to homescreen apps and treated as an app independent of the browser.

I really am struggling with this. The list above is certainly a nice grab-bag of great standards for websites to aspire to, but they don’t seem to be coherent and comprehensive. For example, if I make an app for an event, it may not need to be _fresh_, because it cans all the content it needs and that content has a very limited shelf life that lasts no longer than the app itself. Equally if I have a very simple blog, for example, there’s likely no need for a “Shell + content” model (which I take to mean client-side rendering) that is part of the definition of ‘App-like interactions’. And maybe my website has a ton of links out to other sites, and has a ton of links from other sites coming in, and therefore doesn’t see value in being a walled garden, but still would like a homescreen presence.

### It all comes down to the browser chrome

The way I see it there is one simple distinction that users make between apps and websites, and everything, regardless of implementation technology can be easily evaluated based on it. From a user perspective, **if I see browser chrome, it’s a website**. It doesn’t matter if I launch it from the homescreen, if I see browser chrome, that’s a shortcut to a website (a ‘pinned website’ if you like), not an app. Issues like where you get it from (app store vs save to homescreen), how ‘appy’ its interactions are, whether it works offline, whether it does push notifications, all of that seems like a distraction to me.

Take the [FT web app](http://app.ft.com). By Alex’s definition, it’s not a progressive app. But our readers think it’s an app, because when you launch it, you don’t see any browser chrome, and outbound links spawn a new browser instance. They might think it could be a better app, and no doubt it could be – but it’s still an app nonetheless. Alternatively, take an app that fulfils all of the above criteria, and in its manifest it opts to not hide browser chrome. The user sees the install prompt, accepts, gets an icon on their homescreen. Taps the icon. Now they’re recognisably back in the browser. Outbound links now open in the same browser window because the chrome ensures the user has a back/forward navigation capability and the ability to see the URL. This experience may be awesome, but it’s an experience that is ‘of the web’.

| |‘App experience’|‘Web experience’|
|-|-----|-----|
|**Immersiveness**|Full screen|Shows browser chrome|
|**Link behaviour**|Opens foreign origin links in another app|Most foreign links open in the same app|

Whether it works offline, does push notifications, is delivered over TLS, loads fresh content, has a ‘swipy’ interface… none of that makes it any more or less an ‘app’. Those things make it a _better app_ (or a better website, if you can see browser chrome)

What’s happening here is that a browser and search vendor, ie Google, for reasons they believe to be laudable and for the most part are indeed laudable, is pushing developers to adopt new, better technologies by linking them to rewards like install banners and better search ranking. I’m just not sure it’s helpful to try and bundle all these activities together and call the resulting sites progressive apps.

### Solving the deep linking problem

One of my biggest issues with splitting a website off from the web as a whole and siloing it in its own inescapable UI is that you cannot easily link into or out of it. Mozilla’s [Pinned apps](https://wiki.mozilla.org/Firefox_OS/Pinned_Apps) solves this by using the scope property of a web app manifest to give a standalone app ownership over a particular URL space, so if you are in a different app (or in the browser) and you navigate to a page within one of these registered scopes, it loads inside the pinned app rather than in a visible browser container.

I think that’s a great idea and it makes up for one of the main disadvantages of the ‘app’ model.

### If that’s what Google wants…

Using the power of its position to improve adoption of better web standards could be seen as a reasonable ‘non evil’ move from Google, but dressing it up as progressive apps is a bit of a dark pattern if you ask me. Some moves are unquestionably good, like using mobile-friendliness, loading time and connection security as ranking signals. But others are more contentious – like the possibility that the adoption of [AMP HTML](https://www.ampproject.org/) will also be treated as a ranking signal.

So all told I guess my conclusion is I care that Google thinks I have a progressive app, because I want the carrots that they’re dangling, but I don’t care whether anyone else does.

---

**Update (7 Nov):**

Alex posted [Mmmmmmm….Carrots!](https://medium.com/@slightlylate/mmmmmmm-carrots-6b3a53719008#.a47bvaf26)) as a rebuttal to this post, Francesco Iovine who was also at Mairead’s event posted [Installable, pinned or progressive apps?](https://medium.com/@franciov/installable-pinned-or-progressive-apps-5b4997ecbf49), and I also had the opportunity to discuss the issue with [Alex Komoroske](http://www.komoroske.com/) from Google in the pub. Essentially I stand by everything I said in this post, but now I understand the rationale for Progressive apps a bit better. In, perhaps slightly clearer terms:

* “Web apps” on mobile have a bad rap because they are seen as a poor substitute for native. Business still want native apps even though web apps can now largely do the things they couldn’t do before. Therefore ‘modern’ web apps need a rebrand.
* Since you’ve got to have something that separates ‘modern’ web apps from older ones, the Chrome folk have arbitrarily decided that the definition is a magic formula of TLS + service worker + web app manifest
* To recognise a progressive app when they see one, Chrome offers the carrot of an app-install banner.

My issue with this really remains that technically, the new feature is **app install banners**, which developers can get by hitting the right heuristics. All the rest is basically marketing. Of course you could argue that the marketing is exactly what we need.
