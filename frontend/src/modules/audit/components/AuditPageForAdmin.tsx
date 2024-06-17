import { useState } from 'react';
import type { FC } from 'react';

import {
  DataView,
  DataViewChangeHandler,
  QueryDataLoader,
} from '@/components/shared';

import { useGetAuditOverviewsQuery } from '../api/getAudits';
import { AuditsListForAdmin } from '../components/AuditsListForAdmin';
import {
  SelectTemplateAudit,
  SelectTemplateModal,
} from '../components/SelectTemplateModal';
import {
  AUDIT_PAGE_ADMIN_DATA_VIEW_ID,
  auditListFiltersDefaultValues,
} from '../constants';
import type { AuditListForm } from '../types';

export const AuditPageForAdmin: FC = () => {
  const [selectTemplateAudit, setSelectTemplateAudit] =
    useState<SelectTemplateAudit>();
  const auditsQuery = useGetAuditOverviewsQuery({
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
        dealerIds: filters.dealerIds.map((item) => item.value),
      },
    });
  };

  return (
    <>
      <QueryDataLoader query={auditsQuery} keepPreviousData useCustomLoading>
        {({ data, isLoading, isRefetching }) => (
          <DataView
            data={data?.auditOverviews.items || []}
            filterDefaultValues={auditListFiltersDefaultValues}
            id={AUDIT_PAGE_ADMIN_DATA_VIEW_ID}
            isFetching={isRefetching}
            isLoading={isLoading}
            recordsCount={data?.auditOverviews.count}
            onChange={handleListChange}
          >
            <AuditsListForAdmin onStartPreAudit={setSelectTemplateAudit} />
          </DataView>
        )}
      </QueryDataLoader>
      <SelectTemplateModal
        isOpen={!!selectTemplateAudit}
        selectTemplateAudit={selectTemplateAudit}
        onClose={() => setSelectTemplateAudit(undefined)}
      />
    </>
  );
};
