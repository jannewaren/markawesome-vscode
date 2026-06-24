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

    // Check for inline icon syntax ($$$name) — only when the cursor is on the token
    const inlineIconRegex = /\$\$\$[\w-]+/g;
    let inlineMatch: RegExpExecArray | null;
    while ((inlineMatch = inlineIconRegex.exec(line)) !== null) {
      const start = inlineMatch.index;
      const end = start + inlineMatch[0].length;
      if (position.character >= start && position.character <= end) {
        const component = components.find(c => c.name === 'Icon');
        if (component) {
          return this.createHover(component);
        }
      }
    }

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

    // Check for accordion syntax (container //////  line)
    if (line.match(/^\/{6}/)) {
      const component = components.find(c => c.name === 'Accordion');
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

    // Check for popover syntax
    if (line.match(/^&&&/)) {
      const component = components.find(c => c.name === 'Popover');
      if (component) {
        return this.createHover(component);
      }
    }

    // Check for layout syntax (::::type or ::::wa-type)
    if (line.match(/^::::(grid|stack|cluster|split|flank|frame)/)) {
      const match = line.match(/^::::(grid|stack|cluster|split|flank|frame)/);
      if (match) {
        const componentName = this.mapLayoutToName(match[1]);
        const component = components.find(c => c.name === componentName);
        if (component) {
          return this.createHover(component);
        }
      }
    }

    if (line.match(/^::::wa-(grid|stack|cluster|split|flank|frame)/)) {
      const match = line.match(/^::::wa-(grid|stack|cluster|split|flank|frame)/);
      if (match) {
        const componentName = this.mapLayoutToName(match[1]);
        const component = components.find(c => c.name === componentName);
        if (component) {
          return this.createHover(component);
        }
      }
    }

    // Check for layout closing syntax
    if (line.match(/^::::$/)) {
      return new vscode.Hover(new vscode.MarkdownString('**Layout closing delimiter** — closes a `::::layout` block'));
    }

    // Check for alternative syntax
    if (line.match(/^:::wa-/)) {
      const match = line.match(/^:::wa-(callout|card|comparison|carousel|details|accordion|dialog|popover|tabs|tag|copy-button|badge|button|icon)/);
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
      'accordion': 'Accordion',
      'dialog': 'Dialog',
      'popover': 'Popover',
      'tabs': 'Tab Group',
      'tag': 'Tag',
      'copy-button': 'Copy Button',
      'badge': 'Badge',
      'button': 'Button',
      'icon': 'Icon'
    };
    return mapping[altName] || altName;
  }

  private mapLayoutToName(layoutType: string): string {
    const mapping: { [key: string]: string } = {
      'grid': 'Grid Layout',
      'stack': 'Stack Layout',
      'cluster': 'Cluster Layout',
      'split': 'Split Layout',
      'flank': 'Flank Layout',
      'frame': 'Frame Layout'
    };
    return mapping[layoutType] || layoutType;
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
    if (component.modes && component.modes.length > 0) {
      md.appendMarkdown(`**Modes:** ${component.modes.map(m => `\`${m}\``).join(', ')}\n\n`);
    }
    if (component.sizes && component.sizes.length > 0) {
      md.appendMarkdown(`**Sizes:** ${component.sizes.map(s => `\`${s}\``).join(', ')}\n\n`);
    }
    if (component.placements && component.placements.length > 0) {
      md.appendMarkdown(`**Placements:** ${component.placements.map(p => `\`${p}\``).join(', ')}\n\n`);
    }
    if (component.families && component.families.length > 0) {
      md.appendMarkdown(`**Icon Families:** ${component.families.map(f => `\`${f}\``).join(', ')}\n\n`);
    }
    if (component.animations && component.animations.length > 0) {
      md.appendMarkdown(`**Icon Animations:** ${component.animations.map(a => `\`${a}\``).join(', ')}\n\n`);
    }
    if (component.flags && component.flags.length > 0) {
      md.appendMarkdown(`**Flags:** ${component.flags.map(f => `\`${f}\``).join(', ')}\n\n`);
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
