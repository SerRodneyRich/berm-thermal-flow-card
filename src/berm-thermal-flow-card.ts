import { LitElement, html, TemplateResult, PropertyValues } from 'lit';
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
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    // Import and return the editor element (to be implemented)
    return document.createElement('berm-thermal-flow-card-editor') as LovelaceCardEditor;
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

    // Calculate positions
    const fanY = LAYOUT.fan_y;
    const roomY = LAYOUT.room_y;
    const outsideY = LAYOUT.outside_y;
    const outsideX = LAYOUT.width / 2;

    // Lines from outside to fans
    fans.forEach((fan, index) => {
      const fanX = this._getFanX(index, fans.length);
      const active = fan.speed > 0 && !fan.offline;

      lines.push({
        id: `outside-fan-${index}`,
        path: generatePath(outsideX, outsideY + LAYOUT.outside_radius, fanX, fanY - LAYOUT.fan_radius),
        from: { x: outsideX, y: outsideY },
        to: { x: fanX, y: fanY },
        speed: fan.speed,
        animationDuration: active ? getAnimationDuration(fan.speed, animation!) : 0,
        color: cardState.outside.color,
        active: active,
      });
    });

    // Lines from fans to rooms
    rooms.forEach((room, roomIndex) => {
      if (room.fan_index !== undefined && room.fan_index !== null && room.fan_index >= 0 && room.fan_index < fans.length) {
        const fan = fans[room.fan_index];
        const fanX = this._getFanX(room.fan_index, fans.length);
        const roomX = this._getRoomX(roomIndex, rooms.length);
        const active = fan.speed > 0 && !fan.offline;

        lines.push({
          id: `fan${room.fan_index}-room${roomIndex}`,
          path: generatePath(fanX, fanY + LAYOUT.fan_radius, roomX, roomY - LAYOUT.room_radius),
          from: { x: fanX, y: fanY },
          to: { x: roomX, y: roomY },
          speed: fan.speed,
          animationDuration: active ? getAnimationDuration(fan.speed, animation!) : 0,
          color: room.color,
          active: active,
        });
      }
    });

    return lines;
  }

  /**
   * Calculate X position for fan node
   */
  private _getFanX(index: number, totalFans: number): number {
    const totalWidth = LAYOUT.width - 2 * LAYOUT.margin_left;
    const spacing = totalWidth / (totalFans + 1);
    return LAYOUT.margin_left + spacing * (index + 1);
  }

  /**
   * Calculate X position for room node
   */
  private _getRoomX(index: number, totalRooms: number): number {
    const totalWidth = LAYOUT.width - 2 * LAYOUT.margin_left;
    const spacing = totalWidth / (totalRooms + 1);
    return LAYOUT.margin_left + spacing * (index + 1);
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

  private _renderSVG(cardState: CardState): TemplateResult {
    const flowLines = this._generateFlowLines(cardState);

    return html`
      <svg viewBox="0 0 ${LAYOUT.width} ${LAYOUT.height}" xmlns="http://www.w3.org/2000/svg">
        <!-- Flow lines (drawn first, behind nodes) -->
        <g class="flow-lines">
          ${flowLines.map(line => this._renderFlowLine(line))}
        </g>

        <!-- Outside temperature node -->
        ${this._renderOutsideNode(cardState)}

        <!-- Fan nodes -->
        <g class="fan-nodes">
          ${cardState.fans.map((fan, index) => this._renderFanNode(fan, index, cardState.fans.length))}
        </g>

        <!-- Room nodes -->
        <g class="room-nodes">
          ${cardState.rooms.map((room, index) => this._renderRoomNode(room, index, cardState.rooms.length))}
        </g>

        <!-- Greenhouse node (if enabled) -->
        ${cardState.greenhouse ? this._renderGreenhouseNode(cardState.greenhouse) : ''}
      </svg>
    `;
  }

  private _renderFlowLine(line: FlowLine): TemplateResult {
    const { animation } = this._config!;

    return html`
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

  private _renderFlowDots(line: FlowLine): TemplateResult {
    const { animation } = this._config!;
    const dotCount = animation?.dots_per_line || 3;
    const dotSize = animation?.dot_size || 6;

    // Create multiple dots with staggered start times
    return html`
      ${Array.from({ length: dotCount }, (_, i) => {
        const delay = (line.animationDuration / dotCount) * i;
        return html`
          <circle
            class="flow-dot"
            r="${dotSize / 2}"
            fill="${line.color}"
            style="
              offset-path: path('${line.path}');
              animation-duration: ${line.animationDuration}s;
              animation-delay: ${delay}s;
            "
          />
        `;
      })}
    `;
  }

  private _renderOutsideNode(cardState: CardState): TemplateResult {
    const { outside } = cardState;
    const { display } = this._config!;
    const x = LAYOUT.width / 2;
    const y = LAYOUT.outside_y;
    const r = LAYOUT.outside_radius;

    return html`
      <g class="node ${CSS_CLASSES.outside}" data-entity="${this._config!.entities.outside.temperature}">
        <circle cx="${x}" cy="${y}" r="${r}" fill="${outside.color}" fill-opacity="0.2" />

        <!-- Temperature -->
        <text x="${x}" y="${y - 5}" class="${CSS_CLASSES.primary_text}">
          ${formatTemperature(outside.temperature, display?.temperature_unit)}
        </text>

        <!-- Rate of change (if available and enabled) -->
        ${display?.show_rate_of_change && outside.rate !== undefined ? html`
          <text x="${x}" y="${y + 15}" class="${CSS_CLASSES.secondary_text}">
            ${formatDelta(outside.rate)}
          </text>
        ` : ''}

        <!-- Label -->
        <text x="${x}" y="${y + r + 20}" class="${CSS_CLASSES.label}">Outside</text>
      </g>
    `;
  }

  private _renderFanNode(fan: FanState, index: number, totalFans: number): TemplateResult {
    const { display } = this._config!;
    const x = this._getFanX(index, totalFans);
    const y = LAYOUT.fan_y;
    const r = LAYOUT.fan_radius;

    return html`
      <g class="node ${CSS_CLASSES.fan} ${fan.offline ? 'offline' : ''}" data-fan-index="${index}">
        <circle cx="${x}" cy="${y}" r="${r}" fill="#808080" fill-opacity="${fan.offline ? 0.1 : 0.3}" />

        <!-- Fan speed -->
        <text x="${x}" y="${y - 10}" class="${CSS_CLASSES.primary_text}">
          ${fan.offline ? 'OFF' : fan.speed}
        </text>

        <!-- Power consumption (if enabled) -->
        ${display?.show_power && !fan.offline ? html`
          <text x="${x}" y="${y + 10}" class="${CSS_CLASSES.secondary_text}">
            ${formatPower(fan.power)}
          </text>
        ` : ''}

        <!-- Label -->
        <text x="${x}" y="${y + r + 20}" class="${CSS_CLASSES.label}">${fan.name}</text>

        ${fan.offline ? html`
          <text x="${x}" y="${y + r + 35}" class="offline-text">OFFLINE</text>
        ` : ''}
      </g>
    `;
  }

  private _renderRoomNode(room: RoomState, index: number, totalRooms: number): TemplateResult {
    const { display } = this._config!;
    const x = this._getRoomX(index, totalRooms);
    const y = LAYOUT.room_y;
    const r = LAYOUT.room_radius;
    const isStatic = room.fan_index === undefined || room.fan_index === null;

    return html`
      <g class="node ${CSS_CLASSES.room} ${isStatic ? 'static' : ''}" data-room-index="${index}">
        <circle cx="${x}" cy="${y}" r="${r}" fill="${room.color}" fill-opacity="0.3" />

        <!-- Temperature -->
        <text x="${x}" y="${y - 5}" class="${CSS_CLASSES.primary_text}">
          ${formatTemperature(room.temperature, display?.temperature_unit)}
        </text>

        <!-- Rate of change (if available and enabled) -->
        ${display?.show_rate_of_change && room.delta !== undefined ? html`
          <text x="${x}" y="${y + 15}" class="${CSS_CLASSES.secondary_text}">
            ${formatDelta(room.delta)}
          </text>
        ` : ''}

        <!-- Label -->
        <text x="${x}" y="${y + r + 20}" class="${CSS_CLASSES.label}">${room.name}</text>
      </g>
    `;
  }

  private _renderGreenhouseNode(greenhouse: GreenhouseState): TemplateResult {
    const { display } = this._config!;
    const x = LAYOUT.width / 2;
    const y = LAYOUT.greenhouse_y;
    const r = LAYOUT.greenhouse_radius;

    return html`
      <g class="node ${CSS_CLASSES.greenhouse}">
        <circle cx="${x}" cy="${y}" r="${r}" fill="${greenhouse.color}" fill-opacity="0.3" />

        <!-- Temperature -->
        <text x="${x}" y="${y - 5}" class="${CSS_CLASSES.primary_text}">
          ${formatTemperature(greenhouse.temperature, display?.temperature_unit)}
        </text>

        <!-- Rate of change (if available and enabled) -->
        ${display?.show_rate_of_change && greenhouse.delta !== undefined ? html`
          <text x="${x}" y="${y + 15}" class="${CSS_CLASSES.secondary_text}">
            ${formatDelta(greenhouse.delta)}
          </text>
        ` : ''}

        <!-- Label -->
        <text x="${x}" y="${y - r - 10}" class="${CSS_CLASSES.label}">Greenhouse</text>
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
