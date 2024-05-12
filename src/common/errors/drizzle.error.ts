import {
  BadRequestException,
  HttpException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import constantsUtils from '../utils/constants.utils';

export const handleDrizzleErrors = (
  error: any,
  entityName: string,
  logger: Logger,
) => {
  if (error.code === constantsUtils.PAGINATION_ERROR)
    throw new NotFoundException(error.message);

  if (error.code?.includes('SQLITE_CONSTRAINT_FOREIGNKEY'))
    throw new BadRequestException(`The ${entityName} not found`);

  if (error.message?.includes('UNIQUE constraint'))
    throw new BadRequestException(`The ${entityName} already exist`);

  if (error instanceof HttpException) throw error;

  logger.fatal(error);
  throw new InternalServerErrorException(error);
};
