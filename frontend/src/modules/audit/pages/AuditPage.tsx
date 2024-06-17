import type { FC } from 'react';

import { Page } from '@/components/shared';
import { useTranslation } from '@/i18n';
import { PERMISSIONS, usePermissions } from '@/modules/auth';

import { AuditPageForAdmin } from '../components/AuditPageForAdmin';
import { AuditPageForUser } from '../components/AuditPageForUser';

export const AuditPage: FC = () => {
  const { t } = useTranslation();
  const isAdmin = usePermissions(PERMISSIONS.Audit_AuditCompanies);

  return (
    <Page title={t('audit.title')}>
      {isAdmin ? <AuditPageForAdmin /> : <AuditPageForUser />}
    </Page>
  );
};
