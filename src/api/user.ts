import { AxiosResponse } from "axios";
import authorizedRequest from "./request";
import IUser from "../interfaces/user";

const userServices = {
  list: (): Promise<AxiosResponse<IUser[], any>> => {
    const url = "/users";
    return authorizedRequest.get(url);
  },
};

export default userServices;
