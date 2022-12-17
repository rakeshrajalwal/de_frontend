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
    href: "/pages/blank",
    icon: Layout,
    title: "Run Summaries",
  },
  {
    href: "/dashboard",
    icon: Sliders,
    title: "Model",
    children: [
      {
        href: "/models",
        title: "View Models",
      },
      {
        href: "/model/create",
        title: "Create Model",
      },
    ],
  },
  
] as SidebarItemsType[];


const navItems = [
  {
    title: "Pages",
    pages: pagesSection,
  },
];

export default navItems;
