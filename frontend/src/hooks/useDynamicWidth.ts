import { useRef } from 'react';

export const useDynamicWidth = () => {
  const ref = useRef<HTMLDivElement>(null);
  const dynamicWidth = ref?.current?.offsetWidth ?? 'auto';

  return {
    dynamicWidthRef: ref,
    dynamicWidth,
  };
};
