export type Paging = {
  pageSize: number;
  pageIndex: number;
};

export type Pageable<T> = {
  items: T[];
  count: number;
};
