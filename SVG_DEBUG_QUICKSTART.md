# SVG Invisible Issue - Quick Debug Guide

## Problem
SVG components appear to exist in the DOM (console logs show them), but they're not visible in the UI.

## Root Cause Analysis

### Most Likely Culprits (in order of probability):

1. **SVG Container Collapse** (60% probability)
   - `.card-content` has `height: auto` but may have zero width
   - Aspect ratio CSS (`aspect-ratio: 1000 / 600`) cannot calculate height without a valid width
   - Result: SVG renders but with 0 height

2. **Text/Circle Color Issues** (20% probability)
   - Text colors not set or inheriting white on white background
   - Circle fill-opacity (0.2-0.3) may be too transparent
   - Result: Content exists but not visible

3. **Shadow DOM Scoping** (10% probability)
   - CSS not applying in Shadow DOM context
   - Home Assistant theme variables not available

4. **CSS Property Support** (10% probability)
   - `offset-path` animation not supported in browser
   - Flow dots use experimental CSS properties

---

## Instant Debug (Copy-Paste to Console)

```javascript
// Check if SVG exists
const svg = document.querySelector('svg');
console.log('SVG found:', !!svg);

// Check container dimensions
const container = document.querySelector('.card-content');
const containerRect = container?.getBoundingClientRect();
console.log('Container dimensions:', {
  width: containerRect?.width,
  height: containerRect?.height,
  visible: containerRect?.width > 0 && containerRect?.height > 0
});

// Check SVG computed styles
const svgRect = svg?.getBoundingClientRect();
const svgStyles = window.getComputedStyle(svg);
console.log('SVG computed dimensions:', {
  width: svgStyles.width,
  height: svgStyles.height,
  aspectRatio: svgStyles.aspectRatio,
  display: svgStyles.display,
  visibility: svgStyles.visibility,
  opacity: svgStyles.opacity,
  overflow: svgStyles.overflow,
  boundingRect: {
    width: svgRect?.width,
    height: svgRect?.height,
    top: svgRect?.top,
    left: svgRect?.left
  }
});

// Check SVG content
console.log('SVG elements:', {
  circles: svg?.querySelectorAll('circle').length,
  text: svg?.querySelectorAll('text').length,
  paths: svg?.querySelectorAll('path').length,
  groups: svg?.querySelectorAll('g').length
});

// Check text colors
const firstText = svg?.querySelector('text');
if (firstText) {
  const textStyle = window.getComputedStyle(firstText);
  console.log('Text style sample:', {
    fill: textStyle.fill,
    color: textStyle.color,
    fontSize: textStyle.fontSize,
    fontFamily: textStyle.fontFamily
  });
}

// Check circle fill colors
const firstCircle = svg?.querySelector('circle');
if (firstCircle) {
  const circleStyle = window.getComputedStyle(firstCircle);
  console.log('Circle style sample:', {
    fill: circleStyle.fill,
    fillOpacity: circleStyle.fillOpacity,
    stroke: circleStyle.stroke,
    strokeWidth: circleStyle.strokeWidth
  });
}
```

---

## Quick Fixes to Try

### Fix 1: Add Explicit SVG Height (30 seconds)

Edit `/src/style.ts`, change:
```css
svg {
  width: 100%;
  height: auto;
  aspect-ratio: 1000 / 600;
  display: block;
}
```

To:
```css
svg {
  width: 100%;
  height: auto;
  aspect-ratio: 1000 / 600;
  display: block;
  min-height: 400px;
  background-color: transparent;
}
```

### Fix 2: Ensure Container Has Width (30 seconds)

Edit `/src/style.ts`, add to `.card-content`:
```css
.card-content {
  width: 100%;
  height: auto;
  position: relative;
  min-width: 400px;
}
```

### Fix 3: Force Theme Colors (1 minute)

Edit `/src/style.ts`, update `:host` block:
```css
:host {
  display: block;
  --primary-text-color: var(--primary-text-color, #212121);
  --secondary-text-color: var(--secondary-text-color, #727272);
  --divider-color: var(--divider-color, rgba(0, 0, 0, 0.12));
}
```

### Fix 4: Add Fallback Circle Colors (2 minutes)

In `/src/berm-thermal-flow-card.ts`, update circle rendering to ensure visible colors:
```typescript
private _renderOutsideNode(cardState: CardState): TemplateResult {
  // ... existing code ...
  return html`
    <g class="node ${CSS_CLASSES.outside}" data-entity="${this._config!.entities.outside.temperature}">
      <circle cx="${x}" cy="${y}" r="${r}" 
              fill="${outside.color}" 
              fill-opacity="0.3" 
              stroke="${outside.color}" 
              stroke-width="2" />
      <!-- rest of code -->
    </g>
  `;
}
```

---

## File Locations Quick Reference

| Issue | File | Lines |
|-------|------|-------|
| SVG Element Creation | `src/berm-thermal-flow-card.ts` | 265-291 |
| SVG Container CSS | `src/style.ts` | 24-35 |
| Layout Constants | `src/const.ts` | 89-122 |
| Node Rendering | `src/berm-thermal-flow-card.ts` | 338-454 |
| Color Logic | `src/utils/helpers.ts` | 18-53 |
| Theme Variables | `src/style.ts` | 4-10 |

---

## Testing After Fix

1. **Rebuild the card:**
   ```bash
   npm run build
   ```

2. **Check console for errors:**
   - Any JS errors?
   - Any CSS warnings?

3. **Run debug script again:**
   ```javascript
   // Copy-paste the "Instant Debug" script above
   ```

4. **Visual inspection:**
   - Can you see SVG circle strokes (2px borders)?
   - Can you see text (temperature values)?
   - Are flow lines visible?
   - Do animated dots animate?

---

## If Still Not Working

1. **Check Shadow DOM:**
   - Right-click card → Inspect
   - Look for `#shadow-root (open)` or `#shadow-root (closed)`
   - Check if styles are scoped

2. **Check Theme:**
   - Home Assistant theme variables loaded?
   - Try forcing colors in debug console:
   ```javascript
   const svg = document.querySelector('svg');
   const text = svg?.querySelector('text');
   if (text) text.setAttribute('style', 'fill: #000000 !important;');
   ```

3. **Check Browser Support:**
   - Browser console for CSS errors
   - `offset-path` is experimental, may not work
   - Try alternative animation approach

4. **Check Card Configuration:**
   - Are entities valid and returning data?
   - Is config validation passing?
   - Check Home Assistant logs for card errors

---

## Files Provided

- `SVG_RENDERING_ANALYSIS.md` - Comprehensive 8-section analysis with code snippets
- `SVG_DEBUG_QUICKSTART.md` - This file, quick reference and debugging steps

Start with the debug script, then apply Fix 1 and Fix 2 in order.
