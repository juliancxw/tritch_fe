// zhenghan - overall skeleton
// kharthik - follow components
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

import { Typography, Container } from "@material-ui/core";

import decodeToken from "../../services/token_decoder";
import UserDisplayCard from "../user_display";

function UserProfile() {
  const [user, setUser] = useState(null);

  const authToken = Cookies.get("auth_token");
  const verifiedUserID = decodeToken(authToken);

  const headers = {
    auth_token: authToken,
  };

  useEffect(() => {
    function getUserData() {
      axios
        .get(
          `http://localhost:8000/api/v1/users/display-users/${verifiedUserID}`,
          { headers: headers }
        )
        .then((resp) => {
          setUser(resp);
        })
        .catch((err) => {
          console.log(err);
          toast(err.response.data);
        });
    }
    getUserData();
  }, []);

  // get the response from the API call
  console.log(user);
  // need to pass the response and use the response to fill the details

  return (
    <Container style={{ minHeight: "90vh" }} maxWidth="sm">
      <Typography align="center" variant="h4" style={{ padding: "30px" }}>
        My Profile
      </Typography>{" "}
      <UserDisplayCard user={user} />
    </Container>
  );
}

export default UserProfile;
