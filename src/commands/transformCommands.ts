import * as vscode from 'vscode';

export async function imagesToComparison() {
  const editor = vscode.window.activeTextEditor;
  if (!editor || editor.selection.isEmpty) {
    vscode.window.showErrorMessage('Please select two image markdown lines');
    return;
  }

  const selection = editor.selection;
  const text = editor.document.getText(selection);

  // Extract images from markdown
  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  const images: Array<{ alt: string; url: string }> = [];
  let match;

  while ((match = imageRegex.exec(text)) !== null) {
    images.push({
      alt: match[1],
      url: match[2]
    });
  }

  if (images.length !== 2) {
    vscode.window.showErrorMessage('Please select exactly 2 images for comparison');
    return;
  }

  // Prompt for initial position
  const position = await vscode.window.showInputBox({
    prompt: 'Initial slider position (0-100)',
    value: '50',
    validateInput: (value) => {
      const num = parseInt(value);
      if (isNaN(num) || num < 0 || num > 100) {
        return 'Please enter a number between 0 and 100';
      }
      return null;
    }
  });

  const positionStr = position && position !== '50' ? position : '';

  const comparison = `|||${positionStr}
![${images[0].alt}](${images[0].url})
![${images[1].alt}](${images[1].url})
|||`;

  editor.edit((editBuilder: vscode.TextEditorEdit) => {
    editBuilder.replace(selection, comparison);
  });
}

export async function imagesToCarousel() {
  const editor = vscode.window.activeTextEditor;
  if (!editor || editor.selection.isEmpty) {
    vscode.window.showErrorMessage('Please select image markdown lines');
    return;
  }

  const selection = editor.selection;
  const text = editor.document.getText(selection);

  // Extract images from markdown
  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  const images: Array<{ alt: string; url: string }> = [];
  let match;

  while ((match = imageRegex.exec(text)) !== null) {
    images.push({
      alt: match[1],
      url: match[2]
    });
  }

  if (images.length < 2) {
    vscode.window.showErrorMessage('Please select at least 2 images for carousel');
    return;
  }

  // Prompt for carousel options
  const options = await vscode.window.showQuickPick(
    ['navigation', 'pagination', 'loop', 'autoplay', 'mouse-dragging'],
    {
      placeHolder: 'Select carousel options (optional)',
      canPickMany: true
    }
  );

  const optionsStr = options ? options.join(' ') : '';

  // Build carousel
  let carousel = `~~~~~~${optionsStr ? ' ' + optionsStr : ''}\n`;
  images.forEach(img => {
    carousel += `~~~\n![${img.alt}](${img.url})\n~~~\n`;
  });
  carousel += '~~~~~~';

  editor.edit((editBuilder: vscode.TextEditorEdit) => {
    editBuilder.replace(selection, carousel);
  });
}

export async function imagesToLightbox() {
  const editor = vscode.window.activeTextEditor;
  if (!editor || editor.selection.isEmpty) {
    vscode.window.showErrorMessage('Please select image markdown lines');
    return;
  }

  const selection = editor.selection;
  const text = editor.document.getText(selection);

  // Keep each image line as written: a plain image `![alt](src "caption")` or a
  // linked image `[![alt](thumb)](full "caption")`, so captions and separate
  // thumbnails survive. Several images on one line are split onto their own.
  const imageRegex = /\[!\[[^\]]*\]\([^)]+\)\]\([^)]+\)|!\[[^\]]*\]\([^)]+\)/g;
  const images = text.match(imageRegex) ?? [];

  if (images.length < 1) {
    vscode.window.showErrorMessage('Please select at least 1 image for a lightbox');
    return;
  }

  const options = await vscode.window.showQuickPick(
    ['thumbnails', 'loop', 'no-nav', 'no-counter', 'no-zoom', 'landscape', 'portrait', 'natural'],
    {
      placeHolder: 'Select lightbox options (optional)',
      canPickMany: true
    }
  );
  if (options === undefined) {
    return;
  }

  const optionsStr = options.join(' ');
  const lightbox = `::::lightbox${optionsStr ? ' ' + optionsStr : ''}\n${images.join('\n')}\n::::`;

  editor.edit((editBuilder: vscode.TextEditorEdit) => {
    editBuilder.replace(selection, lightbox);
  });
}
