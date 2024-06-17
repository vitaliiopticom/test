import { saveAs } from 'file-saver';

export const getFilenameFromUrl = (url: string): string => {
  const nameWithParams = url.slice(url.lastIndexOf('/') + 1);
  const searchSymbolIdx = nameWithParams.indexOf('?');

  if (searchSymbolIdx > 0) {
    return nameWithParams.slice(0, searchSymbolIdx);
  }

  return nameWithParams;
};

export const saveFromUrl = (url: string, fileName?: string): void =>
  saveAs(url, fileName || getFilenameFromUrl(url));

export const saveFromBlob = (blob: Blob, fileName: string): void =>
  saveAs(blob, fileName);
