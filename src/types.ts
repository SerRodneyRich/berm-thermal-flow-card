import { LovelaceCardConfig } from 'custom-card-helpers';

/**
 * Configuration for outside temperature source
 */
export interface OutsideConfig {
  temperature: string;  // Entity ID for outside temperature
  rate?: string;        // Optional entity ID for rate of change
}

/**
 * Power consumption map for fan speeds (0-10)
 */
export interface FanPowerMap {
  [speed: string]: number;  // Speed (as string key) -> Watts
}

/**
 * Configuration for a single fan
 */
export interface FanConfig {
  name: string;           // Display name (e.g., "Garage", "Cool Room")
  speed: string;          // Entity ID for fan speed (input_number.last_commanded_fan_speed_*)
  power_map?: FanPowerMap;  // Optional custom power map, defaults to v7 values
  icon?: string;          // Optional custom icon (defaults to mdi:fan)
  offline?: boolean;      // Mark as offline (grayed out)
}

/**
 * Configuration for a single room
 */
export interface RoomConfig {
  name: string;           // Display name
  temperature: string;    // Entity ID for room temperature
  delta?: string;         // Optional entity ID for rate of change (delta sensor)
  fan_index?: number;     // Index of connected fan (null for static rooms like bathroom)
  desired_temp?: string;  // Optional entity ID for desired temperature (for color coding)
  icon?: string;          // Optional custom icon
}

/**
 * Configuration for greenhouse (special zone)
 */
export interface GreenhouseConfig {
  temperature: string;    // Entity ID for greenhouse temperature
  delta?: string;         // Optional entity ID for rate of change
  enabled?: boolean;      // Show/hide greenhouse (default: false)
}

/**
 * Color configuration for temperature-based gradients
 */
export interface ColorConfig {
  cold?: string;          // Color for cold temps (default: #2196F3 - blue)
  comfort_low?: string;   // Color for low comfort range (default: #4CAF50 - green)
  comfort_high?: string;  // Color for high comfort range (default: #8BC34A - light green)
  warm?: string;          // Color for warm temps (default: #FF9800 - orange)
  hot?: string;           // Color for hot temps (default: #F44336 - red)
}

/**
 * Temperature thresholds for color coding (°F)
 */
export interface TemperatureThresholds {
  cold?: number;          // Below this = cold (default: 60)
  comfort_low?: number;   // Low comfort boundary (default: 68)
  comfort_high?: number;  // High comfort boundary (default: 74)
  warm?: number;          // Above this = warm (default: 78)
  hot?: number;           // Above this = hot (default: 85)
}

/**
 * Animation configuration
 */
export interface AnimationConfig {
  enabled?: boolean;         // Enable/disable animations (default: true)
  min_flow_rate?: number;    // Fastest animation speed in seconds (default: 0.75)
  max_flow_rate?: number;    // Slowest animation speed in seconds (default: 6)
  dot_size?: number;         // Size of animated dots in pixels (default: 6)
  dots_per_line?: number;    // Number of dots per flow line (default: 3)
}

/**
 * Display configuration
 */
export interface DisplayConfig {
  show_power?: boolean;           // Show power consumption on fans (default: true)
  show_rate_of_change?: boolean;  // Show temperature rate of change (default: true)
  temperature_unit?: 'F' | 'C';   // Temperature unit (default: 'F')
  compact_mode?: boolean;         // Compact layout for small screens (default: false)
  show_labels?: boolean;          // Show room/fan labels (default: true)
}

/**
 * Main card configuration
 */
export interface BermThermalFlowCardConfig extends LovelaceCardConfig {
  type: 'custom:berm-thermal-flow-card';
  entities: {
    outside: OutsideConfig;
    fans: FanConfig[];
    rooms: RoomConfig[];
    greenhouse?: GreenhouseConfig;
  };
  colors?: ColorConfig;
  temperature_thresholds?: TemperatureThresholds;
  animation?: AnimationConfig;
  display?: DisplayConfig;
}

/**
 * Fan state with computed values
 */
export interface FanState {
  name: string;
  speed: number;          // 0-10
  power: number;          // Watts
  offline: boolean;
  icon: string;
}

/**
 * Room state with computed values
 */
export interface RoomState {
  name: string;
  temperature: number;
  delta?: number;         // Rate of change in °F/h
  desired_temp?: number;
  fan_index?: number;
  color: string;          // Computed color based on temperature
  icon: string;
}

/**
 * Outside state
 */
export interface OutsideState {
  temperature: number;
  rate?: number;          // Rate of change in °F/h
  color: string;
}

/**
 * Greenhouse state
 */
export interface GreenhouseState {
  temperature: number;
  delta?: number;
  color: string;
}

/**
 * Complete card state (computed from HA entities)
 */
export interface CardState {
  outside: OutsideState;
  fans: FanState[];
  rooms: RoomState[];
  greenhouse?: GreenhouseState;
}

/**
 * SVG point for path generation
 */
export interface Point {
  x: number;
  y: number;
}

/**
 * Flow line configuration for animation
 */
export interface FlowLine {
  id: string;
  path: string;           // SVG path string
  from: Point;
  to: Point;
  speed: number;          // 0-10 scale
  animationDuration: number;  // Computed from speed
  color: string;
  active: boolean;        // Whether flow is active (speed > 0)
}
