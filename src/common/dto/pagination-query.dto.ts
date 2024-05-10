import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  Min,
} from 'class-validator';
import constants from '../utils/constants.utils';

export class PaginationQueryDto {
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Transform(({ value }) => Number(value))
  limit: number = constants.DEFAULT_PAGE_LIMIT;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Transform(({ value }) => Number(value))
  page: number;
}
