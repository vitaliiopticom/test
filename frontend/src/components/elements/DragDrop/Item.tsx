import { FC, ReactNode, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { ITEM_TYPES } from './constants';
import { Identifier } from './types';

type Props = {
  id: string;
  children: ReactNode;
  index: number;
  moveItem: (dragId: string, hoverIndex: number) => void;
};

type DragItem = {
  index: number;
  id: string;
  type: string;
};

export const Item: FC<Props> = ({ id, children, index, moveItem }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ITEM_TYPES.CARD,
    collect: (monitor) => {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    drop: (item: DragItem) => {
      moveItem(item.id, index);
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPES.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div ref={ref} data-handler-id={handlerId} style={{ opacity }}>
      {children}
    </div>
  );
};
