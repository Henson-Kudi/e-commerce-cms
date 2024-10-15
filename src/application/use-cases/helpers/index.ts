import { PaginationOptions } from '../../../domain/dtos';

export function setupPagination(params?: PaginationOptions): {
  limit: number;
  page: number;
  skip: number;
} {
  const page = params && params.page && +params.page > 0 ? +params.page : 1;
  const limit =
    params && params.limit && +params.limit > 0 ? +params.limit : 10;
  const skip = (page - 1) * limit;

  return { page, limit, skip };
}
