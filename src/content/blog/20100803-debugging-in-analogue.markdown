---
kind: draft
created_at: 2010-10-18
title: Debugging in analogue
---

One of the most interesting challenges of our recently-launched [app for The XX][appstore1] was getting the video
synchronisation as tight as possible across multiple devices. The app uses a bit of clever logic to determine, to
the best of its ability, the clock offsets between the various devices. The device that's playing server then uses 
that to send a trigger signal to all the devices (including itself), saying "start playing at exactly time *t*" - 
where t is adjusted for each device based on its clock offset so that all devices get the same relative trigger 
time.

For example, imagine two devices, D1 and D2. D2's clock is 2 seconds ahead of D1's clock - so when D1 thinks it's
12:00:00, D2 thinks it's 12:00:02. Once the devices are aware of this discrepancy they can compensate for it: D1
might tell itself "start playing at 13:30:00" while telling D2 "start playing at 13:30:02". The effect is that both
devices start playing at the same time.

At least, that's the theory. In practice, iOS is a non-deterministic, multitasking operating system, and it's quite
possible that at the alloted time it'll be busy refreshing the UI, checking for mail, or doing any number of other
things. By the time the thread that's going to hit play on the video gets serviced the devices might have slipped
significantly out of sync.

There's no way around this, but you can mitigate the effect by having each device spin off a new, high-priority
thread when they receive the play signal, and have this high-priority thread start the video at the alloted time.

In iOS there are a number of ways of starting new threads, including [NSThread][api-nsthread],
[NSOperationQueue][api-nsop] and [Grand Central Dispatch][api-gcd]. I was curious to know which of these methods
yielded the most favourable results for our app. So, I set up a test scenario with a difference.

First, using [Amadeus Pro][amadeus-pro] I created a WAV file containing a single square wave at 100Hz. Then I
inserted this sound at the start of the soundtrack of a sample video. I loaded a test app that played the sample
video onto a pair of iPod Touch 3Gs and using some audio splitters and cables, connected the iPods to the line-in
on my MacBook Pro such that one iPod contributed the left channel and the other the right. It looked something
like this:

<img class="framed" title="Sync test hardware setup" src="/images/blog/sync-test-hardware-setup.jpg" alt="" />

Then, once again in Amadeus Pro, I hit record, then hit play in my test app. Once the square wave had played I could
stop recording, zoom in on the audio track I'd just recorded, and look at the distance between the falling edge of the
square wave on the two channels to see the time lag between the two videos:

<img class="framed" title="Sync test screenshot" src="/images/blog/sync-test-screenshot.png" alt="" />

I repeated the experiment a number of times with each threading approach and compared the figures to make sure I was
choosing the best option. Average time delay per method was as follows:

<table>
    <thead>
        <tr><th>Method</th><th>Average time delay (ms)</th></tr>
    </thead>
    <tbody>
        <tr><td>Schedule play on the main thread</td><td>114</td></tr>
        <tr><td>NSOperationQueue</td><td>7</td></tr>
        <tr><td>Grand Central Dispatch</td><td>9</td></tr>
        <tr><td>NSThread</td><td>10</td></tr>
    </tbody>
</table>

So, perhaps as expected, there's not much to choose between the three threading architectures I tried, although
they all give performance that's an order of magnitude better than the performance you get if you schedule the
play signal on the main thread.

[appstore1]: http://www.goosoftware.co.uk/
[api-nsthread]: http://developer.apple.com/iphone/library/documentation/Cocoa/Reference/Foundation/Classes/NSThread_Class/Reference/Reference.html
[api-nsop]: http://developer.apple.com/iphone/library/documentation/Cocoa/Reference/NSOperationQueue_class/Reference/Reference.html
[api-gcd]: http://developer.apple.com/iphone/library/documentation/Performance/Reference/GCD_libdispatch_Ref/Reference/reference.html
[amadeus-pro]: http://www.hairersoft.com/AmadeusPro/AmadeusPro.html