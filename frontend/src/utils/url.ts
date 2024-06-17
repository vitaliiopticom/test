export const openInNewTab = (url?: string) => {
  if (!url) return;

  window.open(url, '_blank');
};
