export const PAGE_SIZES = [12, 24, 48];
export const DEFAULT_PAGE_SIZE = PAGE_SIZES[0];
export const PAGE_SIZES_OPTIONS = PAGE_SIZES.map((size) => ({
  label: `${size}`,
  value: `${size}`,
}));

export const LAYOUT_MODE = {
  list: 'list',
  grid: 'grid',
} as const;
