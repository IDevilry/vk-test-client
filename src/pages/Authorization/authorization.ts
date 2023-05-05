export interface IUserLogin {
  password: string;
  user_email: string;
}

export interface IUserRegister extends IUserLogin {
  password: string;
  user_email: string;
  user_first_name: string;
  user_last_name: string;
}