# Changelog

All notable changes to the "markawesome-vscode" extension will be documented in this file.

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
