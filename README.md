# Esports Team Website Template

A single-page esports team website built for **EA FC26 Pro Clubs**. Dark red/black theme with gold accents, fully responsive. No framework dependencies beyond Tailwind CDN.

**Live preview:** [BayerLeverkuzen FC26](https://github.com/JadeitEnes/esports-template)

---

## Features

- Hero section with team emblem and animated title
- Stats bar (player count, founded year, platform, country)
- About section with mini stat boxes
- Player roster grid with hover jersey number effect
- Lion guard decorative layout flanking the roster
- Contact section with social media buttons
- Fully responsive down to mobile
- Scroll reveal animations
- Fixed navbar with scroll blur effect

## Tech Stack

- Vanilla HTML / CSS / JavaScript
- [Tailwind CSS](https://tailwindcss.com/) via CDN (utility layer only)
- [Google Fonts](https://fonts.google.com/) — Bebas Neue + Rajdhani
- No build step required

## Project Structure

```
/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── assets/
    └── images/
        ├── emblem.png
        ├── lion_left.png
        └── lion_right.png
```

## Getting Started

1. Clone or download the repo
2. Replace the images in `assets/images/` with your team's emblem and lion (or any mascot) images
3. Edit player data in `js/main.js` under the `PLAYERS` array
4. Update team name, colors and social links to match your team
5. Open `index.html` in a browser — no build step needed

## Customization

### Team Colors

Edit the CSS variables at the top of `css/style.css`:

```css
:root {
  --red:      #9B1C1C;  /* primary accent */
  --gold:     #C9A84C;  /* decorative gold */
  --bg:       #060202;  /* page background */
}
```

### Player Roster

Edit the `PLAYERS` array in `js/main.js`:

```js
const PLAYERS = [
  { num: 1,  pos: 'KAL' },
  { num: 9,  pos: 'FOR' },
  // ...
];
```

Positions: `KAL` (goalkeeper), `DEF` (defender), `OSA` (midfielder), `FOR` (forward).

When player photos and real jersey numbers are ready, update `buildPlayerCard()` in `main.js`.

### Social Links

Find the `.social-links` section in `index.html` and replace the `href="#"` values with your actual Discord, Twitter/X and Instagram URLs.

## Lion Images

The template uses landscape-oriented mascot images (recommended ratio ~3:2). The lions are positioned as flex columns flanking the roster grid and hide automatically on screens below 900px.

If you use a different mascot image, update the width in `css/style.css`:

```css
.lion-guard-img {
  width: 340px; /* adjust to your image */
  height: auto;
}
```

## License

MIT — free to use, modify and distribute.
