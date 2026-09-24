# Design — bad-volume-control

## Working idea: Catch the Volume People

Instead of a familiar slider, the user sets volume by catching a tiny person with the number they want and dropping them into a speaker-shaped basket (or “volume jail”).

## Core interaction

- Twenty tiny characters move around the screen independently.
- Each character has a volume value on their head: `0`, `5`, `10`, `15` … `100`.
- The user chooses a desired volume by dragging the matching character into the basket.
- When a character enters the basket, the program changes the volume to that number.

## Why this is intentionally unfamiliar

The interface does not reveal a conventional slider, dial, or plus/minus control. Users need to observe the numbers, discover that characters can be picked up, and learn that the basket controls the sound.

## Make it fun, not impossible

- People wander or run in different directions, so catching them feels like a tiny game.
- Higher-volume characters can move faster; the `0` character can be sleepy or slow.
- The chosen character stays in the basket and reacts to being “captured.”
- A clear display confirms the result, for example: `Volume: 60%`.

## Progressive hints

1. At the beginning: **“Find the number you want.”**
2. When the user touches a character: **“Catch them before they escape!”**
3. When a character is close to the basket: **“Drop a number here to set the volume.”**
4. After a successful drop: **“Volume: [number]%”**

## First-version scope

Build one screen with moving numbered people, one basket, drag-and-drop capture, a visible current-volume label, and a sound whose loudness changes with the selected number. We can add personality and more difficult behavior after this version works.
