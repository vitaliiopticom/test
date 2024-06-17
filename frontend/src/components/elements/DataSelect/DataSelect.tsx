import { ForwardedRef, forwardRef, ReactElement, Ref, useMemo } from 'react';

import type { OptionType } from '@/types/form';

import { Select, SelectProps } from '../Select/Select';

export type DataSelectProps<D, Multi extends boolean> = {
  data: D[];
  mapDataToOption: (data: D) => OptionType<any>;
} & Omit<SelectProps<string, Multi>, 'options'>;

const DataSelectInner = <D, Multi extends boolean>(
  { data = [], mapDataToOption, ...rest }: DataSelectProps<D, Multi>,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  const options = useMemo<OptionType[]>(
    () => data.map((item) => mapDataToOption(item)),
    [mapDataToOption, data],
  );

  return <Select ref={ref} options={options} {...rest} />;
};

export const DataSelect = forwardRef(DataSelectInner) as <
  D,
  Multi extends boolean = false,
>(
  props: DataSelectProps<D, Multi> & { ref?: Ref<HTMLDivElement> },
) => ReactElement;
