import { FC, useMemo } from 'react';

import { DataView, InputField, SelectField } from '@/components/shared';
import { useTranslation } from '@/i18n';
import { PERMISSIONS, usePermissions } from '@/modules/auth';
import {
  CommercialsSelect,
  CompanyPropertiesSelect,
  DealerSelect,
  ParentEntitySelect,
} from '@/modules/companies';

import { AUDIT_STATUS, QUESTIONNAIRE_TYPE } from '../constants';

import { RateFilter } from './RateFilter';

type Props = {
  isAdmin?: boolean;
};

export const AuditListFilters: FC<Props> = ({ isAdmin = false }) => {
  const { t } = useTranslation();

  const { typesOptions, statusOptions } = useMemo(() => {
    const typesOptions = Object.values(QUESTIONNAIRE_TYPE).map((item) => ({
      value: item,
      label: t(`audit.type.${item}`),
    }));

    const statusOptions = Object.values(AUDIT_STATUS).map((item) => ({
      value: item,
      label: t(`audit.status.${item}`),
    }));

    return { typesOptions, statusOptions };
  }, [t]);

  const canViewCompany = usePermissions(PERMISSIONS.Module_OptiAudit);

  return (
    <DataView.FilterGroup>
      <InputField
        endIcon="search"
        name="search"
        placeholder={t('common.companyName')}
      />
      <CompanyPropertiesSelect
        code="pays_region_achats_"
        name="companyCountryIds"
        placeholder={t('common.country')}
      />
      {canViewCompany && (
        <SelectField
          name="types"
          options={typesOptions}
          placeholder={t('common.type')}
          isMultiple
        />
      )}
      <RateFilter />
      {isAdmin && (
        <>
          <SelectField
            name="statuses"
            options={statusOptions}
            placeholder={t('common.status')}
            isMultiple
          />
          <ParentEntitySelect
            name="parentEntityIds"
            placeholder={t('companies.parentEntity')}
            isMultiple
          />
          <DealerSelect
            name="dealerIds"
            placeholder={t('common.dealer')}
            isMultiple
          />
          <CommercialsSelect
            name="commercialIds"
            placeholder={t('common.commercial')}
            isMultiple
          />
        </>
      )}
    </DataView.FilterGroup>
  );
};
