import { FC } from 'react';

import { Status, Tooltip } from '@/components/elements';
import { useTranslation } from '@/i18n';
import { cx } from '@/utils/classNames';

type Props = {
  roles: string[];
};

const statusWidth = 'truncate';

export const RolesListStatus: FC<Props> = ({ roles }) => {
  const { t } = useTranslation();

  if (!Array.isArray(roles) || !roles?.length) {
    return (
      <Status className={cx('block', statusWidth)} status="empty">
        {t('users.emptyRoles')}
      </Status>
    );
  }

  if (roles.length === 1) {
    return (
      <Status className={cx('block', statusWidth)} status="default">
        {roles[0]}
      </Status>
    );
  }

  const tooltipContent = (
    <div>
      {roles.slice(1, roles.length).map((role, index) => (
        <div key={`RoleListStatus-Tooltip-${index}`}>{role}</div>
      ))}
    </div>
  );

  return (
    <div className="flex gap-4">
      <Status className={cx('block', statusWidth)} status="default">
        {roles[0]}
      </Status>

      <Tooltip
        content={tooltipContent}
        contentWrapperAs="div"
        placement="bottom"
      >
        <div>
          <Status status="clickable">+{roles.length - 1}</Status>
        </div>
      </Tooltip>
    </div>
  );
};
