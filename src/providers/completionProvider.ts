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
                         'wa-details', 'wa-dialog', 'wa-tabs', 'wa-tag',
                         'wa-copy-button', 'wa-badge', 'wa-button'];
      components.forEach(comp => {
        const item = new vscode.CompletionItem(comp, vscode.CompletionItemKind.Class);
        item.detail = 'Web Awesome Component';
        item.documentation = new vscode.MarkdownString(`Insert ${comp} component`);
        completions.push(item);
      });
    }

    // Callout size/appearance/icon completions after :::variant
    if (linePrefix.match(/:::(info|brand|success|warning|danger|neutral)\s+\S*$/)) {
      const sizes = ['small', 'medium', 'large'];
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

      const iconItem = new vscode.CompletionItem('icon:', vscode.CompletionItemKind.Property);
      iconItem.detail = 'Custom Icon';
      iconItem.documentation = new vscode.MarkdownString('Override default variant icon (e.g., `icon:shield`, `icon:rocket`)');
      iconItem.insertText = new vscode.SnippetString('icon:${1:icon-name}');
      completions.push(iconItem);
    }

    // Card appearance completions after ===
    if (linePrefix.match(/===$/)) {
      const appearances = ['outlined', 'filled', 'filled-outlined', 'plain', 'accent'];
      appearances.forEach(appearance => {
        const item = new vscode.CompletionItem(appearance, vscode.CompletionItemKind.Property);
        item.detail = 'Card Appearance';
        item.documentation = new vscode.MarkdownString(`Card with ${appearance} appearance`);
        completions.push(item);
      });
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

      const sizes = ['small', 'medium', 'large'];
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

      const sizes = ['small', 'medium', 'large'];
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

    // Carousel parameter completions after ~~~~~~
    if (linePrefix.match(/~~~~~~/)) {
      const parameters = [
        'navigation', 'pagination', 'loop', 'autoplay', 
        'mouse-dragging', 'vertical', 'scroll-hint', 
        'aspect-ratio', 'slide-gap', 'slides-per-page', 'slides-per-move'
      ];
      parameters.forEach(param => {
        const item = new vscode.CompletionItem(param, vscode.CompletionItemKind.Property);
        item.detail = 'Carousel Parameter';
        item.documentation = new vscode.MarkdownString(`Enable/set ${param}`);
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

    return completions.length > 0 ? completions : undefined;
  }
}
