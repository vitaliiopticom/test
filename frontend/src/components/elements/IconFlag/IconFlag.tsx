import { FC } from 'react';

import { getFlagUrlByCountryName } from '@/utils/flags';

type Props = {
  name: string | undefined;
};
export const IconFlag: FC<Props> = ({ name }) => {
  if (!name) return null;

  return (
    <img
      alt={name}
      className="h-4 rounded-sm"
      src={getFlagUrlByCountryName(name)}
      title={name}
    />
  );
};
