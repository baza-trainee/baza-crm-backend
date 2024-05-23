export interface IUserRegister {
  email: string;
  password: string;
}

export interface IFindUserById {
  email?: string;
  password?: string;
  token?: string;
}
