import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'entitys/user';
import UserInput from 'dto/userInput';

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

  async find(): Promise<User[]> {
    return await this.userRepo.find();
  }

  async create(user: UserInput) {
    const realUser = await User.build(this.userRepo, user);
    const createdRealUser = this.userRepo.create(realUser);
    return this.userRepo.save(createdRealUser);
  }
}
