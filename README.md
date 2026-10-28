# noch ein glas

A fictional wine bar website, designed and built as a portfolio project. Warm paper tones, expressive serif typography, handwritten notes and cinematic photography create the feeling of a long evening around a shared table.

## Features

- Responsive layout for desktop, tablet and mobile
- Food and drinks menu with ingredient descriptions and hand-drawn details
- Interactive reservation demo with date validation
- Accessible native dialogs with keyboard support
- Locally hosted Bodoni Moda and La Belle Aurore fonts

## Built with

Next.js App Router, React, TypeScript and CSS. Images are served through `next/image`; fonts use `next/font/local`.

## Run locally

```bash
npm ci
npm run dev
```

Open the local URL printed in the terminal.

```bash
npm run lint    # Check code quality
npm run build   # Create a production build
npm run start   # Serve the production build
```

## Project notes

This is a design concept, not an operating restaurant. Reservations are simulated locally and are neither sent nor stored. Menu items, prices and opening hours are sample content.

Photography and illustrations were created with AI for this concept. Refining the photography for a more natural, documentary feel is a planned next step. Website images live in `public/images/`.
