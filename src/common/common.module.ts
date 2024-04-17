import { Module } from '@nestjs/common';
import { DtoConverter } from './providers/dto-converter.provider';

@Module({
  providers: [DtoConverter],
  exports: [DtoConverter],
})
export class CommonModule {}
