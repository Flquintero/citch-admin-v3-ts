import AuthRepository from './AuthRepository';
import { IApi } from '@/types/api-repository';

//type this with an object with all the types of each repository
const repositories: IApi = {
  'auth': AuthRepository,
};

export default {
  get: (name: string) => repositories[name],
};
