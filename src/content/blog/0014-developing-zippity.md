---
kind: article
created_at: 2012-04-10
title: On Zippity – notes from a small iPhone app
slug: on-zippity
---

[Zippity](http://www.zippityapp.co.uk/) hit the App store last week. It's a simple utility app for opening zip files, and I'm very proud of it. That's no mistake; from day one I worked hard to *make sure* Zippity would be an app I was proud of. Here are a few of the decisions I made along the way.

## Zippity uses standard UI elements

To some, standard UI elements might seem like the lazy option, but for me there's always a strong urge to be creative and create some fun little widgets to make an app stand out. It's a truth universally acknowledged that every iOS developer secretly wants to work for [Tapbots](http://www.tapbots.com). :-)

For a utility app like Zippity though, I didn't feel there was any room for unorthodox UI elements. This isn't an app that people will live in day in, day out. It's an app that most people will only use occasionally, and for those users it's going to be a pain if every time they open the app they have to re-learn how to use it. So, my first rule was: no custom UI elements where there's a UIKit alternative.

On a similar note, I also didn't want functionality that could only be accessed by gestures. Gestures offer developers a nice way to add "power user" features, but Zippity is built from the ground up to make all of its functionality obvious to casual users.

## Zippity doesn't want to be your friend

Zippity won't ask you to like it on Facebook, rate it on the App Store or recommend it to your friends. I don't like apps that nag me for my approval (even though I understand why they do it), so Zippity doesn't do that. This might mean I die a penniless failure while other app developers enjoy the rich rewards of tapping into the social graph, but I'm fine with that. At least I'll never be remembered as the guy who wrote that needy zip file app.

## Zippity makes sensible choices about what to show you and how to show it

By default, Zippity doesn't show file extensions (although you can change that if you really want to). Instead, the icon next to a file generally shows what sort of file it is. (For visually impaired users however, Zippity does speak the file extension, since those icons are only useful clues for sighted users.)

When showing you the contents of a zip file with multiple nested, otherwise-empty folders, Zippity collapses those folders down. For example, if the physical structure of the unzipped contents looks like this:

![Illustration of Zippity's physical folder structure](/images/blog/zippity-folder-structure-physical.png)

Zippity will present a logical view that looks like this:

![Illustration of Zippity's logical folder structure](/images/blog/zippity-folder-structure-logical.png)

## Zippity talks your language

I've tried to avoid technical language wherever possible in Zippity's interface and associated user-facing content. For example in its App Store description, on the Zippity website and anywhere else you see blurb about Zippity it talks about being an app for opening "zip files". In fact Zippity handles a number of other archive formats, more geeky stuff like .tar, .gz and .bzip2, but I use the term "zip files" to cover all these archive formats. While that's technically incorrect, it's the terminology that makes sense to most people.

Zippity talks your language in another way too; if you're a Dutch or Hungarian speaker then Zippity 1.0.1 (currently awaiting App Store approval) has an interface completely translated into your mother tongue. Other translations are coming soon! (If you're interested in helping to translate Zippity into your language please [get in touch](http://twitter.com/s1mn).)

## Zippity looks nice

Even utility apps can look nice, and Zippity's no exception. It has a great icon (and another great, bespoke document icon) created by my friend and iconic iconographer, [Jon Hicks](http://twitter.com/hicksdesign). A different navigation bar colour and a subtle background from [subtlepatterns.com](http://subtlepatterns.com) in the "About Zippity" view give it a distinct visual identity and help to ensure that it can't be mistaken at a glance for Zippity's main view (i.e. the contents of a zip file).