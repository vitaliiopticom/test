import { isDef } from './common';

const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;

const reviver = (key: string, value: any) => {
  if (typeof value === 'string' && dateFormat.test(value)) {
    return new Date(value);
  }

  return value;
};

const addPrefix = (key: string, prefix?: string) => {
  return prefix ? `${prefix}${key}` : key;
};

type CreateStorageArgs = {
  prefix?: string;
  storage?: 'localStorage' | 'sessionStorage';
};

export const createStorage = ({
  prefix,
  storage = 'localStorage',
}: CreateStorageArgs = {}) => {
  return {
    getItem: <T>(key: string) => {
      try {
        const value = window[storage].getItem(addPrefix(key, prefix));

        if (!isDef(value)) return null;

        return JSON.parse(value, reviver) as T;
      } catch {
        return null;
      }
    },
    setItem: <T>(key: string, value: T) => {
      if (!isDef(value)) return;

      try {
        window[storage].setItem(addPrefix(key, prefix), JSON.stringify(value));
      } catch {}
    },
    removeItem: (key: string) => {
      try {
        window[storage].removeItem(addPrefix(key, prefix));
      } catch {}
    },
  };
};
