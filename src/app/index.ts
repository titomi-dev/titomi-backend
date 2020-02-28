import { Account, RefreshToken } from './auth';
import { User, UserResolver } from './user';

export const entities = [
  Account,
  RefreshToken,
  User,
]

export const resolvers = [
  UserResolver,
];