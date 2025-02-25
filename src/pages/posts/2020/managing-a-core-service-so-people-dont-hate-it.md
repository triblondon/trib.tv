---
layout: ../../../../layouts/PostLayout.astro
title: Managing a core service so people don’t hate it
pubDate: 2020-01-03
description: If you work for a company with more than a few hundred employees, there will probably be some standardised process or system that you’re expected to use, is widely reviled, and yet never improves. Often it’s a design system, template, hosting platform or scheduling tool. Why is it so hard to make these things work well?
author: Andrew Betts
tags: ["Management", "Featured"]
---

I was recently interviewed by some lovely people from [Polytechnique Montréal](https://www.polymtl.ca/en) for a paper on design systems, and they inspired me (thanks [Jinghui](https://twitter.com/JinghuiCheng) and [Yassine](https://twitter.com/essane)!) to write this post. When I worked at the [Financial Times](https://www.ft.com), I led a project that came to be known as [Origami](https://origami.ft.com), and is still used today as the FT’s main design system for web based content.

![Origami website](origami.png)

Like any core service, the value in Origami would only be realised if _every project in the company used it_. This turned out to be a very hard problem. I’m going to explain why, and it boils down to a few different problems rooted in human psychology:

1. The simplicity illusion
1. The fallacy of reusability
1. The downward spiral of coercion
1. The Not-Invented-Here problem

There are many good reasons (and some less good) why companies often try and create ‘core’ services. A design system is a good example: companies have branding and style that should be consistently used across the organisation. When developing products, that consistency needs to show up at a very granular level, in the colour of buttons, the way typography is used, and even in the use of margins and empty space.

As well as giving your company a good “visual gloss”, it’s also about reducing repetitive work and improving efficiency by sharing reusable solutions between teams, and most importantly it’s about **improving customer experience though consistent use of good solutions**. For example, it’s generally easy to type your PIN on an ATM by remembering the _shape_ that the code makes on the keypad, rather than having to look at the numbers. But what happens when someone doesn’t follow the standard, and makes a keypad that’s the ‘wrong’ way up?!

:::figure
![PIN keypad the wrong way up](keypad.jpg)
This keypad is hard to use because the keys are oriented the opposite way to convention. And let’s not talk about those buttons on the right. WTF.
:::

Nightmare! But this just shows how effective and useful design systems are, _when they are universally adopted_.

The same is true of any core service, ruleset or shared resource that has been acquired or developed for use across a large organisation. However, in many cases where this idea of common, shared foundations takes root, the system ends up despised. In fact, the single strongest indicator of how much a core service is respected by the organisation that uses it is simply **how old it is**.

Now, let’s figure out why this happens.

### The simplicity illusion

Everyone thinks common resources are a simple idea at first. Don’t re-invent the wheel, they say, “just” share the same foundational components between teams. The problem is, anything that works in your head is likely to seem simple to you. If you’ve ever read a tutorial that used the word ‘just’ or ‘simply’ in front of an instruction you don’t understand, you’re experiencing a perspective gap.

> at this point, simply recompile it from source, specify the quantum state and swap in your favourite TZNP renderer

That quote is total nonsense which I just made up, but it might as well be any set of instructions that assumes knowledge which I don’t have. Reality is messy, filled with incompatible goals, priorities that don’t line up, teams that have different amounts of knowledge and resourcing, and needs that overlap but not perfectly.

While I’ve used a design system as an example so far, the package registries that power many of the world’s most popular programming platforms are also examples of core services. JavaScript has [npm](https://npmjs.com), perl has [CPAN](https://www.cpan.org/), Ruby has [RubyGems](https://rubygems.org/), Python has [PiPi](https://pypi.org/), and PHP has [packagist](https://packagist.org/). Although conceptually these are all just ‘shared resources’, none are simple, and all have had to solve complex problems of interconnected dependencies: deeply nested trees that might hide security vulnerabilities or unlicensed code.

Frustration or pragmatism often spawns entirely new, competing services. In PHP’s case, at least three so far.

So, we can start off on the right track by recognising that **creating a core service adds complexity, it does not simplify**. Simplification is not the goal. The goal is reusability, consistency and quality, and we are paying for it by accepting _more complexity_.

Projects often go through the growing pains of the simplicity illusion. I like to think of it as four stages of growth:

1. **Conceivable:** You are able to conceive of an idea in your head. You haven’t implemented it. It is _beautifully_ simple and elegant. The scale of these ideas is limited only by your imagination.
1. **Implementable:** You implemented the idea, but didn’t write anything down. You’ve now faced some realities, and your idea is constrained by the laws of physics and available resources, but you still think it’s simple and easy because you understand 100% of it. Hobby projects are often like this, and explains why many open source tools can only be maintained effectively by their creator.
1. **Reproducible:** You documented the solution, and other people have been able to follow the instructions. OK, so now you have proven that it’s possible to capture and transfer the knowledge, which forces you to recognise to some extent how complex your solution is.
1. **Accessible:** You aggressively redesigned the solution so that people who use it don’t need to know how it works. Now you’ve fully understood the cost of complexity, you’re appropriately terrified of it and recognise the need to reduce it to make your idea successful.

Consider the problem of moving from one place to another. In an ideal world, we’d “just” teleport. That’s easily _conceivable_, but impossible in reality. So you make a machine that has an engine and gets you around. You’re a genius – you invented the car! But as much as people admire your car, they can’t have one because they don’t know how it works. It’s _implementable_, but not reproducible.

So you make a kit that allows people to build their own car. Now anyone can get the benefit of your solution, if they’re willing to put in the time and mental energy to understand all the details. It’s _reproducible_, but it starts to become clear that there’s quite a lot to this.

Eventually, you end up with a modern car, like the ones we drive today. In fact I regularly rent cars made by different manufacturers, and regardless of what kind of car it is, I can usually figure out how to drive it within 30 seconds. The modern car is _accessible_. It’s simple to _use_, but so complex that no one person can understand everything about how it works.

### The fallacy of reusability

It’s common for people to see the potential for reuse, and it’s a nice instinct, in that it can lead to collaboration and co-operation opportunities. But often it’s just an excuse to put more effort into something than you can justify for your own needs. You’re basically just kidding yourself into thinking you’re making something other people will use, so you feel better about spending so much time and money on it.

This is something that becomes quite obvious when you know how to recognise the signs. An API with only one method that returns 500 data fields. An interface that only accepts some weird proprietary data format that happens to have native support in the environment that you are using. Cultural or locale specific elements in spite of your claims that the system is ‘global’. Hilarious defaults or constraints, like making a ‘reusable’ design component exactly 387 pixels wide because that’s the size of the space you have for it on your particular app. Requiring a huge toolchain that is no effort for you because you already have it installed (just look at all the open source projects that tell you to “run `yarn` to install”. Great, if you happen to have `yarn`)

We could make a checklist of DOs and DON’Ts to ‘achieve reusability’, but it is a battle that’s almost impossible to win because you don’t have _perspective_. To gain perspective, you need a second (and ideally a third) independent consumer of the system, and ideally you need to hand responsibility for the system over to someone who isn’t a consumer of it.

With _Origami_, we replaced an older effort at creating a design system for the FT which had begun to gestate within the ‘ft.com’ team. It was a noble and well thought-out project, but it was under resourced, had only one consumer and the consumer was also the maintainer. Origami, in contrast, is maintained by an independent team, and now has dozens of consuming teams. So the checklist for reusability is really just two things:

1.  Reusability requires a minimum of two consumers (the more the better)
2.  The maintainer should not be a consumer (resources permitting)

### The downward spiral of coercion

Competition creates hunger and enhances pride in success. Coercion is the opposite. If I’m forced to use something, there is limited incentive for me to provide feedback because I know the maintainer has no incentive to listen to it. The maintainer has no reason to spend time helping me save time, because it’s literally of no benefit to them.

Of course the reality is even in such situations people _do_ feel pride in their work and often want to help one another, but at the scale of large teams, coercion to adopt a particular in-house solution breeds complacency, laziness and lack of empathy.

The thing I hate most about such projects is the way they are run. You can spot a team that’s on a power trip a mile off by their instructions and feedback mechanism. At the worst, these resemble something [Terry Gilliam](https://en.wikipedia.org/wiki/Terry_Gilliam) or [Franz Kafka](https://en.wikipedia.org/wiki/Franz_Kafka) might have come up with. Myriad steps. Things I have to know but with no way of finding those things out. Queries persistently answered in the negative with reference to rules or procedures, with no way of appealing or questioning the rule or procedure. Countless things **I** have to do, before **you’ll** do anything. If you were trying to sell a product, no-one would buy it. You get away with it because you own the only permitted solution.

Unfortunately humans are really bad at empathy in general (me included, let’s just say I’ve gotten a lot better at it). Being in a position to coerce teams to adopt your product or service means you have to work extra hard to validate that you’re actually doing good, and you have no meaningful way to judge whether it’s actually successful.

The team behind [Google’s AMP product](https://amp.dev/) likes to say they’re ‘super surprised and delighted’ by the tens of millions of sites that have adopted AMP, but I’ve [written extensively before](https://trib.tv/2019/05/28/cake-or-death-amp-and-the-worrying-power-dynamics-of-the-web/) about how that’s similar to a street robber forgetting that he’s holding a gun to your head.

One thing that follows from coercion is misalignment on goals and metrics, and this can really destroy morale and enthusiasm. For example, imagine your responsibility is to build one of your company’s websites, and you’re required to start from a ‘framework’ that gets all the branding elements and navigation in the right place. Your performance is measured against goals related to keeping the page lightweight, fast to load, and smooth to scroll, but even before you add a single word, the framework’s ‘hello world’ already fails your benchmark. You literally can’t meet your goal, no matter how good your own contribution is.

In this situation, you have basically no incentive to do a good job, resulting potentially in a product that compounds the problems of the core service that it’s required to use.

So, don’t **make** people adopt your thing. Make it better than everything else so that they _want_ to adopt it.

### The Not-Invented-Here problem

People don’t like foreign things. It is a sad reality that has resulted in more harm and despair in the world than almost any other impulse.  
When applied to building software, “[Not invented here](https://en.wikipedia.org/wiki/Not_invented_here)” just wastes money rather than lives, but it’s still worth beating it.

A common pattern is that a team will look for a solution to something, find a tool that looks a bit complicated, and make a rash decision to build their own. It’s a classic manifestation of the simplicity illusion. Combating this is a matter of reducing the complexity for the consumer, so that even if I am under an illusion of simplicity, the solution seems easy enough that it’s not worth my building one, and, more specifically to this problem, **make the solution seem less foreign**.

To do this, define what foreignness means. It generally manifests as:

*   Cultural or locale references that don’t resonate
*   Tooling or technology choices that are different to the ones used by the team
*   Lack of human connection: the project seems abandoned, or doesn’t seem friendly
*   Apparent challenges in making changes that you would need

As a consumer, if a thing seems foreign, making your own or forking it and cutting the cord makes you more nimble in the short term. But you took on a big responsibility that you may not realise for some time. Eventually, you’ll probably want to find an external solution again.

If you’re a maintainer, make yourself less foreign by being sensitive to culture and locale (including variations in _company_ culture), explain technology choices or (even better) make them irrelevant to the consumer and don’t mention them at all. Make sure the project is active and show that it is evolving to meet new needs as they are discovered. Create opportunities for your prospective consumers to meet you and tell you about their use cases. Document those use cases.

### The reality of self-interest

All of this is all very well, but ultimately everyone has slightly different goals, different measures against which they are judged, and at some basic level is focussed on achieving the goal by the most expedient means. Some might see a core service team as a resource that they can use selfishly, for the simple benefit of their own project.

This is where as a maintainer, you need to draw a line, and get the balance right between being overwhelmingly helpful, and simply becoming someone else’s resource.

Self-interest is one unfortunate reason why open-source on the web today is filled with feature requests that are demanded by a huge number of consumers, none of whom are actually willing to contribute that feature. Issues filled with “+1” or “when will this be available” comments drain enthusiasm from maintainers. In a corporate situation, it’s different because the core service team is actually employed to service these needs, but still bears a responsibility to say no sometimes.

### Two simple principles

We’ve established that almost everything about the idea of a core service is battling human nature, and that the problems are so hard to avoid that hitting the nuclear option and starting again at some point down the road is almost inevitable. But don’t let that depress you. Everything changes over time. We only need our core service to last as long as the fundamental purpose it serves is relevant to the organisation. **Success looks like retiring the service with a fond farewell, not a cathartic slaying of an effigy**.

So, if you are responsible for a core service, here are two things that are definitely true at all times:

*   **It is not easy enough to use**
*   **You are not communicating enough**

I can’t stress these two things enough. There is literally no ‘good enough’ for either one. There is no such thing as ‘excessive’ ease of use. For _Origami_, this is the evolution of usability that we went through:

1.  Chose a toolchain of [NodeJS](https://nodejs.org) tools and a package manager, and wired them together.
2.  Documented how it all fitted together and how to set it up
3.  Created a command line (CLI) tool as an abstraction layer on top of it so you don’t need to know
4.  Recognising that people still have to install the CLI tool, and it had some dependencies that we shouldn’t take for granted, created a web service that runs the tool in the cloud
5.  Recognising that it’s work to keep pulling components from us when we update them, created an on-demand cloud bundler (the [origami build service](https://build.origami.ft.com)) so all you have to do is write a `<script>` or `<style>` tag.
6.  Recognising that web hosting is not free or effortless, and you still need to be able to run a server, we made the build service work with online playground tools like [JSBin](https://jsbin.com), [Codepen](https://codepen.io) and [JSFiddle](https://www.jsfiddle.com).

In short, we graduated pretty quickly out of the simplicity illusion and ended up with a solution that was _accessible_ to our colleagues. People could create webpages using the design system, and put them into production, from a factory-reset laptop without installing anything. I don’t think that’s easy enough, but I ran out of ideas for making it easier.

It’s true that everything is relative. In London if I want to avoid my bike being stolen, I could buy a stronger lock, but it might be easier just to lock it up next to a bike with a weaker lock than mine has. Equally our core system only needs to be easier to use than the next best convenient alternative, and that’s why coercion is so damaging to the usability of systems in general, but just because the alternatives are all terrible doesn’t mean your solution should rest on the laurels of mediocrity.

As for communication, you must assume that at all times there is something going on somewhere that you should know about, that would help you make the service better, but which you aren’t aware of, and make it your mission to find out what it is. I got very paranoid about this! Here’s what we did:

1.  Create a set of slack channels with very clearly defined, inviting and welcoming topic descriptions. Promote the channels on the office digital signage, email signatures, physical posters, stickers, business cards, everything.
2.  Hold a meeting every week in the same time and place whose only agenda item is to help people out with any questions or issues they have. We called it an ‘open meeting’. I since found out that people often call this kind of thing ‘office hours’. Same thing. On your way to the meeting room wave at everyone in the office.
3.  Create clear documentation for how to do things such as raising issues, then repeat that in issue templates, but use encouraging language (“it would help us out a lot if you could…”) rather than aggressive language (“tick to certify that you have read and understood…”). If things aren’t quite raised in the right way, fix it ourselves (unless it’s repeated and disrespectful of our time)
4.  Hold a quarterly workshop for people new to the design system to come and build some stuff and learn how to apply it to their use cases
5.  Develop a brand for the system
6.  Have a ‘team summit’ every 6 months to assess engagement with all the communications efforts, and adapt accordingly.

For a long time I scoured junk shops looking for the old cold-war style ‘nuclear hotline’ red phones with no dialpad. I was thinking to give one to every team that adopted Origami and let them use it to ask us questions whenever they got stuck. Never quite got around to that, but it’s a nice reminder that we didn’t communicate enough – because there was more we could have done (maybe they have since I left!).

### Making core systems a success

So, in conclusion, creating a core system is easy. Maintaining it, over a long enough period, is basically impossible. The measure of your success is how long you last. Here’s a checklist:

*   Remove the need for knowledge
*   Find multiple use cases
*   Don’t force anyone to use it
*   Be responsive
*   Invest enough resources
*   Make it easier to use
*   Communicate more
*   Adapt and pivot (but know when it’s time to retire)

I’ve used a design system as an example, but this applies just as much to any other core service, everything from an application hosting platform to an expenses tracking system.

I think my proudest moment in the Origami project was receiving a gift from a consulting vendor that was doing work for the FT and had been asked to use Origami. They sent us a huge, powered, illuminated glass Origami sign. They might have been poking fun at us a bit, but they were also showing that they understood.