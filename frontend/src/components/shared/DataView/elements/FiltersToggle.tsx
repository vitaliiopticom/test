import { FC, useMemo } from 'react';

import { Button } from '@/components/elements';
import { useTranslation } from '@/i18n';
import { cx } from '@/utils/classNames';
import { getNumOfDiff } from '@/utils/object';

import { useDataViewContext } from '../hooks/useDataViewContext';
import {
  useDataViewStore,
  useFilters,
  useFiltersCollapsed,
} from '../hooks/useDataViewStore';

export const FiltersToggle: FC = () => {
  const { t } = useTranslation();
  const { id, isLoading, filterDefaultValues } = useDataViewContext();
  const isCollapsed = useFiltersCollapsed(id);
  const filters = useFilters(id);
  const { setFiltersCollapsed } = useDataViewStore.getState();

  const diff = useMemo(
    () => getNumOfDiff(filters, filterDefaultValues || {}),
    [filters, filterDefaultValues],
  );

  return (
    <Button
      className={cx(!isCollapsed && 'bg-primary-tint-90')}
      disabled={isLoading}
      startIcon="filter"
      variant="secondary"
      onClick={() => setFiltersCollapsed(id, !isCollapsed)}
    >
      {diff > 0 ? `${t('common.filter')} (${diff})` : t('common.filter')}
    </Button>
  );
};
