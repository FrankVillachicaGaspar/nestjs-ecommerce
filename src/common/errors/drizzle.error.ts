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
    throw new BadRequestException(`the ${entityName} not found`);

  if (error.message?.includes('UNIQUE constraint')) {
    let errorMessage: string;
    try {
      const dividedErrorMessage: string[] = error.message.split(':');

      const dividedField: string[] = dividedErrorMessage[1].split('.');

      const field = dividedField[1];

      errorMessage = `the ${entityName} with the entered ${field} already exist`;
    } catch (error) {
      errorMessage = `the ${entityName} with the already exist`;
    }
    throw new BadRequestException(errorMessage);
  }

  if (error instanceof HttpException) throw error;

  logger.fatal(error);
  throw new InternalServerErrorException(error);
};
