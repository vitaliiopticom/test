import { FC } from 'react';

import { StarRating, Text } from '@/components/elements';
import { useTranslation } from '@/i18n';
import { createFullNameFromUser } from '@/modules/users';
import { formatDateTime } from '@/utils/date';

import { AUDIT_STATUS } from '../../constants';
import {
  AuditDetail,
  AuditQuestionnaireTemplateGroup,
  FormMethods,
} from '../../types';
import { AuditOptiStatus } from '../AuditOptiStatus';

import { QuestionnaireHeaderTabs } from './QuestionnaireHeaderTabs';

type Props = {
  audit: AuditDetail;
  formMethods: FormMethods;
  groups: AuditQuestionnaireTemplateGroup[];
  selectedTab: number;
  setSelectedTab: (value: number) => void;
};

export const QuestionnaireHeader: FC<Props> = ({
  audit,
  formMethods,
  groups,
  selectedTab,
  setSelectedTab,
}) => {
  const { t } = useTranslation();

  return (
    <>
      {(audit.state === AUDIT_STATUS.DONE ||
        audit.state === AUDIT_STATUS.SENT) && (
        <div className="-ml-1 -mt-2 mb-4 flex items-center gap-3">
          <StarRating
            iconSize="sm"
            rating={audit.rating?.stars?.score}
            scaleSize={audit.rating?.stars?.max}
          />
          <Text size="lg" variant="bold">
            {audit.rating?.stars?.score}
          </Text>
        </div>
      )}
      <div className="flex flex-wrap items-center gap-2 md:gap-20">
        <AuditOptiStatus isTooltip={false} status={audit.state} />
        <Text>
          <b className="text-lg">{t('common.created')}</b>
          <span className="mx-4">
            {createFullNameFromUser(
              audit.responsibleUser.firstName,
              audit.responsibleUser.lastName,
            )}
          </span>
          {formatDateTime(new Date(audit.date))}
        </Text>
        <Text>
          <b className="text-lg">{t('common.modified')}</b>
          {audit.lastModifiedByUser?.firstName &&
            audit.lastModifiedByUser?.lastName && (
              <span className="ml-4">
                {createFullNameFromUser(
                  audit.lastModifiedByUser.firstName,
                  audit.lastModifiedByUser.lastName,
                )}
              </span>
            )}
          <span className="ml-4">
            {formatDateTime(new Date(audit.lastModified))}
          </span>
        </Text>
      </div>
      <QuestionnaireHeaderTabs
        formMethods={formMethods}
        groups={groups}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
    </>
  );
};
