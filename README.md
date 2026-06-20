# Markawesome Syntax Support

Syntax highlighting, snippets, and IntelliSense for [Markawesome](https://github.com/jannewaren/markawesome) custom Markdown components. Write beautiful, interactive content using simple Markdown-like syntax that transforms into [Web Awesome](https://webawesome.com/) components.

Get it from the [VSCode Marketplace: markawesome-vscode](https://marketplace.visualstudio.com/items?itemName=jannewaren.markawesome-vscode)

## Features

### Code Snippets

Quick insertion of component templates with tab stops:

| Prefix               | Description                         |
|----------------------|-------------------------------------|
| `wa-callout-info`    | Info callout                        |
| `wa-callout-warning` | Warning callout                     |
| `wa-callout-animation` | Callout with an animated icon     |
| `wa-icon`            | Icon block with accessible label    |
| `wa-icon-animation`  | Animated icon block                 |
| `wa-icon-inline`     | Inline (decorative) icon            |
| `wa-card`            | Basic card                          |
| `wa-card-full`       | Card with header, image, and footer |
| `wa-carousel`        | Basic carousel                      |
| `wa-carousel-nav`    | Carousel with navigation            |
| `wa-comparison`      | Image comparison                    |
| `wa-dialog`          | Modal dialog                        |
| `wa-details`         | Collapsible details                 |
| `wa-tabs`            | Tab group with 3 tabs               |
| `wa-tag`             | Tag component                       |
| `wa-copy`            | Copy button                         |
| `wa-copy-placement`  | Copy button with tooltip placement  |
| `wa-copy-labels`     | Copy button with custom labels      |
| `wa-copy-from`       | Copy button reading another element |
| `wa-badge`           | Badge component                     |
| `wa-button`          | Button with link                    |
| `wa-popover`         | Popover with trigger and content    |
| `wa-popover-placement` | Popover with placement option     |
| `wa-popover-link`    | Popover with link-style trigger     |

### IntelliSense

Intelligent autocomplete suggestions as you type:

- Type `:::` → Get list of component types and callout variants (and `:::wa-icon`)
- Type `:::warning ` → Suggests callout size, appearance, and icon family/variant/animation
- Type `===` → Suggests card appearance and orientation options
- Type `^^^` → Suggests details appearance and icon placement
- Type `???` → Suggests dialog parameters
- Type `@@@` → Suggests tag variants and the `xs`–`xl` size scale
- Type `!!!` → Suggests badge variants
- Type `%%%` → Suggests button variants, the `xs`–`xl` size scale, and link `target`/`download`
- Type `<<<` → Suggests copy-button placement, labels, duration, and `from`
- Type `~~~~~~` → Suggests carousel parameters (including `autoplay-interval`)
- Type `&&&` → Suggests popover placement and options
- Type `$$$` → Inline icon hint; `:::wa-icon <name> ` suggests family/variant/animation

### Hover Documentation

Hover over any component syntax to see:

- Component description
- Available parameters and options
- Usage examples
- Link to full documentation

### Command Palette

Access powerful commands via Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`):

- `Markawesome: Insert Component` - Insert a new component with guided parameter selection
- `Markawesome: Wrap in Callout` - Wrap selected text in a callout (choose variant)
- `Markawesome: Wrap in Card` - Wrap selected text in a card
- `Markawesome: Wrap in Tag` - Wrap selected text in a tag
- `Markawesome: Wrap in Details` - Wrap selected text in collapsible details
- `Markawesome: Convert Images to Comparison` - Convert 2 selected images to a comparison component
- `Markawesome: Convert Images to Carousel` - Convert multiple selected images to a carousel
- `Markawesome: Wrap in Popover` - Wrap selected text in a popover with placement selection

### Context Menu

Right-click in a Markdown file to access all commands via the **Markawesome** submenu.

## Usage Examples

### Callouts

```markdown
:::info
This is an important information callout with **bold text** and [links](https://example.com).
:::

:::warning
Be careful when performing this action!
:::

:::warning shake
This callout's icon animates (no Pro kit required).
:::
```

### Icons

```markdown
Inline, decorative icons sit mid-prose like the $$$gear icon here.

:::wa-icon bell shake
Notifications
:::
```

Inline `$$$name` icons are name-only and decorative. The `:::wa-icon` block takes the
name first, then optional `family`/`variant`/`animation` attributes, and an optional
body that becomes the icon's accessible label.

### Cards

```markdown
===filled
![Hero Image](hero.jpg)
# Getting Started
Learn how to use Web Awesome components in your Jekyll site.
[Read More](https://example.com)
===
```

### Comparison

```markdown
|||25
![Before optimization](before.jpg)
![After optimization](after.jpg)
|||
```

### Carousel

```markdown
~~~~~~navigation pagination loop
~~~
![Slide 1](slide1.jpg)
~~~
~~~
![Slide 2](slide2.jpg)
~~~
~~~
![Slide 3](slide3.jpg)
~~~
~~~~~~
```

### Details

```markdown
^^^filled start
Click to expand this section
>>>
This is the hidden content that can be collapsed and expanded.

- Supports **markdown**
- Including lists
- And [links](https://example.com)
^^^
```

### Dialog

```markdown
???light-dismiss 600px
Open Dialog
>>>
# Dialog Title

This is the content inside the modal dialog.

[Close](#)
???
```

### Popover

```markdown
&&&top
Hover for info
>>>
This is the popover content with **markdown** support.
&&&

&&&bottom link
Learn more
>>>
Detailed explanation with [links](https://example.com) and **formatting**.
&&&
```

### Tabs

```markdown
++++++top
+++ Features
Learn about the key features of our product.
+++
+++ Documentation
Read the comprehensive documentation.
+++
+++ Support
Get help from our support team.
+++
++++++
```

### Tags and Badges

```markdown
@@@brand
Version 2.0
@@@

!!!success
New
!!!
```

### Copy Button

```markdown
<<<
npm install markawesome
<<<
```

### Button

```markdown
%%%brand
[Get Started](https://example.com)
%%%

%%%brand _blank
[Open in a new tab](https://webawesome.com)
%%%
```

## Component Reference

### Callout Types

- `info` - Blue with info icon
- `success` - Green with checkmark
- `warning` - Yellow with warning icon
- `danger` - Red with exclamation
- `neutral` - Gray with gear icon

**Sizes**: `xs`, `s`, `m`, `l`, `xl` (Web Awesome 3.x scale) plus legacy `small`, `medium`, `large`

**Icon attributes**: override the callout icon's `family` (`classic`, `sharp`, `duotone`, `sharp-duotone`, `brands`), `variant` weight (`thin`, `light`, `regular`, `solid`), and `animation` (`beat`, `fade`, `beat-fade`, `bounce`, `flip`, `shake`, `spin`, `spin-pulse`, `spin-reverse`). Animation needs no Pro kit.

### Icon

- **Inline**: `$$$name` — name-only, decorative
- **Block**: `:::wa-icon name family? variant? animation?` with an optional body that becomes the accessible label
- **Families**: `classic`, `sharp`, `duotone`, `sharp-duotone`, `brands`
- **Variants** (Font Awesome weight): `thin`, `light`, `regular`, `solid`
- **Animations**: `beat`, `fade`, `beat-fade`, `bounce`, `flip`, `shake`, `spin`, `spin-pulse`, `spin-reverse`

### Card Appearances

- `outlined` - Default outlined appearance (default)
- `filled` - Filled background
- `plain` - Minimal appearance
- `filled-outlined` - Combination style
- `accent` - Emphasis appearance

**Orientation**: `vertical` (default) or `horizontal` (media and content side-by-side)

### Details Options

**Appearances**: `outlined`, `filled`, `plain`, `filled-outlined`  
**Icon Placement**: `start`, `end`

### Tab Placements

- `top` - Tabs at top (default)
- `bottom` - Tabs at bottom
- `start` - Tabs on left
- `end` - Tabs on right

### Tag/Badge Variants

- `brand` - Primary brand color
- `success` - Success/positive state
- `warning` - Warning/caution state
- `danger` - Error/critical state
- `neutral` - Neutral/informational state

**Tag sizes**: `xs`, `s`, `m`, `l`, `xl` (Web Awesome 3.x scale) plus legacy `small`, `medium`, `large`

### Button Variants and Options

- **Variants**: `brand`, `success`, `neutral`, `warning`, `danger`
- **Appearances**: `accent`, `filled`, `outlined`, `filled-outlined`, `plain`
- **Sizes**: `xs`, `s`, `m`, `l`, `xl` (Web Awesome 3.x scale) plus legacy `small`, `medium`, `large`
- **Flags**: `pill`, `caret`, `loading`, `disabled`
- **Link target/download** (link-form buttons only): `_blank`, `_self`, `_parent`, `_top` set the anchor target (`_blank` auto-adds `rel="noopener noreferrer"`); `download` downloads the linked file

### Popover Options

- `top` - Popover appears above trigger (default)
- `bottom` - Popover appears below trigger
- `left` - Popover appears to the left
- `right` - Popover appears to the right
- `link` - Renders trigger as underlined text instead of button
- `without-arrow` - Hides the popover arrow
- `distance:N` - Custom distance in pixels (e.g., `distance:10`)

### Carousel Parameters

- `navigation` - Show prev/next arrows
- `pagination` - Show dot indicators
- `loop` - Enable infinite loop
- `autoplay` - Auto-advance slides
- `autoplay-interval:value` - Milliseconds between auto-advances (e.g., `5000`; default 3000)
- `mouse-dragging` - Enable drag to slide
- `vertical` - Vertical orientation
- `scroll-hint:value` - Show scroll hint
- `aspect-ratio:value` - e.g., `16/9`, `4/3`
- `slide-gap:value` - Gap between slides
- `slides-per-page:n` - Slides visible at once
- `slides-per-move:n` - Slides to move at once

### Copy Button Parameters

- `top` / `right` / `bottom` / `left` - Tooltip placement (default `top`)
- `2000` - A bare number sets the success-feedback duration in milliseconds
- `disabled` - Disable the copy button
- `copy-label="…"` - Tooltip text before copying
- `success-label="…"` - Tooltip text after a successful copy
- `error-label="…"` - Tooltip text when copying fails
- `from="…"` - Copy from another element by ID (also `from="input.value"`, `from="link[href]"`)

### Layout Gap Scale

`0`, `3xs`, `2xs`, `xs`, `s`, `m`, `l`, `xl`, `2xl`, `3xl`, `4xl`, `5xl`

## Requirements

- VS Code version 1.80.0 or higher
- Markdown files (`.md`, `.markdown`)
- [Markawesome](https://github.com/jannewaren/markawesome) gem for transforming Markdown to Web Awesome components

## Extension Settings

This extension works out of the box with no configuration needed.

## Related Projects

- [Markawesome](https://github.com/jannewaren/markawesome) - The gem that transforms Markdown to Web Awesome components
- [Web Awesome](https://webawesome.com/) - The UI component library

## Contributing

Contributions are welcome! Please see the [GitHub repository](https://github.com/jannewaren/markawesome-vscode) for details.

## License

This extension is available under the [MIT License](LICENSE).
