---
kind: article
created_at: 2012-02-02
title: Dated PDF Saver
---

**Update (29/2/12): Script tweaked to make sure that it generates a unique target filename rather than overwriting existing contents in the target directory.** (See updated code below. If you've got the version with the `unique_path` function you're good to go.)

Here's a nifty script I use to save emailed receipts as PDFs in a folder
hierarchy that includes the date (year and month) on which they were saved.
It helps keep my business receipts organised and saves me a bit of time
when I'm looking for receipts after the event. Hopefully you might find it
useful too. It's on Github so feel free to clone, tweak and share.

(Don't ask about the license. It's a 2-line shell script with 65 lines
of comments and context. It's free, in every possible sense of the word.)

<script src="https://gist.github.com/1722378.js"> </script>
<noscript><a href="https://gist.github.com/1722378">https://gist.github.com/1722378</a></noscript>