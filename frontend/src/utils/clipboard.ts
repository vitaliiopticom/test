import type { ClipboardEvent } from 'react';

export const getFileFromPasteEvent = <T>(event: ClipboardEvent<T>) => {
  const items = event.clipboardData.items;

  for (let index in items) {
    const item = items[index];
    if (item.kind === 'file') {
      return item.getAsFile();
    }
  }
};

export const writeTextToClipboard = async (text: string): Promise<boolean> => {
  if (!navigator?.clipboard) {
    return false;
  }

  try {
    await navigator.clipboard.writeText(text);

    return true;
  } catch (error) {
    return false;
  }
};
