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
    title: "Employees",
    path: "/employees",
    icon: getIcon("clarity:employee-group-solid"),
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
    title: "Sub Category",
    path: "/sub-category",
    icon: getIcon("bxs:category-alt"),
  },
  {
    title: "Ads",
    path: "/ads",
    icon: getIcon("tabler:ad-2"),
  },
  {
    title: "Filter Users",
    path: "/user-filter",
    icon: getIcon("eva:people-fill"),
  },
  {
    title: "Filter SPs",
    path: "/sp-filter",
    icon: getIcon("mdi:account-service"),
  },
  {
    title: "Filter Categories",
    path: "/categories-filter",
    icon: getIcon("bxs:category"),
  },
];

export default navConfig;
