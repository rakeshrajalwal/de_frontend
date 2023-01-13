import React from "react";
import styled from "@emotion/styled";

import { Alert as MuiAlert } from "@mui/material";
import { spacing } from "@mui/system";

//import Default from "../dashboards/Default";
import CreateModel from "../decisionengine/CreateModel";
import ViewModels from "../decisionengine/ViewModels";
import RunModel from "../decisionengine/RunModel";
import RunSummaries from "../decisionengine/RunSummaries";


const Alert = styled(MuiAlert)(spacing);

function ProtectedPage() {
  return (
    <React.Fragment>
      <Alert mb={4} severity="info">
        This page is only visible by authenticated users.
      </Alert>

      <CreateModel />
      <ViewModels />
      <RunModel />
      <RunSummaries />
    </React.Fragment>
  );
}

export default ProtectedPage;
