import { Mutation, Query, Resolver, Args, Int } from '@nestjs/graphql';

import { News } from '../../models/news';
import { NewsService } from './news.service';
import { newNewsInput } from './dto/newNewsInput';

@Resolver((of) => News)
export class NewsResolver {
  constructor(private readonly newsService: NewsService) {}

  @Query((returns) => [News])
  async newsList(@Args('id', { type: () => Int, nullable: true }) id?: number) {
    return await this.newsService.find(id);
  }

  @Mutation((returns) => News)
  async createNews(
    @Args('newNewsData') newNewsData: newNewsInput,
  ): Promise<News> {
    return await this.newsService.create(newNewsData);
  }
}
