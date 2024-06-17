import {
  DataCheckboxGroupField,
  RequiredDataCheckboxGroupFieldProps,
} from '@/components/shared';
import { useTranslation } from '@/i18n';
import { DropDownSelectOption } from '@/types/form';

import { useGetRolesQuery } from '../api/getRoles';

import { UserRolesSkeleton } from './UserRolesSkeleton';

type Props = {
  isDisabled?: boolean;
} & RequiredDataCheckboxGroupFieldProps<DropDownSelectOption>;

export const UserRolesCheckboxGroup = ({ isDisabled, ...rest }: Props) => {
  const { t } = useTranslation();
  const { data, loading } = useGetRolesQuery();

  return (
    <>
      {loading ? (
        <UserRolesSkeleton />
      ) : (
        <DataCheckboxGroupField
          className="[&>div]:grid-cols1 [&>div]:grid [&>div]:gap-x-9 [&>div]:2xl:grid-cols-2"
          data={data?.roles || []}
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
          {...rest}
        />
      )}
    </>
  );
};
