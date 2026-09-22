# PackCheck

Reusable packing lists for the bags you pack over and over.

**Startup idea:** people re-pack the same gym bag, work-trip suitcase, and weekend duffel from memory every time - and forget something. PackCheck keeps the lists permanently: check items off as they go in, reset for the next trip, and flag essentials so the trip-ruining item can't slip through.

## Use

Open `app.html`. Create a list, add items (mark the critical ones essential), check them off while packing. The progress bar and "still missing" line track state; "Reset for next time" unpacks everything for the next trip. Data persists in localStorage.

## Engine

`engine.js` holds the pure list logic (dupe detection, progress, essential tracking, reset) and is covered by node tests. The UI is a thin render layer over it.

Part of the hourly app factory - 60+ small tools, one per hour.
