import { Dispatch, SetStateAction } from 'react';

import type { FieldValuesType } from '../Form';

import { LAYOUT_MODE } from './constants';

export type PaginationType = {
  page: number;
  pageSize: number;
};

export type DataViewType<D> = {
  layoutMode: LayoutMode;
  filters: FieldValuesType;
  filtersCollapsed: boolean;
  pagination: PaginationType;
  selectedItems: D[];
};

export type DisableItemSelection<D> = (item: D) => boolean;

export type DataViewContextType<D = any> = {
  id: string;
  data: D[];
  isLoading: boolean;
  isFetching: boolean;
  isSubmitting: boolean;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
  handleItemSelectionDisabled?: DisableItemSelection<D>;
  recordsCount: number;
  filterDefaultValues?: FieldValuesType;
};

export type DataViewChangeHandler<Filters extends FieldValuesType> = (params: {
  pagination: PaginationType;
  filters: Filters;
}) => void;

export type DataViewPageChangeHandler = (pagination: PaginationType) => void;

export type DataViewFiltersChangeHandler<Filters extends FieldValuesType> = (
  filters: Filters,
) => void;

export type DataViewSelectionHandler<D> = (selectedItems: D[]) => void;

export type LayoutMode = keyof typeof LAYOUT_MODE;

export type DataItemSelector<D> = (item: D) => string | number;
