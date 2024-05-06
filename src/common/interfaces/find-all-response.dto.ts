import { Pagination } from './pagination.interface';

export interface FindAllResponse<T> {
  readonly data: T;
  readonly pagination: Pagination;
}
