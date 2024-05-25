import { PaginationError } from '../errors/pagination.error';
import { Pagination } from '../interfaces/pagination.interface';

export const calculatePaginationData = (
  totalItems: number,
  limit: number,
  page: number,
): Pagination => {
  const pages = Math.ceil(totalItems / limit);

  if (page > pages && pages != 0)
    throw new PaginationError(`Page ${page} not found`);

  const next = page < pages ? page + 1 : null;

  const previous = page > pages ? page - 1 : null;

  return {
    totalPages: Math.max(pages, 1),
    limit,
    page,
    totalItems,
    next,
    previous,
  };
};

export const calculateOffset = (limit: number, page: number) => {
  return (page - 1) * limit;
};
