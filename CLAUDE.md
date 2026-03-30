# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Panchosoft.com is a modern link tree-style portfolio website built with vanilla HTML, CSS, and JavaScript. It uses Vite as the build tool and development server. The site features animated SVG effects, rotating text descriptions, and social media links.

Live site: https://panchosoft.com

## Development Commands

```bash
# Start development server (accessible on network via --host flag)
npm run dev

# Build for production (outputs to dist/)
npm run build

# Preview production build locally
npm run preview
```

## Project Structure

- `index.html` - Main entry point with full page markup
- `js/main.js` - Core JavaScript functionality (animations, text rotation, year updater)
- `css/` - Stylesheets (reset.css, main.css)
- `public/` - Static assets served as-is (icons, images, fonts, manifest.json)
- `vite.config.js` - Vite configuration with `base: "./"` for relative paths

## Architecture

**Vanilla JavaScript approach**: No frameworks or build-time transpilation. The codebase uses plain DOM manipulation and ES6 modules.

**Key functions in main.js**:
- `animateHeader()` - Cycles through SVG filter animations on header click
- `rotateText(strings, seconds)` - Cycles through text array in typewriter element
- `updateYear()` - Updates copyright year dynamically
- `getCurrentAnimation()` - Returns current animation info (debugging/UI helper)

**SVG animations**: Header includes 7 inline SVG filter effects:
1. **Starlight Extinction** - Turbulent displacement with animated baseFrequency/scale

**Animation configuration**: The `ANIMATION_CONFIG` object in main.js controls:
- `defaultAnimation` - Animation shown on page load (null = none)
- `animations` array - Defines available filters in cycle order

To change the default animation, modify `ANIMATION_CONFIG.defaultAnimation` to any filter ID ('starlight-extinction', 'color-shift', etc.) or null for no animation.

**PWA support**: Includes manifest.json and apple-touch-icons for progressive web app functionality.

## Technical Constraints

- Requires Node.js >=18.0.0
- No TypeScript, no build-time compilation
- No test suite or linting configured
- Google Analytics is hardcoded in index.html (ID: G-JNND50LTT0)

## Making Changes

When modifying functionality:
- Keep JavaScript vanilla (no framework dependencies)
- Maintain the simple, single-page structure
- Static assets go in `public/` (copied as-is by Vite)
- Source files (HTML, CSS, JS) are processed by Vite during build
