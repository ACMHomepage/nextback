import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { News } from 'entitys/news';
import { Repository } from 'typeorm';

import { newNewsInput } from './dto/newNewsInput';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private newsRepository: Repository<News>,
  ) {}

  async find(id?: number) {
    if (id !== undefined) {
      return await this.newsRepository.find({
        where: { id },
      });
    } else {
      return await this.newsRepository.find();
    }
  }

  async create(news: newNewsInput) {
    const realNews = await News.build(this.newsRepository, news);
    const createdRealNews = this.newsRepository.create(realNews);
    return this.newsRepository.save(createdRealNews);
  }

  async remove(id: number) {
    return this.newsRepository.delete(id);
  }
}
