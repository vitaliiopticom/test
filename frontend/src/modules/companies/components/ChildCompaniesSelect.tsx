import {
  DataSelectField,
  RequiredDataSelectFieldProps,
} from '@/components/shared';

import { useChildCompaniesQuery } from '../api/getChildCompanies';
import { Dealership } from '../types';

type Props<Multi extends boolean> = RequiredDataSelectFieldProps<
  Dealership,
  Multi
>;

const mapDataToOption = (item: Dealership) => ({
  value: item.tenantId,
  label: item.companyName,
});

export const ChildCompaniesSelect = <Multi extends boolean>({
  ...rest
}: Props<Multi>) => {
  const { data, loading } = useChildCompaniesQuery();

  return (
    <DataSelectField
      data={data?.childCompanies?.items || []}
      isLoading={loading}
      mapDataToOption={mapDataToOption}
      {...rest}
    />
  );
};
