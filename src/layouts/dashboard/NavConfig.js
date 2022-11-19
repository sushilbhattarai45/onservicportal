// component
import Iconify from "../../components/Iconify";

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: "Home",
    path: "/app",
    icon: getIcon("eva:pie-chart-2-fill"),
  },
  {
    title: "user",
    path: "/user",
    icon: getIcon("eva:people-fill"),
  },
  {
    title: "Service Providers",
    path: "/sp",
    icon: getIcon("mdi:account-service"),
  },
  {
    title: "Categories",
    path: "/categories",
    icon: getIcon("bxs:category"),
  },
  {
    title: "Storage",
    path: "/storage",
    icon: getIcon("ic:baseline-sd-storage"),
  },
];

export default navConfig;
