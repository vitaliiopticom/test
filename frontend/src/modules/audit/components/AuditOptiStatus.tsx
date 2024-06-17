import { FC } from 'react';

import { Status, StatusType, Tooltip, TooltipRow } from '@/components/elements';
import { useTranslation } from '@/i18n';
import { cx } from '@/utils/classNames';

import { AUDIT_STATUS } from '../constants';
import type { AuditQuestionnairePhase, AuditStatus } from '../types';

type Props = {
  status: AuditStatus;
  rating?: number;
  onClick?: () => void;
  phase?: AuditQuestionnairePhase;
  isTooltip?: boolean;
};

type StatusConfig = Record<
  AuditStatus,
  {
    color: StatusType;
  }
>;

const statusWidth = 'min-w-[100px]';

const statusConfig: StatusConfig = {
  NOT_OPEN: { color: 'clickable' },
  DONE: { color: 'success' },
  IN_PROGRESS: { color: 'warning' },
  SENT: { color: 'neutral' },
};

export const AuditOptiStatus: FC<Props> = ({
  status,
  rating,
  onClick,
  phase,
  isTooltip = true,
}) => {
  const { t } = useTranslation();

  const badge = (
    <div className={statusWidth}>
      <Status
        className={cx('block', statusWidth)}
        status={statusConfig[status]?.color}
        onClick={onClick}
      >
        {t(`audit.status.${status}`)}
      </Status>
      {phase && (
        <div className="flex justify-start text-xs font-medium">
          {t(`audit.phase.${phase}`)}
        </div>
      )}
    </div>
  );

  if (isTooltip) {
    const tooltipContent =
      status === AUDIT_STATUS.NOT_OPEN ? (
        t('common.start')
      ) : (
        <>
          {/* TODO: Enable in future when Jan clarifies how ratings are working with report statuses */}
          <TooltipRow name={t(`audit.phase.PRE_AUDIT`)} />
          <TooltipRow name={t('common.rating')} value={rating?.toString()} />
          {/*<TooltipRow*/}
          {/*  name={t('common.modified')}*/}
          {/*  value={formatDateTime(new Date())} //TODO date*/}
          {/*/>*/}

          {/*<TooltipRow*/}
          {/*  name={t('common.created')}*/}
          {/*  value={formatDateTime(new Date())}*/}
          {/*/>*/}
        </>
      );

    return (
      <Tooltip
        content={tooltipContent}
        contentWrapperAs="div"
        placement="bottom"
      >
        {badge}
      </Tooltip>
    );
  }

  return badge;
};
