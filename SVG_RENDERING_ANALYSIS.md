# SVG Rendering Analysis - Berm Thermal Flow Card

## Executive Summary

The SVG components ARE properly configured with dimensions and viewBox attributes. However, the invisible SVG issue is **NOT a sizing problem** - it's likely a **CSS display or parent container issue**. The SVG has proper constraints but may be hidden or positioned off-screen.

---

## 1. SVG Element Creation & Attributes

### Location
**File:** `/Users/beaubeau/Documents/GitHub/HALink/berm-thermal-flow-card/src/berm-thermal-flow-card.ts` (Line 269-291)

### SVG Creation Code
```typescript
private _renderSVG(cardState: CardState): TemplateResult {
  const flowLines = this._generateFlowLines(cardState);

  return html`
    <svg viewBox="0 0 ${LAYOUT.width} ${LAYOUT.height}" xmlns="http://www.w3.org/2000/svg">
      <!-- Flow lines (drawn first, behind nodes) -->
      <g class="flow-lines">
        ${flowLines.map(line => this._renderFlowLine(line))}
      </g>

      <!-- Outside temperature node -->
      ${this._renderOutsideNode(cardState)}

      <!-- Fan nodes -->
      <g class="fan-nodes">
        ${cardState.fans.map((fan, index) => this._renderFanNode(fan, index, cardState.fans.length))}
      </g>

      <!-- Room nodes -->
      <g class="room-nodes">
        ${cardState.rooms.map((room, index) => this._renderRoomNode(room, index, cardState.rooms.length))}
      </g>

      <!-- Greenhouse node (if enabled) -->
      ${cardState.greenhouse ? this._renderGreenhouseNode(cardState.greenhouse) : ''}
    </svg>
  `;
}
```

### SVG Attributes Present
- ✅ **viewBox:** `viewBox="0 0 1000 600"` (from LAYOUT constants)
- ✅ **xmlns:** `xmlns="http://www.w3.org/2000/svg"`
- ❌ **width/height:** NOT explicitly set on SVG element itself

---

## 2. Layout Configuration (LAYOUT Constants)

**File:** `/Users/beaubeau/Documents/GitHub/HALink/berm-thermal-flow-card/src/const.ts` (Lines 89-122)

### Dimensions
```typescript
export const LAYOUT = {
  // Card dimensions
  width: 1000,        // SVG viewBox width
  height: 600,        // SVG viewBox height
  
  // Node sizes
  outside_radius: 60,
  fan_radius: 45,
  room_radius: 50,
  greenhouse_radius: 55,
  
  // Vertical positions
  outside_y: 80,      // Top of visualization
  fan_y: 220,         // Middle tier
  room_y: 450,        // Bottom tier
  greenhouse_y: 560,  // Below rooms
  
  // Margins
  margin_left: 50,
  margin_top: 20,
  
  // Stroke widths
  stroke_width: 3,
  stroke_width_inactive: 1,
};
```

### Key Layout Points
- SVG viewBox dimensions: **1000 x 600 pixels**
- Aspect ratio: **1000:600 = 1.667:1**
- All nodes positioned within viewBox bounds:
  - Outside: y=80
  - Fans: y=220
  - Rooms: y=450
  - Greenhouse: y=560 (max, fits within 600)
- Node sizes adequate (radii: 45-60px)

---

## 3. Parent Container CSS

**File:** `/Users/beaubeau/Documents/GitHub/HALink/berm-thermal-flow-card/src/style.ts`

### SVG Container Styles
```css
.card-content {
  width: 100%;
  height: auto;        /* ⚠️ HEIGHT IS AUTO */
  position: relative;
}

svg {
  width: 100%;
  height: auto;        /* ⚠️ HEIGHT IS AUTO */
  aspect-ratio: 1000 / 600;  /* ✅ Aspect ratio set */
  display: block;      /* ✅ Proper display mode */
}
```

### CRITICAL FINDINGS

#### Issue 1: Height Auto with Aspect Ratio
- **CSS is correct:** `aspect-ratio: 1000 / 600` should work with `height: auto`
- **BUT:** Some browsers may not calculate the container height properly if parent has `height: auto`
- **Parent chain:** SVG → `.card-content` → `<ha-card>` → unknown parent

#### Issue 2: No Explicit Min/Max Height
```css
svg {
  width: 100%;
  height: auto;
  aspect-ratio: 1000 / 600;
  display: block;
}
```

**Missing constraints:**
- No `min-height`
- No `max-width` 
- No `overflow` property

---

## 4. Conditional Rendering Logic

**File:** `/Users/beaubeau/Documents/GitHub/HALink/berm-thermal-flow-card/src/berm-thermal-flow-card.ts`

### Render Method (Line 238-263)
```typescript
protected render(): TemplateResult {
  if (!this._config || !this.hass) {
    return html``;  // Empty if not configured
  }

  if (this._error) {
    return html`
      <ha-card>
        <div class="error">
          <div class="error-icon">⚠️</div>
          <div>${this._error}</div>
        </div>
      </ha-card>
    `;
  }

  const cardState = this._computeCardState();

  return html`
    <ha-card>
      <div class="card-content">
        ${this._renderSVG(cardState)}
      </div>
    </ha-card>
  `;
}
```

### Conditional Render Points
1. **Line 239-241:** Returns empty if `_config` or `hass` missing
2. **Line 243-251:** Shows error state if config validation fails
3. **SVG only renders** if both conditions pass
4. **No display:none** on SVG in normal flow

---

## 5. Content Structure Verification

### HTML Hierarchy
```
<ha-card>
  ├── padding: 16px
  ├── background: white (or theme color)
  └── <div class="card-content">
      ├── width: 100%
      ├── height: auto
      └── <svg viewBox="0 0 1000 600">
          ├── <g class="flow-lines"> ... </g>
          ├── <g class="outside-node"> ... </g>
          ├── <g class="fan-nodes"> ... </g>
          ├── <g class="room-nodes"> ... </g>
          └── <g class="greenhouse-node"> ... </g> (optional)
```

---

## 6. Potential Invisible SVG Causes

### Most Likely Issues (In Order)

#### 1. **Parent Container Collapse** (HIGHEST PROBABILITY)
- `.card-content` has `height: auto` but no content height forcing
- SVG has `height: auto` relying on aspect ratio
- If parent container width is narrow or zero, aspect ratio doesn't trigger

**Test:** Check if `.card-content` or `<ha-card>` has computed width

#### 2. **SVG Content Opacity/Color Issues** (MEDIUM PROBABILITY)
- Text fills not inheriting proper colors
- Node circles have `fill-opacity: 0.2` to `0.3` (semi-transparent)
- If background is white and circles are white, they'd be invisible

**Current colors:**
```typescript
// From _renderOutsideNode()
<circle cx="${x}" cy="${y}" r="${r}" fill="${outside.color}" fill-opacity="0.2" />

// outside.color comes from temperature-based gradient
// Could be #2196F3 (blue), #4CAF50 (green), #FF9800 (orange), etc.
```

#### 3. **Transform or Position Issues** (MEDIUM PROBABILITY)
- CSS `transform: translate()` off-screen
- `position: absolute` without positioning
- Parent with `overflow: hidden`

**No evidence in code, but possible due to shadow DOM**

#### 4. **SVG Viewbox Coordinate Mismatch** (LOW PROBABILITY)
- All nodes positioned within 0-1000, 0-600 bounds
- Y positions: 80 (outside) → 220 (fans) → 450 (rooms) → 560 (greenhouse)
- All valid within viewBox

#### 5. **CSS Display None** (LOW PROBABILITY)
- No `display: none` found in SVG or container CSS
- Responsive media queries don't hide SVG (< 768px) just resize text

---

## 7. Node Rendering Details

### Outside Node (Line 338-365)
```typescript
<g class="node ${CSS_CLASSES.outside}" data-entity="...">
  <circle cx="500" cy="80" r="60" fill="${color}" fill-opacity="0.2" />
  <text x="500" y="75" class="primary-text">72°F</text>
  <text x="500" y="95" class="secondary-text">+0.5°F/h</text>
  <text x="500" y="160" class="label-text">Outside</text>
</g>
```

### Fan Nodes (Line 367-397)
```typescript
<g class="node fan-node" data-fan-index="0">
  <circle cx="167" cy="220" r="45" fill="#808080" fill-opacity="0.3" />
  <text x="167" y="210" class="primary-text">5</text>
  <text x="167" y="230" class="secondary-text">43W</text>
  <text x="167" y="280" class="label-text">Garage</text>
  <!-- OFFLINE text if offline -->
</g>
```

### Room Nodes (Line 399-426)
```typescript
<g class="node room-node" data-room-index="0">
  <circle cx="200" cy="450" r="50" fill="${color}" fill-opacity="0.3" />
  <text x="200" y="445" class="primary-text">71°F</text>
  <text x="200" y="465" class="secondary-text">+1.0°F/h</text>
  <text x="200" y="530" class="label-text">Bedroom</text>
</g>
```

### Flow Lines (Line 294-311)
```typescript
<g class="flow-line-group">
  <path class="flow-line active" d="M 500 140 Q 500 180, 167 180 T 167 175" 
        stroke="${color}" stroke-width="3" />
  <!-- Animated dots if enabled -->
  <circle class="flow-dot" r="3" fill="${color}" 
          style="offset-path: path(...); animation: flow ..." />
</g>
```

---

## 8. CSS Class Styling

### Text Styles
```css
.primary-text {
  font-size: 18px;
  font-weight: bold;
  fill: var(--primary-text-color);  /* Should be dark (default #212121) */
  text-anchor: middle;
}

.secondary-text {
  font-size: 12px;
  fill: var(--secondary-text-color);  /* Default #727272 */
  text-anchor: middle;
}

.label-text {
  font-size: 14px;
  font-weight: 500;
  fill: var(--primary-text-color);
  text-anchor: middle;
}
```

### Node Circles
```css
.node circle {
  stroke-width: 2;
  stroke: var(--primary-text-color);
  transition: all 0.3s ease;
}
```

- Circles have `fill-opacity: 0.2-0.3` (semi-transparent background)
- Stroke always visible (2px, dark color)
- Text should be visible if colors are not white on white

---

## 9. Animation Styles

### Flow Animation
```css
@keyframes flow {
  0% {
    offset-distance: 0%;
    opacity: 0;
  }
  10% {
    opacity: 0.8;
  }
  90% {
    opacity: 0.8;
  }
  100% {
    offset-distance: 100%;
    opacity: 0;
  }
}

.flow-dot {
  animation: flow linear infinite;
}
```

**Potential Issue:** `offset-distance` and `offset-path` are **experimental CSS properties**
- Not all browsers support them
- May not animate dots properly
- Dots might be invisible if offset-path not supported

---

## Diagnostic Checklist

### To Debug the Invisible SVG Issue

1. **Check Container Dimensions**
   ```javascript
   // In browser console:
   const svg = document.querySelector('svg');
   const content = document.querySelector('.card-content');
   const card = document.querySelector('ha-card');
   
   console.log('SVG:', svg.getBoundingClientRect());
   console.log('Content:', content.getBoundingClientRect());
   console.log('Card:', card.getBoundingClientRect());
   ```

2. **Check Computed Styles**
   ```javascript
   const svg = document.querySelector('svg');
   const styles = window.getComputedStyle(svg);
   console.log('Display:', styles.display);
   console.log('Width:', styles.width);
   console.log('Height:', styles.height);
   console.log('Visibility:', styles.visibility);
   console.log('Opacity:', styles.opacity);
   console.log('Overflow:', styles.overflow);
   ```

3. **Check SVG Content**
   ```javascript
   const svg = document.querySelector('svg');
   console.log('SVG innerHTML:', svg.innerHTML);
   console.log('SVG children count:', svg.children.length);
   ```

4. **Check Text Colors**
   ```javascript
   const textElements = document.querySelectorAll('svg text');
   textElements.forEach(text => {
     const computed = window.getComputedStyle(text);
     console.log(`Text "${text.textContent}": fill=${computed.fill}, color=${computed.color}`);
   });
   ```

5. **Check Circle Visibility**
   ```javascript
   const circles = document.querySelectorAll('svg circle');
   circles.forEach(circle => {
     const computed = window.getComputedStyle(circle);
     console.log(`Circle at (${circle.cx.baseVal.value}, ${circle.cy.baseVal.value}): fill=${computed.fill}, stroke=${computed.stroke}`);
   });
   ```

---

## Recommended Fixes

### Issue: SVG Height Not Computing
**Fix:** Add explicit minimum height to SVG
```css
svg {
  width: 100%;
  height: auto;
  aspect-ratio: 1000 / 600;
  display: block;
  min-height: 300px;  /* Add this */
  background-color: transparent;  /* Explicitly set */
}
```

### Issue: Container Collapse
**Fix:** Set minimum width on parent
```css
.card-content {
  width: 100%;
  height: auto;
  position: relative;
  min-width: 300px;  /* Add this */
}
```

### Issue: Text Not Visible
**Fix:** Ensure color fallback
```css
:host {
  --primary-text-color: var(--primary-text-color, #212121);
  --secondary-text-color: var(--secondary-text-color, #727272);
  display: block;
}
```

### Issue: Dots Not Animating (offset-path unsupported)
**Fix:** Use alternative animation (getAnimationDuration is already calculating proper durations)
```typescript
// In style.ts, replace offset-path animation with:
@keyframes flow-along-path {
  0% { transform: translateY(-100%); opacity: 0; }
  10% { opacity: 0.8; }
  90% { opacity: 0.8; }
  100% { transform: translateY(100%); opacity: 0; }
}
```

---

## Summary Table

| Component | Status | Finding |
|-----------|--------|---------|
| SVG Element | ✅ Present | viewBox, xmlns attributes set |
| SVG Width | ❌ Missing | Not explicitly set (relies on CSS) |
| SVG Height | ❌ Missing | Not explicitly set (relies on aspect-ratio) |
| Aspect Ratio | ✅ Present | CSS aspect-ratio: 1000/600 |
| Parent Container | ⚠️ Auto | height: auto may not trigger |
| Node Content | ✅ Present | All nodes render to DOM |
| Text Colors | ⚠️ Depends | Colors from theme variables |
| Circle Opacity | ✅ Set | 0.2-0.3 fill-opacity |
| Layout Logic | ✅ Valid | All coordinates within bounds |
| Conditional Render | ✅ Correct | No unwanted display:none |

---

## Root Cause Assessment

**Most Likely:** Parent container width is not forcing SVG to calculate height via aspect-ratio. The `.card-content` element may have collapsed width (0 or very small) due to Home Assistant's dashboard context.

**Recommended First Fix:** Add explicit `min-height` to SVG and ensure `.card-content` has appropriate `min-width`.
