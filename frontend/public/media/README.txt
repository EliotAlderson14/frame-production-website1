DROP YOUR REAL FILMS HERE
==========================

This folder is served at /media — files you drop in are live on the site immediately.

1. Copy your exported videos here, e.g.   flow.mp4, mate-motors.mp4, showreel.mp4
   and their posters, e.g.                 flow-poster.jpg

2. Open  /app/frontend/src/data/projects.js

3. For each project change:
      video:  "/media/flow.mp4"
      poster: "/media/flow-poster.jpg"

4. The showreel is at the bottom of the same file:
      SHOWREEL_VIDEO  = "/media/showreel.mp4"
      SHOWREEL_POSTER = "/media/showreel-poster.jpg"

Until you swap them, the site plays royalty-free sample clips so nothing looks broken.
If a video file is missing, the player falls back to its poster automatically.
