import { useEffect, useMemo, useState } from 'react';

import { createStorage } from '@/utils/storage';

export const usePersistedState = <V>(key: string, initialValue: V) => {
  const storage = useMemo(() => createStorage(), []);
  const state = useState(() => storage.getItem<V>(key) ?? initialValue);
  const value = state[0];

  useEffect(() => {
    storage.setItem(key, value);
  }, [key, value, storage]);

  return state;
};
