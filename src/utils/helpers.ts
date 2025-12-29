import { HomeAssistant } from 'custom-card-helpers';
import {
  ColorConfig,
  TemperatureThresholds,
  FanPowerMap,
  AnimationConfig,
} from '../types';
import {
  DEFAULT_COLORS,
  DEFAULT_TEMPERATURE_THRESHOLDS,
  DEFAULT_FAN_POWER_MAP,
  UNAVAILABLE_STATES,
} from '../const';

/**
 * Get temperature-based color from gradient
 */
export function getTemperatureColor(
  temp: number,
  thresholds: TemperatureThresholds = DEFAULT_TEMPERATURE_THRESHOLDS,
  colors: ColorConfig = DEFAULT_COLORS
): string {
  const {
    cold = DEFAULT_TEMPERATURE_THRESHOLDS.cold!,
    comfort_low = DEFAULT_TEMPERATURE_THRESHOLDS.comfort_low!,
    comfort_high = DEFAULT_TEMPERATURE_THRESHOLDS.comfort_high!,
    warm = DEFAULT_TEMPERATURE_THRESHOLDS.warm!,
    hot = DEFAULT_TEMPERATURE_THRESHOLDS.hot!,
  } = thresholds;

  const {
    cold: coldColor = DEFAULT_COLORS.cold!,
    comfort_low: comfortLowColor = DEFAULT_COLORS.comfort_low!,
    comfort_high: comfortHighColor = DEFAULT_COLORS.comfort_high!,
    warm: warmColor = DEFAULT_COLORS.warm!,
    hot: hotColor = DEFAULT_COLORS.hot!,
  } = colors;

  if (temp < cold) return coldColor;
  if (temp >= cold && temp < comfort_low) {
    return interpolateColor(coldColor, comfortLowColor, (temp - cold) / (comfort_low - cold));
  }
  if (temp >= comfort_low && temp < comfort_high) {
    return interpolateColor(comfortLowColor, comfortHighColor, (temp - comfort_low) / (comfort_high - comfort_low));
  }
  if (temp >= comfort_high && temp < warm) {
    return interpolateColor(comfortHighColor, warmColor, (temp - comfort_high) / (warm - comfort_high));
  }
  if (temp >= warm && temp < hot) {
    return interpolateColor(warmColor, hotColor, (temp - warm) / (hot - warm));
  }
  return hotColor;
}

/**
 * Interpolate between two hex colors
 */
export function interpolateColor(color1: string, color2: string, factor: number): string {
  const c1 = hexToRgb(color1);
  const c2 = hexToRgb(color2);
  if (!c1 || !c2) return color1;

  const r = Math.round(c1.r + factor * (c2.r - c1.r));
  const g = Math.round(c1.g + factor * (c2.g - c1.g));
  const b = Math.round(c1.b + factor * (c2.b - c1.b));

  return rgbToHex(r, g, b);
}

/**
 * Convert hex color to RGB
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Convert RGB to hex color
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

/**
 * Get entity state as a number
 */
export function getEntityStateNumber(hass: HomeAssistant, entityId: string, defaultValue: number = 0): number {
  const state = hass.states[entityId];
  if (!state || UNAVAILABLE_STATES.includes(state.state)) {
    return defaultValue;
  }
  const num = parseFloat(state.state);
  return isNaN(num) ? defaultValue : num;
}

/**
 * Check if entity is available
 */
export function isEntityAvailable(hass: HomeAssistant, entityId: string): boolean {
  const state = hass.states[entityId];
  return state !== undefined && !UNAVAILABLE_STATES.includes(state.state);
}

/**
 * Get power consumption from fan speed
 */
export function getFanPower(speed: number, powerMap: FanPowerMap = DEFAULT_FAN_POWER_MAP): number {
  const speedStr = Math.round(speed).toString();
  return powerMap[speedStr] ?? DEFAULT_FAN_POWER_MAP[speedStr] ?? 0;
}

/**
 * Calculate animation duration from fan speed (0-10)
 * Higher speed = faster animation = shorter duration
 */
export function getAnimationDuration(
  speed: number,
  animationConfig: AnimationConfig
): number {
  if (speed <= 0) return 0;

  const {
    min_flow_rate = 0.75,
    max_flow_rate = 6,
  } = animationConfig;

  // Linear interpolation: speed 1 = max_flow_rate, speed 10 = min_flow_rate
  const duration = max_flow_rate - ((speed - 1) / 9) * (max_flow_rate - min_flow_rate);
  return Math.max(min_flow_rate, Math.min(max_flow_rate, duration));
}

/**
 * Format temperature for display
 */
export function formatTemperature(temp: number, unit: 'F' | 'C' = 'F', decimals: number = 1): string {
  return `${temp.toFixed(decimals)}°${unit}`;
}

/**
 * Format rate of change for display
 */
export function formatDelta(delta: number | undefined, decimals: number = 1): string {
  if (delta === undefined || delta === null) return 'N/A';
  const sign = delta >= 0 ? '+' : '';
  return `${sign}${delta.toFixed(decimals)}°F/h`;
}

/**
 * Format power for display
 */
export function formatPower(watts: number): string {
  if (watts === 0) return 'OFF';
  if (watts < 1000) return `${watts}W`;
  return `${(watts / 1000).toFixed(2)}kW`;
}

/**
 * Clamp value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Generate SVG path for a line with optional curve
 */
export function generatePath(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  curve: boolean = true
): string {
  if (!curve) {
    return `M ${x1} ${y1} L ${x2} ${y2}`;
  }

  // Create a smooth curve using quadratic bezier
  const midY = (y1 + y2) / 2;
  return `M ${x1} ${y1} Q ${x1} ${midY}, ${(x1 + x2) / 2} ${midY} T ${x2} ${y2}`;
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return function(...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Deep merge two objects
 */
export function deepMerge<T extends Record<string, any>>(target: T, source: Partial<T>): T {
  const output: any = { ...target };
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output as T;
}

/**
 * Check if value is an object
 */
function isObject(item: any): item is Record<string, any> {
  return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Generate unique ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

/**
 * Validate entity ID format
 */
export function isValidEntityId(entityId: string): boolean {
  return /^[a-z_]+\.[a-z0-9_]+$/.test(entityId);
}

/**
 * Get entity friendly name
 */
export function getEntityName(hass: HomeAssistant, entityId: string): string {
  const state = hass.states[entityId];
  return state?.attributes?.friendly_name ?? entityId;
}
