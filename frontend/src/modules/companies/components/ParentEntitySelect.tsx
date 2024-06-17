import {
  DataSelectField,
  RequiredDataSelectFieldProps,
} from '@/components/shared';
import { DropDownSelectOption } from '@/types/form';

import { useGetParentEntitiesQuery } from '../api/getParentEntities';

type Props<Multi extends boolean> = RequiredDataSelectFieldProps<
  DropDownSelectOption,
  Multi
>;

export const ParentEntitySelect = <Multi extends boolean>(
  props: Props<Multi>,
) => {
  const { data, loading } = useGetParentEntitiesQuery({
    fetchPolicy: 'cache-and-network',
  });

  return (
    <DataSelectField
      data={data?.companyParentEntities || []}
      isLoading={loading}
      {...props}
    />
  );
};
