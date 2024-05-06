export interface Pagination {
  page: number;
  limit: number;
  next?: number;
  previous?: number;
  totalPages: number;
  totalItems: number;
}
