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
  SubCategory,
  Ads,
  AddUser,
  AddSP,
  AddCategory,
  EditCategory,
  AddSubCategory,
  EditSubCategory,
} from "./pages/dashboard";

//import other pages
import NotFound from "./pages/Page404";

// user logged in or not
import { useContext, useEffect } from "react";
import { ContextProvider } from "./Context";

export default function Router() {
  const { login } = useContext(ContextProvider);
  const [isLogged, setUser] = login;
  const user = localStorage.getItem("user");

  useEffect(() => {
    if (user) {
      setUser(JSON.parse(user));
    }
  }, [user]);

  return useRoutes([
    {
      path: "/",
      element: isLogged ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { path: "app", element: <DashboardApp /> },
        { path: "user", element: <User /> },
        { path: "categories", element: <Categories /> },
        { path: "categories/new", element: <AddCategory /> },
        { path: "categories/edit/:id", element: <EditCategory /> },
        { path: "user/new", element: <AddUser /> },
        { path: "user/edit/:id", element: <EditUser /> },
        { path: "sp", element: <ServiceProviders /> },
        { path: "sp/new", element: <AddSP /> },
        { path: "sp/edit/:id", element: <EditSP /> },
        { path: "sub-category", element: <SubCategory /> },
        { path: "sub-category/new", element: <AddSubCategory /> },
        { path: "sub-category/edit/:id", element: <EditSubCategory /> },
        { path: "ads", element: <Ads /> },
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
