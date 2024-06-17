import { FC } from 'react';

import {
  DataView,
  DataViewChangeHandler,
  QueryDataLoader,
} from '@/components/shared';

import { useGetCompaniesQuery } from '../api/getCompanies';
import { COMPANIES_DATA_VIEW_ID, filtersDefaultValues } from '../constants';
import { CompanyListFilters } from '../types';

import { CompaniesList } from './CompaniesList';

export const CompaniesPageForAdmin: FC = () => {
  const companiesQuery = useGetCompaniesQuery({
    variables: {
      filters: filtersDefaultValues,
      paging: { pageIndex: 0, pageSize: 10 },
    },
  });

  const handleListChange: DataViewChangeHandler<CompanyListFilters> = ({
    filters,
    pagination,
  }) => {
    companiesQuery.refetch({
      filters,
      paging: {
        pageIndex: pagination.page - 1,
        pageSize: pagination.pageSize,
      },
    });
  };

  return (
    <QueryDataLoader query={companiesQuery} keepPreviousData useCustomLoading>
      {({ data, isLoading, isRefetching }) => (
        <DataView
          data={data?.companies.items || []}
          filterDefaultValues={filtersDefaultValues}
          id={COMPANIES_DATA_VIEW_ID}
          isFetching={isRefetching}
          isLoading={isLoading}
          recordsCount={data?.companies.count || 0}
          onChange={handleListChange}
        >
          <CompaniesList />
        </DataView>
      )}
    </QueryDataLoader>
  );
};
