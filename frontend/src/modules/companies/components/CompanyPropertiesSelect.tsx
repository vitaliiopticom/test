import { useCallback } from 'react';

import {
  DataSelectField,
  RequiredDataSelectFieldProps,
} from '@/components/shared';
import { useTranslation } from '@/i18n';

import { useGetCompanyPropertiesQuery } from '../api/getCompanyProperties';
import { CompanyProperty, CompanyPropertyCode } from '../types';

type Props<Multi extends boolean> = {
  code: CompanyPropertyCode;
} & RequiredDataSelectFieldProps<CompanyProperty, Multi>;

export const CompanyPropertiesSelect = <Multi extends boolean>({
  code,
  ...rest
}: Props<Multi>) => {
  const { t } = useTranslation();
  const { data, loading } = useGetCompanyPropertiesQuery({
    variables: { propertyCode: code },
  });

  const mapDataToOption = useCallback(
    (item: CompanyProperty) => ({
      value: item.id,
      label: t(item.localizationKey, { defaultValue: item.name }),
    }),
    [t],
  );

  return (
    <DataSelectField
      data={data?.companyProperties?.items || []}
      isLoading={loading}
      mapDataToOption={mapDataToOption}
      {...rest}
    />
  );
};
