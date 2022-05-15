import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { News } from 'entitys/news';
import { Tag } from 'entitys/tag';
import NewsInput from 'dto/newsInput';
import PartialNewsInput from 'dto/partialNewsInput';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News) private newsRepo: Repository<News>,
    @InjectRepository(Tag) private tagRepo: Repository<Tag>,
  ) {}

  private async getTag(tag: string): Promise<Tag> {
    return this.tagRepo.findOne({ where: { name: tag } });
  }

  async getNewsById(id: number): Promise<News> {
    return this.newsRepo.findOne(id);
  }

  async getNewsListById(): Promise<News[]> {
    const result = this.newsRepo.find()
    return result;
  }

  async getNewsListByTag(tag: string): Promise<News[]> {
    const result = await this.newsRepo.createQueryBuilder('news')
      .leftJoinAndSelect('news.tagList', 'tag')
      .where('tag.name = :tagname', { tagname: tag })
      .getMany();
    return result;
  }

  async addNews(news: NewsInput): Promise<News> {
    const realNews = await News.build(this.newsRepo, news);
    const createdRealNews = this.newsRepo.create(realNews);
    return this.newsRepo.save(createdRealNews);
  }

  async updateNews(newsId: number, news: PartialNewsInput): Promise<News> {
    await this.newsRepo.createQueryBuilder('news')
      .update(News)
      .set(news)
      .where('id = :id', { id: newsId })
      .execute();
    return this.getNewsById(newsId);
  }

  async removeNewsById(id: number): Promise<News> {
    const result = await this.getNewsById(id);
    await this.newsRepo.delete(id);
    console.log(result);
    return result;
  }

  async addTagToNews(tag: string, newsId: number): Promise<News> {
    const news = await this.getNewsById(newsId);
    let realTag: Tag;
    try {
      realTag = await this.getTag(tag);
    } catch(error) {
      realTag = await Tag.build(this.tagRepo, { name: tag });
      realTag = this.tagRepo.create(realTag);
      realTag = await this.tagRepo.save(realTag);
    }
    if (!news.tagList.includes(realTag)) {
      news.tagList.push(realTag);
      return this.newsRepo.save(news);
    }
    return news;
  }

  async removeTagFromNews(tag: string, newsId: number): Promise<News> {
    const news = await this.getNewsById(newsId);
    let realTag: Tag;
    try {
      realTag = await this.getTag(tag);
    } catch(error) {
      // Even do not have the tag.
      return news;
    }

    // Check to make sure that the tag is in the news;
    let needRemoveFlag = false;
    let index: number = -1;
    news.tagList.forEach((value, iterIndex) => {
      if (needRemoveFlag) return;
      if (realTag.id === value.id) {
        needRemoveFlag = true;
        index = iterIndex
      }
    })
    if (!needRemoveFlag) return news;

    if (index > -1) {
      news.tagList.splice(index, 1);
      return await this.newsRepo.save(news);
    }
    return news;
  }
}