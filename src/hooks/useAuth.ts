import { jwtDecode } from "jwt-decode";
import { IUserDecodeData } from "../interfaces/user";

const useAuth = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return {
      isAuthenticated: false,
      user: null,
    };
  }

  try {
    const decode_data: IUserDecodeData = jwtDecode(token);
    return {
      isAuthenticated: true,
      user: decode_data.user,
    };
  } catch (error) {
    return {
      isAuthenticated: false,
      user: null,
    };
  }
};

export default useAuth;
