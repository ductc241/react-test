import { AxiosResponse } from "axios";
import { authorizedRequest } from "./request";
import IUser, { IUserAction } from "../interfaces/user";
import { PATH_USER } from "../routes/routes.path";

const userServices = {
  list: (): Promise<AxiosResponse<IUser[], any>> => {
    const url = `${PATH_USER}`;
    return authorizedRequest.get(url);
  },

  getById: (id: string): Promise<AxiosResponse<IUser, any>> => {
    const url = `${PATH_USER}/${id}`;
    return authorizedRequest.get(url);
  },

  update: (id: string, userUpdate: IUserAction) => {
    const url = `${PATH_USER}/${id}`;
    return authorizedRequest.put(url, userUpdate);
  },
};

export default userServices;
