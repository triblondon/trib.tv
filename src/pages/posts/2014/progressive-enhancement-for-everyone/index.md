---
layout: ../../../../layouts/PostLayout.astro
title: Progressive enhancement for everyone
pubDate: 2014-11-23
description: One of the key benefits ascribed to progressive enhancement is that your site works for everyone. That is almost true. But we need to be clear what we mean by “everyone”.
author: Andrew Betts
tags: ["Progressive Enhancement", "Web"]
---

One of the key benefits ascribed to progressive enhancement is that your site works for everyone. That is almost true. But we need to be clear what we mean by “everyone”.

A recent polite disagreement between [Scott Jenson](https://plus.google.com/+ScottJenson/posts/S23BqQsEuvR) and [Jeremy Keith](https://adactio.com/journal/7774), both of whom I admire immensely, made me finally put into writing something that’s been bothering me about progressive enhancement idealism for a while. The principle has it that if you start with ‘good ol’ HTML’, it will work everywhere, and then you can add CSS and JavaScript to enhance it. Literally everything except the markup (and even much of the markup) is an enhancement.

This is fine up to (or rather down to) a point. Jeremy and Scott use the example of a camera app, where you could consider it to be a progressively enhanced `<input type=file>`. But does that really work for _everyone_? Taking IE as an example:

*   You’re probably not testing in anything lower than v6
*   File inputs were [first supported in v4](http://en.wikipedia.org/wiki/File_select#Browser_limitations)
*   JavaScript support has been [available since v2](http://web.archive.org/web/20090418194454/http://www.microsoft.com/windows/IE/community/columns/historyofie.mspx)

### Reality: The ‘core functionality’ doesn’t work for everyone

So how do we define “everyone”? In this case it evidently doesn’t include anyone using IE 1, 2 or 3 since the core solution isn’t supported by those browsers. And virtually nobody does use them, I know. But does it even include users of 4 and 5? You’re serving JS code to these browsers, and not testing it. **Not tested means probably not working**, because no browser can be relied upon to interpret and render standards-compliant code correctly whilst ignoring stuff they don’t understand (especially old ones). I don’t think a single legacy browser can claim to do this. Added to all this there are literally no versions of IE that support file inputs but not JavaScript, so what exactly are we achieving here?

### Beware of the leopard

Even if you devise some way in which your user can achieve their supposed aim with the most basic browser functionality, and it works ‘everywhere’, you will probably be providing such a laughably awful experience that absolutely no-one is going to use it.

In the Hitchhiker’s guide to the galaxy, [Arthur Dent is surprised that the council want to knock down his house](http://youtu.be/HNmIQX_ImgM?t=49s), because he hasn’t seen the planning application that has been clearly on display in a pitch dark basement with no stairs on the back door on a toilet cubicle with a ‘beware of the leopard’ sign on it. The reality is that most modern web products are designed not for web gurus who are willing to tolerate endless steps, but for normal humans. And in many cases they’re designed to be easier ways of doing something that is already possible. As a result it’s totally pointless to also support a way of doing it that’s _harder_ than what’s already possible. A user that signs up for a camera app is not going to be very happy if it doesn’t actually take the pictures.

### There is nothing wrong with “Browser not supported”

Progressive enhancement is a valuable mechanism, and it helps us bring new features to users faster. All the things Jeremy cites as no-brainers are exactly that. Rounded corners, web fonts, gradients, all indisputably enhancements. But when it comes to complex script-powered elements, we should not feel the need to support some catastrophically awful user experience for a tiny number of users. A much better user experience for the camera app is to simply show a message like this:

> Your browser is too old to use the camera app. The app works with any browser that includes the getUserMedia feature. [Learn about free upgrade options](#)

This isn’t always the case, and of course you can often be more granular. For example, many sites now have very rich commenting interfaces. You could argue that ancient browsers should still be able to comment, but for that tiny audience, what’s wrong with printing a selection of comments and the message:

> To add your own comment, you need to [upgrade your browser](#)

At the FT we use the seamless progressive enhancement of ‘optional’ features, but also define a moveable baseline using a [cuts the mustard](http://responsivenews.co.uk/post/18948466399/cutting-the-mustard) test, below which we are happy to replace some of what you might consider core functionality with messages like the one shown above.

Everything is, in the end, a judgment call – login and sign up might work below the baseline, but commenting, ‘save for later’, ’email a friend’ and so on don’t. Some of these features might show upgrade messages, others might vanish completely.

And of course even an ultra-simplified site is expected to break if you go back far enough in the browser versions. No matter how you cut it, **nothing** is going to work for **everyone**. For sure, taking a PE approach allows you to be more inclusive without a lot more effort. But being inclusive doesn’t mean being universal.

The way I look at it, I make reasonable attempts to serve the **largest practically addressable audience with the most important features**. As long as that’s what you mean by ‘everyone’, we’re on the same page.
