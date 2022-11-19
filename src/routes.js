import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";

//import dashboard pages
import {
  DashboardApp,
  User,
  AdminLogin,
  EditUser,
  Categories,
  ServiceProviders,
  EditSP,
  Storage,
} from "./pages/dashboard";

//import other pages
import NotFound from "./pages/Page404";

// user logged in or not
import { useContext } from "react";
import { ContextProvider } from "./Context";

export default function Router() {
  const { login } = useContext(ContextProvider);
  const [isLogged] = login;

  return useRoutes([
    {
      path: "/",
      element: isLogged ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { path: "app", element: <DashboardApp /> },
        { path: "user", element: <User /> },
        { path: "categories", element: <Categories /> },
        { path: "user/:id", element: <EditUser /> },
        { path: "sp", element: <ServiceProviders /> },
        { path: "sp/:id", element: <EditSP /> },
        { path: "storage", element: <Storage /> },
      ],
    },
    {
      path: "/",
      element: isLogged ? <Navigate to="/app" /> : <LogoOnlyLayout />,
      children: [{ path: "login", element: <AdminLogin /> }],
    },
    { path: "*", element: <NotFound /> },
  ]);
}
