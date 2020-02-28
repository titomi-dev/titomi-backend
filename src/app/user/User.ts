import { Field, ObjectType, ID } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Field()
  @Column({ unique: true })
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}