import React, { useState, useEffect } from "react";
import { withRouter, useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import decodeToken from "../services/token_decoder";

import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, CardActions, Button, Box } from "@material-ui/core";
import Follow from "./follows";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 320,
    maxWidth: 450,
  },
  avatar: {
    height: 80,
    width: 80,
  },
}));

function UserDisplayCard() {
  const classes = useStyles();
  const [user, setUser] = useState();
  const { userid } = useParams();
  const authToken = Cookies.get("auth_token");
  const verifiedUserID = decodeToken(authToken);

  let userToRender = verifiedUserID;

  const headers = {
    auth_token: authToken,
  };

  useEffect(() => {
    if (userid) {
      userToRender = userid;
    }

    console.log(userid);

    axios
      .get(
        `https://tritch-be.herokuapp.com/api/v1/users/show/${userToRender}`,
        {
          headers: headers,
        }
      )
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        if (!err.response.data) {
          toast(`server error...`);
        }
        toast(err.response.data);
      });
  }, [userid]);

  console.log(user);

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Card className={classes.root}>
        <CardContent>
          <Follow />
        </CardContent>
        <CardActions>
          {userid ? (
            <div className="otherUser">
              <Button component={Link} to={`/users/bucketlist/${userid}`}>
                {" "}
                Bucketlist
              </Button>
              <Button
                aria-label="bucketlist"
                component={Link}
                to="/users/itineraries"
              >
                Itineraries
              </Button>
            </div>
          ) : (
            <div className="loggedInUser">
              <Button component={Link} to={`/users/bucketlist/`}>
                My Bucketlist
              </Button>
              <Button
                aria-label="bucketlist"
                component={Link}
                to="/users/itineraries"
              >
                My Itineraries
              </Button>
            </div>
          )}
        </CardActions>
      </Card>
    </Box>
  );
}

export default withRouter(UserDisplayCard);
