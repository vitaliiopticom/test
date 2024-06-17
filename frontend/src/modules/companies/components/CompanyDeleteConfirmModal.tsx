import { FC } from 'react';

import { ConfirmModal } from '@/components/shared';
import { Trans, useTranslation } from '@/i18n';

import { useDeleteCompanyMutation } from '../api/deleteCompany';
import { Company } from '../types';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  company?: Company;
};

export const CompanyDeleteConfirmModal: FC<Props> = ({
  isOpen,
  onClose,
  company,
}) => {
  const { t } = useTranslation();
  const [deleteCompany, deleteCompanyState] = useDeleteCompanyMutation({
    onCompleted: () => {
      onClose();
    },
  });

  const handleConfirm = () => {
    if (!company) return;

    deleteCompany({ variables: { input: company.id } });
  };

  return (
    <ConfirmModal
      inSubmitting={deleteCompanyState.loading}
      isOpen={isOpen}
      title={t('common.deleteConfirmationTitle')}
      onClose={onClose}
      onConfirm={handleConfirm}
    >
      <Trans
        i18nKey="companies.deleteConfirmation"
        values={{ name: company?.companyName }}
      >
        Do you really want to deactivate company
        <span className="font-semibold">{company?.companyName}</span>?
      </Trans>
    </ConfirmModal>
  );
};
