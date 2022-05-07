import { Mutation, Query, Resolver, Args, Int } from '@nestjs/graphql';

import { Tag } from 'models/tag';
import { TagService } from './tag.service';
import { newTagInput } from './dto/newTagInput';

@Resolver((of) => Tag)
export class TagResolver {
  constructor(private readonly tagService: TagService) {}

  @Query((returns) => [Tag])
  async tagList(@Args('id', { type: () => Int, nullable: true }) id?: number) {
    return await this.tagService.find(id);
  }

  @Mutation((returns) => Tag)
  async createTag(@Args('newTagData') newTagData: newTagInput): Promise<Tag> {
    return await this.tagService.create(newTagData);
  }
}
