export type NilType = undefined | null;
export type BooleanStringType = 'Y' | 'N';
export type NoopObject<TValue = never> = Record<string, TValue>;
export type PaginationType = {
  order: 'asc' | 'desc';
  page: number;
  pageSize: number;
  sortKey: string;
  searchTerm?: string;
  filterKey?: string | null;
  filterValue?: unknown;
};
