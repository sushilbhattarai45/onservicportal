import { useRoutes } from "react-router-dom";
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
        { path: "user/:id", element: <EditUser /> },
        { path: "sp", element: <ServiceProviders /> },
        { path: "sp/:id", element: <EditSP /> },
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
