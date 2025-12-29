import { BermThermalFlowCardConfig } from './types';
import {
  DEFAULT_COLORS,
  DEFAULT_TEMPERATURE_THRESHOLDS,
  DEFAULT_ANIMATION,
  DEFAULT_DISPLAY,
  DEFAULT_FAN_POWER_MAP,
  ERRORS,
} from './const';
import { deepMerge } from './utils/helpers';

/**
 * Validate and normalize card configuration
 */
export function validateConfig(config: any): BermThermalFlowCardConfig {
  if (!config) {
    throw new Error(ERRORS.MISSING_ENTITIES);
  }

  if (!config.entities) {
    throw new Error(ERRORS.MISSING_ENTITIES);
  }

  if (!config.entities.outside || !config.entities.outside.temperature) {
    throw new Error(ERRORS.MISSING_OUTSIDE);
  }

  // Ensure fans and rooms arrays exist and create mutable copies
  const fans = Array.isArray(config.entities.fans) ? config.entities.fans : [];
  const rooms = Array.isArray(config.entities.rooms) ? config.entities.rooms : [];

  // Validate fan configurations and create mutable copies with defaults
  const processedFans = fans.map((fan: any, index: number) => {
    if (!fan.name) {
      throw new Error(`Fan at index ${index} is missing 'name'`);
    }
    if (!fan.speed) {
      throw new Error(`Fan '${fan.name}' is missing 'speed' entity`);
    }

    // Create new object with default power map if not provided
    return {
      ...fan,
      power_map: fan.power_map || DEFAULT_FAN_POWER_MAP,
    };
  });

  // Validate room configurations
  rooms.forEach((room: any, index: number) => {
    if (!room.name) {
      throw new Error(`Room at index ${index} is missing 'name'`);
    }
    if (!room.temperature) {
      throw new Error(`Room '${room.name}' is missing 'temperature' entity`);
    }

    // Validate fan_index if provided
    if (room.fan_index !== undefined && room.fan_index !== null) {
      if (room.fan_index < 0 || room.fan_index >= processedFans.length) {
        throw new Error(
          `Room '${room.name}' has invalid fan_index ${room.fan_index}. Must be between 0 and ${processedFans.length - 1}`
        );
      }
    }
  });

  // Apply defaults for optional configurations
  const normalizedConfig: BermThermalFlowCardConfig = {
    type: 'custom:berm-thermal-flow-card',
    entities: {
      outside: config.entities.outside,
      fans: processedFans,
      rooms: rooms,
      greenhouse: config.entities.greenhouse,
    },
    colors: deepMerge(DEFAULT_COLORS, config.colors || {}),
    temperature_thresholds: deepMerge(DEFAULT_TEMPERATURE_THRESHOLDS, config.temperature_thresholds || {}),
    animation: deepMerge(DEFAULT_ANIMATION, config.animation || {}),
    display: deepMerge(DEFAULT_DISPLAY, config.display || {}),
  };

  return normalizedConfig;
}

/**
 * Get a minimal valid configuration (for testing/examples)
 */
export function getMinimalConfig(): BermThermalFlowCardConfig {
  return {
    type: 'custom:berm-thermal-flow-card',
    entities: {
      outside: {
        temperature: 'sensor.outdoor_temperature',
      },
      fans: [],
      rooms: [],
    },
    colors: DEFAULT_COLORS,
    temperature_thresholds: DEFAULT_TEMPERATURE_THRESHOLDS,
    animation: DEFAULT_ANIMATION,
    display: DEFAULT_DISPLAY,
  };
}

/**
 * Serialize config for storage (remove defaults to reduce size)
 */
export function serializeConfig(config: BermThermalFlowCardConfig): Partial<BermThermalFlowCardConfig> {
  const serialized: Partial<BermThermalFlowCardConfig> = {
    type: config.type,
    entities: config.entities,
  };

  // Only include non-default colors
  if (config.colors && JSON.stringify(config.colors) !== JSON.stringify(DEFAULT_COLORS)) {
    serialized.colors = config.colors;
  }

  // Only include non-default thresholds
  if (config.temperature_thresholds &&
      JSON.stringify(config.temperature_thresholds) !== JSON.stringify(DEFAULT_TEMPERATURE_THRESHOLDS)) {
    serialized.temperature_thresholds = config.temperature_thresholds;
  }

  // Only include non-default animation
  if (config.animation && JSON.stringify(config.animation) !== JSON.stringify(DEFAULT_ANIMATION)) {
    serialized.animation = config.animation;
  }

  // Only include non-default display
  if (config.display && JSON.stringify(config.display) !== JSON.stringify(DEFAULT_DISPLAY)) {
    serialized.display = config.display;
  }

  return serialized;
}

/**
 * Create a configuration for the visual editor
 */
export function createEditorConfig(): any {
  return {
    schema: [
      {
        name: 'entities',
        type: 'expandable',
        title: 'Entities',
        schema: [
          {
            name: 'outside',
            type: 'expandable',
            title: 'Outside Temperature',
            schema: [
              { name: 'temperature', selector: { entity: { domain: 'sensor' } } },
              { name: 'rate', selector: { entity: { domain: 'sensor' } } },
            ],
          },
          {
            name: 'fans',
            type: 'list',
            title: 'Fans',
            schema: [
              { name: 'name', selector: { text: {} } },
              { name: 'speed', selector: { entity: { domain: 'input_number' } } },
              { name: 'offline', selector: { boolean: {} } },
              { name: 'icon', selector: { icon: {} } },
            ],
          },
          {
            name: 'rooms',
            type: 'list',
            title: 'Rooms',
            schema: [
              { name: 'name', selector: { text: {} } },
              { name: 'temperature', selector: { entity: { domain: 'sensor' } } },
              { name: 'delta', selector: { entity: { domain: 'sensor' } } },
              { name: 'fan_index', selector: { number: { min: 0, mode: 'box' } } },
              { name: 'desired_temp', selector: { entity: { domain: 'input_number' } } },
              { name: 'icon', selector: { icon: {} } },
            ],
          },
          {
            name: 'greenhouse',
            type: 'expandable',
            title: 'Greenhouse',
            schema: [
              { name: 'temperature', selector: { entity: { domain: 'sensor' } } },
              { name: 'delta', selector: { entity: { domain: 'sensor' } } },
              { name: 'enabled', selector: { boolean: {} } },
            ],
          },
        ],
      },
      {
        name: 'colors',
        type: 'expandable',
        title: 'Colors',
        schema: [
          { name: 'cold', selector: { color_rgb: {} } },
          { name: 'comfort_low', selector: { color_rgb: {} } },
          { name: 'comfort_high', selector: { color_rgb: {} } },
          { name: 'warm', selector: { color_rgb: {} } },
          { name: 'hot', selector: { color_rgb: {} } },
        ],
      },
      {
        name: 'temperature_thresholds',
        type: 'expandable',
        title: 'Temperature Thresholds',
        schema: [
          { name: 'cold', selector: { number: { min: 0, max: 100, mode: 'box', unit_of_measurement: '°F' } } },
          { name: 'comfort_low', selector: { number: { min: 0, max: 100, mode: 'box', unit_of_measurement: '°F' } } },
          { name: 'comfort_high', selector: { number: { min: 0, max: 100, mode: 'box', unit_of_measurement: '°F' } } },
          { name: 'warm', selector: { number: { min: 0, max: 100, mode: 'box', unit_of_measurement: '°F' } } },
          { name: 'hot', selector: { number: { min: 0, max: 100, mode: 'box', unit_of_measurement: '°F' } } },
        ],
      },
      {
        name: 'animation',
        type: 'expandable',
        title: 'Animation',
        schema: [
          { name: 'enabled', selector: { boolean: {} } },
          { name: 'min_flow_rate', selector: { number: { min: 0.1, max: 10, step: 0.1, mode: 'slider', unit_of_measurement: 's' } } },
          { name: 'max_flow_rate', selector: { number: { min: 0.1, max: 10, step: 0.1, mode: 'slider', unit_of_measurement: 's' } } },
          { name: 'dot_size', selector: { number: { min: 2, max: 12, mode: 'slider', unit_of_measurement: 'px' } } },
          { name: 'dots_per_line', selector: { number: { min: 1, max: 5, mode: 'slider' } } },
        ],
      },
      {
        name: 'display',
        type: 'expandable',
        title: 'Display',
        schema: [
          { name: 'show_power', selector: { boolean: {} } },
          { name: 'show_rate_of_change', selector: { boolean: {} } },
          { name: 'temperature_unit', selector: { select: { options: ['F', 'C'] } } },
          { name: 'compact_mode', selector: { boolean: {} } },
          { name: 'show_labels', selector: { boolean: {} } },
        ],
      },
    ],
  };
}
