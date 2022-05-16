import {
  Mutation,
  Query,
  Resolver,
  Args,
  Int,
  Context,
} from '@nestjs/graphql';
import { Request } from 'express';

import { News } from 'models/news';
import NewsInput from 'dto/newsInput';
import PartialNewsInput from 'dto/partialNewsInput';
import * as jwt from 'utils/jwt';

import { NewsService } from './news.service';

@Resolver((of) => News)
export class NewsResolver {
  constructor(private readonly newsService: NewsService) {}

  @Query((returns) => [News])
  async newsList() {
    return await this.newsService.getNewsListById();
  }

  @Query((returns) => News)
  async newsById(
    @Args('newsId', { type: () => Int }) id: number
  ) {
    return await this.newsService.getNewsById(id);
  }

  @Query((returns) => [News])
  async newsListByTag(
    @Args('tag', { type: () => String }) tag: string
  ) {
    return await this.newsService.getNewsListByTag(tag);
  }

  @Mutation((returns) => News)
  async addNews(
    @Args('news') news: NewsInput,
    @Context('req') req: Request,
  ): Promise<News> {
    if (!jwt.get(req).isAdmin)
      throw new Error(
        'You are not the admin and do not have the right to add News.'
      );
    return await this.newsService.addNews(news);
  }

  @Mutation((returns) => News)
  async updateNews(
    @Args('newsId', { type: () => Int }) newsId: number,
    @Args('partialNews') partialNews: PartialNewsInput,
    @Context('req') req: Request,
  ): Promise<News> {
    if (!jwt.get(req).isAdmin)
      throw new Error(
        'You are not the admin and do not have the right to update news.'
      );
    return await this.newsService.updateNews(newsId, partialNews);
  }

  @Mutation((returns) => News)
  async removeNews(
    @Args('newsId', { type: () => Int }) newsId: number,
    @Context('req') req: Request,
  ) {
    if (!jwt.get(req).isAdmin)
      throw new Error(
        'You are not the admin and do not have the right to remove news.'
      );
    return await this.newsService.removeNewsById(newsId);
  }

  @Mutation((returns) => News)
  async addTagToNews(
    @Args('tag') tag: string,
    @Args('newsId', { type: () => Int }) newsId: number,
    @Context('req') req: Request,
  ) {
    if (!jwt.get(req).isAdmin)
      throw new Error(
        'You are not the admin and do not have the right to add tag to news.'
      );
    return await this.newsService.addTagToNews(tag, newsId);
  }

  @Mutation((returns) => News)
  async removeTagFromNews(
    @Args('tag') tag: string,
    @Args('newsId', { type: () => Int }) newsId: number,
    @Context('req') req: Request,
  ) {
    if (!jwt.get(req).isAdmin)
      throw new Error(
        'You are not the admin and do not have the right to remove tag from'
        + ' news.'
      );
    return await this.newsService.removeTagFromNews(tag, newsId);
  }
}