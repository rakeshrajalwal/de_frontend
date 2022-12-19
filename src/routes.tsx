import React from "react";

import async from "./components/Async";

// Layouts
import PresentationLayout from "./layouts/Presentation";
import DELayout from "./layouts/DE"

// Guards
import AuthGuard from "./components/guards/AuthGuard";

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

//const SaaS = async(() => import("./pages/dashboards/SaaS"));

// Form components
const Pickers = async(() => import("./pages/forms/Pickers"));
const Editors = async(() => import("./pages/forms/Editors"));
const Formik = async(() => import("./pages/forms/Formik"));

// Icon components
const FeatherIcons = async(() => import("./pages/icons/FeatherIcons"));
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
