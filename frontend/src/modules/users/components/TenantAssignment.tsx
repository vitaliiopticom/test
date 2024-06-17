import { FC } from 'react';

import { useFieldArray, useFormContext } from '@/components/shared';
import { useTranslation } from '@/i18n';
import { PERMISSIONS, usePermissions } from '@/modules/auth';
import { CreateUserFormValues } from '@/modules/users';

import { UserRolesCheckboxGroup } from './UserRolesCheckboxGroup';
import { UserTenantRolesCheckboxGroup } from './UserTenantRolesCheckboxGroup';
import { UserTenantSelect } from './UserTenantSelect';

const fieldName = 'tenantAssignments';

type Props = {
  tenantId?: string;
  withTenantRoles?: boolean;
};

export const TenantAssignment: FC<Props> = ({ tenantId, withTenantRoles }) => {
  const { t } = useTranslation();
  const canViewAllTenants = usePermissions(PERMISSIONS.Users_View_AllTenants);

  const { fields } = useFieldArray({
    name: fieldName,
  });

  const { watch, resetField } = useFormContext<CreateUserFormValues>();

  const tenants = watch(fieldName);
  const firstTenantId = tenantId || tenants?.[0]?.tenantId;

  const renderCheckboxGroup = (index: number) => {
    if (withTenantRoles) {
      if (firstTenantId) {
        return (
          <UserTenantRolesCheckboxGroup
            label={t('common.roles')}
            name={`${fieldName}.${index}.roleAssignments`}
            tenantId={tenantId ? undefined : firstTenantId}
          />
        );
      }
    } else {
      return (
        <UserRolesCheckboxGroup
          label={t('common.roles')}
          name={`${fieldName}.${index}.roleAssignments`}
        />
      );
    }
  };

  return (
    <>
      <div className="mt-2 space-y-4 divide-y-2 divide-dashed">
        {fields.map((field, index) => (
          <div key={field.id} className="flex flex-col gap-6">
            {canViewAllTenants && (
              <UserTenantSelect
                className="w-fit"
                handleOnChange={() =>
                  resetField(`${fieldName}.${index}.roleAssignments`)
                }
                label={t('common.tenant')}
                name={`${fieldName}.${index}.tenantId`}
                isRequired
              />
            )}
            {renderCheckboxGroup(index)}
          </div>
        ))}
      </div>
    </>
  );
};
