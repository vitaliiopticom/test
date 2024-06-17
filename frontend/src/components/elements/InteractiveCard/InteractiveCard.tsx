import { FC, ReactNode } from 'react';

import { cx } from '@/utils/classNames';

const cardStyles = cx(
  'flex flex-col text-secondary-tint-50',
  'overflow-hidden rounded-lg border border-secondary-tint-90 hover:border-secondary-tint-70',
  'focus:border-primary focus:outline-0 focus:ring-0 focus-within:border-primary',
);

type Props = {
  children: ReactNode;
  className?: string;
};

export const InteractiveCard: FC<Props> = ({ children, className }) => {
  return <div className={cx(cardStyles, className)}>{children}</div>;
};
