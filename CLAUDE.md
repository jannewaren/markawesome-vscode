# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A VS Code extension providing snippets, IntelliSense, hover docs, and commands for [Markawesome](https://github.com/jannewaren/markawesome) — a custom Markdown syntax that transforms into [Web Awesome](https://webawesome.com/) UI components. Activates on Markdown files.

## The markawesome ecosystem — keep the syntax in sync

The Markawesome-flavoured Markdown syntax spans **six repositories that must
stay in lockstep**:

| Repo | Role | Stack | Registry |
|------|------|-------|----------|
| `markawesome` | **Authors** the syntax (engine) | Ruby | RubyGems |
| `markawesome-js` | **Authors** the syntax (engine) | TypeScript / Node | npm |
| `jekyll-webawesome` | **Uses** it (Jekyll integration) | Ruby | RubyGems |
| `eleventy-plugin-webawesome` | **Uses** it (Eleventy integration) | Node | npm |
| `markawesome-vscode` | **Produces** it (snippets/completions/validation) | TypeScript | VS Code Marketplace |
| `markawesome-skill` | **Teaches** it (AI authoring skill) | Markdown | npm |

**This repo's role:** **produces** the syntax — editor tooling (snippets,
completions, hovers, wrap/insert commands). It is shared across **both** the Ruby
and Node worlds, so it may only emit syntax that **both** engines accept. When the
engines add or change syntax, update `src/data/components.json`, `snippets/`, and the
providers to match — and never introduce a delimiter or attribute that only one
engine supports.

**Sync rule:** any change to the Markawesome Markdown syntax must land in **both
engines** (`markawesome` *and* `markawesome-js`) so the Ruby and Node worlds accept
identical input, **and** here so the editor emits it. Confirm the engines agree via
`markawesome-js`'s `test/parity-corpus.test.ts` plus the Ruby specs in
`markawesome/spec/` before teaching this extension new syntax.

## Build & Development Commands

- **Compile:** `npm run compile` (runs `tsc -p ./`)
- **Watch:** `npm run watch` (continuous TypeScript compilation)
- **Lint:** `npm run lint` (ESLint on `src/`)
- **Package VSIX:** `npx vsce package`
- **Debug:** Press F5 in VS Code to launch an Extension Development Host (uses `.vscode/launch.json`)

There are no tests configured — `npm test` exists in package.json but there is no test infrastructure set up.

## Branching & Commits

This repo works directly on `main` — there is no feature-branch convention. Commit
changes, including version bumps, straight to `main`; do not create a branch when
asked to commit. A release is simply a `main` commit that bumps `version` in
`package.json` and adds a matching `CHANGELOG.md` entry.

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

## Releases are tagged to match the published version

A release is a `main` commit that bumps `version` in `package.json` and adds a
matching `CHANGELOG.md` entry (see "Branching & Commits" above), published to the
VS Code Marketplace with `vsce publish`. Every published version also gets a
matching **GitHub Release**, so the repo's releases line up 1:1 with what's
installable:

1. Tag the released commit `vX.Y.Z` — the same version as `package.json`.
2. Push the commit and the tag.
3. `gh release create vX.Y.Z` with notes drawn from `CHANGELOG.md`.

The GitHub Release tag **must equal** the version published to the VS Code
Marketplace.
