import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { PATH_SIGNIN } from "../routes/routes.path";

interface IProps {
  children: JSX.Element;
}

const PrivateRouter = (props: IProps) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={PATH_SIGNIN} />;
  }

  return props.children;
};

export default PrivateRouter;
