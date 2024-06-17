import {
  DataSelectField,
  RequiredDataSelectFieldProps,
} from '@/components/shared';

import { useGetCompaniesQuery } from '../api/getCompanies';
import { filtersDefaultValues } from '../constants';
import { Company } from '../types';

type Props<Multi extends boolean> = RequiredDataSelectFieldProps<
  Company,
  Multi
>;

export const CompanySelect = <Multi extends boolean>(props: Props<Multi>) => {
  const { data, loading } = useGetCompaniesQuery({
    variables: {
      filters: filtersDefaultValues,
      paging: { pageIndex: 0, pageSize: 100 },
    },
  });

  return (
    <DataSelectField
      data={data?.companies?.items || []}
      isLoading={loading}
      mapDataToOption={(item) => ({
        value: item.id.toString(),
        label: item.companyName,
      })}
      {...props}
    />
  );
};
