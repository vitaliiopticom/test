import { FC } from 'react';
import { Tab } from '@headlessui/react';

import {
  TabsContentList,
  TabsContentsListProps,
} from './elements/TabsContentList';
import { TabsTitlesList, TabsTitlesListProps } from './elements/TabsTitlesList';

export type TabsProps = {
  selectedTab?: number;
  defaultIndex?: number;
  setSelectedTab?: (value: number) => void;
  isListBorder?: boolean;
} & TabsContentsListProps &
  TabsTitlesListProps;

export const Tabs: FC<TabsProps> = ({
  isNotClickable,
  tabs,
  selectedTab,
  setSelectedTab,
  unmount = true,
  isListBorder = true,
  listClassName,
  defaultIndex = 0,
}) => {
  return (
    <Tab.Group
      defaultIndex={defaultIndex}
      selectedIndex={selectedTab}
      onChange={setSelectedTab}
    >
      <TabsTitlesList
        isNotClickable={isNotClickable}
        listClassName={listClassName}
        tabs={tabs}
      />
      {isListBorder && (
        <div className="relative -top-0.5 h-[1px] w-full bg-secondary-tint-80" />
      )}
      <TabsContentList tabs={tabs} unmount={unmount} />
    </Tab.Group>
  );
};
