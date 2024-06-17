import { FC } from 'react';

import { ActionsMenu } from '@/components/elements';
import { useTranslation } from '@/i18n';

import { AUDIT_STATUS, QUESTIONNAIRE_TYPE } from '../constants';
import { Audit, AuditStatus } from '../types';

import { SelectTemplateAudit } from './SelectTemplateModal';

type Props = {
  audit: Audit;
  onStartPreAudit: (audit: SelectTemplateAudit) => void;
};

export const AuditListActionMenu: FC<Props> = ({ audit, onStartPreAudit }) => {
  const { t } = useTranslation();

  return (
    <ActionsMenu
      items={[
        {
          label: t('audit.startAudit', { type: t('audit.type.OPTI_PIX') }),
          onClick: () => {
            onStartPreAudit({
              companyId: audit.companyId,
              templateType: QUESTIONNAIRE_TYPE.OPTI_PIX,
            });
          },
          isDisabled: !isStartButtonEnabled(audit.preAuditOptiPix?.status),
        },
        // TODO: Uncomment when at least 1 OPTI_LEADS questionairre template is ready
        // {
        //   label: t('audit.startAudit', { type: t('audit.type.OPTI_LEADS') }), //TODO Add translations to locize
        //   onClick: () => {
        //     onStartPreAudit({
        //       companyId: audit.companyId,
        //       templateType: QUESTIONNAIRE_TYPE.OPTI_LEADS,
        //     });
        //   },
        //   isDisabled: !isStartButtonEnabled(audit.preAuditOptiLeads?.status),
        // },
        {
          label: t('audit.startAudit', { type: t('audit.type.OPTI_ADS') }),
          onClick: () => {
            onStartPreAudit({
              companyId: audit.companyId,
              templateType: QUESTIONNAIRE_TYPE.OPTI_ADS,
            });
          },
          isDisabled: !isStartButtonEnabled(audit.preAuditOptiAds?.status),
        },
      ]}
    />
  );
};

function isStartButtonEnabled(auditStatus: AuditStatus): boolean {
  return (
    auditStatus === AUDIT_STATUS.NOT_OPEN || auditStatus === AUDIT_STATUS.SENT
  );
}
