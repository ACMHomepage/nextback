import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from 'entitys/tag';
import { Repository } from 'typeorm';

import { newTagInput } from './dto/newTagInput';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async find(id?: number) {
    if (id !== undefined) {
      return await this.tagRepository.find({
        where: { id },
      });
    } else {
      return await this.tagRepository.find();
    }
  }

  async create(tag: newTagInput) {
    const realTag = await Tag.build(this.tagRepository, tag);
    const createdRealTag = this.tagRepository.create(realTag);
    return this.tagRepository.save(createdRealTag);
  }

  async remove(id: number) {
    return this.tagRepository.delete(id);
  }
}
