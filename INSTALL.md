# Quick Installation Guide

## Prerequisites

- Home Assistant 2024.1.0 or newer
- HACS (recommended) or manual installation capabilities
- Entity IDs for:
  - Outside temperature sensor
  - Fan speed inputs (0-10 scale)
  - Room temperature sensors
  - Optional: Rate of change sensors

## Method 1: Manual Installation (Fastest)

### Step 1: Copy the Card File

Copy the built JavaScript file to your Home Assistant configuration:

```bash
# From this directory, copy to Home Assistant
cp dist/berm-thermal-flow-card.js /path/to/homeassistant/config/www/
```

Or if using SSH/SFTP:
```bash
# Upload to your Home Assistant instance
scp dist/berm-thermal-flow-card.js homeassistant@your-ha-ip:/config/www/
```

### Step 2: Add Resource in Home Assistant

1. Open Home Assistant
2. Go to **Settings** → **Dashboards** → **Resources** (top right menu)
3. Click **"+ Add Resource"**
4. Enter:
   - **URL**: `/local/berm-thermal-flow-card.js`
   - **Resource type**: `JavaScript Module`
5. Click **"Create"**

### Step 3: Clear Browser Cache

Press `Ctrl + F5` (or `Cmd + Shift + R` on Mac) to clear cache

### Step 4: Restart Home Assistant

Settings → System → Restart

### Step 5: Add Card to Dashboard

1. Edit a dashboard
2. Click **"+ Add Card"**
3. Scroll to bottom and click **"Manual Card"**
4. Paste this minimal configuration:

```yaml
type: custom:berm-thermal-flow-card
entities:
  outside:
    temperature: sensor.mandalore_sensors_apparent_temperature
    rate: sensor.external_temp_rate
  fans:
    - name: Garage
      speed: input_number.last_commanded_fan_speed_garage
  rooms:
    - name: Garage
      temperature: sensor.new_device_2_temperature
      delta: sensor.garage_temp_delta
      fan_index: 0
```

5. Click **"Save"**

## Method 2: HACS Installation (Future)

*Note: HACS installation will be available after submitting to HACS repository*

1. Open HACS in Home Assistant
2. Click "Frontend"
3. Click "+" button
4. Search for "Berm Thermal Flow Card"
5. Click "Install"
6. Restart Home Assistant

## Full Configuration for HALink v7

For the complete HALink setup with all 6 fans, use this configuration:

```yaml
type: custom:berm-thermal-flow-card
entities:
  outside:
    temperature: sensor.mandalore_sensors_apparent_temperature
    rate: sensor.external_temp_rate
  fans:
    - name: Garage
      speed: input_number.last_commanded_fan_speed_garage
    - name: Cool Room
      speed: input_number.last_commanded_fan_speed_cool_room
    - name: Kitchen
      speed: input_number.last_commanded_fan_speed_kitchen
    - name: Living Room
      speed: input_number.last_commanded_fan_speed_living_room
    - name: Bedroom
      speed: input_number.last_commanded_fan_speed_bedroom
    - name: Office
      speed: input_number.last_commanded_fan_speed_office
      offline: true
  rooms:
    - name: Garage
      temperature: sensor.new_device_2_temperature
      delta: sensor.garage_temp_delta
      fan_index: 0
    - name: Cool Room
      temperature: sensor.new_device_5_temperature
      delta: sensor.cool_room_delta_temp
      fan_index: 1
    - name: Kitchen
      temperature: sensor.new_device_temperature
      delta: sensor.kitchen_delta_temp
      fan_index: 2
    - name: Living Room
      temperature: sensor.new_device_temperature
      delta: sensor.living_room_delta_temp
      fan_index: 3
    - name: Bedroom
      temperature: sensor.new_device_3_temperature
      delta: sensor.bedroom_delta_temp
      fan_index: 4
    - name: Bathroom
      temperature: sensor.bathroom_temperature
  greenhouse:
    temperature: sensor.greenhouse_temperature
    delta: sensor.greenhouse_delta_temp
    enabled: true
```

## Troubleshooting

### Card Not Showing

1. **Check browser console** (F12 → Console):
   - Look for errors
   - You should see: `BERM-THERMAL-FLOW-CARD 0.1.0`

2. **Verify resource is loaded**:
   - Settings → Dashboards → Resources
   - Should see `/local/berm-thermal-flow-card.js`

3. **Clear cache again**: `Ctrl + F5`

4. **Check file exists**:
   ```bash
   ls -lh /config/www/berm-thermal-flow-card.js
   ```

### "Custom element doesn't exist" Error

This means the card isn't loaded. Check:
- Resource URL is correct (`/local/` not `/www/`)
- Resource type is `JavaScript Module` (not ES5)
- File was actually copied to `www/` folder
- Home Assistant was restarted

### Entities Not Updating

1. **Verify entity IDs** in Developer Tools → States
2. **Check entities exist** and have valid states
3. **Ensure entities aren't "unavailable"**

### Flow Lines Not Animating

1. Check that `animation.enabled` is `true` (default)
2. Verify fan speeds are > 0
3. Ensure fans aren't marked as `offline: true`

### Colors Look Wrong

Check your `temperature_thresholds` and `colors` configuration.
Defaults:
- Cold: < 60°F (blue #2196F3)
- Comfort: 68-74°F (green)
- Hot: > 85°F (red #F44336)

## Verification

After installation, you should see:

1. **Outside temperature** node at top (with color based on temp)
2. **6 fan nodes** in middle row showing speeds 0-10
3. **Room nodes** at bottom showing temperatures
4. **Animated dots** moving along lines (if fans are running)
5. **Power consumption** displayed on fans (e.g., "43W" for speed 5)
6. **Rate of change** displayed on rooms (e.g., "+0.5°F/h")

## Next Steps

- Customize colors and thresholds to match your preferences
- Enable/disable features with `display` options
- Adjust animation speed with `animation` settings
- Add more fans/rooms as needed
- See `examples/example-config.yaml` for more configurations

## Support

For issues, check:
- README.md (full documentation)
- examples/example-config.yaml (configuration examples)
- CHANGELOG.md (version history and roadmap)

---

**Happy thermal monitoring!** 🌡️🌀❄️
