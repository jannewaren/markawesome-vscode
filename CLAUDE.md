# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A VS Code extension providing snippets, IntelliSense, hover docs, and commands for [Markawesome](https://github.com/jannewaren/markawesome) — a custom Markdown syntax that transforms into [Web Awesome](https://webawesome.com/) UI components. Activates on Markdown files.

## Build & Development Commands

- **Compile:** `npm run compile` (runs `tsc -p ./`)
- **Watch:** `npm run watch` (continuous TypeScript compilation)
- **Lint:** `npm run lint` (ESLint on `src/`)
- **Package VSIX:** `npx vsce package`
- **Debug:** Press F5 in VS Code to launch an Extension Development Host (uses `.vscode/launch.json`)

There are no tests configured — `npm test` exists in package.json but there is no test infrastructure set up.

## Architecture

The extension entry point is `src/extension.ts`, which registers all providers and commands with VS Code.

### Key modules

- **`src/providers/completionProvider.ts`** — `WebAwesomeCompletionProvider`: provides IntelliSense triggered by delimiter characters (`:`, `=`, `|`, `^`, `?`, `@`, `!`, `%`, `~`, `+`). Matches line prefixes against component delimiter patterns and offers contextual completions.
- **`src/providers/hoverProvider.ts`** — `WebAwesomeHoverProvider`: shows documentation on hover by matching line content against component syntax patterns, using data from `components.json`.
- **`src/commands/wrapCommands.ts`** — Wrap commands that surround selected text with component delimiters (callout, card, tag, details, badge, button, copy button, dialog, tab group). Each prompts with `showQuickPick` for variant/appearance selection.
- **`src/commands/insertComponent.ts`** — Insert Component command that shows a picker of all components from `components.json` and inserts the example as a snippet.
- **`src/commands/transformCommands.ts`** — Transform commands that parse selected Markdown images and convert them to comparison (`|||`) or carousel (`~~~~~~`) syntax.
- **`src/data/components.json`** — Single source of truth for component metadata (names, syntax patterns, variants, descriptions, examples). Used by hover provider and insert command.
- **`snippets/markawesome.json`** — VS Code snippet definitions (prefix-triggered, e.g., `wa-callout-info`).

### Component syntax mapping

Each Markawesome component uses a unique delimiter character sequence as its primary syntax, plus an alternative `:::wa-*` syntax:

| Component   | Delimiter  |
|-------------|------------|
| Callout     | `:::`      |
| Card        | `===`      |
| Comparison  | `\|\|\|`   |
| Carousel    | `~~~~~~`   |
| Details     | `^^^`      |
| Dialog      | `???`      |
| Tab Group   | `++++++`   |
| Tag         | `@@@`      |
| Copy Button | `<<<`      |
| Badge       | `!!!`      |
| Button      | `%%%`      |

## Key Design Patterns

- Component metadata is centralized in `src/data/components.json` — when adding or modifying components, update this file first since both `hoverProvider` and `insertComponent` read from it. The `completionProvider` currently hardcodes its values separately.
- The `Component` interface is duplicated across `completionProvider.ts`, `hoverProvider.ts`, and `insertComponent.ts` rather than shared.
- All commands are registered in `extension.ts` and mapped to `package.json` contributes.commands. Adding a new command requires updating both files.
- TypeScript compiles to `out/` directory. The `.vscodeignore` excludes source files from the packaged extension.
