import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
} from 'class-validator';
import constants from '../utils/constants.utils';

export class PaginationQueryDto {
  @IsNumber()
  @IsOptional()
  limit: number = constants.DEFAULT_PAGE_LIMIT;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  page: number;
}
