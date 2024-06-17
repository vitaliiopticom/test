import React, { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  shouldDisplay: boolean;
}>;

export const DisplayComponent: React.FC<Props> = ({
  shouldDisplay,
  children,
}) => {
  if (!shouldDisplay) {
    return null;
  }

  return <>{children}</>;
};
