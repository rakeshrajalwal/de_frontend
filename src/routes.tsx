import React from "react";

import async from "./components/Async";

// Layouts
import PresentationLayout from "./layouts/Presentation";
import DELayout from "./layouts/DE"

// Guards
import AuthGuard from "./components/guards/AuthGuard";
import AuthLayout from "./layouts/Auth";

//login
import SignIn from "./components/auth/SignIn";

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
import ViewOrEditModel from "./pages/decisionengine/ViewOrEditModel";
import RunModel from "./pages/decisionengine/RunModel";
import ModelEvaluation from "./pages/decisionengine/ModelEvaluation";
import Logout from "./pages/decisionengine/Logout";

// Table components
import SimpleTable from "./pages/tables/SimpleTable";
import AdvancedTable from "./pages/tables/AdvancedTable";

// Landing
import Landing from "./pages/presentation/Landing";

// Protected routes
import ProtectedPage from "./pages/protected/ProtectedPage";
import Page404 from "./pages/auth/Page404";
import { Navigate, RouteObject, useNavigate } from "react-router-dom";

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

const routes: RouteObject[] = [
  {
    path: "/",
    element: <PresentationLayout />,
    children: [
      {
        path: "",
        // element: <Navigate to="/home" />,
        element: <Landing />,
      },
    ],
  },

  {
    path: "home",
    element: <AuthGuard>
      <DELayout />
    </AuthGuard>,
    children: [
      {
        path: "",
        element: <RunSummaries />,
      },
    ],
  },

  {
    path: "models",
    element: <AuthGuard>
      <DELayout />
    </AuthGuard>,
    children: [
      {
        path: "/models/new",
        element: <CreateModel />,
      },
      {
        path: "/models/:id",
        element: <ViewOrEditModel />,
      },
      {
        path: "/models",
        element: <ViewModels />,
      },
      {
        path: "/models/run",
        element: <RunModel />,
      },

    ],
  },

  {
    path: "modelruns",
    element: <AuthGuard>
      <DELayout />
    </AuthGuard>,
    children: [
      {
        path: "/modelruns/:id",
        element: <ModelEvaluation />,
      },
    ],
  },

  {
    path: "/logout",
    element: <Logout />
  },

  //for every unknown webpage requests we show no page found 
  {
    path: "*",
    element: <DELayout />,
    children: [
      {
        path: "*",
        element: <Page404 />,
      },
    ],
  },

];

export default routes;
