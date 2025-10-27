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
      // Add callout types
      const calloutTypes = ['info', 'success', 'warning', 'danger', 'neutral'];
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
    if (linePrefix.match(/\^\^\^$/)) {
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

    // Tag variant completions after @@@
    if (linePrefix.match(/@@@$/)) {
      const variants = ['brand', 'success', 'neutral', 'warning', 'danger'];
      variants.forEach(variant => {
        const item = new vscode.CompletionItem(variant, vscode.CompletionItemKind.Color);
        item.detail = 'Tag Variant';
        item.documentation = new vscode.MarkdownString(`Tag with ${variant} variant`);
        completions.push(item);
      });
    }

    // Badge variant completions after !!!
    if (linePrefix.match(/!!!$/)) {
      const variants = ['brand', 'success', 'neutral', 'warning', 'danger'];
      variants.forEach(variant => {
        const item = new vscode.CompletionItem(variant, vscode.CompletionItemKind.Color);
        item.detail = 'Badge Variant';
        item.documentation = new vscode.MarkdownString(`Badge with ${variant} variant`);
        completions.push(item);
      });
    }

    // Button variant completions after %%%
    if (linePrefix.match(/%%%$/)) {
      const variants = ['brand', 'success', 'neutral', 'warning', 'danger'];
      variants.forEach(variant => {
        const item = new vscode.CompletionItem(variant, vscode.CompletionItemKind.Color);
        item.detail = 'Button Variant';
        item.documentation = new vscode.MarkdownString(`Button with ${variant} variant`);
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

    // Tab placement completions after ++++++
    if (linePrefix.match(/\+\+\+\+\+\+$/)) {
      const placements = ['top', 'bottom', 'start', 'end'];
      placements.forEach(placement => {
        const item = new vscode.CompletionItem(placement, vscode.CompletionItemKind.Property);
        item.detail = 'Tab Placement';
        item.documentation = new vscode.MarkdownString(`Tabs positioned at ${placement}`);
        completions.push(item);
      });
    }

    return completions.length > 0 ? completions : undefined;
  }
}
