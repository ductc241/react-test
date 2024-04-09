export default interface IUser {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface IUserAction extends Omit<IUser, "id"> {}
