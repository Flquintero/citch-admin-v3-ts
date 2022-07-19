import AuthRepository from './auth/AuthRepository';
import UsersRepository from './users/UsersRepository';
import { IApi } from '@/types/api-repository';

//type this with an object with all the types of each repository
const repositories: IApi = {
  'auth': AuthRepository,
  'users': UsersRepository,
};

export default {
  get: (name: string) => repositories[name],
};
