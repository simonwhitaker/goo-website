---
kind: article
created_at: 2012-04-18
title: Calling UIDevice's -uniqueIdentifier without warnings
slug: uniqueidentifier-no-warnings
---

If you use the [TestFlight SDK](https://www.testflightapp.com/sdk/download/) in your iOS app you should be aware of a small but significant change in v1.0 which went live a couple of weeks ago. As [this blog post](http://blog.testflightapp.com/post/19957620625/testflight-sdk-udid-access) explains, the TestFlight SDK no longer includes a device's UDID by default in the data it reports back to the mothership. This means that, again by default, data on sessions, checkpoints etc in the TestFlight SDK console will no longer be associated with a specific tester's device. The reason for the change is that the TestFlight SDK is intended for use on both test and production builds, and Apple will now [reject apps that ask for a device's UDID](http://techcrunch.com/2012/03/24/apple-udids/).

As a workaround, the TestFlight SDK now contains a new class method, `+setDeviceIdentifier:`, which you can use to add a device's UDID to TestFlight's callback packets in your Ad-Hoc builds by simply adding the following line to your code (I've added it right after my call to `+takeOff:`):

    [TestFlight setDeviceIdentifier:[[UIDevice currentDevice] uniqueIdentifier]];

(Note that you'll need to wrap that in an `#ifdef` or similar to ensure that it only gets compiled in to test builds, not production ones.)

This works fine, but because UIDevice's `-uniqueIdentifier` is now a deprecated method it generates a compiler warning. You'll see something like this in your build logs:

    /Users/simon/dev/personal-projects/apps/zippity/Zippity/ZPAppDelegate.m:70:38: 
        warning: 'uniqueIdentifier' is deprecated [-Wdeprecated-declarations]
        [TestFlight setDeviceIdentifier:[[UIDevice currentDevice] uniqueIdentifier]];

Urgh!

I hate compiler warnings, and eradicate them wherever possible. The reason is simple; if I ignore compiler warnings, I run the risk of missing something meaningful in my build logs. If my build logs perpetually show 20 warnings that I know about and have chosen to ignore, will I notice a new warning when it first appears? Probably not. If I get rid of every compiler warning when it first crops up, my code stays cleaner and new warnings are instantly detected.

In this case, I can only eradicate the warning by removing the call to `-uniqueIdentifier`, which obviously I don't want to do. So the next best option is to suppress the warning; it's a known issue, so I don't want that warning message cluttering up my build logs for the reasons already mentioned.

The specific warning I want to suppress is `deprecated-declarations`, as you can see in clang's error output above. (That `[-Wdeprecated-declarations]` indicates that I'm seeing the error because I've got the `deprecated-declarations` warning enabled. As an aside, those notes identifying the warning class that's generating a warning are just one of the reasons I love clang; gcc was never that helpful.)

I could set Xcode to ignore that error on a per-file basis by setting `-Wno-deprecated-declarations` as a compiler flag for the file in question. (To do that, select your target in Xcode, click on the Build Phases tab, expand the Compile Sources section, then double-click the file you want to add a compiler flag to). But in this case I really want to ignore the warning just for *that one line*. If any other code in this file uses a deprecated declaration, I want to know about it.

It turns out the way to do it is with clang pragmas. Here's how:

<script src="https://gist.github.com/2413961.js"> </script>
<noscript><a href="https://gist.github.com/2413961">https://gist.github.com/2413961</a></noscript>

Job done.