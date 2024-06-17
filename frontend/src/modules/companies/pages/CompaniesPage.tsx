import { FC } from 'react';

import { Button } from '@/components/elements';
import { Page } from '@/components/shared';
import { useDisclosure } from '@/hooks';
import { useTranslation } from '@/i18n';
import { PermissionCheck, PERMISSIONS, usePermissions } from '@/modules/auth';

import { CompaniesPageForAdmin } from '../components/CompaniesPageForAdmin';
import { CompaniesPageForDealergroupUser } from '../components/CompaniesPageForDealergroupUser';
import { CompanyFormModal } from '../components/CompanyFormModal';

export const CompaniesPage: FC = () => {
  const { t } = useTranslation();

  const canViewCompanyChildProfiles = usePermissions(
    PERMISSIONS.CompanyProfiles_View_ChildTenants,
  );

  const createModal = useDisclosure();

  return (
    <Page
      actions={
        <PermissionCheck permission={PERMISSIONS.Companies_Add}>
          <Button onClick={createModal.onOpen}>{t('companies.addNew')}</Button>
        </PermissionCheck>
      }
      title={t('common.companies')}
    >
      {canViewCompanyChildProfiles ? (
        <CompaniesPageForDealergroupUser />
      ) : (
        <CompaniesPageForAdmin />
      )}
      <CompanyFormModal
        isOpen={createModal.isOpen}
        onClose={createModal.onClose}
      />
    </Page>
  );
};
