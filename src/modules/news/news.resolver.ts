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
import isAdmin from 'utils/isAdmin';

import { NewsService } from './news.service';
import { NewsInput } from './dto/newsInput';
import { PartialNewsInput } from './dto/partialNewsInput';

@Resolver((of) => News)
export class NewsResolver {
  constructor(private readonly newsService: NewsService) {}

  @Query((returns) => [News])
  async newsList(
    @Args('newsId', { type: () => Int, nullable: true }) id?: number
  ) {
    return await this.newsService.getNewsListById(id);
  }

  @Query((returns) => [News])
  async newsListByTag(
    @Args('tag', { type: () => String }) tag: string
  ) {
    return await this.newsService.getNewsListByTag(tag);
  }

  @Mutation((returns) => News)
  async addNews(
    @Args('input') newNewsData: NewsInput,
    @Context('req') req: Request,
  ): Promise<News> {
    if (isAdmin(req))
      throw new Error(
        'You are not the admin and do not have the right to add News.'
      );
    return await this.newsService.addNews(newNewsData);
  }

  @Mutation((returns) => News)
  async updateNews(
    @Args('newsId', { type: () => Int }) newsId: number,
    @Args('input') partialNewsData: PartialNewsInput,
    @Context('req') req: Request,
  ): Promise<News> {
    if (isAdmin(req))
      throw new Error(
        'You are not the admin and do not have the right to update news.'
      );
    return await this.newsService.updateNews(newsId, partialNewsData);
  }

  @Mutation((returns) => News)
  async removeNews(
    @Args('newsId', { type: () => Int }) newsId: number,
    @Context('req') req: Request,
  ) {
    if (isAdmin(req))
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
    if (isAdmin(req))
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
    if (isAdmin(req))
      throw new Error(
        'You are not the admin and do not have the right to remove tag from'
        + ' news.'
      );
    return await this.newsService.removeTagFromNews(tag, newsId);
  }
}