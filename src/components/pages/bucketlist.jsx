import React, { useEffect, useState, useContext } from "react";
import { withRouter } from "react-router";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import { Grid } from "@material-ui/core";

import decodeToken from "../../services/token_decoder";
import BucketlistDisplay from "../bucketlist_display";

function Bucketlist() {
  // const [went, setWent] = useState(null);

  return (
    <Grid
      container
      alignItems="center"
      direction="column"
      style={{ minHeight: "90vh" }}
    >
      <BucketlistDisplay />
    </Grid>
  );
}

export default withRouter(Bucketlist);
