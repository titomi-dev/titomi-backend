import { Entity } from "typeorm";
import { ObjectType } from "type-graphql";

import { Postable } from "./Postable";
import { User } from "../user";

@Entity()
@ObjectType()
export class Message extends Postable {
  constructor(author: User, content: string) {
    super(author, content)
  }
}