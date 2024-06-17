import { FC } from 'react';

import { PersonalInfo } from '@/modules/users';

export const PlatformAdministratorForm: FC = () => {
  return (
    <div className="grid grid-cols-1 gap-7 xl:grid-cols-2">
      <PersonalInfo />
    </div>
  );
};
