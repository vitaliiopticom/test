import type { FC } from 'react';

import {
  DataView,
  DataViewChangeHandler,
  QueryDataLoader,
} from '@/components/shared';

import { useGetAuditOverviewsForUserQuery } from '../api/getAuditsForUser';
import { AuditsListForUser } from '../components/AuditsListForUser';
import {
  AUDIT_LIST_USER_DATA_VIEW_ID,
  AUDIT_STATUS,
  auditListFiltersDefaultValues,
} from '../constants';
import type { AuditListForm } from '../types';

export const AuditPageForUser: FC = () => {
  const auditsQuery = useGetAuditOverviewsForUserQuery({
    variables: {
      paging: { pageIndex: 0, pageSize: 10 },
      filters: auditListFiltersDefaultValues,
    },
  });

  const handleListChange: DataViewChangeHandler<AuditListForm> = ({
    filters,
    pagination,
  }) => {
    auditsQuery.refetch({
      paging: {
        pageIndex: pagination.page - 1,
        pageSize: pagination.pageSize,
      },
      filters: {
        ...filters,
        statuses: [AUDIT_STATUS.SENT],
        dealerIds: filters.dealerIds.map((item) => item.value),
      },
    });
  };

  return (
    <QueryDataLoader query={auditsQuery} keepPreviousData useCustomLoading>
      {({ data, isLoading, isRefetching }) => (
        <DataView
          data={data?.userRelatedAudits.items || []}
          filterDefaultValues={auditListFiltersDefaultValues}
          id={AUDIT_LIST_USER_DATA_VIEW_ID}
          isFetching={isRefetching}
          isLoading={isLoading}
          recordsCount={data?.userRelatedAudits.count}
          onChange={handleListChange}
        >
          <AuditsListForUser />
        </DataView>
      )}
    </QueryDataLoader>
  );
};
