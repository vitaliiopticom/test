import { Fragment, ReactElement, useCallback } from 'react';

import { Item } from './Item';

export type DragDropItem<T = any> = {
  id: string;
} & T;

export type DragDropProps<T> = {
  items: DragDropItem<T>[];
  setItems: (items: DragDropItem<T>[]) => void;
  renderItem: (args: DragDropItem<T>, index: number) => ReactElement;
  onReorderItems?: (items: DragDropItem<T>[]) => void;
  itemsLengthAfterSubtitle?: number;
  wrapperClassName?: string;
  isDisabled?: boolean;
};

export const DragDrop = <T,>({
  items,
  setItems,
  renderItem,
  itemsLengthAfterSubtitle,
  onReorderItems,
  wrapperClassName,
  isDisabled,
}: DragDropProps<T>) => {
  const moveItem = useCallback(
    (dragId: string, hoverIndex: number) => {
      let newOrder = [...items];
      const dragIndex = items.findIndex((el) => el.id === dragId);

      const draggedItem = items[dragIndex];
      const replacedItem = items[hoverIndex];

      newOrder[dragIndex] = replacedItem;
      newOrder[hoverIndex] = draggedItem;

      onReorderItems?.(newOrder);
      setItems(newOrder);
    },
    [items, onReorderItems, setItems],
  );

  const renderSubtitle = useCallback(
    (index: number) => {
      if (itemsLengthAfterSubtitle && index % itemsLengthAfterSubtitle === 0) {
        const positionIndex = Math.ceil((index + 1) / itemsLengthAfterSubtitle);

        return (
          <p className="mb-4 mt-6 font-semibold">{positionIndex}. Position</p>
        );
      }
    },
    [itemsLengthAfterSubtitle],
  );

  return (
    <div className={wrapperClassName}>
      {items.map((item, index) => (
        <Fragment key={item.id}>
          {renderSubtitle(index)}
          {isDisabled ? (
            renderItem(item, index)
          ) : (
            <Item id={item.id} index={index} moveItem={moveItem}>
              {renderItem(item, index)}
            </Item>
          )}
        </Fragment>
      ))}
    </div>
  );
};
