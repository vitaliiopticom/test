import { FC, ReactNode } from 'react';

import { Icon, Tooltip } from '@/components/elements';

type Props = {
  children: ReactNode;
};

export const HelperTooltip: FC<Props> = ({ children }) => {
  return (
    <Tooltip className="max-w-[50ch]" content={children}>
      <span className="ml-2 text-primary">
        <Icon name="question" />
      </span>
    </Tooltip>
  );
};
