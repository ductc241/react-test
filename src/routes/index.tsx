import UserModule from "../modules/Users";
import * as routerPaths from "./routes.path";
import IRoute from "../interfaces/route";
import UserForm from "../modules/Users/components/UserForm";

export const appRoutes: IRoute[] = [
  {
    key: 1,
    path: routerPaths.PATH_USER,
    component: <UserModule />,
  },
  {
    key: 2,
    path: routerPaths.PATH_USER_ADD,
    component: <UserForm mode='create' />,
  },
  {
    key: 3,
    path: routerPaths.PATH_USER_UPDATE,
    component: <UserForm mode='update' />,
  },
];
