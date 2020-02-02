import { Repository } from 'typeorm';

import { Account } from './Account';

export class AccountRepository extends Repository<Account> {
  async findByEmailOrName(emailOrName: string) {
    if (emailOrName.includes('@')) {
      return await this.findOne({ email: emailOrName })
    } else {
      return await this.findOne({ email: emailOrName })
    }
  }
}