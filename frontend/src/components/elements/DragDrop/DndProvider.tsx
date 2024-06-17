import { FC, ReactNode } from 'react';
import { DndProvider as ReactDndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

type Props = {
  children: ReactNode;
};

export const DndProvider: FC<Props> = ({ children }) => {
  return <ReactDndProvider backend={HTML5Backend}>{children}</ReactDndProvider>;
};
