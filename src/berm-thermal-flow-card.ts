import { LitElement, html, svg, TemplateResult, SVGTemplateResult, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';

import { BermThermalFlowCardConfig, CardState, FanState, RoomState, OutsideState, GreenhouseState, FlowLine } from './types';
import { validateConfig } from './berm-thermal-flow-card-config';
import { styles } from './style';
import {
  CARD_VERSION,
  CARD_TYPE,
  LAYOUT,
  CSS_CLASSES,
  DEFAULT_ICONS,
  DEFAULT_FAN_POWER_MAP,
} from './const';
import {
  getTemperatureColor,
  getEntityStateNumber,
  isEntityAvailable,
  getFanPower,
  getAnimationDuration,
  formatTemperature,
  formatDelta,
  formatPower,
  generatePath,
} from './utils/helpers';

// Log card version
console.info(
  `%c BERM-THERMAL-FLOW-CARD %c ${CARD_VERSION} `,
  'color: white; font-weight: bold; background: #039be5',
  'color: #039be5; font-weight: bold; background: white'
);

// Extend the window object to register the card
declare global {
  interface Window {
    customCards: Array<{ type: string; name: string; description: string }>;
  }
}

@customElement(CARD_TYPE)
export class BermThermalFlowCard extends LitElement {
  public static getConfigElement() {
    // No visual editor available
    return undefined;
  }

  public static getStubConfig(): Record<string, unknown> {
    return {
      type: `custom:${CARD_TYPE}`,
      entities: {
        outside: {
          temperature: 'sensor.outdoor_temperature',
        },
        fans: [],
        rooms: [],
      },
    };
  }

  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config?: BermThermalFlowCardConfig;
  @state() private _error?: string;

  static get styles() {
    return styles;
  }

  public setConfig(config: any): void {
    try {
      this._config = validateConfig(config);
      this._error = undefined;
    } catch (error) {
      this._error = error instanceof Error ? error.message : 'Unknown error';
      console.error('Berm Thermal Flow Card configuration error:', error);
    }
  }

  public getCardSize(): number {
    // Return approximate card height in "units" (each unit ≈ 50px)
    return 12;
  }

  protected shouldUpdate(_changedProps: PropertyValues): boolean {
    return !!(this._config && this.hass);
  }

  /**
   * Compute card state from HA entities
   */
  private _computeCardState(): CardState {
    const { entities, colors, temperature_thresholds } = this._config!;

    // Outside state
    const outsideTemp = getEntityStateNumber(this.hass, entities.outside.temperature, 70);
    const outsideRate = entities.outside.rate
      ? getEntityStateNumber(this.hass, entities.outside.rate, 0)
      : undefined;
    const outsideColor = getTemperatureColor(outsideTemp, temperature_thresholds, colors);

    const outside: OutsideState = {
      temperature: outsideTemp,
      rate: outsideRate,
      color: outsideColor,
    };

    // Fan states
    const fans: FanState[] = entities.fans.map((fanConfig: any) => {
      const speed = Math.round(getEntityStateNumber(this.hass, fanConfig.speed, 0));
      const power = getFanPower(speed, fanConfig.power_map || DEFAULT_FAN_POWER_MAP);

      return {
        name: fanConfig.name,
        speed: Math.max(0, Math.min(10, speed)), // Clamp to 0-10
        power: power,
        offline: fanConfig.offline || !isEntityAvailable(this.hass, fanConfig.speed),
        icon: fanConfig.icon || DEFAULT_ICONS.fan,
      };
    });

    // Room states
    const rooms: RoomState[] = entities.rooms.map((roomConfig: any) => {
      const temp = getEntityStateNumber(this.hass, roomConfig.temperature, 70);
      const delta = roomConfig.delta
        ? getEntityStateNumber(this.hass, roomConfig.delta, 0)
        : undefined;
      const desiredTemp = roomConfig.desired_temp
        ? getEntityStateNumber(this.hass, roomConfig.desired_temp, 70)
        : undefined;

      return {
        name: roomConfig.name,
        temperature: temp,
        delta: delta,
        desired_temp: desiredTemp,
        fan_index: roomConfig.fan_index,
        color: getTemperatureColor(temp, temperature_thresholds, colors),
        icon: roomConfig.icon || DEFAULT_ICONS.room,
      };
    });

    // Greenhouse state (optional)
    let greenhouse: GreenhouseState | undefined;
    if (entities.greenhouse?.enabled && entities.greenhouse.temperature) {
      const greenhouseTemp = getEntityStateNumber(this.hass, entities.greenhouse.temperature, 70);
      const greenhouseDelta = entities.greenhouse.delta
        ? getEntityStateNumber(this.hass, entities.greenhouse.delta, 0)
        : undefined;

      greenhouse = {
        temperature: greenhouseTemp,
        delta: greenhouseDelta,
        color: getTemperatureColor(greenhouseTemp, temperature_thresholds, colors),
      };
    }

    return { outside, fans, rooms, greenhouse };
  }

  /**
   * Generate flow lines for animation
   */
  private _generateFlowLines(cardState: CardState): FlowLine[] {
    if (!this._config) {
      return [];
    }

    const lines: FlowLine[] = [];
    const { fans, rooms } = cardState;
    const { animation } = this._config!;

    // 3-column layout: Outside (left) -> Rooms (middle)
    const outsideX = LAYOUT.outside_x;
    const outsideY = LAYOUT.outside_y;
    const roomX = LAYOUT.room_x;

    // Lines from outside directly to each room
    rooms.forEach((room, roomIndex) => {
      const roomY = this._getRoomY(roomIndex);
      const fanIndex = room.fan_index;

      // Determine if this room has an active fan
      const fan = (fanIndex !== undefined && fanIndex !== null && fans[fanIndex]) ? fans[fanIndex] : null;
      const active = fan ? (fan.speed > 0 && !fan.offline) : false;
      const speed = fan ? fan.speed : 0;

      lines.push({
        id: `outside-room-${roomIndex}`,
        path: generatePath(
          outsideX + LAYOUT.outside_radius,
          outsideY,
          roomX - LAYOUT.room_radius,
          roomY
        ),
        from: { x: outsideX, y: outsideY },
        to: { x: roomX, y: roomY },
        speed: speed,
        animationDuration: active ? getAnimationDuration(speed, animation!) : 0,
        color: active ? room.color : '#666',
        active: active,
      });
    });

    return lines;
  }


  /**
   * Calculate X position for room node (all in column 2)
   */
  private _getRoomX(index: number, totalRooms: number): number {
    return LAYOUT.room_x;  // All rooms in same column
  }

  /**
   * Calculate Y position for room node (stacked vertically)
   */
  private _getRoomY(index: number): number {
    return LAYOUT.room_start_y + (index * LAYOUT.room_spacing);
  }

  protected render(): TemplateResult {
    if (!this._config || !this.hass) {
      return html``;
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

  private _renderSVG(cardState: CardState): SVGTemplateResult {
    const flowLines = this._generateFlowLines(cardState);

    return svg`
      <svg viewBox="0 0 ${LAYOUT.width} ${LAYOUT.height}" xmlns="http://www.w3.org/2000/svg">
        <!-- Flow lines (drawn first, behind nodes) -->
        <g class="flow-lines">
          ${flowLines.map(line => this._renderFlowLine(line))}
        </g>

        <!-- Outside temperature node (left column) -->
        ${this._renderOutsideNode(cardState)}

        <!-- Room nodes (middle column, stacked vertically) -->
        <g class="room-nodes">
          ${cardState.rooms.map((room, index) => this._renderRoomNode(room, index, cardState.rooms.length))}
        </g>

        <!-- Greenhouse node (right column, if enabled) -->
        ${cardState.greenhouse ? this._renderGreenhouseNode(cardState.greenhouse) : ''}
      </svg>
    `;
  }

  private _renderFlowLine(line: FlowLine): SVGTemplateResult {
    const { animation } = this._config!;

    return svg`
      <g class="flow-line-group">
        <!-- Base line -->
        <path
          class="flow-line ${line.active ? 'active' : 'inactive'}"
          d="${line.path}"
          stroke="${line.active ? line.color : 'var(--divider-color)'}"
          stroke-width="${line.active ? LAYOUT.stroke_width : LAYOUT.stroke_width_inactive}"
        />

        <!-- Animated dots (only if active) -->
        ${line.active && animation?.enabled ? this._renderFlowDots(line) : ''}
      </g>
    `;
  }

  private _renderFlowDots(line: FlowLine): SVGTemplateResult {
    const { animation } = this._config!;
    const dotCount = animation?.dots_per_line || 3;
    const dotSize = animation?.dot_size || 6;

    // Create multiple dots with staggered start times using SVG animateMotion
    return svg`
      ${Array.from({ length: dotCount }, (_, i) => {
        const delay = (line.animationDuration / dotCount) * i;
        return svg`
          <circle
            class="flow-dot"
            r="${dotSize / 2}"
            fill="${line.color}"
          >
            <animateMotion
              dur="${line.animationDuration}s"
              begin="${delay}s"
              repeatCount="indefinite"
              path="${line.path}"
            />
            <animate
              attributeName="opacity"
              values="0;0.8;0.8;0"
              keyTimes="0;0.1;0.9;1"
              dur="${line.animationDuration}s"
              begin="${delay}s"
              repeatCount="indefinite"
            />
          </circle>
        `;
      })}
    `;
  }

  private _renderOutsideNode(cardState: CardState): SVGTemplateResult {
    const { outside } = cardState;
    const { display } = this._config!;
    const x = LAYOUT.outside_x;  // Column 1
    const y = LAYOUT.outside_y;
    const r = LAYOUT.outside_radius;

    return svg`
      <g class="node ${CSS_CLASSES.outside}" data-entity="${this._config!.entities.outside.temperature}">
        <circle cx="${x}" cy="${y}" r="${r}" stroke="${outside.color}" stroke-width="6" fill="none" />

        <!-- Temperature (top) -->
        <text x="${x}" y="${y - r + 50}" class="${CSS_CLASSES.primary_text}">
          ${formatTemperature(outside.temperature, display?.temperature_unit)}
        </text>

        <!-- Icon (center) -->
        <text x="${x}" y="${y + 10}" class="node-icon">☁️</text>

        <!-- Rate of change (bottom) -->
        ${display?.show_rate_of_change && outside.rate !== undefined ? svg`
          <text x="${x}" y="${y + r - 35}" class="${CSS_CLASSES.secondary_text}">
            ${formatDelta(outside.rate)}
          </text>
        ` : ''}

        <!-- Label (below circle) -->
        <text x="${x}" y="${y + r + 38}" class="label">Outside</text>
      </g>
    `;
  }


  private _renderRoomNode(room: RoomState, index: number, totalRooms: number): SVGTemplateResult {
    const { display } = this._config!;
    const x = this._getRoomX(index, totalRooms);
    const y = this._getRoomY(index);
    const r = LAYOUT.room_radius;
    const isStatic = room.fan_index === undefined || room.fan_index === null;

    // Icon outline color based on heating/cooling
    const delta = room.delta || 0;
    const outlineWidth = Math.min(Math.abs(delta) * 2, 12);  // Thicker = more heating/cooling
    const outlineColor = delta > 0 ? '#ff4444' : delta < 0 ? '#4444ff' : '#888';  // Red=heating, Blue=cooling

    return svg`
      <g class="node ${CSS_CLASSES.room} ${isStatic ? 'static' : ''}" data-room-index="${index}">
        <circle cx="${x}" cy="${y}" r="${r}" stroke="${room.color}" stroke-width="6" fill="none" />

        <!-- Temperature (top) -->
        <text x="${x}" y="${y - r + 48}" class="${CSS_CLASSES.primary_text}">
          ${formatTemperature(room.temperature, display?.temperature_unit)}
        </text>

        <!-- Icon (center) with colored outline -->
        <text x="${x}" y="${y + 10}" class="node-icon" style="
          paint-order: stroke fill;
          stroke: ${outlineColor};
          stroke-width: ${outlineWidth}px;
          stroke-linejoin: round;
        ">🏠</text>

        <!-- Rate of change (bottom) -->
        ${display?.show_rate_of_change && room.delta !== undefined ? svg`
          <text x="${x}" y="${y + r - 35}" class="${CSS_CLASSES.secondary_text}">
            ${formatDelta(room.delta)}
          </text>
        ` : ''}

        <!-- Label (below circle) -->
        <text x="${x}" y="${y + r + 36}" class="label">${room.name}</text>
      </g>
    `;
  }

  private _renderGreenhouseNode(greenhouse: GreenhouseState): SVGTemplateResult {
    const { display } = this._config!;
    const x = LAYOUT.greenhouse_x;  // Column 3
    const y = LAYOUT.greenhouse_y;
    const r = LAYOUT.greenhouse_radius;

    return svg`
      <g class="node ${CSS_CLASSES.greenhouse}">
        <circle cx="${x}" cy="${y}" r="${r}" stroke="${greenhouse.color}" stroke-width="6" fill="none" />

        <!-- Temperature (top) -->
        <text x="${x}" y="${y - r + 50}" class="${CSS_CLASSES.primary_text}">
          ${formatTemperature(greenhouse.temperature, display?.temperature_unit)}
        </text>

        <!-- Icon (center) -->
        <text x="${x}" y="${y + 10}" class="node-icon">🌿</text>

        <!-- Rate of change (bottom) -->
        ${display?.show_rate_of_change && greenhouse.delta !== undefined ? svg`
          <text x="${x}" y="${y + r - 35}" class="${CSS_CLASSES.secondary_text}">
            ${formatDelta(greenhouse.delta)}
          </text>
        ` : ''}

        <!-- Label (below circle) -->
        <text x="${x}" y="${y + r + 38}" class="label">Greenhouse</text>
      </g>
    `;
  }
}

// Register the card with Home Assistant
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: CARD_TYPE,
  name: 'Berm Thermal Flow Card',
  description: 'Visualize airflow from outside temperature through fans to rooms with thermal analysis',
});
