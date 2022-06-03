import { Column, Entity, PrimaryGeneratedColumn, Repository } from 'typeorm';

import * as bcrypt from 'utils/bcrypt';

interface NewUserData {
  email: string;
  password: string;
  nickname: string;
}

interface UserData extends NewUserData {
  isAdmin: boolean;
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  nickname: string;

  @Column()
  isAdmin: boolean;

  private constructor() {}

  public static async build(repo: Repository<User>, newUserData: NewUserData) {
    const userCnt = await repo.count();

    const user = {
      ...newUserData,
      isAdmin: userCnt === 0,
    };

    const result = new User();
    result.email = user.email;
    result.password = await bcrypt.hash(user.password);
    result.nickname = user.nickname;
    result.isAdmin = user.isAdmin;

    return result;
  }

  public async check(password: string): Promise<boolean> {
    return await bcrypt.check(this.password, password);
  }
}
