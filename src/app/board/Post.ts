import { PrimaryGeneratedColumn, Entity, Column, ManyToOne } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { User } from "../user";
import { Postable } from "./Postable";
import { Board } from "./Board";

@Entity()
@ObjectType()
export class Post extends Postable {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column()
  @Field()
  title: string;

  @ManyToOne(() => Board)
  board: Board;

  constructor(author: User, board: Board, title: string, content: string) {
    super(author, content)
    this.title = title;
    this.board = board;
  }
}