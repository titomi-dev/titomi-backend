import { User } from './User';
import { Resolver, Query, Arg, ID } from "type-graphql";

@Resolver(User)
export class UserResolver {
  @Query(() => User)
  async me() {
    return new User('Cactus')
  }

  @Query(() => User)
  async user(
    @Arg("id", () => ID) id: number
  ) {

  }
}