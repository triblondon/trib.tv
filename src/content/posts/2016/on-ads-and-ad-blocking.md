---
title: "On ads and ad blocking"
pubDate: 2016-03-29
description: Ad blocking is going mainstream, and this is not a good thing. Inflated, intrusive ads result from advertisers having bad incentives, and ad blocking technology can actually make those incentives even worse. The only solution is one that advertisers can be on board with as well.
author: Andrew Betts
tags: ["Ad blocking", "Ads", "IAB", "LEAN", "MRC", "TAG", "W3C", "Web"]
---

I’ve had several interesting opportunities to reflect on this recently. At the [W3C TAG](http://tag.w3.org), we recently discussed the new [Intersection Observer](https://github.com/WICG/IntersectionObserver/blob/master/explainer.md) feature Google is bringing to the web. This feature’s primary use case is to allow developers to detect when certain elements (eg. ads) are visible to the user, and therefore only load them when the user has got to the point of seeing them. This is a great feature for advertisers who want to be good citizens online.

![Ads everywhere!](ads-everywhere.jpg)

In another recent development Opera has now joined the party of networks and browsers that come with [built in ad blocking](http://www.opera.com/blogs/desktop/2016/03/native-ad-blocking-feature-opera-for-computers/). Opera deputy CTO Bruce Lawson posted [some personal thoughts](http://www.brucelawson.co.uk/2016/on-ad-blocking/) on the subject and concluded that while clickbaity rubbish was awful and should die, contextual text ads were rather useful and should stay.

Since I work for the Financial Times, which makes part of its money from advertising, and the FT is owned by Nikkei, which also makes part of its money from advertising, I have some insight into the problem from a publisher perspective.

### Let’s talk about ‘display’ advertising

Part of the problem is that there is only so much you can advertise with text. Google has built a multi billion dollar business largely on the back of text ads, so we know that contextual text ads work. And that’s fine if you are doing a search for ‘gnome cleaning techniques’ and up pops an ad for a local professional gnome cleaner in your area with a special offer on. But what if you are reading a news article about the NSA, and MGM sees this as a good opportunity to market the new Bond movie to you? It’s contextual, relevant, and may well be interesting, but it sure as hell isn’t going to work as a text ad. We need to see ACTION, glamour, chaos and heroism. And for that, we need video.

![Caption: How not to advertise a bond film](text-ad.png)

So, tracking and privacy issues aside, the text ads are basically fine and no-one is really arguing otherwise. But I say that the ‘display’ advertising, the big in-your-face images, animation and video, that stuff is needed too. Advertising has always been an important part of society with broad benefits to multiple parties – publishers get to fund their content, advertisers get an audience for their products, customers get access to more of what’s going on which they might want to be part of. This is all moving online, and eliminating display advertising risks severe negative effects.

![Caption: Explosions, exotic locations,  beautiful people, sparky chemistry... that's advertising.](big-ad.jpg)

### So why does online display advertising upset people so much?

I know that Bruce, as one of the world’s top seven most glamorous people (2013), appreciates the need for a little drama occasionally to make a sale. But the truly glam know that the real secret is knowing when to be discreet and when to be outrageous. The problem with online advertising is that for advertisers used to the constraints of print, it’s like suddenly an entirely new world opened up and no-one knew how to behave in it.

This led to the situation we have today, where much of the display advertising online is _truly awful_, both in terms of the creatives and the presentation format.

Some advertisers, with apparently no understanding at all of the balance between attention-grabbing and stupidly intrusive, gleefully design expensive bespoke ad formats with words like “roadblock”, “takeover”, “immersive”, or “wall-to-wall”. They’re the kind of people who think this kind of thing is a really good idea:

https://www.youtube.com/watch?v=azwL5eoE5aI

Other advertisers, who buy cheap standard rectangles, produce boring and technically inferior ads, because no-one values the ads highly enough. The reason they’re very cheap is because we’ve been very bad at delivering them properly – counting ad views on ads that were never visible to the user, for example. It’s a downward spiral.

### It’s being fixed, honestly

This is all being fixed. The [Media Rating Council](http://mediaratingcouncil.org/) (MRC) and [Interactive Advertising Bureau](http://www.iab.com/our-story/) (IAB), which set standards for internet advertising, have been pushing [‘viewability’ standards](https://en.wikipedia.org/wiki/Viewable_Impression) for some time. Ads must be seen to be charged for. Time on screen is becoming the commodity, not impressions. This is fixing the downward value spiral problem.

More recently, the IAB cried mea culpa and [announced LEAN](http://www.iab.com/news/lean/), a developing standard intent on making ads Lightweight, Encrypted, Ad-choice supportive, and Non-invasive. They also publish [ad-blocking research and advice](http://www.iabuk.net/system/tdf/Ad%20blocking%20FAQ%20March%202016.pdf?file=1&type=node&id=27215) (PDF), and advocate responsible advertising. This is solving the invasiveness problem.

![Caption: Ads with 'ad choices' support allow users to object to individual ads](ad-choices.png)

Obviously people should have the ability to block ads if they want to. In fact, I have an ad blocker on one of my personal browser profiles. But blanket network or browser level ad blocking is not helpful in improving the state of display advertising on the web.

### We can fix it faster if we work together

Why don’t browsers collaborate with the IAB and MRC to develop and promote LEAN, and then to enforce it. For example, ads should not load if they are outside the viewport, ads should not activate audio without user interaction, images should not exceed some rational rule on file size, ads should not cover content, animation should not be egregiously attention grabbing, etc. Publisher sites or individual ad creatives that fail to meet these standards could be blocked by the browser vendor, either using detectable heuristics, crowdsourced complaints, or manual vetting.

But blanket ad blocking literally incentivises advertisers to [develop counter-blocking-technology like AdDefend](http://www.addefend.com/) to block the ad blocker. Yes that is an actual thing that exists. Ad blockers don’t give advertisers any choice and low and behold we have a war.

Keep the good, filter out the bad. **Give advertisers a real choice**. We’ve solved this problem [intelligently for email](https://en.wikipedia.org/wiki/Spamming). I don’t see why we can’t solve it intelligently for advertising.
