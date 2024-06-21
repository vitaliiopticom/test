import { FC } from 'react';

import { Button } from '@/components/elements';
import {
  DataView,
  DataViewFiltersChangeHandler,
  Page,
  PaginationAdapter,
  QueryDataLoader,
} from '@/components/shared';
import { useDisclosure } from '@/hooks';
import { useTranslation } from '@/i18n';

import { LeadsList } from '../../leads/components/LeadsList';

import {
  CreateLeadFormValues,
  LeadStateEnum,
  LeadsListFiltersType,
} from '../types/leadTypes';
import { useGetLeadsQuery } from '../api/getLeads';
import {
  LEADS_DATA_VIEW_ID,
  leadsListFiltersDefaultValues,
} from '../constants';
import { useCreateLeadMutation } from '../api/createLead';
import { LeadFormModal } from '../components/LeadFormModal';
import { useTenant } from '@/modules/tenants';
import { languageOptions } from '../utils/leadUtils';

export const LeadsPage: FC = () => {
  const { t } = useTranslation();
  const createModal = useDisclosure();
  const tenant = useTenant().tenant;
  const tenantId = tenant?.id || '';
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
  console.log(tenant, '!!!!!!!');

  const leadsQuery = useGetLeadsQuery({
    variables: { inputParameters }
    });
  const handleClose = () => {
    // setLeadToAdd(undefined);

    createModal.onClose();
  };

  const [createLead, createLeadState] = useCreateLeadMutation({
    onCompleted: handleClose,
  });

  const handleCreateLead = (values: CreateLeadFormValues) => {
    const { ...restValues } = values;
    const clientInformation = restValues.clientInformation;

    const leadValues = {
      ...restValues,
      clientInformation: { ...clientInformation, language: clientInformation.language?.toUpperCase() || '' },
      tenantId,
    };

    createLead({
      variables: {
        input: leadValues,
      },
    });
  };

  // useEffect(() => {
  //   if (leadToAdd) {
  //     handleCreateLead(leadToAdd);
  //   }
  // }, [leadToAdd]);

  const handleChange: DataViewFiltersChangeHandler<LeadsListFiltersType> = (
    filters,
  ) => {
    // leadsQuery.refetch({ filters });
  };

  return (
    <>
      <Page
        actions={
          <Button onClick={createModal.onOpen}>{t('leads.addNew')}</Button>
        }
        title={`${t('leads.pageLabel')}: ${tenant?.name || ''}`}
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
                  onFiltersChange={handleChange}
                >
                  <LeadsList />
                </DataView>
              )}
            </PaginationAdapter>
          )}
        </QueryDataLoader>
        <LeadFormModal
          isLoading={createLeadState.loading}
          isOpen={createModal.isOpen}
          title={t('leads.addNew')}
          onClose={createModal.onClose}
          onSubmit={handleCreateLead}
        />
      </Page>
    </>
  );
};
