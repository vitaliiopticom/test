import { FC } from 'react';

import { Tabs } from '@/components/shared';
import { NAMESPACES, useTranslation } from '@/i18n';
import { scrollTo } from '@/utils/scrollTo';

import { AuditQuestionnaireTemplateGroup, FormMethods } from '../../types';

import { QuestionnaireHeaderTabChip } from './QuestionnaireHeaderTabChip';

type Props = {
  formMethods: FormMethods;
  groups: AuditQuestionnaireTemplateGroup[];
  selectedTab: number;
  setSelectedTab: (value: number) => void;
};

export const QuestionnaireHeaderTabs: FC<Props> = ({
  formMethods,
  groups,
  selectedTab,
  setSelectedTab,
}) => {
  const { t } = useTranslation();
  const groupsNamesTranslated = groups.map((group) =>
    t(group.headerLocalizationKey, {
      defaultValue: group.header,
      ns: NAMESPACES.QuestionnaireTemplate,
    }),
  );

  const tabs = groupsNamesTranslated.map((name: string, index: number) => {
    const title = (
      <span>
        {name}{' '}
        <QuestionnaireHeaderTabChip
          formMethods={formMethods}
          questions={groups[index]?.questions}
        />
      </span>
    );

    return { title, content: null };
  });

  const scrollToGroup = (index: number) => {
    const groupTitle = document.getElementById(`group${index}`);
    const pageHeaderHeight =
      document.querySelector<HTMLElement>('header')?.offsetHeight ?? 0;
    const viewHeaderHeight =
      document.querySelector<HTMLElement>('#pageHeader')?.offsetHeight ?? 0;

    const offset = pageHeaderHeight + viewHeaderHeight + 24;

    scrollTo(groupTitle, offset);
    setSelectedTab(index);
  };

  return (
    <Tabs
      isListBorder={false}
      listClassName="relative block -bottom-[37px] [&_span]:flex [&_div]:ml-2.5 [&_button]:mr-12 [&_button]:mb-3"
      selectedTab={selectedTab}
      setSelectedTab={scrollToGroup}
      tabs={tabs}
    />
  );
};
