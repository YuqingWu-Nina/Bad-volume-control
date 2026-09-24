# bad-volume-control

A small interactive-media program that playfully explores a deliberately bad way to control volume.

## Project status

The first playable version is complete: drag a numbered person into the speaker basket to set the volume, then use the test-sound button to hear the selected loudness.

## How to run

No installation is needed.

1. Open `index.html` in a modern web browser.
2. Drag a numbered person into the pink speaker basket.
3. Press **Play test sound** to hear the current volume.

For a local development server, run `python3 -m http.server 8000` in this folder and visit `http://localhost:8000`.

## Files

- `README.md` — project overview and run instructions.
- `Learning-note.md` — ongoing record of decisions, experiments, and lessons.
- `Design.md` — interaction concept and first-version design.
- `index.html` — page structure and accessible labels.
- `css/style.css` — colors, layout, characters, and basket appearance.
- `js/script.js` — movement, dragging, volume state, and the test sound.
