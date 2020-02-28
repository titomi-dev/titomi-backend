import { Controller, Post, Body, UnauthorizedError } from 'routing-controllers';
import { AccountRepository, RefreshToken } from '.';
import { Repository } from 'typeorm';
import { createRefreshToken } from './RefreshToken';
import { InjectRepository } from 'typeorm-typedi-extensions';

interface LoginPayload {
  email: string,
  password: string
}

@Controller()
export class AuthController {

  constructor(
    @InjectRepository(AccountRepository)
    private accRepo: AccountRepository,
    @InjectRepository(RefreshToken)
    private refRepo: Repository<RefreshToken>,
  ) {}

  @Post()
  async login(@Body() body: LoginPayload) {
    const acc = await this.accRepo.findByEmailOrName(body.email);
    if (acc === undefined) {
      return null;
    }
    if (await acc.isPasswordCorrect(body.password)) {
      const ref = await createRefreshToken(acc);
      await this.refRepo.insert(ref);
      return {
        accessToken: acc.jwt,
        refreshToken: ref.token,
      };
    }
    throw new UnauthorizedError('Incorrect password');
  }

  @Post()
  async refresh(@Body() { refreshToken }: { refreshToken: string }) {
    const ref = await this.refRepo.findOne({ token: refreshToken });
    if (ref === undefined) {
      return null;
    }

    await ref.update();
    await this.refRepo.save(ref)
    return {
      accessToken: ref.account.jwt,
      refreshToken: ref.token,
    }; 
  }
}