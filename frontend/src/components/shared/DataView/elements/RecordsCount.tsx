import React from 'react';

import { Heading } from '@/components/elements';
import { useTranslation } from '@/i18n';
import { cx } from '@/utils/classNames';

import { useDataViewContext } from '../hooks/useDataViewContext';

type Props = {
  rowsCountFormat?: (count: number) => string;
  className?: string;
};

export const RecordsCount: React.FC<Props> = ({
  rowsCountFormat,
  className,
}) => {
  const { t } = useTranslation();
  const { recordsCount } = useDataViewContext();

  const recordsCountTitle = rowsCountFormat
    ? rowsCountFormat?.(recordsCount)
    : t('components.table.recordsCount', { value: recordsCount });

  return (
    <Heading
      className={cx(!recordsCount && 'invisible', className)}
      variant="h3"
    >
      {recordsCountTitle}
    </Heading>
  );
};
