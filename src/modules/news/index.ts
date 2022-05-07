import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { News } from 'entitys/news';

import { NewsResolver } from './news.resolver';
import { NewsService } from './news.service';

@Module({
  imports: [TypeOrmModule.forFeature([News])],
  providers: [NewsResolver, NewsService],
})
export class NewsModule {}
