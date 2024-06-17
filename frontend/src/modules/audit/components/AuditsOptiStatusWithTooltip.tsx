import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { IconButton, Tooltip } from '@/components/elements';
import { useTranslation } from '@/i18n';
import { routes } from '@/router/routesList';

import { AUDIT_STATUS } from '../constants';
import {
  AuditHistoryModalInput,
  AuditQuestionnaireType,
  StatusExtended,
} from '../types';

import { AuditOptiStatus } from './AuditOptiStatus';
import { SelectTemplateAudit } from './SelectTemplateModal';

type Props = {
  companyId: number;
  dealerName: string;
  row: StatusExtended;
  templateType: AuditQuestionnaireType;
  onStartPreAudit: (audit: SelectTemplateAudit) => void;
  setHistoryModalInput: (input: AuditHistoryModalInput) => void;
};

export const AuditsOptiStatusWithTooltip: FC<Props> = ({
  companyId,
  dealerName,
  row,
  templateType,
  onStartPreAudit,
  setHistoryModalInput,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { status, rating, id, hasHistory } = row;

  return (
    <span className="flex items-center">
      <AuditOptiStatus
        rating={rating?.stars.score}
        status={status}
        onClick={
          status === AUDIT_STATUS.NOT_OPEN
            ? () =>
                onStartPreAudit({
                  companyId,
                  templateType,
                })
            : () => navigate(routes.auditDetail(id))
        }
      />
      {hasHistory && (
        <Tooltip content={t('common.seeHistory')} placement="bottom">
          <IconButton
            className="text-primary"
            name="clock"
            size="sm"
            variant="ghost"
            onClick={() =>
              setHistoryModalInput({
                auditType: templateType,
                companyId,
                dealerName,
              })
            }
          />
        </Tooltip>
      )}
    </span>
  );
};
