# GitHub Release Instructions for HACS Compliance

## Why This Is Needed

HACS requires repositories to have at least one release with a version tag. The current error `"Repository structure for master is not compliant"` happens because:

1. HACS needs a release tag (like `v0.1.0`)
2. The release must include the card file (`berm-thermal-flow-card.js`)

## Step-by-Step Instructions

### 1. Verify Your Files Are Committed

Make sure all files are committed and pushed to GitHub:

```bash
# Check current status
git status

# If there are uncommitted changes:
git add .
git commit -m "Initial release: v0.1.0 - Berm Thermal Flow Card"
git push origin master
```

### 2. Create a Git Tag

Create a version tag for the release:

```bash
# Create the tag
git tag -a v0.1.0 -m "Release v0.1.0 - Initial release"

# Push the tag to GitHub
git push origin v0.1.0
```

### 3. Create a GitHub Release

#### Option A: Via GitHub Website (Recommended)

1. Go to your repository: https://github.com/SerRodneyRich/berm-thermal-flow-card
2. Click on **"Releases"** (right side of the page)
3. Click **"Create a new release"** or **"Draft a new release"**
4. Fill in the form:
   - **Tag version**: Select `v0.1.0` (the tag you just created)
   - **Release title**: `v0.1.0 - Initial Release`
   - **Description**: Copy the content below

```markdown
# Berm Thermal Flow Card v0.1.0

Initial release of the Berm Thermal Flow Card for Home Assistant.

## Features

- Visual flow diagram showing airflow from outside → fans → rooms
- Animated flow lines with dots moving proportional to fan speed
- Temperature-based color coding (blue for cold, red for hot)
- Rate of change display (°F/h) for all temperature zones
- Power consumption display for fans based on speed (0-10 scale)
- Support for 6+ fans with individual configuration
- Support for unlimited rooms with flexible fan connections
- Static room support (rooms without direct fan connections)
- Greenhouse/special zone support
- Offline fan handling (gracefully show unavailable fans)
- Customizable color gradients and temperature thresholds
- Configurable animation settings
- Responsive design for all screen sizes

## Installation

### Via HACS (Recommended)

1. Open HACS in your Home Assistant instance
2. Click on "Frontend"
3. Click the "+" button
4. Search for "Berm Thermal Flow Card"
5. Click "Install"
6. Restart Home Assistant

### Manual Installation

1. Download `berm-thermal-flow-card.js` from this release
2. Copy it to `config/www/berm-thermal-flow-card.js`
3. Add resource in Home Assistant (Settings → Dashboards → Resources)
   - URL: `/local/berm-thermal-flow-card.js`
   - Type: `JavaScript Module`
4. Restart Home Assistant

## Minimal Configuration

```yaml
type: custom:berm-thermal-flow-card
entities:
  outside:
    temperature: sensor.outdoor_temperature
  fans:
    - name: Fan 1
      speed: input_number.fan_1_speed
  rooms:
    - name: Room 1
      temperature: sensor.room_1_temperature
      fan_index: 0
```

See [README](https://github.com/SerRodneyRich/berm-thermal-flow-card) for full documentation.

## What's Changed

Initial release with all core features.

**Full Changelog**: https://github.com/SerRodneyRich/berm-thermal-flow-card/commits/v0.1.0
```

5. **Attach Files** (Optional but recommended):
   - You can attach `berm-thermal-flow-card.js` as a release asset

6. Click **"Publish release"**

#### Option B: Via GitHub CLI

If you have GitHub CLI installed:

```bash
# Create release with the tag
gh release create v0.1.0 \
  --title "v0.1.0 - Initial Release" \
  --notes "Initial release of Berm Thermal Flow Card. See README for full documentation." \
  berm-thermal-flow-card.js
```

### 4. Update HACS Repository List

After creating the release:

1. Go to HACS in Home Assistant
2. Click **"Frontend"** → **"Custom repositories"**
3. Add your repository:
   - **Repository**: `https://github.com/SerRodneyRich/berm-thermal-flow-card`
   - **Category**: `Lovelace`
4. Click **"Add"**

### 5. Verify HACS Can See It

1. In HACS, search for "Berm Thermal Flow Card"
2. It should now appear without errors
3. You can install it directly from HACS

## Troubleshooting

### "Repository structure not compliant" Error

This error appears if:
- No release tag exists (fix: create `v0.1.0` tag as shown above)
- `hacs.json` is missing or incorrect (already correct in your repo)
- `berm-thermal-flow-card.js` is not in the root directory (already fixed)

### "No releases found"

Make sure you:
1. Created a git tag: `git tag v0.1.0`
2. Pushed the tag: `git push origin v0.1.0`
3. Created a GitHub release using that tag

### HACS Can't Find the Repository

Make sure:
- Repository is public (not private)
- You're using the correct URL format
- The release was published (not just drafted)

## Current Repository Structure (Compliant)

```
SerRodneyRich/berm-thermal-flow-card/
├── berm-thermal-flow-card.js  ✅ (Root directory - HACS requirement)
├── hacs.json                   ✅ (HACS metadata)
├── info.md                     ✅ (HACS info page)
├── README.md                   ✅ (Documentation)
├── LICENSE                     ✅ (MIT License)
├── src/                        (Source code)
├── dist/                       (Build output - also contains copy)
└── examples/                   (Configuration examples)
```

## Next Steps After Release

1. Test installation via HACS
2. Install the card on your Home Assistant instance
3. Configure with your v7 automation entities
4. Report any issues on GitHub Issues tab

---

**Need help?** Open an issue at: https://github.com/SerRodneyRich/berm-thermal-flow-card/issues
