import { FC } from 'react';

import { Icon, Link } from '@/components/elements';

type Props = {
  backButtonRoute?: string;
};

export const BackButton: FC<Props> = ({ backButtonRoute = '..' }) => {
  return (
    <Link className="flex flex-row items-center gap-3" to={backButtonRoute}>
      <Icon
        className="h-5 w-5 text-primary hover:text-primary-shade-40"
        name="arrowBackTo"
      />
    </Link>
  );
};
