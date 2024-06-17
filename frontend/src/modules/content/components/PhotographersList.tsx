import React, { useMemo } from 'react';

import { Avatar } from '@/components/elements';
import { createTableColumns, Table } from '@/components/shared';
import { useTranslation } from '@/i18n';
import { createFullNameFromUser } from '@/modules/users';

import { Photographer } from '../types';

type Props = {
  photographers: Photographer[];
  isLoading?: boolean;
  isRefetching?: boolean;
};

export const PhotographersList: React.FC<Props> = ({
  photographers,
  isLoading,
  isRefetching,
}) => {
  const { t } = useTranslation();

  const columns = useMemo(
    () =>
      createTableColumns<Photographer>((ch) => [
        ch.display({
          id: 'fullName',
          header: () => t('common.name'),
          cell: ({ row }) => {
            const fullName = createFullNameFromUser(
              row.original.userFirstName,
              row.original.userLastName,
            );
            return (
              <div className="flex gap-3">
                <Avatar alt={fullName} name={fullName} size={'sm'} />
                {fullName}
              </div>
            );
          },
        }),
        ch.accessor('userEmail', {
          header: () => t('common.email'),
        }),
        ch.accessor('totalVehiclesCount', {
          header: () => t('content.vehiclesAddedCount'),
        }),
        ch.accessor('vehiclesActiveCount', {
          header: () => t('content.statisticsCardActiveVehicles'),
        }),
        ch.accessor('vehiclesImagesCount', {
          header: () => t('content.vehiclesImagesCount'),
        }),
        ch.accessor('vehiclesDeletedCount', {
          header: () => t('content.statisticsCardDeletedVehicles'),
        }),
      ]),
    [t],
  );

  return (
    <Table
      columns={columns}
      data={photographers}
      isLoading={isLoading || isRefetching}
    />
  );
};
