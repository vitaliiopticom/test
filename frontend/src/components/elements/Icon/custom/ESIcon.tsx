import type { FC } from 'react';
import type { IconBaseProps } from 'react-icons';

type Props = IconBaseProps;

export const ESIcon: FC<Props> = (props) => {
  return (
    <svg viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M0 0h640v480H0z" fill="#AA151B" />
      <path d="M0 120h640v240H0z" fill="#F1BF00" />
      <path d="M279.1 217v-1m-.6 1v-1m-.4 1.1V216" fill="none" />
    </svg>
  );
};
