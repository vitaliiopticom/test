import type { FC } from 'react';
import type { IconBaseProps } from 'react-icons';

type Props = IconBaseProps;

export const CAIcon: FC<Props> = (props) => {
  return (
    <svg viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M0 0h640v480H0z" fill="#fcdd09" />
      <path
        d="M0 90h810m0 120H0m0 120h810m0 120H0"
        stroke="#da121a"
        strokeWidth="60"
        transform="scale(.79012 .88889)"
      />
    </svg>
  );
};
