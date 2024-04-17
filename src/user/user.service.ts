import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor() {}

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
}
