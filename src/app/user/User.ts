import { Field, ObjectType } from "type-graphql";
import { Entity } from "typeorm";

@Entity()
@ObjectType()
export class User {
  @Field()
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}