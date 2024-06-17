import React from 'react';

import { ToggleButton, ToggleButtonOption } from '@/components/elements';

import { LAYOUT_MODE } from '../constants';
import { useDataViewContext } from '../hooks/useDataViewContext';
import { useDataViewStore, useLayoutMode } from '../hooks/useDataViewStore';
import { LayoutMode } from '../types';

const options: ToggleButtonOption<LayoutMode>[] = [
  { value: LAYOUT_MODE.list, icon: 'list' },
  { value: LAYOUT_MODE.grid, icon: 'grid' },
];

export const LayoutToggle: React.FC = () => {
  const { id } = useDataViewContext();
  const { setLayoutMode } = useDataViewStore.getState();
  const layoutMode = useLayoutMode(id);

  return (
    <ToggleButton
      options={options}
      value={layoutMode}
      onChange={(mode) => setLayoutMode(id, mode)}
    />
  );
};
