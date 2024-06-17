import { ReactNode } from 'react';

import { Text, Transition } from '@/components/elements';
import { useTranslation } from '@/i18n';
import { cx } from '@/utils/classNames';

import { useDataViewContext } from '../hooks/useDataViewContext';
import {
  useDataViewStore,
  useSelectedItems,
  useSelectionActionsCollapsed,
} from '../hooks/useDataViewStore';

type ChildrenProps<D> = {
  selectedItems: D[];
  data: D[];
  resetSelection: () => void;
};

type Props<D> = {
  children: (args: ChildrenProps<D>) => ReactNode;
  className?: string;
};

export const SelectionActionsPopup = <D,>({
  children,
  className,
}: Props<D>) => {
  const { t } = useTranslation();
  const { id, data } = useDataViewContext<D>();
  const selectedItems = useSelectedItems<D>(id);
  const selectionActionsCollapsed = useSelectionActionsCollapsed(id);
  const { resetSelectedItems } = useDataViewStore.getState();

  if (selectionActionsCollapsed) {
    return null;
  }

  return (
    <Transition show={!selectionActionsCollapsed} variant="opacity">
      <div
        className={cx(
          'sticky bottom-6 left-1/2 z-modal flex items-center gap-7 rounded-lg bg-white px-6 py-5 shadow-popup',
          className,
        )}
      >
        <Text className="whitespace-nowrap" size="lg">
          {`${t('common.elementsSelected')}: `}
          <span className="font-semibold">{selectedItems.length}</span>
        </Text>
        {children?.({
          selectedItems,
          data,
          resetSelection: () => resetSelectedItems(id),
        })}
      </div>
    </Transition>
  );
};
