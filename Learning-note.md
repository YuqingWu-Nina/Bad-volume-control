# Learning Note — bad-volume-control

## Goal

Create a small program called **bad-volume-control** together.

## Log

### 2026-09-22 — Project setup

- Created the project README and learning note.
- Next: define the intentionally frustrating volume-control interaction.

### 2026-09-22 — Interaction concept

- Chose **Catch the Volume People** as the working direction.
- The user will drag one of twenty moving numbered characters (`0` to `100` in steps of `5`) into a speaker-shaped basket to set the volume.
- The interface will use progressive hints so its unfamiliar interaction can be learned through play.

### 2026-09-22 — First playable version

- Built the webpage using separate `index.html`, `css/style.css`, and `js/script.js` files.
- Used an array to generate the numbered people from `0` to `100` in steps of `5`.
- Used pointer events to support both mouse dragging and touch dragging.
- Used rectangle overlap to detect when a person is dropped into the basket.
- Used the browser’s Web Audio API to make a test tone whose loudness matches the captured number.

## Questions to explore

- What makes a volume control feel "bad" in an interesting or funny way?
- What input should a person use?
- How should the program respond visually and/or with sound?
- What did we learn after testing it?
