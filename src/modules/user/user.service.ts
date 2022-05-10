import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'entitys/user';
import { newUserInput } from './dto/newUserInput';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async fingById(id: number): Promise<User> {
    return await this.userRepo.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepo.findOne({ where: { email } });
  }

  async find(id?: number): Promise<User[]> {
    if (id !== undefined) {
      return [await this.fingById(id)];
    } else {
      return await this.userRepo.find();
    }
  }

  async create(user: newUserInput) {
    const realUser = await User.build(this.userRepo, user);
    const createdRealUser = this.userRepo.create(realUser);
    return this.userRepo.save(createdRealUser);
  }
}
