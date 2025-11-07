# Markawesome Syntax Support

![Version](https://img.shields.io/badge/version-0.1.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

Syntax highlighting, snippets, and IntelliSense for [Markawesome](https://github.com/jannewaren/markawesome) custom Markdown components. Write beautiful, interactive content using simple Markdown-like syntax that transforms into [Web Awesome](https://webawesome.com/) components.

## Features

### Code Snippets

Quick insertion of component templates with tab stops:

| Prefix               | Description                         |
|----------------------|-------------------------------------|
| `wa-callout-info`    | Info callout                        |
| `wa-callout-warning` | Warning callout                     |
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
| `wa-badge`           | Badge component                     |
| `wa-button`          | Button with link                    |

### IntelliSense

Intelligent autocomplete suggestions as you type:

- Type `:::` → Get list of component types and callout variants
- Type `===` → Suggests card appearance options
- Type `^^^` → Suggests details appearance and icon placement
- Type `???` → Suggests dialog parameters
- Type `@@@` → Suggests tag variants
- Type `!!!` → Suggests badge variants
- Type `%%%` → Suggests button variants
- Type `~~~~~~` → Suggests carousel parameters

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
```

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
%%%primary
[Get Started](https://example.com)
%%%
```

## Component Reference

### Callout Types

- `info` - Blue with info icon
- `success` - Green with checkmark
- `warning` - Yellow with warning icon
- `danger` - Red with exclamation
- `neutral` - Gray with gear icon

### Card Appearances

- `outlined` - Default outlined appearance (default)
- `filled` - Filled background
- `plain` - Minimal appearance
- `filled-outlined` - Combination style
- `accent` - Emphasis appearance

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

### Button Variants

- `primary` - Primary button style
- `default` - Default button style
- `text` - Text-only button
- `danger` - Danger/destructive action

### Carousel Parameters

- `navigation` - Show prev/next arrows
- `pagination` - Show dot indicators
- `loop` - Enable infinite loop
- `autoplay` - Auto-advance slides
- `mouse-dragging` - Enable drag to slide
- `vertical` - Vertical orientation
- `scroll-hint:value` - Show scroll hint
- `aspect-ratio:value` - e.g., `16/9`, `4/3`
- `slide-gap:value` - Gap between slides
- `slides-per-page:n` - Slides visible at once
- `slides-per-move:n` - Slides to move at once

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
