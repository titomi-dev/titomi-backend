import { ManyToOne, Column } from "typeorm";

import { User } from "../user";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export abstract class Postable {
  @Column()
  @Field()
  content: string;

  @ManyToOne(() => User)
  @Field()
  author: User

  @Column()
  @Field()
  postedAt: Date;

  constructor(author: User, content: string) {
    this.content = content;
    this.author = author;
    this.postedAt = new Date();
  }
}
