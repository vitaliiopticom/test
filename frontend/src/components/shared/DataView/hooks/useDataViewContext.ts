import { useContext } from 'react';

import { DataViewContext } from '../DataView';
import type { DataViewContextType } from '../types';

export const useDataViewContext = <D = any>() => {
  const context = useContext<DataViewContextType<D>>(DataViewContext);

  if (!context) {
    throw new Error('Component must be used inside of DataView');
  }

  return context;
};
