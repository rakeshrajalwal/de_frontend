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
    href: "/dashboard",
    icon: Sliders,
    title: "Model",
    children: [
      {
        href: "/dashboard/default",
        title: "View Models",
      },
      {
        href: "/dashboard/analytics",
        title: "Create Model",
      },
    ],
  },
  {
    href: "/pages/blank",
    icon: Layout,
    title: "Run Summaries",
  },

  {
    href: "/auth",
    icon: Users,
    title: "Auth",
    children: [
      {
        href: "/auth/sign-in",
        title: "Sign In",
      },
      {
        href: "/auth/sign-up",
        title: "Sign Up",
      },
      {
        href: "/auth/reset-password",
        title: "Reset Password",
      },
      {
        href: "/auth/404",
        title: "404 Page",
      },
      {
        href: "/auth/500",
        title: "500 Page",
      },
    ],
  },
] as SidebarItemsType[];

// const elementsSection = [
//   {
//     href: "/components",
//     icon: Grid,
//     title: "Components",
//     children: [
//       {
//         href: "/components/alerts",
//         title: "Alerts",
//       },
//       {
//         href: "/components/accordion",
//         title: "Accordion",
//       },
//       {
//         href: "/components/avatars",
//         title: "Avatars",
//       },
//       {
//         href: "/components/badges",
//         title: "Badges",
//       },
//       {
//         href: "/components/buttons",
//         title: "Buttons",
//       },
//       {
//         href: "/components/cards",
//         title: "Cards",
//       },
//       {
//         href: "/components/chips",
//         title: "Chips",
//       },
//       {
//         href: "/components/dialogs",
//         title: "Dialogs",
//       },
//       {
//         href: "/components/lists",
//         title: "Lists",
//       },
//       {
//         href: "/components/menus",
//         title: "Menus",
//       },
//       {
//         href: "/components/pagination",
//         title: "Pagination",
//       },
//       {
//         href: "/components/progress",
//         title: "Progress",
//       },
//       {
//         href: "/components/snackbars",
//         title: "Snackbars",
//       },
//       {
//         href: "/components/tooltips",
//         title: "Tooltips",
//       },
//     ],
//   },
//   {
//     href: "/charts",
//     icon: PieChart,
//     title: "Charts",
//     children: [
//       {
//         href: "/charts/chartjs",
//         title: "Chart.js",
//       },
//       {
//         href: "/charts/apexcharts",
//         title: "ApexCharts",
//       },
//     ],
//   },
//   {
//     href: "/forms",
//     icon: CheckSquare,
//     title: "Forms",
//     children: [
//       {
//         href: "/forms/pickers",
//         title: "Pickers",
//       },
//       {
//         href: "/forms/selection-controls",
//         title: "Selection Controls",
//       },
//       {
//         href: "/forms/selects",
//         title: "Selects",
//       },
//       {
//         href: "/forms/text-fields",
//         title: "Text Fields",
//       },
//       {
//         href: "/forms/editors",
//         title: "Editors",
//       },
//       {
//         href: "/forms/formik",
//         title: "Formik",
//       },
//     ],
//   },
//   {
//     href: "/tables",
//     icon: List,
//     title: "Tables",
//     children: [
//       {
//         href: "/tables/simple-table",
//         title: "Simple Table",
//       },
//       {
//         href: "/tables/advanced-table",
//         title: "Advanced Table",
//       },
//       {
//         href: "/tables/data-grid",
//         title: "Data Grid",
//       },
//     ],
//   },
//   {
//     href: "/icons",
//     icon: Heart,
//     title: "Icons",
//     children: [
//       {
//         href: "/icons/material-icons",
//         title: "Material Icons",
//       },
//       {
//         href: "/icons/feather-icons",
//         title: "Feather Icons",
//       },
//     ],
//   },
//   {
//     href: "/maps",
//     icon: Map,
//     title: "Maps",
//     children: [
//       {
//         href: "/maps/google-maps",
//         title: "Google Maps",
//       },
//       {
//         href: "/maps/vector-maps",
//         title: "Vector Maps",
//       },
//     ],
//   },
// ] as SidebarItemsType[];

// const docsSection = [
//   {
//     href: "/documentation/welcome",
//     icon: BookOpen,
//     title: "Documentation",
//   },
//   {
//     href: "/changelog",
//     icon: List,
//     title: "Changelog",
//     badge: "v4.2.0",
//   },
// ] as SidebarItemsType[];

const navItems = [
  {
    title: "Pages",
    pages: pagesSection,
  },
  // {
  //   title: "Elements",
  //   pages: elementsSection,
  // },
  // {
  //   title: "Mira Pro",
  //   pages: docsSection,
  // },
];

export default navItems;
