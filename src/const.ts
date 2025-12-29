import { FanPowerMap, ColorConfig, TemperatureThresholds, AnimationConfig, DisplayConfig } from './types';

/**
 * Card version
 */
export const CARD_VERSION = '0.1.0';

/**
 * Card type identifier
 */
export const CARD_TYPE = 'berm-thermal-flow-card';

/**
 * Default fan power consumption map (from v7 automation)
 * Maps fan speed (0-10) to power consumption in watts
 */
export const DEFAULT_FAN_POWER_MAP: FanPowerMap = {
  '0': 0,
  '1': 15,
  '2': 22,
  '3': 29,
  '4': 36,
  '5': 43,
  '6': 50,
  '7': 54,
  '8': 58,
  '9': 62,
  '10': 65,
};

/**
 * Default color configuration
 */
export const DEFAULT_COLORS: ColorConfig = {
  cold: '#2196F3',        // Blue
  comfort_low: '#4CAF50', // Green
  comfort_high: '#8BC34A',// Light green
  warm: '#FF9800',        // Orange
  hot: '#F44336',         // Red
};

/**
 * Default temperature thresholds (°F)
 */
export const DEFAULT_TEMPERATURE_THRESHOLDS: TemperatureThresholds = {
  cold: 60,
  comfort_low: 68,
  comfort_high: 74,
  warm: 78,
  hot: 85,
};

/**
 * Default animation configuration
 */
export const DEFAULT_ANIMATION: AnimationConfig = {
  enabled: true,
  min_flow_rate: 0.75,    // Fastest (for speed 10)
  max_flow_rate: 6,       // Slowest (for speed 1)
  dot_size: 6,
  dots_per_line: 3,
};

/**
 * Default display configuration
 */
export const DEFAULT_DISPLAY: DisplayConfig = {
  show_power: true,
  show_rate_of_change: true,
  temperature_unit: 'F',
  compact_mode: false,
  show_labels: true,
};

/**
 * Default icons
 */
export const DEFAULT_ICONS = {
  fan: 'mdi:fan',
  room: 'mdi:home-thermometer',
  outside: 'mdi:weather-partly-cloudy',
  greenhouse: 'mdi:greenhouse',
  offline: 'mdi:fan-off',
};

/**
 * SVG layout constants (in pixels)
 */
export const LAYOUT = {
  // Card dimensions - PROPERLY DESIGNED
  width: 1200,
  height: 850,

  // Node sizes - CALCULATED to fit 6 rooms
  outside_radius: 100,
  fan_radius: 0,  // No fan circles!
  room_radius: 55,  // 110px diameter
  greenhouse_radius: 100,

  // 3-column positions (Outside | Rooms | Greenhouse)
  outside_x: 200,        // Column 1 (left)
  room_x: 600,           // Column 2 (middle)
  greenhouse_x: 1000,    // Column 3 (right)

  // Vertical positions - DESIGNED LAYOUT
  // 6 rooms × 125px per slot = 750px, centered in 850px card
  outside_y: 425,        // Outside centered vertically
  room_start_y: 112,     // Start with 50px margin, first room center at 112 (50 + 55 + 7)
  room_spacing: 125,     // 110px diameter + 15px gap = 125px between centers
  greenhouse_y: 425,     // Greenhouse centered vertically

  // Margins
  margin_left: 80,
  margin_top: 50,

  // Text sizes
  primary_font_size: 28,
  secondary_font_size: 16,
  label_font_size: 20,

  // Icon sizes
  icon_size: 48,

  // Animation
  stroke_width: 8,  // THICK flow lines
  stroke_width_inactive: 3,
};

/**
 * Entity state unavailable/unknown values
 */
export const UNAVAILABLE_STATES = ['unavailable', 'unknown', 'none'];

/**
 * Temperature unit conversion
 */
export const TEMP_CONVERSION = {
  F_to_C: (f: number) => (f - 32) * 5 / 9,
  C_to_F: (c: number) => c * 9 / 5 + 32,
};

/**
 * CSS class names
 */
export const CSS_CLASSES = {
  card: 'berm-thermal-flow-card',
  outside: 'outside-node',
  fan: 'fan-node',
  room: 'room-node',
  greenhouse: 'greenhouse-node',
  flow_line: 'flow-line',
  flow_dot: 'flow-dot',
  offline: 'offline',
  active: 'active',
  label: 'label',
  primary_text: 'primary-text',
  secondary_text: 'secondary-text',
};

/**
 * Animation keyframe names
 */
export const ANIMATIONS = {
  flow: 'flow-animation',
  rotate: 'rotate-animation',
  pulse: 'pulse-animation',
};

/**
 * Error messages
 */
export const ERRORS = {
  MISSING_ENTITIES: 'Missing required entities configuration',
  MISSING_OUTSIDE: 'Outside temperature entity is required',
  INVALID_ENTITY: 'Invalid entity ID',
  INVALID_FAN_INDEX: 'Invalid fan index in room configuration',
  ENTITY_UNAVAILABLE: 'Entity is unavailable',
};

/**
 * Default example configuration for documentation
 */
export const EXAMPLE_CONFIG = {
  type: 'custom:berm-thermal-flow-card',
  entities: {
    outside: {
      temperature: 'sensor.mandalore_sensors_apparent_temperature',
      rate: 'sensor.external_temp_rate',
    },
    fans: [
      { name: 'Garage', speed: 'input_number.last_commanded_fan_speed_garage' },
      { name: 'Cool Room', speed: 'input_number.last_commanded_fan_speed_cool_room' },
      { name: 'Kitchen', speed: 'input_number.last_commanded_fan_speed_kitchen' },
      { name: 'Living Room', speed: 'input_number.last_commanded_fan_speed_living_room' },
      { name: 'Bedroom', speed: 'input_number.last_commanded_fan_speed_bedroom' },
      { name: 'Office', speed: 'input_number.last_commanded_fan_speed_office', offline: true },
    ],
    rooms: [
      { name: 'Garage', temperature: 'sensor.new_device_2_temperature', delta: 'sensor.garage_temp_delta', fan_index: 0 },
      { name: 'Cool Room', temperature: 'sensor.new_device_5_temperature', delta: 'sensor.cool_room_delta_temp', fan_index: 1 },
      { name: 'Kitchen', temperature: 'sensor.new_device_temperature', delta: 'sensor.kitchen_delta_temp', fan_index: 2 },
      { name: 'Living Room', temperature: 'sensor.new_device_temperature', delta: 'sensor.living_room_delta_temp', fan_index: 3 },
      { name: 'Bedroom', temperature: 'sensor.new_device_3_temperature', delta: 'sensor.bedroom_delta_temp', fan_index: 4 },
    ],
    greenhouse: {
      temperature: 'sensor.greenhouse_temperature',
      delta: 'sensor.greenhouse_delta_temp',
      enabled: true,
    },
  },
};
