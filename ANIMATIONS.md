# SVG Header Animations

This document describes the configurable SVG animation system for the header logo.

## Usage

**Interactive**: Click the header logo to cycle through all available animations.

**Console feedback**: Each click logs the current animation name and description to the browser console.

## Configuration

Edit `ANIMATION_CONFIG` in `js/main.js` to customize behavior:

```javascript
const ANIMATION_CONFIG = {
  // Set default animation on page load
  defaultAnimation: null,  // Change to any animation ID below, or null for none

  // Available animations (can be reordered or removed)
  animations: [ /* ... */ ]
};
```

## Available Animations

| Animation ID | Name | Description |
|--------------|------|-------------|
| `null` | None | No filter effect (default) |
| `starlight-extinction` | Starlight Extinction | Turbulent displacement effect with animated frequency |

## Examples

### Set a default animation on page load

```javascript
const ANIMATION_CONFIG = {
  defaultAnimation: 'starlight-extinction',  // Starts with glow effect
  animations: [ /* ... */ ]
};
```

### Reduce available animations

```javascript
const ANIMATION_CONFIG = {
  defaultAnimation: null,
  animations: [
    { id: null, name: 'None', description: 'No filter effect' },
    { id: 'glow-pulse', name: 'Glow Pulse', description: 'Colored glow effect' },
    { id: 'color-shift', name: 'Color Shift', description: 'Animated hue rotation' }
  ]
};
```

### Reorder animation cycle

Change the order of items in the `animations` array to customize the click sequence.

## Adding Custom Animations

1. **Add SVG filter definition** in `index.html` within the `<svg>` element:
```html
<filter id="my-custom-effect">
  <!-- Your SVG filter primitives -->
</filter>
```

2. **Register in config** in `js/main.js`:
```javascript
animations: [
  // ... existing animations
  { id: 'my-custom-effect', name: 'My Effect', description: 'Custom animation' }
]
```

## Browser Support

All animations use standard SVG filter primitives supported in modern browsers. Some complex filters may impact performance on low-end devices.
