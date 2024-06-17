import {
  DataSelectField,
  RequiredDataSelectFieldProps,
} from '@/components/shared';

import { useGetCompanyOwnersPropertiesQuery } from '../api/getCompanyOwnerProperties';
import { CompanyOwnersProperty, CompanyOwnersPropertyCode } from '../types';

type Props<Multi extends boolean> = {
  code: CompanyOwnersPropertyCode;
} & RequiredDataSelectFieldProps<CompanyOwnersProperty, Multi>;

export const CompanyOwnersPropertiesSelect = <Multi extends boolean>({
  code,
  ...rest
}: Props<Multi>) => {
  const { data, loading } = useGetCompanyOwnersPropertiesQuery();

  return (
    <DataSelectField
      data={data?.companyOwners?.items || []}
      isLoading={loading}
      mapDataToOption={(item) => ({
        value: item.id,
        label: `${item.name} ${item.lastName ?? ''}`,
      })}
      {...rest}
    />
  );
};
