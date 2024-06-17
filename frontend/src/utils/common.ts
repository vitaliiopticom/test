export const isDef = <T>(value?: T | null): value is T => {
  return value !== null && typeof value !== 'undefined';
};

export const isStr = (value: unknown): value is string => {
  return typeof value === 'string';
};

export const isNotEmpty = (value: string | number | null | undefined) => {
  return isDef(value) && value.toString().length > 0;
};

export const isProductionMode = () => {
  return import.meta.env.PROD;
};
