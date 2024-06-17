export const getFileExtension = (contentType: string): string => {
  const charIndex = contentType.lastIndexOf('/');

  return charIndex === -1
    ? ''
    : contentType.substring(charIndex + 1).toUpperCase();
};

export const bytesToMb = (bytes: number): string => {
  const value = Number.isNaN(bytes) ? 0 : bytes;
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'unit',
    unit: 'megabyte',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  });

  return formatter.format(value / 1000000);
};
