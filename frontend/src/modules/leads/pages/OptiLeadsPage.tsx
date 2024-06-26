import { FC, useState } from 'react';

import { Button, Modal } from '@/components/elements';
import {
  DataView,
  DataViewFiltersChangeHandler,
  Page,
  PaginationAdapter,
  QueryDataLoader,
} from '@/components/shared';
import { useDisclosure } from '@/hooks';
import { useTranslation } from '@/i18n';

import { LeadsList } from '../components/LeadsList';

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
import { useDeleteLeadMutation } from '../api/deleteLeadById';

const getParameters = (status?: LeadStateEnum) => {
  return {
    pagingParameters: {
      pageIndex: 1, // Example page index
      pageSize: 10, // Example page size
    },
    filterParameters: {
      firstResponse: false, // Example filter
      leadState: status || LeadStateEnum.ToProcess, // Example lead state
    }
  }
};

export const OptiLeadsPage: FC = () => {
  const { t } = useTranslation();
  const createModal = useDisclosure();
  const deleteModal = useDisclosure();

  const [selectedLeads, setSelectedLeads] = useState<any[]>([]);

  const tenant = useTenant().tenant;
  const tenantId = tenant?.id || '';

  const leadsQuery = useGetLeadsQuery({
    variables: { inputParameters: getParameters() }
  });
  const handleClose = () => {
    createModal.onClose();
  };

  const [createLead, createLeadState] = useCreateLeadMutation({
    onCompleted: handleClose,
  });

  const [deleteLead, deleteLeadState] = useDeleteLeadMutation({
    onCompleted: deleteModal.onClose,
  });

  const handleDeleteLeads = (id?: string) => {
    deleteLead({
      variables: {
          leadId: selectedLeads[0].id
      }
    })
  }

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
                  isLoading={isLoading || isRefetching}
                  recordsCount={data?.leads?.length}
                  onFiltersChange={handleChange}
                >
                  <LeadsList onTabChange={(status: LeadStateEnum) => {
                    leadsQuery.refetch({ inputParameters: getParameters(status) })
                  }}
                    selectedLeads={selectedLeads}
                    setSelectedLeads={setSelectedLeads}
                    deleteLeads={
                      () => deleteModal.onOpen()
                      // handleDeleteLeads
                    }
                  />
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
        <Modal
          actions={[
            <Button
              key="delete"
              className="min-w-[125px]"
              children={t('common.delete')}
              onClick={() => handleDeleteLeads()}
              disabled={deleteLeadState.loading}
            />,
            <Button
              key="cancel"
              className="min-w-[125px]"
              children={t('common.cancel')}
              onClick={() => deleteModal.onClose()}
              variant="secondary"
              disabled={deleteLeadState.loading}
            />
          ]}

          isOpen={deleteModal.isOpen}
          title={t('leads.deleteGroup')}
        ><></></Modal>
      </Page>
    </>
  );
};
