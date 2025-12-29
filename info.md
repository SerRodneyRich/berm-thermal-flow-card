# Berm Thermal Flow Card

Visualize airflow from outside temperature through fans to rooms with real-time thermal analysis.

## Features

✨ **Visual Flow Diagram** - See airflow paths in real-time
🎨 **Temperature Color Coding** - Blue (cold) to red (hot) gradient
🔄 **Animated Flow Lines** - Dots move proportional to fan speed
📊 **Rate of Change Display** - Show °F/hour temperature trends
⚡ **Power Monitoring** - Display fan power consumption
🎛️ **Visual Configuration** - Configure through Home Assistant UI
📱 **Responsive Design** - Works on all devices

## Quick Start

### Minimal Configuration

```yaml
type: custom:berm-thermal-flow-card
entities:
  outside:
    temperature: sensor.outdoor_temperature
  fans:
    - name: Garage
      speed: input_number.fan_speed_garage
  rooms:
    - name: Garage
      temperature: sensor.garage_temperature
      fan_index: 0
```

### Use Cases

- **Berm Cooling Systems** - Monitor underground thermal mass cooling
- **Multi-Zone HVAC** - Visualize whole-home fan systems
- **Off-Grid Solar Homes** - Track power consumption and thermal efficiency
- **Smart Ventilation** - Optimize airflow based on conditions

## Configuration

The card supports:

- **6+ fans** with individual speed control and power monitoring
- **Unlimited rooms** with temperature and rate of change sensors
- **Static zones** (bathroom, hallway) without direct fan connections
- **Special zones** (greenhouse) that receive air from multiple sources
- **Offline handling** for temporarily unavailable fans
- **Custom colors** and temperature thresholds
- **Adjustable animations** (speed, dot size, etc.)

See the [full documentation](https://github.com/yourusername/berm-thermal-flow-card) for detailed configuration options.

## Power Consumption Tracking

The card includes a power consumption map based on fan speed (0-10):

- Speed 0: 0W (OFF)
- Speed 1: 15W
- Speed 5: 43W
- Speed 10: 65W (MAX)

Customize per-fan with the `power_map` option.

## About

Created for the HALink berm thermal control system - an off-grid solar home using underground thermal mass for efficient cooling.

Inspired by [power-flow-card-plus](https://github.com/flixlix/power-flow-card-plus).
