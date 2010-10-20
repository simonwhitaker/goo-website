---
kind: article
created_at: 2010-07-24
title: Thoughts on the App Store review process
---

I've just completed the Apple Developer Program survey, and found that the process
really helped to focus my thoughts on the whole iOS development process, especially 
the app submission and approval process.

When I talk to clients and other iOS developers about iOS development, the App Store approval
process is raised time and again as a particular pain point. The two things that most bother
people trying to build a business around this platform are:

1. The apparent arbitrariness around whether an app is approved or rejected
2. The lack of an SLA around approval times

Regarding the former, I don't see this. The development agreement that iOS developers sign is
pretty explicit about what is and isn't allowed on the App Store. Most questions I've had around
whether feature X is permissible have been answered by reading the agreement. There have been some
[well-publicised examples](ex1) of rejections that appear to be arbitrary but they're few and 
far between, and if often transpires that there's [more to the decision than is apparent at 
first glance](ex2).

[ex1]: http://daringfireball.net/2009/08/ninjawords
[ex2]: http://daringfireball.net/2009/08/phil_schiller_app_store

Regarding the lack of SLA, it's definitely a real issue. The best Apple do is give an [indication](ap1) 
of "Percentage of submissions reviewed within the last 7 days", broken down into New Apps and App
Updates. It's not even completely clear what this metric means, but it's the only thing we have.

[ap1]: https://developer.apple.com/iphone/appstore/approval.html

This means that, for developers hoping to target a particular app launch date, there's considerable
uncertainty around when the app needs to be submitted. One app we're working on currently is aimed
to coincide with a national event later this year and we can't afford to miss that window. But we
have no idea of when the app needs to be submitted in order to hit the window, so the best we can 
do is guess and err generously on the side of caution - which in turn curtails the time we can
spend developing the app.

## Can Apple do better?

In order to answer that we first have to understand why the process is currently so unpredictable. 
Apple have no control over the rate at which apps are submitted to the App Store, and I suppose 
they'd argue that they do the best they can given that uncertainty. They will undoubtedly see 
periods of peak demand where even a significantly larger review team would fall behind. 
They can't guarantee an SLA given such unpredictability. 

Fair enough, you might think. But is it? There are a couple of factors that suggest Apple could 
do better.

### Apple knows how many developers it has

All iOS developers are registered with Apple. Apple knows the size of the developer community at
and point in time, which should at least give a rough and ready metric on predicted App Store inflow.

### Apple itself often triggers the periods of peak demand

Those percentages I mentioned earlier tend to dip (indicating higher latency in the approval process)
when Apple release a new device (the iPad for example, or the iPhone 4) and developers rush to 
submit apps targetting the new device. The same is true of major iOS upgrades. You may have noticed
a significant increase in the number of app updates in the App Store in the weeks after the iPhone 4
and iOS4 were released as developers updated their apps with high resolution artwork and recompiled
under SDK 4 to take advantage of fast app switching.

**Apple controls these hardware and software releases**; it knows they're coming and can plan for 
them. And part of that plan should be increased capacity of the App Store review team.

So here's what I'd like to see: Apple giving developers a guaranteed SLA for app submissions. 
For example, Apple guarantee all apps will be reviewed within 7 days. This means Apple has to provide
the necessary capacity at their end to cope with peak demand and still meet SLA. That's a reasonable
burden on Apple I think; they are after all enjoying unprecedented (and well-deserved) success with 
the App Store - but iOS developers are the geese laying the golden eggs and Apple needs to step up
and offer them a solid foundation on which they can build their businesses as successfully as Apple has 
built its own.

Consider the difference this would make to developers and their clients.

**Today's situation**

Client: "We need the app live by 28 September. When do we need to submit to the App Store?"

Developer: "Well, no-one really knows. It we submit on 21 September then we've currently got
an 85% chance of going live on 28 September. Submitting earlier than that increases our 
chances, but we don't know how much earlier we need to submit in order to guarantee going 
live on 28 September. So let's submit on 7 September - surely it can't take any longer than
3 weeks?"

**The situation with an SLA**

Client: "We need the app live by 28 September. When do we need to submit to the App Store?"

Developer: "21 September"

