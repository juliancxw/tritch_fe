// zhenghan - overall skeleton
// kharthik - follow components
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

import { Typography, Grid } from "@material-ui/core";

import decodeToken from "../../services/token_decoder";
import UserDisplayCard from "../user_display";

function UserProfile() {
  const [user, setUser] = useState(null);

  const authToken = Cookies.get("auth_token");
  const verifiedUserID = decodeToken(authToken);

  const headers = {
    auth_token: authToken,
  };

  // get current user details from UserModel from backend
  useEffect(() => {
    async function getUserData() {
      await axios
        .get(
          `http://localhost:8000/api/v1/users/display-users/${verifiedUserID}`,
          { headers: headers }
        )
        .then((response) => {
          setUser(response);
        })
        .catch((err) => {
          if (!err.response.data) {
            toast(`server error...`);
          }
          toast(err.response.data);
        });
    }
    getUserData();
  }, []);

  // get number of people who follows user - waiting on Kharthik to finish backend
  // function getUsersFollowers() {
  //   axios
  //     .get(`http://localhost:8000/api/v1/following/${verifiedUserID}`, {
  //       headers: headers,
  //     })
  //     .then((response) => {})
  //     .catch((err) => {
  //       toast(err.response.data);
  //     });
  //   getUsersFollowers();
  // }

  return (
    <Grid
      container
      alignItems="center"
      direction="column"
      style={{ minHeight: "90vh" }}
    >
      <Typography align="center" variant="h4" style={{ padding: "30px" }}>
        My Profile
      </Typography>{" "}
      <UserDisplayCard user={user} />
    </Grid>
  );
}

export default UserProfile;
