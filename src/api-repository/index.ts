import AuthRepository from "./auth/AuthRepository";
import UsersRepository from "./users/UsersRepository";
import OrganizationsRepository from "./organizations/OrganizationsRepository";
import FacebookRepository from "./facebook/FacebookRepository";
import { IApi } from "@/types/api-repository/interfaces";

//type this with an object with all the types of each repository
const repositories: IApi = {
  auth: AuthRepository,
  users: UsersRepository,
  organizations: OrganizationsRepository,
  facebook: FacebookRepository,
};

export default {
  get: (name: string) => repositories[name],
};
