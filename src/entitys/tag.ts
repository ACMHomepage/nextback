import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Repository,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { News } from './news';

interface NewTagData {
  name: string;
}

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany((type) => News, (news) => news.tagList)
  @JoinTable()
  newsList: News[];

  private constructor() {}

  public static async build(_repo: Repository<Tag>, newTagData: NewTagData) {
    const result = new Tag();
    result.name = newTagData.name;

    return result;
  }
}
