import { FC } from 'react';

import { DataView, QueryDataLoader } from '@/components/shared';

import { useGetCompanyChildProfilesQuery } from '../api/getCompanyChildProfiles';
import { COMPANIES_DATA_VIEW_ID } from '../constants';

import { CompaniesList } from './CompaniesList';

export const CompaniesPageForDealergroupUser: FC = () => {
  const companiesQuery = useGetCompanyChildProfilesQuery();

  return (
    <QueryDataLoader query={companiesQuery} keepPreviousData useCustomLoading>
      {({ data, isLoading, isRefetching }) => (
        <DataView
          data={data?.companyChildProfiles || []}
          id={COMPANIES_DATA_VIEW_ID}
          isFetching={isRefetching}
          isLoading={isLoading}
          recordsCount={data?.companyChildProfiles.length || 0}
        >
          <CompaniesList hasPagination={false} />
        </DataView>
      )}
    </QueryDataLoader>
  );
};
