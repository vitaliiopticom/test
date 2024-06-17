import {
  DataCheckboxGroupField,
  RequiredDataCheckboxGroupFieldProps,
} from '@/components/shared';
import { useTranslation } from '@/i18n';
import { DropDownSelectOption } from '@/types/form';

import { useGetUserActionsQuery } from '../api/getUserActions';

type Props = RequiredDataCheckboxGroupFieldProps<DropDownSelectOption>;

export const UserActionsCheckboxGroup = ({ ...rest }: Props) => {
  const { t } = useTranslation();
  const { data } = useGetUserActionsQuery();

  return (
    <DataCheckboxGroupField
      className="[&>div]:grid-cols1 [&>div]:grid [&>div]:gap-x-9 [&>div]:2xl:grid-cols-2"
      data={data?.actions || []}
      labelClassName="inline-block max-w-[30ch] truncate"
      mapDataToOption={(item) => {
        const label = t(item.nameLocalizationKey, { defaultValue: item.name });

        return {
          value: item.id,
          label,
          tooltip: label.length > 33 ? label : undefined,
        };
      }}
      {...rest}
    />
  );
};
