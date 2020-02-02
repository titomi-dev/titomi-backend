import { User } from './User';
import { Resolver, Query, Arg, ID } from "type-graphql";
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Resolver(User)
export class UserResolver {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>
  ) {}

  @Query(() => User)
  async user(
    @Arg("id", () => ID) id: number
  ) {
    const user = await this.userRepo.findOne(id);
    return user;
  }
}