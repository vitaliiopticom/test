import { FC, ReactNode } from 'react';
import { Tab } from '@headlessui/react';

import { useTabs } from '@/hooks';

import { TabsContentList, TabsProps, TabsTitlesList } from '../Tabs';

import { Page, PageProps } from './Page';

type Props = { render?: (node: ReactNode) => ReactNode } & Omit<
  TabsProps,
  'isListBorder' | 'selectedTab' | 'setSelectedTab'
> &
  Omit<PageProps, 'children'>;

export const PageWithTabs: FC<Props> = ({
  tabs,
  headerContent,
  isNotClickable,
  listClassName,
  defaultIndex,
  unmount,
  render,
  ...rest
}) => {
  const { selectedTabIndex, setSelectedTabIndex } = useTabs();

  const HeaderContent = (
    <>
      {headerContent}
      <TabsTitlesList
        isNotClickable={isNotClickable}
        listClassName={listClassName}
        tabs={tabs}
      />
    </>
  );

  const node = <TabsContentList tabs={tabs} unmount={unmount} />;

  return (
    <Tab.Group
      defaultIndex={defaultIndex}
      selectedIndex={selectedTabIndex}
      onChange={setSelectedTabIndex}
    >
      <Page headerContent={HeaderContent} {...rest} className="pb-0">
        {render?.(node) || node}
      </Page>
    </Tab.Group>
  );
};
