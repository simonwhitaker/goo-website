---
kind: article
created_at: 2010-08-03
title: Append Subversion revision to an iPhone app’s bundle version at build time
---

Here's a dirty hack to append the current Subversion revision to the version number of an iPhone app
automatically at build time. If your Info.plist specifies the version as 1.0 and your local Subversion
repository is at revision 36, the version number in your compiled app will be 1.0.36.

To use:

1. In Xcode control-click your target and choose Add > New Build Phase > New Run Script Build Phase

2. Leave shell set to /bin/sh. Copy the code below (or grab from [gist](http://gist.github.com/506429)) and paste it into the Script panel

3. Close the dialog 

4. Drag the new build phase action so that it appears first in the list of build actions

5. Build your app

<script src="http://gist.github.com/506429.js?file=gistfile1.sh"></script>

This is a bit of a dirty one, but it works for me. If you have suggested improvements I'm all ears so please
leave a comment.

For more on the output of svnversion, run:

    $ svnversion --help
