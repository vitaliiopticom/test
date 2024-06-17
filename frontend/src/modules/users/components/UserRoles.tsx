import React from 'react';

import { Heading, Skeleton } from '@/components/elements';
import { DataCheckboxGroupField } from '@/components/shared';
import { useTranslation } from '@/i18n';
import { DropDownSelectOption } from '@/types/form';

import { useGetRolesByTenantQuery } from '../api/getUserRoles';

type Props = {
  tenantId: string;
  index: number;
  isDisabled?: boolean;
  roles?: DropDownSelectOption[];
};

export const UserRoles: React.FC<Props> = ({
  tenantId,
  isDisabled,
  index,
  roles,
}) => {
  const { t } = useTranslation();
  const { data, loading } = useGetRolesByTenantQuery({
    variables: {
      input: {
        tenantId,
      },
    },
    skip: !tenantId || !!roles,
  });

  return (
    <div className="mt-8">
      <Heading className="mb-4" variant="h4">
        {t('common.roles')}
      </Heading>
      {loading && <Skeleton className="h-24" />}
      <DataCheckboxGroupField
        className="[&>div]:grid-cols1 [&>div]:grid [&>div]:gap-x-9 [&>div]:2xl:grid-cols-2"
        data={roles || data?.rolesByTenant || []}
        labelClassName="inline-block max-w-[30ch] truncate"
        mapDataToOption={(item) => {
          const label = t(item.nameLocalizationKey, {
            defaultValue: item.name,
          });

          return {
            value: item.id,
            label,
            tooltip: label.length > 33 ? label : undefined,
            isDisabled,
          };
        }}
        name={`tenantAssignments[${index}].roleAssignments`}
      />
    </div>
  );
};
