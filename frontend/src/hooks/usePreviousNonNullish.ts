import { useEffect, useRef } from 'react';

import { isDef } from '@/utils/common';

export const usePreviousNonNullish = <T>(value: T): T => {
  const ref = useRef<T>(value);

  useEffect(() => {
    if (isDef(value)) {
      ref.current = value;
    }
  }, [value]);

  return ref.current;
};
