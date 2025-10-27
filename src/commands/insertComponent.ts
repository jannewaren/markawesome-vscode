import * as vscode from 'vscode';
import componentsData from '../data/components.json';

interface Component {
  name: string;
  primarySyntax: string;
  types?: string[];
  variants?: string[];
  appearances?: string[];
  placements?: string[];
  parameters?: string[];
  example: string;
}

export async function insertComponent() {
  const components = componentsData.components as Component[];
  
  // Create quick pick items
  const items = components.map(comp => ({
    label: comp.name,
    description: comp.primarySyntax,
    component: comp
  }));

  const selected = await vscode.window.showQuickPick(items, {
    placeHolder: 'Select a Web Awesome component to insert'
  });

  if (!selected) {
    return;
  }

  const component = selected.component;
  let snippet = component.example;

  // If component has options, prompt for them
  if (component.types) {
    const type = await vscode.window.showQuickPick(component.types, {
      placeHolder: `Select ${component.name} type`
    });
    if (type) {
      snippet = snippet.replace(/:::(info|success|warning|danger|neutral)/, `:::${type}`);
    }
  } else if (component.variants) {
    const variant = await vscode.window.showQuickPick(component.variants, {
      placeHolder: `Select ${component.name} variant (optional)`,
      canPickMany: false
    });
    // Apply variant if selected
    if (variant) {
      // Replace the variant in the example (e.g., @@@brand -> @@@danger)
      snippet = snippet.replace(/(@@@|!!!|%%%)(brand|success|neutral|warning|danger)?/, `$1${variant}`);
    }
  } else if (component.appearances) {
    const appearance = await vscode.window.showQuickPick(component.appearances, {
      placeHolder: `Select ${component.name} appearance (optional)`
    });
    if (appearance) {
      snippet = snippet.replace(/(===|\^\^\^)(outlined|filled|filled-outlined|plain|accent)?/, `$1${appearance}`);
    }
  }

  // Insert the snippet
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const snippetString = new vscode.SnippetString(snippet);
    editor.insertSnippet(snippetString);
  }
}
