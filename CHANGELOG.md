# Changelog

All notable changes to the "markawesome-vscode" extension will be documented in this file.

## [Unreleased]

### Added

- **Declarative timestamps** — two new components matching markawesome's `<wa-format-date>` and `<wa-relative-time>` support:
  - **Format Date** and **Relative Time** entries in the component reference (`components.json`), surfaced on hover. Hover matches the inline `[[[ … ]]]` form (a leading `relative` token shows the Relative Time docs) and the `:::wa-format-date` / `:::wa-relative-time` block selectors.
  - **IntelliSense**: typing `[[[` suggests the `relative` mode flag plus the formatting tokens — `style:`/`time:` presets, granular `weekday:`/`month:`/`day:`/`hour:`/… keys, `hour-format:`, `time-zone-name:`, `time-zone:`, `lang:`, and the relative `format:`/`numeric:`/`sync` tokens. The `:::wa-format-date` / `:::wa-relative-time` selector lines offer their mode-appropriate subset, and both selectors are added to the `:::` component picker. `[` is now a completion trigger character.
  - **Snippets**: `wa-format-date` (`[[[date style:…]]]`), `wa-format-date-time` (adds `time:…`), and `wa-relative-time` (`[[[relative date]]]`).

## [0.12.0] - 2026-06-25

Brings the extension to parity with markawesome 0.16 / jekyll-webawesome 0.22 by adding the copy-button **tooltip** attribute (`tooltip:full|copy|none`), which controls *when* the built-in tooltip appears (distinct from the existing `tooltip-placement`).

### Added

- **Copy-button tooltip mode** — `tooltip:full|copy|none` on the `<<<` (or `:::wa-copy-button`) line: `full` (default — tooltip on hover/focus plus copy feedback), `copy` (silent on hover/focus; tooltip only for copy feedback), `none` (no tooltip in any state).
  - **IntelliSense**: typing `<<<` now also suggests `tooltip:full`, `tooltip:copy`, and `tooltip:none` (each with its own description).
  - **Hover documentation**: the copy-button hover now lists the tooltip mode alongside placements.
  - **Snippet**: `wa-copy-tooltip` (`<<<tooltip:${1|full,copy,none|}`).
  - **Command**: `Markawesome: Wrap in Copy Button` now offers a tooltip-mode quick-pick (`none` omits the token, leaving Web Awesome's `full` default).
  - **Component reference** entry in `components.json` gains a `tooltips` array and updated syntax/parameters/documentation, surfaced in README's "Copy Button Parameters" and a `<<<top tooltip:copy` case in `examples/demo.md`.

## [0.11.0] - 2026-06-25

Brings the extension to parity with markawesome 0.15 / jekyll-webawesome 0.21 by adding the **Tooltip** component.

### Added

- **Tooltip component** (inline `(((anchor >>> tip)))` primary form, or the `:::wa-tooltip placement? distance:N?` block alternative). Inline contextual help shown on hover or focus — ideal for glossary terms and inline definitions.
  - **Syntax highlighting** for the inline `(((` … `>>>` … `)))` form (anchor, separator, and tip each scoped); `wa-tooltip` added to the alternative-syntax highlighting.
  - **IntelliSense**: typing `(((` suggests the four placements (`top`/`bottom`/`left`/`right`) and `distance:`. Added `(` as a completion trigger character.
  - **Hover documentation** on inline `(((…>>>…)))` lines and the `:::wa-tooltip` form.
  - **Snippets**: `wa-tooltip` (block alternative) and `wa-tooltip-inline` (`(((${1:term} >>> ${2:tip})))`).
  - **Command / context menu**: `Markawesome: Wrap in Tooltip` wraps the selection as a tooltip anchor after a quick-pick of placement.
  - **Component reference** entry in `components.json` (inline + alt syntax, placements, `distance:N`), surfaced in README and `examples/demo.md`.

## [0.10.0] - 2026-06-24

Brings the extension to parity with markawesome 0.14 / jekyll-webawesome 0.20 by adding the **Accordion** component.

### Added

- **Accordion component** (`//////appearance? mode? icon-placement? heading:N?` container with `///` items, or the `:::wa-accordion` alternative). A multi-section collapsible container — the grouped sibling of Details.
  - **Syntax highlighting** for the `//////` container fence, its container tokens, the `///` item header/close, and Markdown item bodies; `wa-accordion` added to the alternative-syntax highlighting.
  - **IntelliSense**: on the `//////` line (and `:::wa-accordion`) suggests `appearance` (outlined/filled/filled-outlined/plain), `mode` (multiple/single/single-collapsible), icon placement (start/end), and `heading:`; on a `/// ` item header line suggests `expanded`/`disabled`/`icon:`. Added `/` as a completion trigger character, and `wa-accordion` to the `:::` component list.
  - **Hover documentation** on the `//////` container line and the `:::wa-accordion` form. Hover now also renders a component's `modes` metadata.
  - **Snippets**: `wa-accordion` (3-item container) and `wa-accordion-single` (`mode: single` variant).
  - **Command / context menu**: `Markawesome: Wrap in Accordion` wraps the selection into an accordion after a quick-pick of appearance and mode.
  - **Component reference** entry in `components.json` (appearances, modes, placements, item flags `[expanded, disabled]`, and `heading:`/`icon:` parameters), surfaced in README.

## [0.9.0] - 2026-06-20

Brings the extension to full parity with markawesome 0.13 / jekyll-webawesome 0.19.

### Added

- **Icon component** (`$$$name` inline, `:::wa-icon name family? variant? animation?` block):
  - Inline `$$$name` decorative icons and block `:::wa-icon` icons with `family`/`variant`/`animation` attributes and an accessible label body
  - Syntax highlighting for inline `$$$name` and the `:::wa-icon` block
  - Hover documentation (works on both the inline form and the block)
  - IntelliSense for `family`/`variant`/`animation` after `:::wa-icon <name>`, plus a `$$$` inline hint
  - `wa-icon` (block), `wa-icon-animation`, and `wa-icon-inline` snippets
  - `$` registered as a completion trigger character
- **Web Awesome 3.x size scale** (`xs`, `s`, `m`, `l`, `xl`) for **Callout**, **Tag**, and **Button**, alongside the legacy `small`/`medium`/`large` aliases — in completions, hover, and highlighting
- **Callout icon attributes**: `family` (classic, sharp, duotone, sharp-duotone, brands), `variant` (thin, light, regular, solid), and `animation` (beat, fade, beat-fade, bounce, flip, shake, spin, spin-pulse, spin-reverse), e.g. `:::warning shake`. Added a `wa-callout-animation` snippet.
- **Button link `target`/`download`**: `_blank`, `_self`, `_parent`, `_top` (with auto `rel="noopener noreferrer"` for `_blank`) and the `download` flag for link-form buttons — in completions, hover, and highlighting
- **Copy Button parameters**: tooltip `placement` (top/right/bottom/left), numeric feedback duration, `disabled`, `copy-label="…"`, `success-label="…"`, `error-label="…"`, and `from="…"` — in completions, hover, and highlighting. Added `wa-copy-placement`, `wa-copy-labels`, and `wa-copy-from` snippets, and `<` as a completion trigger character.
- **Card `orientation`** (`horizontal`/`vertical`) in completions, hover, and highlighting
- **Carousel `autoplay-interval`** parameter in completions and metadata
- **Layout gap scale `4xl`/`5xl`** for all layouts (Grid, Stack, Cluster, Split, Flank, Frame)

### Changed

- Hover now renders `sizes`, icon `families`/`animations`, and `flags` metadata
- Badge, Card, and Copy Button highlighting now capture their full parameter lists (previously only the first variant/appearance token, or nothing, was scoped)
- Alternative `:::wa-*` syntax highlighting now matches parameterless forms (e.g. `:::wa-copy-button`)

## [0.8.0] - 2026-03-13

### Added

- **Inline popover syntax** (`&&&trigger >>> content&&&`) support:
  - Hover documentation with inline syntax reference and examples
  - `wa-popover-inline` code snippet for inserting inline popovers
  - Documentation for `\n` line breaks in popover content
  - Documentation for inline code in trigger text

## [0.7.0] - 2026-03-12

### Added

- **Popover component** (`&&&` or `:::wa-popover`) support:
  - IntelliSense completions for placement (`top`, `bottom`, `left`, `right`), `link`, `without-arrow`, and `distance:N`
  - Hover documentation with syntax reference and examples
  - `wa-popover`, `wa-popover-placement`, and `wa-popover-link` code snippets
  - "Wrap in Popover" command with placement and trigger style (button/link) selection
  - TextMate grammar for `&&&` syntax highlighting with `>>>` separator
  - Context menu integration for popover wrapping
  - Component metadata in `components.json`

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
