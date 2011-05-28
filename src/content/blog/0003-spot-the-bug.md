---
kind: article
created_at: 2010-08-24
title: Spot the bug
---

This code is supposed to show an instructions view when you rotate from landscape to portrait, but sometimes it doesn't quite perform as expected. Can you see why?

    - (void)didRotateFromInterfaceOrientation:(UIInterfaceOrientation)fromInterfaceOrientation
    {
        if (UIInterfaceOrientationIsLandscape(fromInterfaceOrientation)) {
            // Fade in instructions
            [self setInstructionsOpacity:1.0 overTime:0.5];
        }
    }