import { FC } from 'react';

type Props = {
  name: string;
  value?: string;
};

export const TooltipRow: FC<Props> = ({ name, value }) => {
  return (
    <span className="my-2 block text-left text-sm">
      <span className="mr-2 text-left">
        {name}
        {value && ':'}
      </span>
      {value && <span className="text-left font-normal">{value}</span>}
    </span>
  );
};
