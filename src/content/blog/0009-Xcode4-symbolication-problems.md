---
kind: article
created_at: 2011-03-30
title: The symbolicator helps those who help themselves
---

It sounds like [I'm not the only one][so1] having problems with Xcode 4 not 
symbolicating crash logs correctly. Here's the symptom: I drag crash logs that 
testers email me into Xcode 4's organiser, then sit and wait for symbolication to
complete. But once it's done, my logs aren't symbolicated - they still just show 
a load of memory locations.

Running the symbolicator at the command line sheds a bit of light on what's going
wrong:

    $ /Developer/Platforms/iPhoneOS.platform/Developer/Library/PrivateFrameworks\
    > /DTDeviceKit.framework/Versions/A/Resources/symbolicatecrash MyApp_etc.crash

Here's the output I get:

    Can't understand the output from otool ( -> '\/Developer\/Platforms\/
    iPhoneOS\.platform\/Developer\/usr\/bin\/otool -arch armv7 -l   
    /Users/simon/Library/Developer/Xcode/DerivedData/MyApp-fbxifqioardhgxaitjdftgoejjzz/
    Build/Products/Debug-iphonesimulator/MyApp.app/MyApp') at 
    /Developer/Platforms/iPhoneOS.platform/Developer/Library/PrivateFrameworks/
    DTDeviceKit.framework/Versions/A/Resources/symbolicatecrash line 323.

Hmm... Notice that path to the app? 

**~/Library/Developer/Xcode/&#x200b;DerivedData/MyApp-fbxifqioardhgxaitjdftgoejjzz/&#x200b;Build/Products/Debug-iphonesimulator/&#x200b;MyApp.app/MyApp**

That's not the right app file - it's the build output from a Debug build, not an 
AdHoc build, and worse it's a Debug build for the iOS simulator.

As you may know, the symbolicator uses Spotlight to find the .app file (and the .dSYM file)
it uses to symbolicate a log. And that means that there's a really simple fix. 
Adding **~/Library/Developer/Xcode/DerivedData/** to the list 
of directories that Spotlight doesn't index makes those build artefacts invisible to
Spotlight, and hence the symbolicator. Just open System Preferences, click on
Spotlight, switch to the Privacy tab and add that DerivedData folder to the list.

You may now find that the symbolicator has a similar problem with apps installed on
the iPhone simulator itself. Adding **~/Library/Application Support/iPhone Simulator/** to
Spotlight's ignore list nails that one.

<img class="framed" title="Spotlight settings" src="/images/blog/spotlight-symbolicator.png" alt="" />

Now when I run the symbolicator at the command line, I get properly symbolicated 
output, just as expected.

[so1]: http://stackoverflow.com/questions/5458573/xcode-4-failure-to-symbolicate-crash-log/5491334#5491334