import { PrimaryGeneratedColumn, Entity, Column, ManyToOne } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { User } from "../user";
import { Postable } from "./Postable";

@Entity()
@ObjectType()
export class Post extends Postable {
  @PrimaryGeneratedColumn()
  @Field()
  id!: number;

  @Column()
  @Field()
  title: string

  constructor(author: User, title: string, content: string) {
    super(author, content)
    this.title = title;
  }
}