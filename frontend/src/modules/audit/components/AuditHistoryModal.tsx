import React, { useMemo } from 'react';

import { Button, Modal, Separator } from '@/components/elements';
import { createTableColumns, Table } from '@/components/shared';
import { useTranslation } from '@/i18n';
import { createFullNameFromUser } from '@/modules/users';
import { formatDateTime } from '@/utils/date';

import { useGetAuditHistoryOverview } from '../api/getAuditHistoryOverview';
import { AUDIT_STATUS } from '../constants';
import { AuditHistoryModalInput, AuditHistoryRow } from '../types';

import { GenerateReportPopover } from './GenerateReportPopover';

type Props = {
  onClose: () => void;
  input: AuditHistoryModalInput;
};

export const AuditHistoryModal: React.FC<Props> = ({ input, onClose }) => {
  const { t } = useTranslation();

  const { data, loading } = useGetAuditHistoryOverview({
    variables: { input },
    skip: !input?.companyId,
  });

  const columns = useMemo(
    () =>
      createTableColumns<AuditHistoryRow>((ch) => [
        ch.accessor('rating', {
          header: () => t('common.rating'),
          cell: ({ row }) => {
            const stars = row.original.rating.stars;

            return (
              <>
                <span className="text-semibold ml-3 mr-1 text-secondary">
                  {`${stars.score || '-'}`}
                </span>
                <span>/ {`${stars.max || '-'}`}</span>
              </>
            );
          },
        }),
        ch.accessor('dateSent', {
          header: () => t('common.dateSent'),
          cell: ({ row }) =>
            row.original.dateSent
              ? formatDateTime(new Date(row.original.dateSent))
              : '-',
        }),
        ch.accessor('sentByUser', {
          header: () => t('common.sentBy'),
          cell: ({ row }) => {
            const user = row.original.sentByUser;
            return createFullNameFromUser(user?.firstname, user?.lastname, '-');
          },
        }),
        ch.accessor('dateCreated', {
          header: () => t('common.dateCreated'),
          cell: ({ row }) =>
            row.original.dateCreated
              ? formatDateTime(new Date(row.original.dateCreated))
              : '-',
        }),
        ch.accessor('createdByUser', {
          header: () => t('common.createdBy'),
          cell: ({ row }) => {
            const user = row.original.createdByUser;
            return createFullNameFromUser(user?.firstname, user?.lastname, '-');
          },
        }),
        ch.display({
          id: '_actions',
          header: () => t('common.actions'),
          cell: ({ row }) => {
            return (
              <GenerateReportPopover
                questionnaireId={row.original.questionnaireId}
              >
                <Button
                  disabled={
                    row.original.status !== AUDIT_STATUS.DONE &&
                    row.original.status !== AUDIT_STATUS.SENT
                  }
                  size="sm"
                  variant="secondary"
                >
                  {t('common.exportPdf')}
                </Button>
              </GenerateReportPopover>
            );
          },
        }),
      ]),
    [t],
  );

  return (
    <Modal
      className="w-fit min-w-[935px] overflow-x-auto"
      isOpen={!!input}
      title={t('audit.auditHistory')}
      onClose={onClose}
    >
      <Separator
        className="mb-8 pb-4 font-normal"
        text={
          input.dealerName
            ? `${t(`audit.type.${input?.auditType}`)}, ${input?.dealerName}`
            : t(`audit.type.${input?.auditType}`)
        }
      />
      <Table
        columns={columns}
        data={data?.auditHistoryOverview ?? []}
        isLoading={loading}
        loadingSkeletonRows={3}
      />
    </Modal>
  );
};
