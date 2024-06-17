import { Dispatch, SetStateAction, useState } from 'react';

export const useTabs = (
  initialTab = 0,
): {
  selectedTabIndex: number;
  setSelectedTabIndex: Dispatch<SetStateAction<number>>;
} => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(initialTab);

  return { selectedTabIndex, setSelectedTabIndex };
};
