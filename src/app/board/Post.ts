import { PrimaryGeneratedColumn, Entity, Column, ManyToOne } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { User } from "../user";
import { Postable } from "./Postable";

@Entity()
@ObjectType()
export class Post extends Postable {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column()
  @Field()
  title: string

  constructor(author: User, title: string, content: string) {
    super(author, content)
    this.title = title;
  }
}