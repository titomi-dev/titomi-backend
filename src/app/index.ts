import { Account } from './auth';
import { User, UserResolver } from './user';

export const entities = [
  Account,
  User,
]

export const resolvers = [
  UserResolver,
];