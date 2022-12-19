import { SidebarItemsType } from "../../types/sidebar";

import {
  BookOpen,
  Briefcase,
  Calendar,
  CheckSquare,
  CreditCard,
  Grid,
  Heart,
  Layout,
  List,
  Map,
  ShoppingCart,
  PieChart,
  Sliders,
  Users,
} from "react-feather";

const pagesSection = [
  {
    href: "/home",
    icon: Layout,
    title: "Run Summaries",
  },
  {
    href: "/model",
    icon: Sliders,
    title: "Model",
    children: [
      {
        href: "/model/view",
        title: "View Models",
      },
      {
        href: "/model/create",
        title: "Create Model",
      },
      {
        href: "/model/run",
        title: "Run Model",
      },
    ],
  },
  {
    href: "/logout",
    icon: Users,
    title: "Logout",
  },
] as SidebarItemsType[];



const navItems = [
  {
    title: "Pages",
    pages: pagesSection,
  },

];

export default navItems;
