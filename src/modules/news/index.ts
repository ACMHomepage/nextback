import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { News } from 'entitys/news';
import { Tag } from 'entitys/tag';

import { NewsResolver } from './news.resolver';
import { NewsService } from './news.service';

@Module({
  imports: [TypeOrmModule.forFeature([News]), TypeOrmModule.forFeature([Tag])],
  providers: [NewsResolver, NewsService],
})
export class NewsModule {}
