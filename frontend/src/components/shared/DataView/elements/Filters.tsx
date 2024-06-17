import { PropsWithChildren } from 'react';

import { Button } from '@/components/elements';
import { useTranslation } from '@/i18n';
import { cx } from '@/utils/classNames';

import {
  FieldValuesType,
  Form,
  FormDefaultValues,
  SubmitHandler,
  useForm,
} from '../../Form';
import { useDataViewContext } from '../hooks/useDataViewContext';
import {
  selectFilters,
  useDataViewStore,
  useFiltersCollapsed,
} from '../hooks/useDataViewStore';

type Props = PropsWithChildren<{
  className?: string;
  hasToggle?: boolean;
}>;

export const Filters = <Filters extends FieldValuesType>({
  children,
  className,
  hasToggle,
}: Props) => {
  const { t } = useTranslation();
  const {
    id,
    isLoading,
    isFetching,
    filterDefaultValues = {},
  } = useDataViewContext();
  const persistedValues = selectFilters(id)(useDataViewStore.getState());
  const { setFilters } = useDataViewStore.getState();
  const isCollapsed = useFiltersCollapsed(id);

  const formMethods = useForm<Filters>({
    defaultValues: {
      ...filterDefaultValues,
      ...persistedValues,
    } as FormDefaultValues<Filters>,
  });

  const handleSubmit: SubmitHandler<Filters> = (filters) => {
    setFilters(id, filters);
  };

  const handleResetFilters = () => {
    formMethods.reset(filterDefaultValues as Filters);
    handleSubmit(filterDefaultValues as Filters);
  };

  return (
    <Form
      className={cx('mb-5', hasToggle && isCollapsed && 'hidden', className)}
      formMethods={formMethods}
      onSubmit={handleSubmit}
    >
      <div className="my-4 flex flex-col gap-4">{children}</div>
      <div className="flex flex-row justify-end gap-3.5 pt-4">
        <Button
          disabled={isFetching || isLoading}
          startIcon="refresh"
          variant="ghost"
          onClick={handleResetFilters}
        >
          {t('common.resetFilters')}
        </Button>
        <Button
          disabled={isLoading}
          isLoading={isFetching && !isLoading}
          type="submit"
          variant="primary"
        >
          {t('common.apply')}
        </Button>
      </div>
    </Form>
  );
};
