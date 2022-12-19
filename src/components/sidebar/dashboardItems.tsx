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
        href: "/view",
        title: "View Models",
      },
      {
        href: "/create",
        title: "Create Model",
      },
      {
        href: "/run",
        title: "Run Model",
      },
    ],
  },
  {
    href: "/logout",
    icon: Layout,
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
