# Changelog

All notable changes to the "markawesome-vscode" extension will be documented in this file.

## [0.6.0] - 2026-02-10

### Added

- **Layout syntax support** for CSS layout utilities:
  - **Grid** (`::::grid`): Auto-adaptive responsive grid with `gap`, `min` (column size), `align`, `justify` attributes
  - **Stack** (`::::stack`): Vertical spacing with `gap`, `align`, `justify` attributes
  - **Cluster** (`::::cluster`): Inline wrapping items with `gap`, `align`, `justify` attributes
  - **Split** (`::::split`): Distribute items to opposite ends (header/footer pattern) with `row`/`column` direction
  - **Flank** (`::::flank`): Sidebar + main content layout with `start`/`end` position, `size`, `content:PCT`, `gap`, `align` attributes
  - **Frame** (`::::frame`): Aspect-ratio containers (landscape/portrait/square) with `radius` (s, m, l, pill, circle, square) support
- Alternative `::::wa-*` syntax for all layouts (e.g., `::::wa-grid`, `::::wa-flank`)
- **8 new code snippets** for layouts:
  - `wa-grid` - Basic responsive grid
  - `wa-grid-cards` - Grid with 3 cards
  - `wa-stack` - Vertical stack
  - `wa-cluster` - Inline cluster
  - `wa-cluster-buttons` - Centered button row
  - `wa-split` - Header/footer split
  - `wa-flank` - Sidebar layout
  - `wa-frame` - Aspect-ratio container
- **IntelliSense completions** for layout types and context-aware attributes (gap sizes, alignment options, layout-specific parameters)
- **Hover documentation** for all 6 layout types with attribute reference and examples
- **TextMate grammar** support for layout syntax highlighting

### Enhanced

- Component metadata (`components.json`) includes all 6 layout types with full documentation and examples
- Completion provider updated with `::::` trigger character detection and layout parameter suggestions

## [0.5.0] - 2026-02-09

### Added

- **Icon slot syntax** support for 4 components (matching markawesome 0.4.0):
  - **Button**: `icon:name` (start slot), `icon:end:name` (end slot), `icon:start:name` (explicit start)
  - **Callout**: `icon:name` to override default variant icon (e.g., `icon:shield`)
  - **Details**: `icon:expand:name` and `icon:collapse:name` for custom toggle icons
  - **Tag**: `icon:name` for inline content icon
- **6 new code snippets** for icon usage:
  - `wa-callout-icon` - Callout with custom icon override
  - `wa-button-icon` - Button with start icon
  - `wa-button-icons` - Button with start and end icons
  - `wa-tag-icon` - Tag with icon
  - `wa-details-icons` - Details with custom expand/collapse icons
- **IntelliSense completions** for `icon:` tokens with snippet tab stops for icon name entry

### Changed

- Updated TextMate grammar to recognize `icon:` tokens in button, callout, details, and tag patterns
- Component metadata updated with icon syntax documentation and examples

## [0.4.0] - 2026-02-08

### Added

- **Full attribute support** for all enhanced components matching markawesome 0.3.0:
  - **Badge**: Added `appearance` (accent, filled, outlined, filled-outlined), `attention` (pulse, bounce, none), and `pill` flag
  - **Button**: Added `appearance` (accent, filled, outlined, filled-outlined, plain), `size` (small, medium, large), and flags (`pill`, `caret`, `loading`, `disabled`)
  - **Callout**: Added `size` (small, medium, large), `appearance` (accent, filled, outlined, plain, filled-outlined), and `brand` variant
  - **Tag**: Added `appearance` (accent, filled, outlined, filled-outlined), `size` (small, medium, large), and flags (`pill`, `with-remove`)
  - **Tabs**: Added `activation` (auto, manual), `active` panel specification, and `no-scroll-controls` flag
  - **Details**: Added `disabled` and `open` flags, plus `name:value` syntax for accordion behavior

### Enhanced

- **IntelliSense completions** now suggest all new attributes with context-aware documentation
- **15 new code snippets** showcasing the new attributes:
  - `wa-callout-small`, `wa-callout-filled` - Size and appearance variants
  - `wa-badge-pulse`, `wa-badge-pill`, `wa-badge-filled` - Animation and style options
  - `wa-button-filled`, `wa-button-large-pill`, `wa-button-loading`, `wa-button-caret` - Advanced button states
  - `wa-tag-removable`, `wa-tag-small-pill`, `wa-tag-large` - Tag variations
  - `wa-details-open`, `wa-details-accordion` - Collapsible content patterns
  - `wa-tabs-manual` - Manual tab activation
- **Component metadata** (`components.json`) updated with comprehensive documentation for all new attributes

### Changed

- Callout completions now include `brand` variant (canonical name for `info`)
- All component completions now trigger on partial delimiter matches (not just exact matches)

## [0.3.0] - 2025-11-07

### Removed

- Removed keyboard shortcut for "Insert Component" command to avoid conflicts with other extensions
- Cleaned up the README of AI-generated slop

## [0.2.0] - 2025-10-28

### Removed

- Removed syntax highlighting, as it interfered with other Markdown extensions

## [0.1.0] - 2025-10-27

### Added

- Initial release of Markawesome Syntax Support extension
- Syntax highlighting for all Markawesome component patterns:
  - Callouts (`:::info`, `:::success`, `:::warning`, `:::danger`, `:::neutral`)
  - Cards (`===` with appearance options)
  - Comparison (`|||` with optional position)
  - Carousel (`~~~~~~` with parameters)
  - Details (`^^^` with appearance and icon placement)
  - Dialog (`???` with parameters)
  - Tab Groups (`++++++` and `+++`)
  - Tags (`@@@` with variants)
  - Copy Buttons (`<<<`)
  - Badges (`!!!` with variants)
  - Buttons (`%%%` with variants)
  - Alternative syntax (`:::wa-component`)
- 20+ code snippets for quick component insertion
- IntelliSense/autocomplete for component parameters
- Hover documentation with examples and links
- Command palette commands:
  - Insert Component (with keyboard shortcut)
  - Wrap in Callout
  - Wrap in Card
  - Wrap in Tag
  - Wrap in Details
  - Convert Images to Comparison
  - Convert Images to Carousel
- Context menu integration for all commands
- TextMate grammar for syntax highlighting
- Comprehensive documentation and examples
