import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'entitys/user';
import { newUserInput } from './dto/newUserInput';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async find(id?: number) {
    if (id !== undefined) {
      return await this.userRepository.find({
        where: { id },
      });
    } else {
      return await this.userRepository.find();
    }
  }

  async create(user: newUserInput) {
    const realUser = await User.build(this.userRepository, user);
    const createdRealUser = this.userRepository.create(realUser);
    return this.userRepository.save(createdRealUser);
  }
}
