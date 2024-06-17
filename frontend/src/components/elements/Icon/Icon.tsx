import type { FC } from 'react';
import type { IconBaseProps } from 'react-icons';

import { icons } from './icons';

export type IconName = keyof typeof icons;

type Props = {
  name: IconName;
} & Partial<IconBaseProps>;

export const Icon: FC<Props> = ({ name, ...rest }) => {
  const Component = icons[name];

  if (!Component) {
    console.error(
      `There is no icon named "${name}" imported in the icons file.`,
    );

    return null;
  }

  return <Component {...rest} />;
};
