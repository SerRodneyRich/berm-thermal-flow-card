# Berm Thermal Flow Card

A custom Home Assistant card to visualize airflow from outside temperature through fans to rooms with real-time thermal analysis. Perfect for monitoring off-grid berm cooling systems, HVAC automation, and multi-zone temperature control.

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)
![HACS](https://img.shields.io/badge/HACS-Custom-orange.svg)

## Features

- **Visual Flow Diagram**: See airflow from outside → fans → rooms in real-time
- **Animated Flow Lines**: Dots move along paths proportional to fan speed
- **Temperature Color Coding**: Gradient colors from blue (cold) to red (hot)
- **Rate of Change Display**: Show °F/hour temperature trends for each zone
- **Power Monitoring**: Display fan power consumption (watts) based on speed
- **Flexible Configuration**: Support for 6+ fans, unlimited rooms, static zones, and greenhouse
- **Visual Configuration Editor**: Configure the card through Home Assistant UI
- **Offline Fan Handling**: Gracefully handle offline/unavailable fans
- **Responsive Design**: Works on desktop, tablet, and mobile

## Installation

### HACS (Recommended)

1. Open HACS in your Home Assistant instance
2. Click on "Frontend"
3. Click the "+" button
4. Search for "Berm Thermal Flow Card"
5. Click "Install"
6. Restart Home Assistant

### Manual Installation

1. Download `berm-thermal-flow-card.js` from the [latest release](https://github.com/yourusername/berm-thermal-flow-card/releases)
2. Copy it to `config/www/berm-thermal-flow-card/berm-thermal-flow-card.js`
3. Add the resource in Home Assistant:
   - Go to Settings → Dashboards → Resources
   - Click "Add Resource"
   - URL: `/local/berm-thermal-flow-card/berm-thermal-flow-card.js`
   - Resource type: `JavaScript Module`
4. Restart Home Assistant

## Configuration

### Minimal Configuration

```yaml
type: custom:berm-thermal-flow-card
entities:
  outside:
    temperature: sensor.outdoor_temperature
  fans:
    - name: Garage
      speed: input_number.last_commanded_fan_speed_garage
  rooms:
    - name: Garage
      temperature: sensor.garage_temperature
      fan_index: 0
```

### Full Configuration Example

```yaml
type: custom:berm-thermal-flow-card
entities:
  outside:
    temperature: sensor.mandalore_sensors_apparent_temperature
    rate: sensor.external_temp_rate
  fans:
    - name: Garage
      speed: input_number.last_commanded_fan_speed_garage
      icon: mdi:fan
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
      offline: true  # Mark as offline
  rooms:
    - name: Garage
      temperature: sensor.new_device_2_temperature
      delta: sensor.garage_temp_delta
      desired_temp: input_number.desired_temp_garage
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
      # No fan_index = static room (no fan connection)
  greenhouse:
    temperature: sensor.greenhouse_temperature
    delta: sensor.greenhouse_delta_temp
    enabled: true
colors:
  cold: "#2196F3"
  comfort_low: "#4CAF50"
  comfort_high: "#8BC34A"
  warm: "#FF9800"
  hot: "#F44336"
temperature_thresholds:
  cold: 60
  comfort_low: 68
  comfort_high: 74
  warm: 78
  hot: 85
animation:
  enabled: true
  min_flow_rate: 0.75  # Fastest (speed 10)
  max_flow_rate: 6     # Slowest (speed 1)
  dot_size: 6
  dots_per_line: 3
display:
  show_power: true
  show_rate_of_change: true
  temperature_unit: F
  compact_mode: false
  show_labels: true
```

## Configuration Options

### Required

| Option | Type | Description |
|--------|------|-------------|
| `entities.outside.temperature` | string | Entity ID for outside temperature sensor |
| `entities.fans` | array | Array of fan configurations |
| `entities.rooms` | array | Array of room configurations |

### Fan Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `name` | string | **Required** | Display name for the fan |
| `speed` | string | **Required** | Entity ID for fan speed (0-10 scale) |
| `power_map` | object | v7 defaults | Custom power consumption map (speed → watts) |
| `icon` | string | `mdi:fan` | Custom icon |
| `offline` | boolean | `false` | Mark fan as offline |

### Room Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `name` | string | **Required** | Display name for the room |
| `temperature` | string | **Required** | Entity ID for room temperature sensor |
| `delta` | string | - | Entity ID for rate of change sensor (°F/h) |
| `fan_index` | number | - | Index of connected fan (omit for static rooms) |
| `desired_temp` | string | - | Entity ID for desired temperature (for color coding) |
| `icon` | string | `mdi:home-thermometer` | Custom icon |

### Optional

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `colors` | object | See defaults | Color configuration for temperature gradient |
| `temperature_thresholds` | object | See defaults | Temperature thresholds for color coding (°F) |
| `animation` | object | See defaults | Animation configuration |
| `display` | object | See defaults | Display options |

## Power Consumption Map

The default power map (from v7 automation):

```yaml
power_map:
  "0": 0
  "1": 15
  "2": 22
  "3": 29
  "4": 36
  "5": 43
  "6": 50
  "7": 54
  "8": 58
  "9": 62
  "10": 65
```

You can override this per-fan with a custom `power_map`.

## Development

### Building from Source

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Build and watch for changes
npm run watch

# Run linter
npm run lint

# Format code
npm run format
```

### Project Structure

```
berm-thermal-flow-card/
├── src/
│   ├── berm-thermal-flow-card.ts       # Main card component
│   ├── berm-thermal-flow-card-config.ts # Configuration handler
│   ├── types.ts                         # TypeScript interfaces
│   ├── const.ts                         # Constants and defaults
│   ├── style.ts                         # CSS-in-JS styling
│   ├── components/                      # Reusable components
│   ├── ui-editor/                       # Visual configuration editor
│   └── utils/
│       └── helpers.ts                   # Utility functions
├── dist/
│   └── berm-thermal-flow-card.js       # Bundled output
├── package.json
├── tsconfig.json
├── rollup.config.js
└── README.md
```

## Troubleshooting

### Card Not Showing

1. Clear browser cache (Ctrl+F5)
2. Check browser console for errors
3. Verify resource is added in Settings → Dashboards → Resources
4. Restart Home Assistant

### Entities Not Updating

1. Check entity IDs are correct
2. Verify entities exist in Developer Tools → States
3. Check that entities have valid states (not "unavailable" or "unknown")

### Flow Lines Not Animating

1. Ensure `animation.enabled` is `true`
2. Check that fan speeds are > 0
3. Verify fans are not marked as `offline`
4. Try reducing `dots_per_line` if performance is an issue

## Credits

Inspired by [power-flow-card-plus](https://github.com/flixlix/power-flow-card-plus) by [@flixlix](https://github.com/flixlix).

Built for the HALink project's berm thermal control system.

## License

MIT License - see LICENSE file for details

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Support

For issues and feature requests, please use the [GitHub issue tracker](https://github.com/yourusername/berm-thermal-flow-card/issues).
