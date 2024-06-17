import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import type { FieldValuesType } from '../../Form';
import type {
  DataItemSelector,
  DataViewType,
  DisableItemSelection,
  LayoutMode,
  PaginationType,
} from '../types';

type State<D> = {
  views: Record<string, DataViewType<D>>;
};

type Actions<D> = {
  addView: (id: string, view: DataViewType<D>) => void;
  setFilters: (id: string, filters: FieldValuesType) => void;
  resetFilters: (id: string) => void;
  setPage: (id: string, page: number) => void;
  setPageSize: (id: string, pageSize: number) => void;
  setPagination: (id: string, pagination: PaginationType) => void;
  setLayoutMode: (id: string, layoutMode: LayoutMode) => void;
  setFiltersCollapsed: (id: string, isCollapsed: boolean) => void;
  toggleSelectedItems: (
    id: string,
    values: D[],
    isItemDisabled?: DisableItemSelection<D>,
  ) => void;
  toggleSelectedItem: (
    id: string,
    value: D,
    selector: DataItemSelector<D>,
  ) => void;
  resetSelectedItems: (id: string) => void;
};

type DataViewStore<D = any> = State<D> & Actions<D>;

export const useDataViewStore = create(
  immer<DataViewStore>((set) => ({
    views: {},
    addView: (id: string, view: DataViewType<any>) => {
      set((state) => ({
        views: {
          ...state.views,
          [id]: view,
        },
      }));
    },
    resetFilters: (id) =>
      set((state) => {
        state.views[id].filters = {};
      }),
    setFilters: (id, filters) =>
      set((state) => {
        state.views[id].filters = filters;
        state.views[id].pagination.page = 1;
        state.views[id].selectedItems = [];
      }),
    setPage: (id, page) =>
      set((state) => {
        state.views[id].pagination.page = page;
        state.views[id].selectedItems = [];
      }),
    setPageSize: (id, pageSize) =>
      set((state) => {
        state.views[id].pagination.pageSize = pageSize;
        state.views[id].pagination.page = 1;
        state.views[id].selectedItems = [];
      }),
    setPagination: (id, pagination) =>
      set((state) => {
        state.views[id].pagination = pagination;
        state.views[id].selectedItems = [];
      }),
    setLayoutMode: (id, layoutMode) =>
      set((state) => {
        state.views[id].layoutMode = layoutMode;
        state.views[id].selectedItems = [];
      }),
    setFiltersCollapsed: (id, isCollapsed) =>
      set((state) => {
        state.views[id].filtersCollapsed = isCollapsed;
      }),
    toggleSelectedItems: (id, values, isItemDisabled) =>
      set((state) => {
        if (isItemDisabled && values.length) {
          state.views[id].selectedItems = values?.filter(
            (value) => !isItemDisabled(value),
          );

          return;
        }

        state.views[id].selectedItems = values;
      }),
    toggleSelectedItem: (id, value, selector) =>
      set((state) => {
        const selectedValues = state.views[id].selectedItems;

        if (selectedValues.some((item) => selector(item) === selector(value))) {
          state.views[id].selectedItems = selectedValues.filter(
            (item) => selector(item) !== selector(value),
          );

          return;
        }

        state.views[id].selectedItems.push(value);
      }),
    resetSelectedItems: (id) =>
      set((state) => {
        state.views[id].selectedItems = [];
      }),
  })),
);

// selectors
export const selectView =
  <D>(id: string) =>
  (store: DataViewStore<D>) =>
    store.views[id];

export const selectIsViewDefined =
  <D>(id: string) =>
  (store: DataViewStore<D>) =>
    !!store.views[id];

export const selectPagination =
  <D>(id: string) =>
  (store: DataViewStore<D>) =>
    store.views[id]?.pagination;

export const selectFilters =
  <D>(id: string) =>
  (store: DataViewStore<D>) =>
    store.views[id].filters;

export const selectLayoutMode =
  <D>(id: string) =>
  (store: DataViewStore<D>) =>
    store.views[id].layoutMode;

export const selectFiltersCollapsed =
  <D>(id: string) =>
  (store: DataViewStore<D>) =>
    store.views[id].filtersCollapsed;

export const getSelectedItems =
  <D>(id: string) =>
  (store: DataViewStore<D>) =>
    store.views[id].selectedItems;

export const getIsAllPageItemsSelected =
  <D>(id: string, data: D[]) =>
  (store: DataViewStore<D>) => {
    const view = store.views[id];
    const selectedCount = view.selectedItems.length;

    if (data.length > view.pagination.pageSize) {
      return selectedCount === view.pagination.pageSize;
    }

    return selectedCount === data.length;
  };

export const getIsSomeItemsSelected =
  <D>(id: string) =>
  (store: DataViewStore<D>) =>
    store.views[id].selectedItems.length !== 0;

export const getIsItemSelected =
  <D>(id: string, value: D, selector: DataItemSelector<D>) =>
  (store: DataViewStore<D>) =>
    store.views[id].selectedItems.some(
      (item) => selector(item) === selector(value),
    );

export const getIsSelectionActionsCollapsed =
  <D>(id: string) =>
  (store: DataViewStore<D>) =>
    store.views[id].selectedItems.length === 0;

// hooks
export const useDataView = <D>(id: string) =>
  useDataViewStore(selectView<D>(id));

export const useGetIsViewDefined = (id: string) =>
  useDataViewStore(selectIsViewDefined(id));

export const usePagination = (id: string) =>
  useDataViewStore(selectPagination(id));

export const useFilters = (id: string) => useDataViewStore(selectFilters(id));

export const useLayoutMode = (id: string) =>
  useDataViewStore(selectLayoutMode(id));

export const useFiltersCollapsed = (id: string) =>
  useDataViewStore(selectFiltersCollapsed(id));

export const useSelectedItems = <D>(id: string) =>
  useDataViewStore(getSelectedItems<D>(id));

export const useSelectionActionsCollapsed = (id: string) =>
  useDataViewStore(getIsSelectionActionsCollapsed(id));

export const useGetIsItemSelected = <D>(
  id: string,
  value: D,
  selector: DataItemSelector<D>,
) => useDataViewStore(getIsItemSelected(id, value, selector));

export const useGetIsAllItemsSelected = <D>(id: string, data: D[]) =>
  useDataViewStore(getIsAllPageItemsSelected(id, data));

export const useGetIsSomeItemsSelected = (id: string) =>
  useDataViewStore(getIsSomeItemsSelected(id));
