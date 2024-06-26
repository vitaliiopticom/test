import { FC } from 'react';

import { Button } from '@/components/elements';
import {
  DataView,
  Page,
  PaginationAdapter,
  QueryDataLoader,
} from '@/components/shared';
import { useDisclosure } from '@/hooks';
import { useTranslation } from '@/i18n';

import { IncomingLeadsList } from '../../leads/components/IncomingLeadsList';

import {
  LeadStateEnum,
} from '../types/leadTypes';
import { useGetLeadsQuery } from '../api/getLeads';
import {
  LEADS_DATA_VIEW_ID,
  leadsListFiltersDefaultValues,
} from '../constants';
import { useTenant } from '@/modules/tenants';

export const LeadsPage: FC = () => {
  const { t } = useTranslation();
  const createModal = useDisclosure();
  const tenant = useTenant().tenant;
  const inputParameters = {
    pagingParameters: {
      pageIndex: 1, // Example page index
      pageSize: 10, // Example page size
    },
    filterParameters: {
      firstResponse: false, // Example filter
      leadState: LeadStateEnum.ToProcess, // Example lead state
    }
  };

  const leadsQuery = useGetLeadsQuery({
    variables: { inputParameters }
    });
  const handleClose = () => {
    createModal.onClose();
  };



  return (
    <>
      <Page
        title={`${t('leads.pageLabel')}: ${t('leads.incoming')}`}
      >
        <QueryDataLoader query={leadsQuery} keepPreviousData useCustomLoading>
          {({ data, isLoading, isRefetching }) => (
            <PaginationAdapter data={data?.leads || []} id={LEADS_DATA_VIEW_ID}>
              {(pageData) => (
                <DataView
                  filterDefaultValues={leadsListFiltersDefaultValues}
                  data={pageData}
                  id={LEADS_DATA_VIEW_ID}
                  isFetching={isRefetching}
                  isLoading={isLoading}
                  recordsCount={data?.leads?.length}
                >
                  <IncomingLeadsList />
                </DataView>
              )}
            </PaginationAdapter>
          )}
        </QueryDataLoader>
      </Page>
    </>
  );
};
