import React from "react";

import AppBar from "./AppBar";
import Introduction from "./Introduction";
import Testimonial from "./Testimonial";
import Demos from "./Demos";
import Integrations from "./Integrations";
import Features from "./Features";
import FAQ from "./FAQ";
import JoinUs from "./JoinUs";
// import SignIn from ""
import {
  Button
} from "@mui/material";

function Presentation() {
  return (
    <React.Fragment>
      <AppBar />
      <Introduction />
      {/* <Link
        ml={2}
        color="inherit"
        to="/dashboard/analytics"
        target="_blank"
      >
        Live Preview
      </Link> */}

    </React.Fragment>
  );
}

export default Presentation;
