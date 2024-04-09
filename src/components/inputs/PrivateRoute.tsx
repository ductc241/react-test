import { Navigate } from "react-router-dom";
import { PATH_SIGNIN } from "../../routes/routes.path";

interface IProps {
  children: JSX.Element;
}

const PrivateRouter = (props: IProps) => {
  const user = localStorage.getItem("token");

  // if (!user) {
  //   return <Navigate to={PATH_SIGNIN} />;
  // }

  return props.children;
};

export default PrivateRouter;
