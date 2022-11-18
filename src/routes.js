import { useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";

//import dashboard pages
import {
  DashboardApp,
  User,
  AdminLogin,
  AdminRegister,
  Categories,
  ServiceProviders,
} from "./pages/dashboard";

//import other pages
import NotFound from "./pages/Page404";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { path: "app", element: <DashboardApp /> },
        { path: "user", element: <User /> },
        { path: "categories", element: <Categories /> },
        { path: "user/:id", element: <AdminRegister /> },
        { path: "sp", element: <ServiceProviders /> },
      ],
    },
    {
      path: "/admin",
      element: <LogoOnlyLayout />,
      children: [{ path: "login", element: <AdminLogin /> }],
    },
    { path: "*", element: <NotFound /> },
  ]);
}
