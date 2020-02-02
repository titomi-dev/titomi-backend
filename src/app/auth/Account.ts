import { Entity, OneToOne, Column, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import argon2 from 'argon2';

import { User } from '../user';

@Entity()
@ObjectType()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Field()
  @Column()
  email: string;

  @Column()
  password: string;

  constructor(user: User, email: string) {
    this.user = user;
    this.email = email.trim().toLowerCase();

    this.password = ''; // Must be hashed
  }

  async setPassword(password: string) {
    this.password = await argon2.hash(password);
  }

  async isPasswordCorrect(password: string) {
    return await argon2.verify(this.password, password);
  }
}