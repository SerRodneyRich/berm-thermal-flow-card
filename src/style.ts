import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    --primary-text-color: var(--primary-text-color, #212121);
    --secondary-text-color: var(--secondary-text-color, #727272);
    --disabled-text-color: var(--disabled-text-color, #bdbdbd);
    --divider-color: var(--divider-color, rgba(0, 0, 0, 0.12));
  }

  ha-card {
    padding: 24px;
    background: var(--ha-card-background, var(--card-background-color, white));
    border-radius: var(--ha-card-border-radius, 12px);
    box-shadow: var(
      --ha-card-box-shadow,
      0 2px 2px 0 rgba(0, 0, 0, 0.14),
      0 1px 5px 0 rgba(0, 0, 0, 0.12),
      0 3px 1px -2px rgba(0, 0, 0, 0.2)
    );
  }

  .card-content {
    width: 100%;
    height: auto;
    position: relative;
  }

  svg {
    width: 100%;
    height: auto;
    min-height: 1000px;
    aspect-ratio: 1400 / 2000;
    display: block;
  }

  /* Node styles */
  .node {
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .node:hover {
    filter: brightness(1.1);
  }

  .node circle {
    stroke-width: 6;
    stroke: var(--primary-text-color);
    transition: all 0.3s ease;
  }

  .node.offline circle {
    stroke: var(--disabled-text-color);
    fill: rgba(189, 189, 189, 0.3);
    stroke-dasharray: 5, 5;
  }

  .node.offline text {
    fill: var(--disabled-text-color);
  }

  /* Text styles */
  .primary-text {
    font-size: 42px;
    font-weight: bold;
    fill: var(--primary-text-color);
    text-anchor: middle;
  }

  .secondary-text {
    font-size: 22px;
    fill: var(--secondary-text-color);
    text-anchor: middle;
  }

  .label-text {
    font-size: 24px;
    font-weight: 500;
    fill: #ffffff;  /* White labels for dark background */
    text-anchor: middle;
  }

  /* Icon styles */
  .node-icon {
    font-size: 70px;
    fill: var(--primary-text-color);
    text-anchor: middle;
    dominant-baseline: middle;
  }

  .offline-text {
    font-size: 10px;
    fill: var(--disabled-text-color);
    text-anchor: middle;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  /* Flow line styles */
  .flow-line {
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
    transition: all 0.3s ease;
  }

  .flow-line.inactive {
    stroke-width: 1;
    stroke: var(--divider-color);
    stroke-dasharray: 5, 5;
  }

  .flow-line.active {
    stroke-width: 3;
  }

  /* Animated dots on flow lines */
  .flow-dot {
    /* Animation now handled by SVG animateMotion/animate elements */
  }

  /* Fan rotation animation */
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .fan-icon.rotating {
    animation: rotate linear infinite;
  }

  .fan-icon.speed-0 { animation-duration: 0s; }
  .fan-icon.speed-1 { animation-duration: 5s; }
  .fan-icon.speed-2 { animation-duration: 4.5s; }
  .fan-icon.speed-3 { animation-duration: 4s; }
  .fan-icon.speed-4 { animation-duration: 3.5s; }
  .fan-icon.speed-5 { animation-duration: 3s; }
  .fan-icon.speed-6 { animation-duration: 2.5s; }
  .fan-icon.speed-7 { animation-duration: 2s; }
  .fan-icon.speed-8 { animation-duration: 1.5s; }
  .fan-icon.speed-9 { animation-duration: 1s; }
  .fan-icon.speed-10 { animation-duration: 0.7s; }

  /* Flow animation - now handled by SVG animateMotion/animate elements */
  /* Removed CSS keyframe animation that used offset-path (not supported on SVG) */

  /* Pulse animation for temperature warnings */
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.6;
    }
  }

  .warning {
    animation: pulse 2s ease-in-out infinite;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .primary-text {
      font-size: 24px;
    }

    .secondary-text {
      font-size: 14px;
    }

    .label-text {
      font-size: 16px;
    }

    .node-icon {
      font-size: 40px;
    }
  }

  /* Compact mode */
  :host([compact]) .secondary-text {
    display: none;
  }

  :host([compact]) .label-text {
    font-size: 12px;
  }

  /* Static room (no fan connection) */
  .node.static circle {
    stroke-dasharray: 3, 3;
    stroke-width: 1.5;
  }

  /* Greenhouse special styling */
  .greenhouse-node circle {
    stroke-width: 3;
    stroke-dasharray: none;
  }

  /* Error state */
  .error {
    padding: 20px;
    color: var(--error-color, #db4437);
    background: var(--error-color-background, rgba(219, 68, 55, 0.1));
    border-radius: 8px;
    text-align: center;
    font-weight: 500;
  }

  .error-icon {
    font-size: 48px;
    margin-bottom: 12px;
  }

  /* Loading state */
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    color: var(--secondary-text-color);
  }

  .loading::after {
    content: '...';
    animation: loading 1.5s steps(4, end) infinite;
  }

  @keyframes loading {
    0%, 20% { content: '.'; }
    40% { content: '..'; }
    60%, 100% { content: '...'; }
  }

  /* Tooltip (for future enhancement) */
  .tooltip {
    position: absolute;
    background: var(--primary-background-color, white);
    border: 1px solid var(--divider-color);
    border-radius: 4px;
    padding: 8px 12px;
    font-size: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s;
    z-index: 1000;
  }

  .tooltip.visible {
    opacity: 1;
  }

  /* Icon styling */
  ha-icon {
    --mdc-icon-size: 24px;
  }

  .outside-node ha-icon {
    --mdc-icon-size: 32px;
  }

  .fan-node ha-icon {
    --mdc-icon-size: 28px;
  }

  .room-node ha-icon {
    --mdc-icon-size: 24px;
  }
`;
