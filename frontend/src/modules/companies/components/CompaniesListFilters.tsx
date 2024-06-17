import { FC, useMemo } from 'react';

import { DataView, InputField, SelectField } from '@/components/shared';
import { useTranslation } from '@/i18n';
import { ONBOARDING_STATUS } from '@/modules/onboarding';

import { CONTRACT_STATUS } from '../constants';

import { CompanyOwnersPropertiesSelect } from './CompanyOwnersPropertiesSelect';
import { CompanyPropertiesSelect } from './CompanyPropertiesSelect';

export const CompaniesListFilters: FC = () => {
  const { t } = useTranslation();

  const { onboardingOptions, contractOptions } = useMemo(() => {
    const onboardingOptions = Object.values(ONBOARDING_STATUS).map((item) => ({
      value: item,
      label: t(`companies.status.${item}`),
    }));

    const contractOptions = Object.values(CONTRACT_STATUS).map((item) => ({
      value: item,
      label: t(`companies.status.${item}`),
    }));

    return { onboardingOptions, contractOptions };
  }, [t]);

  return (
    <DataView.FilterGroup>
      <InputField
        endIcon="search"
        name="search"
        placeholder={t('common.search')}
      />
      <CompanyPropertiesSelect
        code="pays_region_achats_"
        name="countryId"
        placeholder={t('common.country')}
      />
      <CompanyOwnersPropertiesSelect
        code="hubspot_owner_id"
        name="companyOwnerId"
        placeholder={t('common.owner')}
      />
      <InputField
        endIcon="search"
        name="parentEntityName"
        placeholder={t('companies.parentEntity')}
      />
      <CompanyPropertiesSelect
        code="opti_pix_"
        name="relationStatusId"
        placeholder={t('companies.relationStatus')}
      />
      <SelectField
        name="onboardingStatusId"
        options={onboardingOptions}
        placeholder={t('companies.onboardingStatus')}
      />
      <SelectField
        name="optiPixContractStatusId"
        options={contractOptions}
        placeholder={t('companies.contractStatus')}
      />
    </DataView.FilterGroup>
  );
};
