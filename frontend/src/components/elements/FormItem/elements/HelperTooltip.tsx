import { FC, ReactNode } from 'react';

import { Icon } from '../../Icon/Icon';
import { Tooltip } from '../../Tooltip/Tooltip';

type Props = {
  children: ReactNode;
};

export const HelperTooltip: FC<Props> = ({ children }) => {
  return (
    <Tooltip className="max-w-[50ch]" content={children}>
      <span>
        <Icon
          className="text-secondary-tint-50 hover:text-primary"
          name="question"
        />
      </span>
    </Tooltip>
  );
};
