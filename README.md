# Shatter

Shatter is a gravity-well rock shooter. Fly a momentum-driven ship around a
wrapping field, curve gunfire around the central star, break armored rocks into
fragments, and save the homing torpedo for the dangerous ones.

## Run it

```sh
npm ci
npm run dev
```

Open the local Vite URL shown in the terminal. To make the static production
site, run `npm run build`; the complete site is written to `dist/`.

## Controls

- Arrow keys or WASD: turn and thrust
- Space: fire the gun
- F: launch the torpedo
- Enter or Space: select a menu item
- P or Escape: pause/resume; Escape backs out of menus
- M: mute audio

The torpedo recharges over ten seconds. The star pulls rocks and bullets, but
never the ship or torpedo, so careful positioning lets shots arc around it.
