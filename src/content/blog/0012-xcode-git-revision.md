---
kind: article
created_at: 2012-02-08
title: Append Git revision to an app’s bundle version at build time
slug: xcode-git-revision
---

A while ago I blogged a [dirty hack](/blog/append-subversion-revision-to-an-iphone-apps-bundle-version-at-build-time/)
to append the current Subversion revision to the version number of an iPhone app
automatically at build time. Well, I haven't used Subversion for a while now,
having experienced a Damascene conversion to Git last year.

So, here's the same hack, but updated for Git. This time it's even more hacky because,
unlike Subversion, Git doesn't assign linear revision numbers every time you check code 
in. If you think of a typical Git branching graph that makes sense. So this hack 
uses `git describe` and then carves up the output to create its pseudo-version number.
It's dirty, but it does the trick.

To use:

1. In Xcode 4, click on your project file (the one with the blue icon) in the Project Navigator
2. Click Build Phases
3. Click the Add Build Phase at the bottom of the screen and choose Add Run Script
4. Leave the shell set as /bin/sh. Copy the code below and paste it into the script panel
5. Build your app

Here's the code:

<script src="https://gist.github.com/1770898.js?file=git-version.sh"></script>
<noscript><a href="https://gist.github.com/1770898">https://gist.github.com/1770898</a></noscript>

This is a bit of a dirty one, but it works for me. If you have suggested improvements I'm all ears so please
leave a comment.

