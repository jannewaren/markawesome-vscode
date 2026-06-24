import * as vscode from 'vscode';

export async function wrapInCallout() {
  const editor = vscode.window.activeTextEditor;
  if (!editor || editor.selection.isEmpty) {
    vscode.window.showErrorMessage('Please select text to wrap');
    return;
  }

  const types = ['info', 'success', 'warning', 'danger', 'neutral'];
  const type = await vscode.window.showQuickPick(types, {
    placeHolder: 'Select callout type'
  });

  if (!type) {
    return;
  }

  const selection = editor.selection;
  const text = editor.document.getText(selection);

  const wrapped = `:::${type}\n${text}\n:::`;

  editor.edit(editBuilder => {
    editBuilder.replace(selection, wrapped);
  });
}

export async function wrapInCard() {
  const editor = vscode.window.activeTextEditor;
  if (!editor || editor.selection.isEmpty) {
    vscode.window.showErrorMessage('Please select text to wrap');
    return;
  }

  const appearances = ['outlined', 'filled', 'filled-outlined', 'plain', 'accent', 'none'];
  const appearance = await vscode.window.showQuickPick(appearances, {
    placeHolder: 'Select card appearance (optional)'
  });

  if (appearance === undefined) {
    return;
  }

  const selection = editor.selection;
  const text = editor.document.getText(selection);

  const appearanceStr = appearance === 'none' ? '' : appearance;
  const wrapped = `===${appearanceStr}\n${text}\n===`;

  editor.edit(editBuilder => {
    editBuilder.replace(selection, wrapped);
  });
}

export async function wrapInTag() {
  const editor = vscode.window.activeTextEditor;
  if (!editor || editor.selection.isEmpty) {
    vscode.window.showErrorMessage('Please select text to wrap');
    return;
  }

  const variants = ['brand', 'success', 'warning', 'danger', 'neutral', 'none'];
  const variant = await vscode.window.showQuickPick(variants, {
    placeHolder: 'Select tag variant (optional)'
  });

  if (variant === undefined) {
    return;
  }

  const selection = editor.selection;
  const text = editor.document.getText(selection);

  const variantStr = variant === 'none' ? '' : variant;
  const wrapped = `@@@${variantStr}\n${text}\n@@@`;

  editor.edit(editBuilder => {
    editBuilder.replace(selection, wrapped);
  });
}

export async function wrapInDetails() {
  const editor = vscode.window.activeTextEditor;
  if (!editor || editor.selection.isEmpty) {
    vscode.window.showErrorMessage('Please select text to wrap');
    return;
  }

  const appearances = ['outlined', 'filled', 'filled-outlined', 'plain', 'none'];
  const appearance = await vscode.window.showQuickPick(appearances, {
    placeHolder: 'Select details appearance (optional)'
  });

  if (appearance === undefined) {
    return;
  }

  const selection = editor.selection;
  const text = editor.document.getText(selection);

  const appearanceStr = appearance === 'none' ? '' : appearance;
  const wrapped = `^^^${appearanceStr}\nClick to expand\n>>>\n${text}\n^^^`;

  editor.edit(editBuilder => {
    editBuilder.replace(selection, wrapped);
  });
}

export async function wrapInBadge() {
  const editor = vscode.window.activeTextEditor;
  if (!editor || editor.selection.isEmpty) {
    vscode.window.showErrorMessage('Please select text to wrap');
    return;
  }

  const variants = ['brand', 'success', 'neutral', 'warning', 'danger', 'none'];
  const variant = await vscode.window.showQuickPick(variants, {
    placeHolder: 'Select badge variant (optional)'
  });

  if (variant === undefined) {
    return;
  }

  const selection = editor.selection;
  const text = editor.document.getText(selection);

  const variantStr = variant === 'none' ? '' : variant;
  const wrapped = `!!!${variantStr}\n${text}\n!!!`;

  editor.edit(editBuilder => {
    editBuilder.replace(selection, wrapped);
  });
}

export async function wrapInButton() {
  const editor = vscode.window.activeTextEditor;
  if (!editor || editor.selection.isEmpty) {
    vscode.window.showErrorMessage('Please select text to wrap');
    return;
  }

  const variants = ['brand', 'success', 'neutral', 'warning', 'danger', 'none'];
  const variant = await vscode.window.showQuickPick(variants, {
    placeHolder: 'Select button variant (optional)'
  });

  if (variant === undefined) {
    return;
  }

  // Ask if it should be a link button
  const isLink = await vscode.window.showQuickPick(['Yes', 'No'], {
    placeHolder: 'Should this be a link button?'
  });

  if (isLink === undefined) {
    return;
  }

  const selection = editor.selection;
  const text = editor.document.getText(selection);

  const variantStr = variant === 'none' ? '' : variant;
  
  let wrapped: string;
  if (isLink === 'Yes') {
    wrapped = `%%%${variantStr}\n[${text}](https://example.com)\n%%%`;
  } else {
    wrapped = `%%%${variantStr}\n${text}\n%%%`;
  }

  editor.edit(editBuilder => {
    editBuilder.replace(selection, wrapped);
  });
}

export async function wrapInCopyButton() {
  const editor = vscode.window.activeTextEditor;
  if (!editor || editor.selection.isEmpty) {
    vscode.window.showErrorMessage('Please select text to wrap');
    return;
  }

  const selection = editor.selection;
  const text = editor.document.getText(selection);

  const wrapped = `<<<\n${text}\n<<<`;

  editor.edit(editBuilder => {
    editBuilder.replace(selection, wrapped);
  });
}

export async function wrapInDialog() {
  const editor = vscode.window.activeTextEditor;
  if (!editor || editor.selection.isEmpty) {
    vscode.window.showErrorMessage('Please select text to wrap');
    return;
  }

  // Ask for dialog parameters
  const params = await vscode.window.showQuickPick(
    ['none', 'light-dismiss', 'light-dismiss 600px', '800px'],
    {
      placeHolder: 'Select dialog parameters (optional)'
    }
  );

  if (params === undefined) {
    return;
  }

  const selection = editor.selection;
  const text = editor.document.getText(selection);

  const paramsStr = params === 'none' ? '' : params;
  const wrapped = `???${paramsStr}\nOpen Dialog\n>>>\n${text}\n???`;

  editor.edit(editBuilder => {
    editBuilder.replace(selection, wrapped);
  });
}

export async function wrapInPopover() {
  const editor = vscode.window.activeTextEditor;
  if (!editor || editor.selection.isEmpty) {
    vscode.window.showErrorMessage('Please select text to wrap');
    return;
  }

  const placements = ['top', 'bottom', 'left', 'right', 'none'];
  const placement = await vscode.window.showQuickPick(placements, {
    placeHolder: 'Select popover placement (optional)'
  });

  if (placement === undefined) {
    return;
  }

  const triggerStyle = await vscode.window.showQuickPick(['button', 'link'], {
    placeHolder: 'Select trigger style'
  });

  if (triggerStyle === undefined) {
    return;
  }

  const selection = editor.selection;
  const text = editor.document.getText(selection);

  const params = [
    placement !== 'none' ? placement : '',
    triggerStyle === 'link' ? 'link' : ''
  ].filter(p => p).join(' ');
  const wrapped = `&&&${params}\nHover for info\n>>>\n${text}\n&&&`;

  editor.edit(editBuilder => {
    editBuilder.replace(selection, wrapped);
  });
}

export async function wrapInTooltip() {
  const editor = vscode.window.activeTextEditor;
  if (!editor || editor.selection.isEmpty) {
    vscode.window.showErrorMessage('Please select text to wrap');
    return;
  }

  const placements = ['top', 'bottom', 'left', 'right', 'none'];
  const placement = await vscode.window.showQuickPick(placements, {
    placeHolder: 'Select tooltip placement (optional)'
  });

  if (placement === undefined) {
    return;
  }

  const selection = editor.selection;
  const text = editor.document.getText(selection);

  // The selected text becomes the anchor term; leading params go before it.
  const prefix = placement !== 'none' ? `${placement} ` : '';
  const wrapped = `(((${prefix}${text} >>> Tooltip text)))`;

  editor.edit(editBuilder => {
    editBuilder.replace(selection, wrapped);
  });
}

export async function wrapInAccordion() {
  const editor = vscode.window.activeTextEditor;
  if (!editor || editor.selection.isEmpty) {
    vscode.window.showErrorMessage('Please select text to wrap');
    return;
  }

  const appearances = ['outlined', 'filled', 'filled-outlined', 'plain', 'none'];
  const appearance = await vscode.window.showQuickPick(appearances, {
    placeHolder: 'Select accordion appearance (optional)'
  });

  if (appearance === undefined) {
    return;
  }

  const modes = ['multiple', 'single', 'single-collapsible', 'none'];
  const mode = await vscode.window.showQuickPick(modes, {
    placeHolder: 'Select accordion mode (optional)'
  });

  if (mode === undefined) {
    return;
  }

  const selection = editor.selection;
  const text = editor.document.getText(selection);

  const params = [
    appearance === 'none' ? '' : appearance,
    mode === 'none' ? '' : mode
  ].filter(p => p).join(' ');
  const wrapped = `//////${params}\n/// Section 1\n${text}\n///\n/// Section 2\nMore content\n///\n//////`;

  editor.edit(editBuilder => {
    editBuilder.replace(selection, wrapped);
  });
}

export async function wrapInTabGroup() {
  const editor = vscode.window.activeTextEditor;
  if (!editor || editor.selection.isEmpty) {
    vscode.window.showErrorMessage('Please select text to wrap');
    return;
  }

  const placements = ['top', 'bottom', 'start', 'end', 'none'];
  const placement = await vscode.window.showQuickPick(placements, {
    placeHolder: 'Select tab placement (optional)'
  });

  if (placement === undefined) {
    return;
  }

  const selection = editor.selection;
  const text = editor.document.getText(selection);

  const placementStr = placement === 'none' ? '' : placement;
  const wrapped = `++++++${placementStr}\n+++ Tab 1\n${text}\n+++\n+++ Tab 2\nContent here\n+++\n++++++`;

  editor.edit(editBuilder => {
    editBuilder.replace(selection, wrapped);
  });
}
