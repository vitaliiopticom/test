import React from 'react';

import { Button, Select, Spinner, Text } from '@/components/elements';
import { useTranslation } from '@/i18n';
import { cx } from '@/utils/classNames';

import { PAGE_SIZES_OPTIONS } from '../constants';
import { useDataViewContext } from '../hooks/useDataViewContext';
import { useDataViewStore, usePagination } from '../hooks/useDataViewStore';

import { PaginationPageInput } from './PaginationPageInput';

type Props = {
  className?: string;
};

export const Pagination: React.FC<Props> = ({ className }) => {
  const { t } = useTranslation();
  const { id, isLoading, isFetching, recordsCount } = useDataViewContext();
  const { setPage, setPageSize } = useDataViewStore.getState();
  const { page, pageSize } = usePagination(id);

  const shouldDisplayPagination = recordsCount >= 1;
  if (!shouldDisplayPagination) return null;

  const pageCount = Math.ceil(recordsCount / pageSize) || 1;
  const canPrevious = page > 1;
  const canNext = page !== pageCount;
  const isSinglePage = pageCount === 1;

  return (
    <div
      className={cx(
        'flex flex-col items-center justify-center gap-4 py-5 md:flex-row md:justify-between',
        className,
      )}
    >
      <Select
        className="w-36"
        disabled={isLoading || isFetching}
        formatDisplayValue={(value) =>
          t('components.table.perPage', {
            value: value || pageSize,
          })
        }
        isClearable={false}
        options={PAGE_SIZES_OPTIONS}
        size="sm"
        value={String(pageSize)}
        onChange={(value) => setPageSize(id, Number(value) || pageSize)}
      />
      <div className="flex items-center gap-3">
        {isFetching && <Spinner size="sm" />}
        <Button
          disabled={!canPrevious || isLoading || isFetching}
          size="sm"
          startIcon="arrowLeft"
          variant="secondary"
          onClick={() => setPage(id, page - 1)}
        >
          {t('common.previous')}
        </Button>
        <PaginationPageInput
          currentPage={page}
          isDisabled={isLoading || isFetching || isSinglePage}
          pageCount={pageCount}
          onInputSubmit={(page) => setPage(id, page)}
        />
        <Text className="flex justify-center text-secondary-tint-40">
          {`${t('common.of')} ${pageCount ?? '-'}`}
        </Text>
        <Button
          disabled={!canNext || isLoading || isFetching}
          endIcon="arrowRight"
          size="sm"
          variant="secondary"
          onClick={() => setPage(id, page + 1)}
        >
          {t('common.next')}
        </Button>
      </div>
    </div>
  );
};
