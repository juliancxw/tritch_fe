import React, { useState, useEffect } from "react";
import { withRouter, useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import decodeToken from "../services/token_decoder";

import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Typography,
  Avatar,
  Grid,
} from "@material-ui/core";

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
  const [user, setUser] = useState(null);
  const [followers, setFollowers] = useState(null);
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
      .get(`http://localhost:8000/api/v1/users/show/${userToRender}`, {
        headers: headers,
      })
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

  // // get people who follows user
  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:8000/api/v1/following/${userToRender}`, {
  //       headers: headers,
  //     })
  //     .then((response) => {
  //       if (!response) {
  //         console.log(`error connecting with the server!`);
  //       }
  //       setFollowers(response.data);
  //     })
  //     .catch((err) => {
  //       toast(err.response.data);
  //     });
  // }, []);

  // console.log(followers);

  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
    >
      <Typography align="center" variant="h4" style={{ padding: "30px" }}>
        {user ? `${user.firstName} ${user.lastName}'s Profile` : `loading...`}
      </Typography>

      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar align="center" className={classes.avatar}>
              <img
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  width: "80px",
                  height: "80px",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  borderRadius: "50%",
                }}
                src="/mr_bean.jpeg"
                alt="mr bean"
              />
            </Avatar>
          }
          title={
            user ? (
              <Typography variant="h5">
                {user.firstName} {user.lastName}
              </Typography>
            ) : (
              <Typography variant="h5" styles={{ padding: "25px" }}>
                Loading...
              </Typography>
            )
          }
        />
        <CardContent>
          <Grid direction="row">
            <Typography style={{ padding: "25px" }} variant="body">
              Followers: 456{" "}
            </Typography>
            <Typography variant="body">Following: 779 </Typography>
          </Grid>
        </CardContent>
        <CardActions>
          {userid ? (
            <Button component={Link} to={`/users/bucketlist/${userid}`}>
              {" "}
              Bucketlist
            </Button>
          ) : (
            <Button component={Link} to={`/users/bucketlist/`}>
              My Bucketlist
            </Button>
          )}

          <Button
            aria-label="bucketlist"
            component={Link}
            to="/users/itineraries"
          >
            My Itineraries
          </Button>
        </CardActions>
      </Card>
      {/* <Divider variant="middle" />
      <Card className={classes.root}>
        {" "}
        
      </Card> */}
    </Grid>
  );
}

export default withRouter(UserDisplayCard);
