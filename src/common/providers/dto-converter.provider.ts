import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClassConstructor, ClassTransformer } from 'class-transformer';

@Injectable()
export class DtoConverter implements OnModuleInit {
  private classTransformer: ClassTransformer;

  onModuleInit() {
    this.classTransformer = new ClassTransformer();
  }

  plainToDto<D, C>(cls: ClassConstructor<D>, object: C): D {
    return this.classTransformer.plainToInstance(cls, object, {
      excludeExtraneousValues: true,
    });
  }
}
