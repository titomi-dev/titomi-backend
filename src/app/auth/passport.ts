import { Application, json } from 'express';
import { Container } from 'typedi';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, StrategyOptions as JwtOptions, ExtractJwt } from 'passport-jwt';

import { AccountRepository } from './AccountRepository';

declare global {
  namespace Express {
    interface User {
      id: number;
      email: string;
      jwt: string;
    }
  }
}
const opts: JwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}

export function setupPassport(app: Application) {
  const accRepo = Container.get(AccountRepository);

  // JWT Handler
  passport.use(new JwtStrategy(opts, async (jwt, done) => {
    try {
      const account = await accRepo.findOne(jwt.id);
      done(null, account)
    } catch (error) {
      done(error)
    }
  }));

  async function localStrategy(username: string, password: string) {
    const account = await accRepo.findByEmailOrName(username);
    if (account === undefined) {
      throw new Error('User not found');
    }
    if (await account.isPasswordCorrect(password)) {
      return account;
    }
    throw new Error('Password is incorrect');
  }

  passport.use(new LocalStrategy((username, password, done) => {
    localStrategy(username, password)
    .then(account => done(null, account))
    .catch(done);
  }));

  // The endpoint for login
  app.post('/auth/login', passport.authenticate('local', {
    session: false,
  }), (req, res) => {
    res.json({
      accessToken: req.user!.jwt
    });
  })

  // TODO
  app.post('/auth/refresh', async (req, res) => {
    const { refreshToken } = req.body;

    const user = await accRepo.findOne(1)

    res.json({
      accessToken: '',
      refreshToken: '',
    })
  })
}