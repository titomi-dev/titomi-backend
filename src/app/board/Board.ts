import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ObjectType, Field } from "type-graphql";

@Entity()
@ObjectType()
export class Board {
  @PrimaryGeneratedColumn()
  @Field()
  id!: number;

  @Column()
  @Field()
  name: string

  constructor(name: string) {
    this.name = name;
  }
}