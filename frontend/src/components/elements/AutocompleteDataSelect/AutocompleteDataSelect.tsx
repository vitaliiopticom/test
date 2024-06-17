import { ForwardedRef, forwardRef, ReactElement, Ref, useMemo } from 'react';

import type { OptionType } from '@/types/form';

import {
  AutocompleteSelect,
  AutocompleteSelectProps,
} from '../AutocompleteSelect/AutocompleteSelect';

export type AutocompleteDataSelectProps<D, Multi extends boolean> = {
  data: D[];
  mapDataToOption: (data: D) => OptionType<any>;
} & Omit<AutocompleteSelectProps<string, Multi>, 'options'>;

const AutocompleteDataSelectInner = <D, Multi extends boolean>(
  {
    data = [],
    mapDataToOption,
    ...rest
  }: AutocompleteDataSelectProps<D, Multi>,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  const options = useMemo<OptionType[]>(
    () => data.map((item) => mapDataToOption(item)),
    [mapDataToOption, data],
  );

  return <AutocompleteSelect ref={ref} options={options} {...rest} />;
};

export const AutocompleteDataSelect = forwardRef(
  AutocompleteDataSelectInner,
) as <D, Multi extends boolean>(
  props: AutocompleteDataSelectProps<D, Multi> & { ref?: Ref<HTMLDivElement> },
) => ReactElement;
