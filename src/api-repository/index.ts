import AuthRepository from "./AuthRepository";

const repositories: {[property: string]: any} = {
  'auth': AuthRepository
}

export default {
    get: (name:string) => repositories[name]
};