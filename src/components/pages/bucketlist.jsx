import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import { Grid } from "@material-ui/core";

import decodeToken from "../../services/token_decoder";
import BucketlistDisplay from "../bucketlist_display";

function Bucketlist() {
  const [bucketlist, setBucketlist] = useState([]);
  const authToken = Cookies.get("auth_token");

  const verifiedUserID = decodeToken(authToken);

  const headers = {
    auth_token: authToken,
  };

  useEffect(() => {
    // call api to get bucketlist of userID
    function getBucketlist() {
      axios
        .get(
          `http://localhost:8000/api/v1/bucketlist/${verifiedUserID}/view`,

          {
            headers: headers,
          }
        )
        .then((response) => {
          if (!response) {
            console.log(`shit!`);
          }
          setBucketlist(response.data);
        })
        .catch((err) => {
          console.log(err);
          toast(err);
        });
    }
    getBucketlist();
  }, []);

  console.log(bucketlist);

  return (
    <Grid
      container
      alignItems="center"
      direction="column"
      style={{ minHeight: "90vh" }}
    >
      <BucketlistDisplay bucketlist={bucketlist} />
    </Grid>
  );
}

export default withRouter(Bucketlist);
