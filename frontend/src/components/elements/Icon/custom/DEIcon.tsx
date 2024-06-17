import type { FC } from 'react';
import type { IconBaseProps } from 'react-icons';

type Props = IconBaseProps;

export const DEIcon: FC<Props> = (props) => {
  return (
    <svg viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M0 320h640v160H0z" fill="#ffce00" />
      <path d="M0 0h640v160H0z" />
      <path d="M0 160h640v160H0z" fill="#d00" />
    </svg>
  );
};
