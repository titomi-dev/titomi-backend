import { Entity, OneToOne } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import argon2 from 'argon2';

import { User } from '../user';

@Entity()
@ObjectType()
export class Account {
  @OneToOne(() => User)
  user: User;

  @Field()
  email: string;

  @Field()
  password: string;

  constructor(user: User, email: string) {
    this.user = user;
    this.email = email;

    this.password = ''; // Must be hashed
  }

  async setPassword(password: string) {
    this.password = await argon2.hash(password);
  }

  async isPasswordCorrect(password: string) {
    return await argon2.verify(this.password, password);
  }
}