# Changelog

All notable changes to the Berm Thermal Flow Card will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2025-12-29

### Added
- Initial release of Berm Thermal Flow Card
- Visual flow diagram showing airflow from outside → fans → rooms
- Animated flow lines with dots moving proportional to fan speed
- Temperature-based color coding (blue for cold, red for hot)
- Rate of change display (°F/h) for all temperature zones
- Power consumption display for fans based on speed (0-10 scale)
- Support for 6+ fans with individual configuration
- Support for unlimited rooms with flexible fan connections
- Static room support (rooms without direct fan connections)
- Greenhouse/special zone support
- Offline fan handling (gracefully show unavailable fans)
- Customizable color gradients and temperature thresholds
- Configurable animation settings (speed, dot size, etc.)
- Display options (show/hide power, rate of change, labels)
- Visual configuration editor support (schema-based)
- TypeScript-based implementation with full type safety
- LitElement framework for reactive updates
- Rollup build system with ES module output
- HACS integration support
- Comprehensive documentation and examples
- MIT License

### Configuration Features
- Minimal, basic, and full configuration examples
- Custom power consumption maps per fan
- Temperature unit selection (°F or °C)
- Compact mode for mobile/small screens
- Animation enable/disable option
- Responsive design for all screen sizes

### Technical Features
- Real-time entity state updates from Home Assistant
- Optimized rendering with reactive property updates
- SVG-based graphics for scalability
- CSS animations for smooth flow effects
- Fan rotation animation based on speed
- Error handling for missing/unavailable entities
- Deep merge configuration with sensible defaults

### Documentation
- Comprehensive README with installation instructions
- HACS integration metadata (hacs.json, info.md)
- Example configurations for various use cases
- TypeScript API documentation (inline comments)
- Development and build instructions

### Known Limitations
- Visual editor UI not yet implemented (schema defined, UI pending)
- No click interactions on nodes (planned for future release)
- No tooltip on hover (planned for future release)
- Greenhouse flow lines not yet implemented (static display only)
- Limited to 10-speed fan scale (0-10)

## Future Roadmap

### v0.2.0 (Planned)
- [ ] Implement visual configuration editor UI
- [ ] Add click interactions to open more-info dialogs
- [ ] Add hover tooltips showing detailed entity information
- [ ] Implement greenhouse flow lines (from all rooms)
- [ ] Add historical graph integration
- [ ] Add card configuration presets

### v0.3.0 (Planned)
- [ ] Add battery/power source integration
- [ ] Add solar production visualization
- [ ] Add automation trigger recommendations
- [ ] Add efficiency metrics display
- [ ] Multilingual support (i18n)

### v1.0.0 (Planned)
- [ ] Full test coverage
- [ ] Performance optimizations
- [ ] Accessibility improvements (ARIA labels, keyboard navigation)
- [ ] Theme support (light/dark mode)
- [ ] Mobile app optimization
- [ ] Stable API

---

**Legend:**
- `Added` for new features
- `Changed` for changes in existing functionality
- `Deprecated` for soon-to-be removed features
- `Removed` for now removed features
- `Fixed` for any bug fixes
- `Security` in case of vulnerabilities
