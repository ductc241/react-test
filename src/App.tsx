import PrivateRouter from "./components/inputs/PrivateRoute";
import IRoute from "./interfaces/route";
import MainLayout from "./layouts/MainLayout";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { appRoutes } from "./routes";
import { PATH_SIGNIN } from "./routes/routes.path";
import LoginForm from "./modules/Auth/LoginForm";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <PrivateRouter>
              <MainLayout />
            </PrivateRouter>
          }
        >
          <Route index element={<Navigate to='/users' />} />
          {appRoutes.map((route: IRoute) => (
            <Route
              path={route.path}
              element={route.component}
              key={route.path}
            />
          ))}
        </Route>
        <Route path={PATH_SIGNIN} element={<LoginForm />} />

        <Route path='*' element={<h1>Page not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
