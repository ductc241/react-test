import { AxiosResponse } from "axios";
import { unAuthorizedRequest } from "./request";
import { IUserLogin } from "../interfaces/user";

interface ILoginResponse {
  token: string;
}

const authServices = {
  signin: (data: IUserLogin): Promise<AxiosResponse<ILoginResponse, any>> => {
    const url = "/login";
    return unAuthorizedRequest.post(url, data);
  },
};

export default authServices;
