import { ManyToOne, Column } from "typeorm";

import { User } from "../user";
import { Field } from "type-graphql";

export abstract class Postable {
  @Column()
  @Field()
  content: string;

  @ManyToOne(() => User)
  @Field()
  author: User

  constructor(author: User, content: string) {
    this.content = content;
    this.author = author;
  }
}
