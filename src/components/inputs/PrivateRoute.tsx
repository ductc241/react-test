import { Navigate } from "react-router-dom";
import { PATH_SIGNIN } from "../../routes/routes.path";
import { jwtDecode } from "jwt-decode";

interface IProps {
  children: JSX.Element;
}

const PrivateRouter = (props: IProps) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to={PATH_SIGNIN} />;
  }

  return props.children;
};

export default PrivateRouter;
