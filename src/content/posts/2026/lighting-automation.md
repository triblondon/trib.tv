---
title: Lighting automation in Home Assistant: whole home, sun and mode sensitive, area-optimized
pubDate: 2026-06-20
description: Lighting automation is one of the most obvious things to do with smart home tech and it's one of the most noticable things in my home. But getting it to produce the ideal state of the lighting that you would want at any given moment is much more challenging than you might expect.
author: Andrew Betts
tags: ["Home Assistant", "Home automation", "Zigbee"]
status: draft
---

I almost never touch the light switches in my house.  The lighting adjusts automatically as I move around.  

Home Assistant (along with most smart home platforms) has a simple and straightforward blueprint for lighting automation.  You choose a light and a motion sensor.  When there's motion, the light goes on.  When there's been no motion for some period of time, the light goes off.  Simple.  Magic.

But if you use this mechanism you very quickly realise there are numerous problems with it.

### The problems

1. If a light is manually turned on, and no motion is ever detected, it will never turn off
1. If the smart home system restarts, all the timers that are counting down are lost and all lights that are on stay on
1. In areas with good natural lighting the lights come on even when it's brightly lit by the sun
1. When you're watching a movie in a TV room, and you shift slightly on the sofa, all the lights suddenly come on
1. When you get up in the middle of the night you get blinded by lights coming on as you creep to the bathroom
1. Similarly, you get up briefly in the night for just a few minutes but the lights stay on for ages
1. You can't have a light turn off automatically unless there's a sensor that turns it on automatically - not great for 'task' lights that you probably want to turn on manually.

### Requirements



* When I go into a room, the 'main' lights in that room should come on (eg. I enter the Kitchen)
* When I go to a specific part of a room, the lights for that specific thing should come on or adjust (eg. Kitchen island spotlights brighten if you put something on the island, or workbench task lighting lights up if I start working at the bench)
* When a room is unoccupied for a period of time, all the lights in that room should turn off, but after a period that's time-of-day and room specific
* When I enter the house, turn on some lights if it's dark
* When I leave the house, turn off all lights

I also added a few technical requirements of my own:

* If I add new sensors or lights I want to add the minimum amount of automations specific to them

### General approaches

#### Dedicated sensor automations

This is the simplest one.  When sensor A is triggered, turn on light B.  Then after some period C, turn the light off.  New motion restarts the countdown.

This is very simple, but pretty limited and prone to bugs.  If we want to accomodate any special variability like 

#### 