export default interface IUser {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface IUserAction extends Omit<IUser, "id"> {}

export interface IUserLogin {
  username: string;
  password: string;
}

export interface IUserDecodeData {
  user: IUser;
  iat: number;
}

export interface IUserUpdateError {
  errors: {
    location: string;
    msg: string;
    path: string;
  }[];
}

export interface ILoginError {
  error: string;
}

export interface ILoginValidateError {
  errors: {
    location: string;
    msg: string;
    path: string;
  }[];
}
