import * as vscode from 'vscode';
import componentsData from '../data/components.json';

interface Component {
  name: string;
  primarySyntax: string;
  altSyntax?: string;
  types?: string[];
  variants?: string[];
  appearances?: string[];
  placements?: string[];
  modes?: string[];
  sizes?: string[];
  families?: string[];
  animations?: string[];
  flags?: string[];
  parameters?: string[];
  description: string;
  example: string;
}

export class WebAwesomeCompletionProvider implements vscode.CompletionItemProvider {
  provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken,
    context: vscode.CompletionContext
  ): vscode.CompletionItem[] | undefined {
    const linePrefix = document.lineAt(position).text.substr(0, position.character);
    const completions: vscode.CompletionItem[] = [];

    // Component type completions after :::
    if (linePrefix.match(/:::$/)) {
      // Add callout types (including brand)
      const calloutTypes = ['info', 'brand', 'success', 'warning', 'danger', 'neutral'];
      calloutTypes.forEach(type => {
        const item = new vscode.CompletionItem(type, vscode.CompletionItemKind.Keyword);
        item.detail = 'Callout';
        item.documentation = new vscode.MarkdownString(`Insert ${type} callout`);
        item.insertText = new vscode.SnippetString(`${type}\n$1\n:::`);
        completions.push(item);
      });

      // Add alternative syntax components
      const components = ['wa-callout', 'wa-card', 'wa-comparison', 'wa-carousel',
                         'wa-details', 'wa-accordion', 'wa-dialog', 'wa-popover', 'wa-tabs', 'wa-tag',
                         'wa-copy-button', 'wa-badge', 'wa-button', 'wa-icon'];
      components.forEach(comp => {
        const item = new vscode.CompletionItem(comp, vscode.CompletionItemKind.Class);
        item.detail = 'Web Awesome Component';
        item.documentation = new vscode.MarkdownString(`Insert ${comp} component`);
        completions.push(item);
      });
    }

    // Callout size/appearance/icon completions after :::variant
    if (linePrefix.match(/:::(info|brand|success|warning|danger|neutral)\s+\S*$/)) {
      const sizes = ['xs', 's', 'm', 'l', 'xl', 'small', 'medium', 'large'];
      sizes.forEach(size => {
        const item = new vscode.CompletionItem(size, vscode.CompletionItemKind.Property);
        item.detail = 'Callout Size';
        item.documentation = new vscode.MarkdownString(`Callout with ${size} size`);
        completions.push(item);
      });

      const appearances = ['accent', 'filled', 'outlined', 'plain', 'filled-outlined'];
      appearances.forEach(appearance => {
        const item = new vscode.CompletionItem(appearance, vscode.CompletionItemKind.Property);
        item.detail = 'Callout Appearance';
        item.documentation = new vscode.MarkdownString(`Callout with ${appearance} appearance`);
        completions.push(item);
      });

      const families = ['classic', 'sharp', 'duotone', 'sharp-duotone', 'brands'];
      families.forEach(family => {
        const item = new vscode.CompletionItem(family, vscode.CompletionItemKind.EnumMember);
        item.detail = 'Callout Icon Family';
        item.documentation = new vscode.MarkdownString(`Override the callout icon's font family (${family})`);
        completions.push(item);
      });

      const iconVariants = ['thin', 'light', 'regular', 'solid'];
      iconVariants.forEach(variant => {
        const item = new vscode.CompletionItem(variant, vscode.CompletionItemKind.EnumMember);
        item.detail = 'Callout Icon Variant';
        item.documentation = new vscode.MarkdownString(`Override the callout icon's font weight (${variant})`);
        completions.push(item);
      });

      const animations = ['beat', 'fade', 'beat-fade', 'bounce', 'flip', 'shake', 'spin', 'spin-pulse', 'spin-reverse'];
      animations.forEach(animation => {
        const item = new vscode.CompletionItem(animation, vscode.CompletionItemKind.EnumMember);
        item.detail = 'Callout Icon Animation';
        item.documentation = new vscode.MarkdownString(`Animate the callout icon (${animation}) — no Pro kit required`);
        completions.push(item);
      });

      const iconItem = new vscode.CompletionItem('icon:', vscode.CompletionItemKind.Property);
      iconItem.detail = 'Custom Icon';
      iconItem.documentation = new vscode.MarkdownString('Override default variant icon (e.g., `icon:shield`, `icon:rocket`)');
      iconItem.insertText = new vscode.SnippetString('icon:${1:icon-name}');
      completions.push(iconItem);
    }

    // Card appearance/orientation completions after ===
    if (linePrefix.match(/===$/)) {
      const appearances = ['outlined', 'filled', 'filled-outlined', 'plain', 'accent'];
      appearances.forEach(appearance => {
        const item = new vscode.CompletionItem(appearance, vscode.CompletionItemKind.Property);
        item.detail = 'Card Appearance';
        item.documentation = new vscode.MarkdownString(`Card with ${appearance} appearance`);
        completions.push(item);
      });

      const orientations = ['horizontal', 'vertical'];
      orientations.forEach(orientation => {
        const item = new vscode.CompletionItem(orientation, vscode.CompletionItemKind.Property);
        item.detail = 'Card Orientation';
        item.documentation = new vscode.MarkdownString(
          orientation === 'horizontal'
            ? 'Media and content sit side-by-side'
            : 'Default — media stacked above content'
        );
        completions.push(item);
      });
    }

    // Icon attribute completions after :::wa-icon <name>
    if (linePrefix.match(/:::wa-icon\s+\S+\s/)) {
      const families = ['classic', 'sharp', 'duotone', 'sharp-duotone', 'brands'];
      families.forEach(family => {
        const item = new vscode.CompletionItem(family, vscode.CompletionItemKind.EnumMember);
        item.detail = 'Icon Family';
        item.documentation = new vscode.MarkdownString(`Icon font family (${family})`);
        completions.push(item);
      });

      const iconVariants = ['thin', 'light', 'regular', 'solid'];
      iconVariants.forEach(variant => {
        const item = new vscode.CompletionItem(variant, vscode.CompletionItemKind.EnumMember);
        item.detail = 'Icon Variant';
        item.documentation = new vscode.MarkdownString(`Icon font weight (${variant})`);
        completions.push(item);
      });

      const animations = ['beat', 'fade', 'beat-fade', 'bounce', 'flip', 'shake', 'spin', 'spin-pulse', 'spin-reverse'];
      animations.forEach(animation => {
        const item = new vscode.CompletionItem(animation, vscode.CompletionItemKind.EnumMember);
        item.detail = 'Icon Animation';
        item.documentation = new vscode.MarkdownString(`Animate the icon (${animation}) — no Pro kit required`);
        completions.push(item);
      });
    }

    // Inline icon hint after $$$
    if (linePrefix.match(/\$\$\$$/)) {
      const item = new vscode.CompletionItem('icon-name', vscode.CompletionItemKind.Snippet);
      item.detail = 'Inline Icon (decorative)';
      item.documentation = new vscode.MarkdownString('Inline `$$$name` icons are name-only and decorative. Use the block `:::wa-icon` form for attributes and an accessible label.');
      item.insertText = new vscode.SnippetString('${1:gear}');
      completions.push(item);
    }

    // Details completions after ^^^
    if (linePrefix.match(/\^\^\^/)) {
      const appearances = ['outlined', 'filled', 'filled-outlined', 'plain'];
      appearances.forEach(appearance => {
        const item = new vscode.CompletionItem(appearance, vscode.CompletionItemKind.Property);
        item.detail = 'Details Appearance';
        item.documentation = new vscode.MarkdownString(`Details with ${appearance} appearance`);
        completions.push(item);
      });

      const placements = ['start', 'end'];
      placements.forEach(placement => {
        const item = new vscode.CompletionItem(placement, vscode.CompletionItemKind.Property);
        item.detail = 'Icon Placement';
        item.documentation = new vscode.MarkdownString(`Icon on the ${placement}`);
        completions.push(item);
      });

      const flags = [
        { name: 'disabled', doc: 'Prevents toggling' },
        { name: 'open', doc: 'Initially expanded' },
        { name: 'name:', doc: 'Group name for accordion (e.g., name:accordion-1)' }
      ];
      flags.forEach(({ name, doc }) => {
        const item = new vscode.CompletionItem(name, vscode.CompletionItemKind.Property);
        item.detail = 'Details Flag';
        item.documentation = new vscode.MarkdownString(doc);
        completions.push(item);
      });

      const iconItems = [
        { name: 'icon:expand:', detail: 'Custom Expand Icon', doc: 'Custom expand icon (e.g., `icon:expand:plus`)' },
        { name: 'icon:collapse:', detail: 'Custom Collapse Icon', doc: 'Custom collapse icon (e.g., `icon:collapse:minus`)' }
      ];
      iconItems.forEach(({ name, detail, doc }) => {
        const item = new vscode.CompletionItem(name, vscode.CompletionItemKind.Property);
        item.detail = detail;
        item.documentation = new vscode.MarkdownString(doc);
        item.insertText = new vscode.SnippetString(`${name}\${1:icon-name}`);
        completions.push(item);
      });
    }

    // Accordion container completions on the //////  line (and :::wa-accordion)
    if (linePrefix.match(/^\/{6}/) || linePrefix.match(/^:::wa-accordion/)) {
      const appearances = ['outlined', 'filled', 'filled-outlined', 'plain'];
      appearances.forEach(appearance => {
        const item = new vscode.CompletionItem(appearance, vscode.CompletionItemKind.Property);
        item.detail = 'Accordion Appearance';
        item.documentation = new vscode.MarkdownString(`Accordion with ${appearance} appearance`);
        completions.push(item);
      });

      const modes = [
        { name: 'multiple', doc: 'Several sections can be open at once (default)' },
        { name: 'single', doc: 'Only one section open at a time (one always stays open)' },
        { name: 'single-collapsible', doc: 'Only one section open at a time, and all can be closed' }
      ];
      modes.forEach(({ name, doc }) => {
        const item = new vscode.CompletionItem(name, vscode.CompletionItemKind.Property);
        item.detail = 'Accordion Mode';
        item.documentation = new vscode.MarkdownString(doc);
        completions.push(item);
      });

      const placements = ['start', 'end'];
      placements.forEach(placement => {
        const item = new vscode.CompletionItem(placement, vscode.CompletionItemKind.Property);
        item.detail = 'Accordion Icon Placement';
        item.documentation = new vscode.MarkdownString(`Expand icon on the ${placement}`);
        completions.push(item);
      });

      const headingItem = new vscode.CompletionItem('heading:', vscode.CompletionItemKind.Property);
      headingItem.detail = 'Accordion Heading Level';
      headingItem.documentation = new vscode.MarkdownString('Semantic heading level for item headers: `1`–`6` or `none` (e.g., `heading:2`)');
      headingItem.insertText = new vscode.SnippetString('heading:${1:2}');
      completions.push(headingItem);
    }

    // Accordion item completions on the /// item header line
    if (linePrefix.match(/^\/{3} /)) {
      const flags = [
        { name: 'expanded', doc: 'This section starts expanded on load' },
        { name: 'disabled', doc: 'This section renders but cannot be toggled' }
      ];
      flags.forEach(({ name, doc }) => {
        const item = new vscode.CompletionItem(name, vscode.CompletionItemKind.Property);
        item.detail = 'Accordion Item Flag';
        item.documentation = new vscode.MarkdownString(doc);
        completions.push(item);
      });

      const iconItem = new vscode.CompletionItem('icon:', vscode.CompletionItemKind.Property);
      iconItem.detail = 'Accordion Item Icon';
      iconItem.documentation = new vscode.MarkdownString('Custom expand icon for this item, inserted as its first child (e.g., `icon:star`)');
      iconItem.insertText = new vscode.SnippetString('icon:${1:icon-name}');
      completions.push(iconItem);
    }

    // Dialog completions after ???
    if (linePrefix.match(/\?\?\?$/)) {
      const item1 = new vscode.CompletionItem('light-dismiss', vscode.CompletionItemKind.Property);
      item1.detail = 'Dialog Parameter';
      item1.documentation = new vscode.MarkdownString('Close dialog when clicking outside');
      completions.push(item1);

      const item2 = new vscode.CompletionItem('600px', vscode.CompletionItemKind.Value);
      item2.detail = 'Dialog Width';
      item2.documentation = new vscode.MarkdownString('Set custom dialog width');
      completions.push(item2);
    }

    // Tag completions after @@@
    if (linePrefix.match(/@@@/)) {
      const variants = ['brand', 'success', 'neutral', 'warning', 'danger'];
      variants.forEach(variant => {
        const item = new vscode.CompletionItem(variant, vscode.CompletionItemKind.Color);
        item.detail = 'Tag Variant';
        item.documentation = new vscode.MarkdownString(`Tag with ${variant} variant`);
        completions.push(item);
      });

      const appearances = ['accent', 'filled', 'outlined', 'filled-outlined'];
      appearances.forEach(appearance => {
        const item = new vscode.CompletionItem(appearance, vscode.CompletionItemKind.Property);
        item.detail = 'Tag Appearance';
        item.documentation = new vscode.MarkdownString(`Tag with ${appearance} appearance`);
        completions.push(item);
      });

      const sizes = ['xs', 's', 'm', 'l', 'xl', 'small', 'medium', 'large'];
      sizes.forEach(size => {
        const item = new vscode.CompletionItem(size, vscode.CompletionItemKind.Property);
        item.detail = 'Tag Size';
        item.documentation = new vscode.MarkdownString(`Tag with ${size} size`);
        completions.push(item);
      });

      const flags = [
        { name: 'pill', doc: 'Rounded edges' },
        { name: 'with-remove', doc: 'Removable tag with remove button' }
      ];
      flags.forEach(({ name, doc }) => {
        const item = new vscode.CompletionItem(name, vscode.CompletionItemKind.Property);
        item.detail = 'Tag Flag';
        item.documentation = new vscode.MarkdownString(doc);
        completions.push(item);
      });

      const iconItem = new vscode.CompletionItem('icon:', vscode.CompletionItemKind.Property);
      iconItem.detail = 'Content Icon';
      iconItem.documentation = new vscode.MarkdownString('Add icon inside tag (e.g., `icon:check`, `icon:star`)');
      iconItem.insertText = new vscode.SnippetString('icon:${1:icon-name}');
      completions.push(iconItem);
    }

    // Badge completions after !!!
    if (linePrefix.match(/!!!/)) {
      const variants = ['brand', 'success', 'neutral', 'warning', 'danger'];
      variants.forEach(variant => {
        const item = new vscode.CompletionItem(variant, vscode.CompletionItemKind.Color);
        item.detail = 'Badge Variant';
        item.documentation = new vscode.MarkdownString(`Badge with ${variant} variant`);
        completions.push(item);
      });

      const appearances = ['accent', 'filled', 'outlined', 'filled-outlined'];
      appearances.forEach(appearance => {
        const item = new vscode.CompletionItem(appearance, vscode.CompletionItemKind.Property);
        item.detail = 'Badge Appearance';
        item.documentation = new vscode.MarkdownString(`Badge with ${appearance} appearance`);
        completions.push(item);
      });

      const attentions = ['pulse', 'bounce', 'none'];
      attentions.forEach(attention => {
        const item = new vscode.CompletionItem(attention, vscode.CompletionItemKind.Property);
        item.detail = 'Badge Attention';
        item.documentation = new vscode.MarkdownString(`Badge with ${attention} animation`);
        completions.push(item);
      });

      const pillItem = new vscode.CompletionItem('pill', vscode.CompletionItemKind.Property);
      pillItem.detail = 'Badge Flag';
      pillItem.documentation = new vscode.MarkdownString('Badge with rounded edges');
      completions.push(pillItem);
    }

    // Button completions after %%%
    if (linePrefix.match(/%%%/)) {
      const variants = ['brand', 'success', 'neutral', 'warning', 'danger'];
      variants.forEach(variant => {
        const item = new vscode.CompletionItem(variant, vscode.CompletionItemKind.Color);
        item.detail = 'Button Variant';
        item.documentation = new vscode.MarkdownString(`Button with ${variant} variant`);
        completions.push(item);
      });

      const appearances = ['accent', 'filled', 'outlined', 'filled-outlined', 'plain'];
      appearances.forEach(appearance => {
        const item = new vscode.CompletionItem(appearance, vscode.CompletionItemKind.Property);
        item.detail = 'Button Appearance';
        item.documentation = new vscode.MarkdownString(`Button with ${appearance} appearance`);
        completions.push(item);
      });

      const sizes = ['xs', 's', 'm', 'l', 'xl', 'small', 'medium', 'large'];
      sizes.forEach(size => {
        const item = new vscode.CompletionItem(size, vscode.CompletionItemKind.Property);
        item.detail = 'Button Size';
        item.documentation = new vscode.MarkdownString(`Button with ${size} size`);
        completions.push(item);
      });

      const flags = [
        { name: 'pill', doc: 'Rounded edges' },
        { name: 'caret', doc: 'Dropdown indicator' },
        { name: 'loading', doc: 'Loading state' },
        { name: 'disabled', doc: 'Disabled state' }
      ];
      flags.forEach(({ name, doc }) => {
        const item = new vscode.CompletionItem(name, vscode.CompletionItemKind.Property);
        item.detail = 'Button Flag';
        item.documentation = new vscode.MarkdownString(doc);
        completions.push(item);
      });

      // Link-form only: target + download (apply when the button body is a markdown link)
      const targets = ['_blank', '_self', '_parent', '_top'];
      targets.forEach(target => {
        const item = new vscode.CompletionItem(target, vscode.CompletionItemKind.Value);
        item.detail = 'Button Link Target';
        item.documentation = new vscode.MarkdownString(
          target === '_blank'
            ? 'Open the link in a new tab (auto-adds `rel="noopener noreferrer"`). Applies only when the button body is a markdown link.'
            : `Anchor target ${target}. Applies only when the button body is a markdown link.`
        );
        completions.push(item);
      });

      const downloadItem = new vscode.CompletionItem('download', vscode.CompletionItemKind.Property);
      downloadItem.detail = 'Button Link Flag';
      downloadItem.documentation = new vscode.MarkdownString('Download the linked file instead of navigating to it. Applies only when the button body is a markdown link.');
      completions.push(downloadItem);

      const iconItems = [
        { name: 'icon:', detail: 'Start Icon', doc: 'Add start icon (e.g., `icon:download`, `icon:gear`)' },
        { name: 'icon:end:', detail: 'End Icon', doc: 'Add end icon (e.g., `icon:end:arrow-right`)' },
        { name: 'icon:start:', detail: 'Start Icon (explicit)', doc: 'Add start icon explicitly (e.g., `icon:start:gear`)' }
      ];
      iconItems.forEach(({ name, detail, doc }) => {
        const item = new vscode.CompletionItem(name, vscode.CompletionItemKind.Property);
        item.detail = detail;
        item.documentation = new vscode.MarkdownString(doc);
        item.insertText = new vscode.SnippetString(`${name}\${1:icon-name}`);
        completions.push(item);
      });
    }

    // Popover completions after &&&
    if (linePrefix.match(/&&&/)) {
      const placements = ['top', 'bottom', 'left', 'right'];
      placements.forEach(placement => {
        const item = new vscode.CompletionItem(placement, vscode.CompletionItemKind.Property);
        item.detail = 'Popover Placement';
        item.documentation = new vscode.MarkdownString(`Popover positioned at ${placement}`);
        completions.push(item);
      });

      const linkItem = new vscode.CompletionItem('link', vscode.CompletionItemKind.Property);
      linkItem.detail = 'Popover Flag';
      linkItem.documentation = new vscode.MarkdownString('Render trigger as a link-styled element instead of a button');
      completions.push(linkItem);

      const withoutArrow = new vscode.CompletionItem('without-arrow', vscode.CompletionItemKind.Property);
      withoutArrow.detail = 'Popover Flag';
      withoutArrow.documentation = new vscode.MarkdownString('Hide the popover arrow');
      completions.push(withoutArrow);

      const distanceItem = new vscode.CompletionItem('distance:', vscode.CompletionItemKind.Property);
      distanceItem.detail = 'Popover Distance';
      distanceItem.documentation = new vscode.MarkdownString('Custom distance from trigger in px (e.g., `distance:10`)');
      distanceItem.insertText = new vscode.SnippetString('distance:${1:10}');
      completions.push(distanceItem);
    }

    // Tooltip completions after ((( — leading placement/distance tokens
    if (linePrefix.match(/\(\(\(/)) {
      const placements = ['top', 'bottom', 'left', 'right'];
      placements.forEach(placement => {
        const item = new vscode.CompletionItem(placement, vscode.CompletionItemKind.Property);
        item.detail = 'Tooltip Placement';
        item.documentation = new vscode.MarkdownString(`Tooltip positioned at ${placement}`);
        completions.push(item);
      });

      const distanceItem = new vscode.CompletionItem('distance:', vscode.CompletionItemKind.Property);
      distanceItem.detail = 'Tooltip Distance';
      distanceItem.documentation = new vscode.MarkdownString('Custom distance from the anchor in px (e.g., `distance:10`)');
      distanceItem.insertText = new vscode.SnippetString('distance:${1:10}');
      completions.push(distanceItem);
    }

    // Layout type completions after ::::
    if (linePrefix.match(/::::$/)) {
      const layoutTypes = [
        { name: 'grid', doc: 'Auto-adaptive responsive grid' },
        { name: 'stack', doc: 'Vertical spacing between blocks' },
        { name: 'cluster', doc: 'Inline wrapping items (tag clouds, button rows)' },
        { name: 'split', doc: 'Distribute items to opposite ends' },
        { name: 'flank', doc: 'Sidebar + main content layout' },
        { name: 'frame', doc: 'Aspect-ratio container for media' }
      ];
      layoutTypes.forEach(({ name, doc }) => {
        const item = new vscode.CompletionItem(name, vscode.CompletionItemKind.Module);
        item.detail = 'Layout';
        item.documentation = new vscode.MarkdownString(doc);
        completions.push(item);
      });

      // Also offer wa- alternative syntax
      layoutTypes.forEach(({ name, doc }) => {
        const item = new vscode.CompletionItem(`wa-${name}`, vscode.CompletionItemKind.Module);
        item.detail = 'Layout (alternative syntax)';
        item.documentation = new vscode.MarkdownString(doc);
        completions.push(item);
      });
    }

    // Layout attribute completions after ::::type
    if (linePrefix.match(/::::(grid|stack|cluster|split|flank|frame|wa-grid|wa-stack|wa-cluster|wa-split|wa-flank|wa-frame)\s+\S*$/)) {
      const gaps = ['0', '3xs', '2xs', 'xs', 's', 'm', 'l', 'xl', '2xl', '3xl', '4xl', '5xl'];
      gaps.forEach(gap => {
        const item = new vscode.CompletionItem(`gap:${gap}`, vscode.CompletionItemKind.Property);
        item.detail = 'Layout Gap';
        item.documentation = new vscode.MarkdownString(`Set gap to ${gap}`);
        completions.push(item);
      });

      const aligns = ['start', 'end', 'center', 'stretch', 'baseline'];
      aligns.forEach(align => {
        const item = new vscode.CompletionItem(`align:${align}`, vscode.CompletionItemKind.Property);
        item.detail = 'Align Items';
        item.documentation = new vscode.MarkdownString(`Align items to ${align}`);
        completions.push(item);
      });

      const justifies = ['start', 'end', 'center', 'space-between', 'space-around', 'space-evenly'];
      justifies.forEach(justify => {
        const item = new vscode.CompletionItem(`justify:${justify}`, vscode.CompletionItemKind.Property);
        item.detail = 'Justify Content';
        item.documentation = new vscode.MarkdownString(`Justify content to ${justify}`);
        completions.push(item);
      });
    }

    // Grid-specific: min attribute
    if (linePrefix.match(/::::(grid|wa-grid)\s+\S*$/)) {
      const minItem = new vscode.CompletionItem('min:', vscode.CompletionItemKind.Property);
      minItem.detail = 'Grid Min Column Size';
      minItem.documentation = new vscode.MarkdownString('Minimum column size (e.g., `min:300px`, `min:20ch`)');
      minItem.insertText = new vscode.SnippetString('min:${1:300px}');
      completions.push(minItem);
    }

    // Split-specific: row/column
    if (linePrefix.match(/::::(split|wa-split)\s*\S*$/)) {
      ['row', 'column'].forEach(dir => {
        const item = new vscode.CompletionItem(dir, vscode.CompletionItemKind.Keyword);
        item.detail = 'Split Direction';
        item.documentation = new vscode.MarkdownString(`${dir === 'row' ? 'Horizontal' : 'Vertical'} split`);
        completions.push(item);
      });
    }

    // Flank-specific: start/end, size, content
    if (linePrefix.match(/::::(flank|wa-flank)\s*\S*$/)) {
      ['start', 'end'].forEach(pos => {
        const item = new vscode.CompletionItem(pos, vscode.CompletionItemKind.Keyword);
        item.detail = 'Flank Position';
        item.documentation = new vscode.MarkdownString(`Flanking item on the ${pos} side`);
        completions.push(item);
      });

      const sizeItem = new vscode.CompletionItem('size:', vscode.CompletionItemKind.Property);
      sizeItem.detail = 'Flank Size';
      sizeItem.documentation = new vscode.MarkdownString('Flanking item size (e.g., `size:200px`)');
      sizeItem.insertText = new vscode.SnippetString('size:${1:200px}');
      completions.push(sizeItem);

      const contentItem = new vscode.CompletionItem('content:', vscode.CompletionItemKind.Property);
      contentItem.detail = 'Content Percentage';
      contentItem.documentation = new vscode.MarkdownString('Minimum content percentage (e.g., `content:70%`)');
      contentItem.insertText = new vscode.SnippetString('content:${1:70%}');
      completions.push(contentItem);
    }

    // Frame-specific: aspect ratio, radius
    if (linePrefix.match(/::::(frame|wa-frame)\s*\S*$/)) {
      ['landscape', 'portrait', 'square'].forEach(ratio => {
        const item = new vscode.CompletionItem(ratio, vscode.CompletionItemKind.Keyword);
        item.detail = 'Frame Aspect Ratio';
        item.documentation = new vscode.MarkdownString(`${ratio} aspect ratio`);
        completions.push(item);
      });

      const radii = ['s', 'm', 'l', 'pill', 'circle', 'square'];
      radii.forEach(r => {
        const item = new vscode.CompletionItem(`radius:${r}`, vscode.CompletionItemKind.Property);
        item.detail = 'Frame Border Radius';
        item.documentation = new vscode.MarkdownString(`Border radius: ${r}`);
        completions.push(item);
      });
    }

    // Carousel parameter completions after ~~~~~~
    if (linePrefix.match(/~~~~~~/)) {
      const parameters = [
        'navigation', 'pagination', 'loop', 'autoplay', 'autoplay-interval',
        'mouse-dragging', 'vertical', 'scroll-hint',
        'aspect-ratio', 'slide-gap', 'slides-per-page', 'slides-per-move'
      ];
      parameters.forEach(param => {
        const item = new vscode.CompletionItem(param, vscode.CompletionItemKind.Property);
        item.detail = 'Carousel Parameter';
        item.documentation = new vscode.MarkdownString(
          param === 'autoplay-interval'
            ? 'Milliseconds between auto-advances (e.g., `autoplay-interval:5000`; default 3000)'
            : `Enable/set ${param}`
        );
        if (param === 'autoplay-interval') {
          item.insertText = new vscode.SnippetString('autoplay-interval:${1:5000}');
        }
        completions.push(item);
      });
    }

    // Tab completions after ++++++
    if (linePrefix.match(/\+\+\+\+\+\+/)) {
      const placements = ['top', 'bottom', 'start', 'end'];
      placements.forEach(placement => {
        const item = new vscode.CompletionItem(placement, vscode.CompletionItemKind.Property);
        item.detail = 'Tab Placement';
        item.documentation = new vscode.MarkdownString(`Tabs positioned at ${placement}`);
        completions.push(item);
      });

      const activations = ['auto', 'manual'];
      activations.forEach(activation => {
        const item = new vscode.CompletionItem(activation, vscode.CompletionItemKind.Property);
        item.detail = 'Tab Activation';
        item.documentation = new vscode.MarkdownString(`${activation === 'auto' ? 'Switch on hover' : 'Switch on click'}`);
        completions.push(item);
      });

      const noScrollItem = new vscode.CompletionItem('no-scroll-controls', vscode.CompletionItemKind.Property);
      noScrollItem.detail = 'Tab Flag';
      noScrollItem.documentation = new vscode.MarkdownString('Disable scroll arrows for overflowing tabs');
      completions.push(noScrollItem);
    }

    // Copy button parameter completions on the opening <<< line
    if (linePrefix.match(/^<<</)) {
      const placements = ['top', 'right', 'bottom', 'left'];
      placements.forEach(placement => {
        const item = new vscode.CompletionItem(placement, vscode.CompletionItemKind.Property);
        item.detail = 'Copy Button Tooltip Placement';
        item.documentation = new vscode.MarkdownString(`Tooltip appears on the ${placement}`);
        completions.push(item);
      });

      const disabledItem = new vscode.CompletionItem('disabled', vscode.CompletionItemKind.Property);
      disabledItem.detail = 'Copy Button Flag';
      disabledItem.documentation = new vscode.MarkdownString('Disable the copy button (cannot be clicked)');
      completions.push(disabledItem);

      const labelItems = [
        { name: 'copy-label', detail: 'Copy Label', doc: 'Tooltip text before copying (e.g., `copy-label="Copy"`)', def: 'Copy' },
        { name: 'success-label', detail: 'Success Label', doc: 'Tooltip text after a successful copy (e.g., `success-label="Copied!"`)', def: 'Copied!' },
        { name: 'error-label', detail: 'Error Label', doc: 'Tooltip text when copying fails (e.g., `error-label="Copy failed"`)', def: 'Copy failed' }
      ];
      labelItems.forEach(({ name, detail, doc, def }) => {
        const item = new vscode.CompletionItem(`${name}=`, vscode.CompletionItemKind.Property);
        item.detail = `Copy Button ${detail}`;
        item.documentation = new vscode.MarkdownString(doc);
        item.insertText = new vscode.SnippetString(`${name}="\${1:${def}}"`);
        completions.push(item);
      });

      const fromItem = new vscode.CompletionItem('from=', vscode.CompletionItemKind.Property);
      fromItem.detail = 'Copy From Element';
      fromItem.documentation = new vscode.MarkdownString('Copy content from another element by ID (e.g., `from="my-id"`, `from="input.value"`, `from="link[href]"`)');
      fromItem.insertText = new vscode.SnippetString('from="${1:element-id}"');
      completions.push(fromItem);

      const durationItem = new vscode.CompletionItem('feedback-duration', vscode.CompletionItemKind.Value);
      durationItem.detail = 'Copy Button Feedback Duration';
      durationItem.documentation = new vscode.MarkdownString('A bare number sets how long the success message shows, in milliseconds (e.g., `2000`)');
      durationItem.insertText = new vscode.SnippetString('${1:2000}');
      completions.push(durationItem);
    }

    return completions.length > 0 ? completions : undefined;
  }
}
