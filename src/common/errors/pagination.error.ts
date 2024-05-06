import constantsUtils from '../utils/constants.utils';

export class PaginationError extends Error {
  readonly code: string = constantsUtils.PAGINATION_ERROR;
  constructor(message: string) {
    super(message);
  }
}
