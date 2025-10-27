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
  documentation?: string;
}

export class WebAwesomeHoverProvider implements vscode.HoverProvider {
  provideHover(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken
  ): vscode.Hover | undefined {
    const line = document.lineAt(position).text;
    const components = componentsData.components as Component[];

    // Check for callout syntax
    if (line.match(/^:::(info|success|warning|danger|neutral)/)) {
      const component = components.find(c => c.name === 'Callout');
      if (component) {
        return this.createHover(component);
      }
    }

    // Check for card syntax
    if (line.match(/^===/)) {
      const component = components.find(c => c.name === 'Card');
      if (component) {
        return this.createHover(component);
      }
    }

    // Check for comparison syntax
    if (line.match(/^\|\|\|/)) {
      const component = components.find(c => c.name === 'Comparison');
      if (component) {
        return this.createHover(component);
      }
    }

    // Check for carousel syntax
    if (line.match(/^~~~~~~/)) {
      const component = components.find(c => c.name === 'Carousel');
      if (component) {
        return this.createHover(component);
      }
    }

    // Check for details syntax
    if (line.match(/^\^\^\^/)) {
      const component = components.find(c => c.name === 'Details');
      if (component) {
        return this.createHover(component);
      }
    }

    // Check for dialog syntax
    if (line.match(/^\?\?\?/)) {
      const component = components.find(c => c.name === 'Dialog');
      if (component) {
        return this.createHover(component);
      }
    }

    // Check for tab group syntax
    if (line.match(/^\+\+\+\+\+\+/)) {
      const component = components.find(c => c.name === 'Tab Group');
      if (component) {
        return this.createHover(component);
      }
    }

    // Check for tag syntax
    if (line.match(/^@@@/)) {
      const component = components.find(c => c.name === 'Tag');
      if (component) {
        return this.createHover(component);
      }
    }

    // Check for copy button syntax
    if (line.match(/^<<</)) {
      const component = components.find(c => c.name === 'Copy Button');
      if (component) {
        return this.createHover(component);
      }
    }

    // Check for badge syntax
    if (line.match(/^!!!/)) {
      const component = components.find(c => c.name === 'Badge');
      if (component) {
        return this.createHover(component);
      }
    }

    // Check for button syntax
    if (line.match(/^%%%/)) {
      const component = components.find(c => c.name === 'Button');
      if (component) {
        return this.createHover(component);
      }
    }

    // Check for alternative syntax
    if (line.match(/^:::wa-/)) {
      const match = line.match(/^:::wa-(callout|card|comparison|carousel|details|dialog|tabs|tag|copy-button|badge|button)/);
      if (match) {
        const componentName = this.mapAltSyntaxToName(match[1]);
        const component = components.find(c => c.name === componentName);
        if (component) {
          return this.createHover(component);
        }
      }
    }

    return undefined;
  }

  private mapAltSyntaxToName(altName: string): string {
    const mapping: { [key: string]: string } = {
      'callout': 'Callout',
      'card': 'Card',
      'comparison': 'Comparison',
      'carousel': 'Carousel',
      'details': 'Details',
      'dialog': 'Dialog',
      'tabs': 'Tab Group',
      'tag': 'Tag',
      'copy-button': 'Copy Button',
      'badge': 'Badge',
      'button': 'Button'
    };
    return mapping[altName] || altName;
  }

  private createHover(component: Component): vscode.Hover {
    const md = new vscode.MarkdownString();
    md.isTrusted = true;

    // Title
    md.appendMarkdown(`### ${component.name}\n\n`);

    // Description
    md.appendMarkdown(`${component.description}\n\n`);

    // Syntax
    md.appendMarkdown(`**Primary Syntax:** \`${component.primarySyntax}\`\n\n`);
    if (component.altSyntax) {
      md.appendMarkdown(`**Alternative Syntax:** \`${component.altSyntax}\`\n\n`);
    }

    // Options
    if (component.types && component.types.length > 0) {
      md.appendMarkdown(`**Types:** ${component.types.map(t => `\`${t}\``).join(', ')}\n\n`);
    }
    if (component.variants && component.variants.length > 0) {
      md.appendMarkdown(`**Variants:** ${component.variants.map(v => `\`${v}\``).join(', ')}\n\n`);
    }
    if (component.appearances && component.appearances.length > 0) {
      md.appendMarkdown(`**Appearances:** ${component.appearances.map(a => `\`${a}\``).join(', ')}\n\n`);
    }
    if (component.placements && component.placements.length > 0) {
      md.appendMarkdown(`**Placements:** ${component.placements.map(p => `\`${p}\``).join(', ')}\n\n`);
    }
    if (component.parameters && component.parameters.length > 0) {
      md.appendMarkdown(`**Parameters:** ${component.parameters.map(p => `\`${p}\``).join(', ')}\n\n`);
    }

    // Documentation
    if (component.documentation) {
      md.appendMarkdown(`---\n\n${component.documentation}\n\n`);
    }

    // Example
    md.appendMarkdown(`---\n\n**Example:**\n\n\`\`\`markdown\n${component.example}\n\`\`\`\n\n`);

    // Link to docs
    md.appendMarkdown(`[📖 View Documentation](https://github.com/jannewaren/markawesome)`);

    return new vscode.Hover(md);
  }
}
