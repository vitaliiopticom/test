import { useEffect, useMemo, useRef } from 'react';

import { Checkbox } from '@/components/elements';

import { useDataViewContext } from '../hooks/useDataViewContext';
import {
  useDataViewStore,
  useGetIsAllItemsSelected,
  useGetIsItemSelected,
  useGetIsSomeItemsSelected,
} from '../hooks/useDataViewStore';
import type { DataItemSelector } from '../types';

type Props<D> = {
  item?: D;
  selector?: DataItemSelector<D>;
  className?: string;
};

const defaultSelector = <D,>(item: D | any) => item.id;

export const SelectionCheckbox = <D,>({
  item,
  selector = defaultSelector,
  ...rest
}: Props<D>) => {
  const ref = useRef<HTMLInputElement>(null);
  const { id, data, isSubmitting, handleItemSelectionDisabled } =
    useDataViewContext<D>();
  const { toggleSelectedItem, toggleSelectedItems } =
    useDataViewStore.getState();

  const checked = useGetIsItemSelected<D>(id, item || ({} as D), selector);
  const allRowsSelected = useGetIsAllItemsSelected(id, data);
  const indeterminate = useGetIsSomeItemsSelected(id);

  const isAllRowsDisabled = useMemo(
    () => data?.every((item) => handleItemSelectionDisabled?.(item)),
    [data, handleItemSelectionDisabled],
  );

  const isDisabled = item
    ? handleItemSelectionDisabled?.(item)
    : isAllRowsDisabled;
  const shouldResetSelection = allRowsSelected || indeterminate;

  useEffect(() => {
    if (ref.current && data && !item) {
      ref.current.indeterminate = !allRowsSelected && indeterminate;
    }
  }, [ref, indeterminate, allRowsSelected, data, item]);

  return (
    <Checkbox
      ref={ref}
      checked={item ? checked : allRowsSelected}
      disabled={isSubmitting || isDisabled}
      {...rest}
      onChange={() =>
        item
          ? toggleSelectedItem(id, item, selector)
          : toggleSelectedItems(
              id,
              shouldResetSelection ? [] : data,
              handleItemSelectionDisabled,
            )
      }
    />
  );
};
