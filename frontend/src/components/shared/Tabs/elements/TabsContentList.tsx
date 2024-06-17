import { FC } from 'react';
import { Tab } from '@headlessui/react';

import { TabElement } from '../types';

export type TabsContentsListProps = {
  tabs: TabElement[];
  unmount?: boolean;
};

export const TabsContentList: FC<TabsContentsListProps> = ({
  tabs,
  unmount,
}) => {
  return (
    <Tab.Panels>
      {tabs.map((element, index) => (
        <Tab.Panel key={index} unmount={unmount}>
          {element.content}
        </Tab.Panel>
      ))}
    </Tab.Panels>
  );
};
