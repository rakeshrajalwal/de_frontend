import React from "react";

import async from "./components/Async";

// Layouts
import AuthLayout from "./layouts/Auth";
import DashboardLayout from "./layouts/Dashboard";
import DocLayout from "./layouts/Doc";
import PresentationLayout from "./layouts/Presentation";
import DELayout from "./layouts/DE"

// Guards
import AuthGuard from "./components/guards/AuthGuard";

// Auth components
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ResetPassword from "./pages/auth/ResetPassword";
import Page404 from "./pages/auth/Page404";
import Page500 from "./pages/auth/Page500";



// Form components
import SelectionCtrls from "./pages/forms/SelectionControls";
import Selects from "./pages/forms/Selects";
import TextFields from "./pages/forms/TextFields";

// Icon components
import MaterialIcons from "./pages/icons/MaterialIcons";

// Page components
import RunSummaries from "./pages/decisionengine/RunSummaries";
import ViewModels from "./pages/decisionengine/ViewModels";
import CreateModel from "./pages/decisionengine/CreateModel";
import RunModel from "./pages/decisionengine/RunModel";

// Table components
import SimpleTable from "./pages/tables/SimpleTable";
import AdvancedTable from "./pages/tables/AdvancedTable";


// Landing
import Landing from "./pages/presentation/Landing";

// Protected routes
import ProtectedPage from "./pages/protected/ProtectedPage";

// Dashboard components
const Default = async(() => import("./pages/dashboards/Default"));
const Analytics = async(() => import("./pages/dashboards/Analytics"));
//const SaaS = async(() => import("./pages/dashboards/SaaS"));

// Form components
const Pickers = async(() => import("./pages/forms/Pickers"));
const Editors = async(() => import("./pages/forms/Editors"));
const Formik = async(() => import("./pages/forms/Formik"));

// Icon components
const FeatherIcons = async(() => import("./pages/icons/FeatherIcons"));
const Profile = async(() => import("./pages/pages/Profile"));
const Tasks = async(() => import("./pages/pages/Tasks"));
const Calendar = async(() => import("./pages/pages/Calendar"));

// Table components
const DataGrid = async(() => import("./pages/tables/DataGrid"));

// Chart components
const Chartjs = async(() => import("./pages/charts/Chartjs"));
const ApexCharts = async(() => import("./pages/charts/ApexCharts"));

// Maps components
const GoogleMaps = async(() => import("./pages/maps/GoogleMaps"));
const VectorMaps = async(() => import("./pages/maps/VectorMaps"));

const routes = [
  {
    path: "/",
    element: <PresentationLayout />,
    children: [
      {
        path: "",
        element: <Landing />,
      },
    ],
  },
  
  {
    path: "home",
    element: <DELayout />,
    children: [
      {
        path: "",
        element: <RunSummaries />,
      },
    ],
  },

  {
    path: "model",
    element: <DELayout />,
    children: [
      {
        path: "/model/create",
        element: <CreateModel />,
      },
      {
        path: "/model/view",
        element: <ViewModels />,
      },  
      {
        path: "/model/run",
        element: <RunModel />,
      },
   
    ],
  },
  
];

export default routes;
