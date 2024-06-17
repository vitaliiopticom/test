import { Skeleton } from '@/components/elements';
import {
  DataCheckboxGroupField,
  RequiredDataCheckboxGroupFieldProps,
} from '@/components/shared';
import { useTranslation } from '@/i18n';

import { useGetCompanyPropertiesQuery } from '../api/getCompanyProperties';
import { CompanyProperty, CompanyPropertyCode } from '../types';

type Props = {
  code: CompanyPropertyCode;
} & RequiredDataCheckboxGroupFieldProps<CompanyProperty>;

export const CompanyPropertiesCheckboxGroup = ({ code, ...rest }: Props) => {
  const { t } = useTranslation();
  const { data, loading } = useGetCompanyPropertiesQuery({
    variables: { propertyCode: code },
  });

  return loading ? (
    <Skeleton className="h-16 w-full" />
  ) : (
    <DataCheckboxGroupField
      data={data?.companyProperties?.items || []}
      mapDataToOption={(item) => ({
        value: item.id,
        label: t(item.localizationKey, { defaultValue: item.name }),
      })}
      {...rest}
    />
  );
};
