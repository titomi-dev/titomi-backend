import { Application } from 'express';
import { Container } from 'typedi';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, StrategyOptions as JwtOptions, ExtractJwt } from 'passport-jwt';

import { AccountRepository } from './AccountRepository';

const opts: JwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}

export function setupPassport(app: Application) {
  const accRepo = Container.get(AccountRepository);

  passport.use(new JwtStrategy(opts, async (jwt, done) => {
    
  }));
  passport.use(new LocalStrategy((username, password, done) => {

  }))
}