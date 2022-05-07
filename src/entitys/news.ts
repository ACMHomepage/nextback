import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Repository,
  ManyToMany,
} from 'typeorm';

import { Tag } from './tag';

interface NewNewsData {
  title: string;
  content: string;
  imageUrl: string;
}

@Entity()
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  imageUrl: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  modifiedDate: Date;

  @ManyToMany((type) => Tag, (tag) => tag.newsList)
  tagList: Tag[];

  private constructor() {}

  public static async build(_repo: Repository<News>, newNewsData: NewNewsData) {
    const result = new News();
    result.title = newNewsData.title;
    result.content = newNewsData.content;
    result.imageUrl = newNewsData.imageUrl;

    return result;
  }
}
