import { ForwardedRef, forwardRef, ReactElement, Ref, useMemo } from 'react';

import type { OptionType } from '@/types/form';

import {
  CheckboxGroup,
  CheckboxGroupProps,
} from '../CheckboxGroup/CheckboxGroup';

export type DataCheckboxGroupProps<D> = {
  data: D[];
  labelClassName?: string;
  mapDataToOption: (data: D) => OptionType<any>;
} & Omit<CheckboxGroupProps, 'options'>;

const DataCheckboxGroupInner = <D,>(
  {
    data = [],
    mapDataToOption,
    labelClassName,
    ...rest
  }: DataCheckboxGroupProps<D>,
  _ref: ForwardedRef<HTMLDivElement>,
) => {
  const options = useMemo<OptionType[]>(
    () => data.map((item) => mapDataToOption(item)),
    [mapDataToOption, data],
  );

  return (
    <CheckboxGroup
      labelClassName={labelClassName}
      options={options}
      {...rest}
    />
  );
};

export const DataCheckboxGroup = forwardRef(DataCheckboxGroupInner) as <D>(
  props: DataCheckboxGroupProps<D> & { ref?: Ref<HTMLDivElement> },
) => ReactElement;
