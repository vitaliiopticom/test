import { useCallback, useRef } from 'react';

export const useGetLatest = <T>(value: T) => {
  const ref = useRef<T>(value);
  ref.current = value;

  return useCallback(() => ref.current, []);
};
