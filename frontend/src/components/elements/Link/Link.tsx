import { forwardRef } from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';

import { cx } from '@/utils/classNames';
import { isStr } from '@/utils/common';

type Props = {
  isExternal?: boolean;
  isDisabled?: boolean;
} & LinkProps;

export const Link = forwardRef<HTMLAnchorElement, Props>(
  ({ to, isExternal, children, className, isDisabled, ...rest }, ref) => {
    const styles = cx(
      'text-primary focus:outline-0 focus:ring-1 focus:ring-primary',
      isDisabled ? 'text-secondary-tint-40' : 'hover:text-primary-shade-40',
      className,
    );

    if (isDisabled) {
      return (
        <span ref={ref} className={styles}>
          {children}
        </span>
      );
    }

    if (isExternal && isStr(to)) {
      return (
        <a
          ref={ref}
          className={styles}
          href={to}
          rel="noreferrer"
          target="_blank"
        >
          {children}
        </a>
      );
    }

    return (
      <RouterLink ref={ref} className={styles} to={to} {...rest}>
        {children}
      </RouterLink>
    );
  },
);
