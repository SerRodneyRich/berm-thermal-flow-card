# HACS Compliance - Fix Summary

## Problem

Your repository at https://github.com/SerRodneyRich/berm-thermal-flow-card was showing:

```
Repository structure for master is not compliant
```

## Root Causes

1. **Card file not in root directory**: HACS expects `berm-thermal-flow-card.js` in the repository root, but it was only in `dist/`
2. **No release tag**: HACS requires at least one version tag (like `v0.1.0`) to function

## ✅ Fixes Applied

### 1. Updated Build System

**Modified**: `rollup.config.js`
- Now outputs to **both** root directory and `dist/`
- Root file: `berm-thermal-flow-card.js` (for HACS)
- Dist file: `dist/berm-thermal-flow-card.js` (for development)

**Modified**: `.gitignore`
- Added exception to include root `berm-thermal-flow-card.js` file
- Prevents accidentally ignoring the file HACS needs

**Result**: Card file now exists in root directory ✅

### 2. Repository Structure Now Compliant

```
SerRodneyRich/berm-thermal-flow-card/
├── berm-thermal-flow-card.js  ✅ ROOT LOCATION (HACS requirement)
├── hacs.json                   ✅ HACS metadata
├── info.md                     ✅ HACS store description
├── README.md                   ✅ Documentation
├── LICENSE                     ✅ MIT License
├── CHANGELOG.md                ✅ Version history
├── src/                        (TypeScript source)
├── dist/                       (Duplicate build output)
├── examples/                   (Configuration examples)
└── [other files...]
```

### 3. Created Release Documentation

**New files**:
- `GITHUB_RELEASE_INSTRUCTIONS.md` - Step-by-step release guide
- `release.sh` - Automated release script (executable)

## 🚀 What You Need to Do Now

### Quick Fix (3 Steps)

#### 1. Pull the Latest Changes

```bash
cd /path/to/berm-thermal-flow-card
git pull origin master
```

Or if you're working in a different location, push your local changes:

```bash
# From your local repo
git add .
git commit -m "Fix HACS compliance - add root card file"
git push origin master
```

#### 2. Create a Release Tag

```bash
# Create and push the v0.1.0 tag
git tag -a v0.1.0 -m "Release v0.1.0 - Initial release"
git push origin v0.1.0
```

**OR use the automated script**:

```bash
./release.sh
```

#### 3. Create GitHub Release

**Option A - GitHub Website** (Easiest):

1. Go to: https://github.com/SerRodneyRich/berm-thermal-flow-card/releases/new
2. Click **"Choose a tag"** → Select `v0.1.0`
3. **Title**: `v0.1.0 - Initial Release`
4. **Description**: Copy from `GITHUB_RELEASE_INSTRUCTIONS.md` or use:

```
Initial release of Berm Thermal Flow Card - visualize airflow from outside temperature through fans to rooms with thermal analysis.

Features:
- Visual flow diagram with animated flow lines
- Temperature-based color coding
- Power consumption tracking
- Rate of change display
- Support for 6+ fans and unlimited rooms
- HACS integration

See README for full documentation and configuration examples.
```

5. **(Optional)** Attach `berm-thermal-flow-card.js` as a release asset
6. Click **"Publish release"**

**Option B - GitHub CLI** (If installed):

```bash
gh release create v0.1.0 \
  --title "v0.1.0 - Initial Release" \
  --notes "Initial release. See README for documentation." \
  berm-thermal-flow-card.js
```

## ✅ Verification

After creating the release:

1. **Check HACS in Home Assistant**:
   - Go to HACS → Frontend → "..." menu → Custom repositories
   - Add: `https://github.com/SerRodneyRich/berm-thermal-flow-card`
   - Category: `Lovelace`
   - Should now show **without errors** ✅

2. **Search for the card**:
   - HACS → Frontend → "+" button
   - Search: "Berm Thermal Flow"
   - Should appear in results ✅

3. **Install via HACS**:
   - Click the card
   - Click "Download"
   - Restart Home Assistant
   - Add to dashboard ✅

## Current Status

| Item | Status |
|------|--------|
| Card file in root | ✅ Fixed |
| hacs.json present | ✅ Yes |
| info.md present | ✅ Yes |
| README.md present | ✅ Yes |
| Build system updated | ✅ Done |
| .gitignore updated | ✅ Done |
| Release tag created | ⏳ **YOU NEED TO DO THIS** |
| GitHub release created | ⏳ **YOU NEED TO DO THIS** |

## Files Changed

```diff
Modified:
  .gitignore              (allow root JS file)
  rollup.config.js        (output to root + dist)

Added:
  berm-thermal-flow-card.js           (root - HACS requirement)
  GITHUB_RELEASE_INSTRUCTIONS.md      (how to create release)
  HACS_FIX_SUMMARY.md                 (this file)
  release.sh                          (automated release script)
```

## Testing the Fix

After creating the release, test the installation:

```yaml
# In Home Assistant dashboard
type: custom:berm-thermal-flow-card
entities:
  outside:
    temperature: sensor.outdoor_temperature
  fans:
    - name: Test Fan
      speed: input_number.test_fan_speed
  rooms:
    - name: Test Room
      temperature: sensor.test_room_temp
      fan_index: 0
```

## Need Help?

See detailed instructions in:
- `GITHUB_RELEASE_INSTRUCTIONS.md` - Full release guide
- `INSTALL.md` - Installation instructions
- `README.md` - Complete documentation

---

## TL;DR - Commands to Run

```bash
# 1. Make sure latest code is pushed
git push origin master

# 2. Create and push release tag
git tag -a v0.1.0 -m "Release v0.1.0"
git push origin v0.1.0

# 3. Create GitHub release
# Go to: https://github.com/SerRodneyRich/berm-thermal-flow-card/releases/new
# Or use: ./release.sh
```

**After release is published, HACS compliance error will be gone!** ✅
