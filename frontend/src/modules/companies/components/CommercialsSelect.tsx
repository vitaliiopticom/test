import {
  DataSelectField,
  RequiredDataSelectFieldProps,
} from '@/components/shared';
import { createFullNameFromUser } from '@/modules/users';

import { useGetCommercialsQuery } from '../api/getCommercials';
import type { Commercial } from '../types';

const mapDataToOption = (item: Commercial) => ({
  value: item.id,
  label: createFullNameFromUser(item.name, item.lastName),
});

type Props<Multi extends boolean> = RequiredDataSelectFieldProps<
  Commercial,
  Multi
>;

export const CommercialsSelect = <Multi extends boolean>(
  props: Props<Multi>,
) => {
  const { data, loading } = useGetCommercialsQuery();

  return (
    <DataSelectField
      data={data?.commercials || []}
      isLoading={loading}
      mapDataToOption={mapDataToOption}
      {...props}
    />
  );
};
