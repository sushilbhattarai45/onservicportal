// component
import Iconify from "../../components/Iconify";

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: "Home",
    path: "/dashboard/app",
    icon: getIcon("eva:pie-chart-2-fill"),
  },
  {
    title: "user",
    path: "/dashboard/user",
    icon: getIcon("eva:people-fill"),
  },
  {
    title: "Service Providers",
    path: "/dashboard/sp",
    icon: getIcon("mdi:account-service"),
  },
  {
    title: "Categories",
    path: "/dashboard/categories",
    icon: getIcon("bxs:category"),
  },
  {
    title: "login",
    path: "/admin/login",
    icon: getIcon("eva:lock-fill"),
  },
];

export default navConfig;
