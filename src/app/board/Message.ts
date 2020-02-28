import { Entity, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

import { Postable } from "./Postable";
import { User } from "../user";

@Entity()
@ObjectType()
export class Message extends Postable {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  constructor(author: User, content: string) {
    super(author, content)
  }
}