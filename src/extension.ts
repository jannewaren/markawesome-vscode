import * as vscode from 'vscode';
import { WebAwesomeCompletionProvider } from './providers/completionProvider';
import { WebAwesomeHoverProvider } from './providers/hoverProvider';
import { insertComponent } from './commands/insertComponent';
import { 
  wrapInCallout, 
  wrapInCard, 
  wrapInTag, 
  wrapInDetails,
  wrapInBadge,
  wrapInButton,
  wrapInCopyButton,
  wrapInDialog,
  wrapInTabGroup
} from './commands/wrapCommands';
import { imagesToComparison, imagesToCarousel } from './commands/transformCommands';

export function activate(context: vscode.ExtensionContext) {
  console.log('Markawesome extension is now active');

  // Register completion provider
  const completionProvider = vscode.languages.registerCompletionItemProvider(
    { language: 'markdown', scheme: 'file' },
    new WebAwesomeCompletionProvider(),
    ':', '=', '|', '^', '?', '@', '!', '%', '~', '+'
  );

  // Register hover provider
  const hoverProvider = vscode.languages.registerHoverProvider(
    { language: 'markdown', scheme: 'file' },
    new WebAwesomeHoverProvider()
  );

  // Register commands
  const insertCmd = vscode.commands.registerCommand(
    'markawesome.insertComponent',
    insertComponent
  );

  const wrapCalloutCmd = vscode.commands.registerCommand(
    'markawesome.wrapInCallout',
    wrapInCallout
  );

  const wrapCardCmd = vscode.commands.registerCommand(
    'markawesome.wrapInCard',
    wrapInCard
  );

  const wrapTagCmd = vscode.commands.registerCommand(
    'markawesome.wrapInTag',
    wrapInTag
  );

  const wrapDetailsCmd = vscode.commands.registerCommand(
    'markawesome.wrapInDetails',
    wrapInDetails
  );

  const wrapBadgeCmd = vscode.commands.registerCommand(
    'markawesome.wrapInBadge',
    wrapInBadge
  );

  const wrapButtonCmd = vscode.commands.registerCommand(
    'markawesome.wrapInButton',
    wrapInButton
  );

  const wrapCopyButtonCmd = vscode.commands.registerCommand(
    'markawesome.wrapInCopyButton',
    wrapInCopyButton
  );

  const wrapDialogCmd = vscode.commands.registerCommand(
    'markawesome.wrapInDialog',
    wrapInDialog
  );

  const wrapTabGroupCmd = vscode.commands.registerCommand(
    'markawesome.wrapInTabGroup',
    wrapInTabGroup
  );

  const imagesToComparisonCmd = vscode.commands.registerCommand(
    'markawesome.imagesToComparison',
    imagesToComparison
  );

  const imagesToCarouselCmd = vscode.commands.registerCommand(
    'markawesome.imagesToCarousel',
    imagesToCarousel
  );

  // Add to subscriptions
  context.subscriptions.push(
    completionProvider,
    hoverProvider,
    insertCmd,
    wrapCalloutCmd,
    wrapCardCmd,
    wrapTagCmd,
    wrapDetailsCmd,
    wrapBadgeCmd,
    wrapButtonCmd,
    wrapCopyButtonCmd,
    wrapDialogCmd,
    wrapTabGroupCmd,
    imagesToComparisonCmd,
    imagesToCarouselCmd
  );
}

export function deactivate() {
  console.log('Markawesome extension is now deactivated');
}
