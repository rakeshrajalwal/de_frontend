import { SidebarItemsType } from "../../types/sidebar";

import {
  Layout,
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
    href: "/models",
    icon: Sliders,
    title: "Model",
    children: [
      {
        href: "/models",
        title: "View Models",
      },
      {
        href: "/models/new",
        title: "Create Model",
      },
      {
        href: "/models/run",
        title: "Run Model",
      }
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
