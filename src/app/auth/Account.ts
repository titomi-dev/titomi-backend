import argon2 from 'argon2';
import Jwt from 'jsonwebtoken';
import { PrimaryColumn, Entity, OneToOne, Column, JoinColumn } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

import { User } from '../user';


@Entity()
@ObjectType()
export class Account {
  @PrimaryColumn({ name: 'id' })
  id!: number;

  @OneToOne(() => User, { primary: true })
  @JoinColumn({ name: 'id' })
  user: User;

  @Field()
  @Column()
  email: string;

  @Column()
  password: string;

  constructor(user: User, email: string) {
    this.user = user;
    this.email = email?.trim()?.toLowerCase(); // elvis operator is necessary for TypeORM

    this.password = ''; // Must be hashed
  }

  async setPassword(password: string) {
    this.password = await argon2.hash(password);
  }

  async isPasswordCorrect(password: string) {
    return await argon2.verify(this.password, password);
  }

  get jwt() {
    const payload = {
      id: this.id,
      email: this.email,
    }
    return Jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: '15m'
    })
  }
}