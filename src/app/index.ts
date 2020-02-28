import { Account, RefreshToken } from './auth';
import { User, UserResolver } from './user';
import { Board, Message, Post } from './board';

export const entities = [
  Account,
  RefreshToken,
  User,

  Board,
  Post,
  Message,
]

export const resolvers = [
  UserResolver,
];