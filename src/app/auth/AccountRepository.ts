import { Repository, EntityRepository } from 'typeorm';

import { Account } from './Account';

@EntityRepository(Account)
export class AccountRepository extends Repository<Account> {
  async findByEmailOrName(emailOrName: string) {
    if (emailOrName.includes('@')) {
      return await this.findOne({ email: emailOrName })
    } else {
      return await this.findOne({ email: emailOrName })
    }
  }
}