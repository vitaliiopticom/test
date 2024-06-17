import { FC, useEffect } from 'react';

import { Heading } from '@/components/elements';
import { Form, FormPrompt } from '@/components/shared';
import { NAMESPACES, useTranslation } from '@/i18n';

import {
  AuditQuestionnaireTemplate,
  AuditQuestionnaireValues,
  FormMethods,
} from '../../types';

import { Question } from './Question';

type Props = {
  template: AuditQuestionnaireTemplate;
  formMethods: FormMethods;
  onSubmit: (values: AuditQuestionnaireValues) => void;
  isDisabled?: boolean;
  setSelectedTab: (value: number) => void;
  selectedTab: number;
};

const intersectionOptions = {
  root: null,
  rootMargin: '-80% -50% -20% -50%',
  threshold: 0,
};

export const Questionnaire: FC<Props> = ({
  formMethods,
  template,
  isDisabled,
  onSubmit,
  setSelectedTab,
  selectedTab,
}) => {
  const { t } = useTranslation();
  let questionNumber = 0;

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[] = []) => {
      entries.forEach((entry) => {
        const tabId = parseInt(entry.target.id.at(-1) || '');
        if (tabId !== selectedTab && entry.isIntersecting) {
          setSelectedTab(tabId);
        }
      });
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      intersectionOptions,
    );

    const targets = document.querySelectorAll(`[id^="group"]`);
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [selectedTab, setSelectedTab]);

  return (
    <div className="mx-auto max-w-[750px]">
      <Form
        className="flex flex-col gap-8"
        formMethods={formMethods}
        id="audit-questionnaire-form"
        onSubmit={onSubmit}
      >
        {template.groups.map((group, groupIdx) => {
          const headerTranslated = t(group.headerLocalizationKey, {
            defaultValue: group.header,
            ns: NAMESPACES.QuestionnaireTemplate,
          });
          return (
            <div
              key={groupIdx}
              className="flex flex-col gap-6"
              id={`group${groupIdx}`}
            >
              <Heading variant="h3">{headerTranslated}</Heading>
              {group.questions.map((item) => {
                const tooltipTranslated = t(
                  item.popupDescriptionLocalizationKey,
                  {
                    defaultValue: item.popupDescription,
                    ns: NAMESPACES.QuestionnaireTemplate,
                  },
                );
                questionNumber++;

                return (
                  <Question
                    key={item.id}
                    attachmentsCombination={item.attachmentsCombination}
                    isDisabled={isDisabled}
                    name={item.id}
                    questionNumber={questionNumber}
                    text={item.text}
                    textLocalizationKey={item.textLocalizationKey}
                    tooltip={tooltipTranslated}
                    validationRules={item.validationRules}
                    valueType={item.valueType}
                  />
                );
              })}
            </div>
          );
        })}
        <FormPrompt />
      </Form>
    </div>
  );
};
