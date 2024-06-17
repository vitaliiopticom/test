import { Children, cloneElement, isValidElement, ReactNode } from 'react';

export const renderChildrenWithProps = <D extends Object>(
  children: ReactNode,
  props: D,
) => {
  return Children?.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, props);
    }

    return child;
  });
};
