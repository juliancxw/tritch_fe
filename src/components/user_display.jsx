import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Avatar,
  Divider,
  Grid,
} from "@material-ui/core";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ListAltOutlinedIcon from "@material-ui/icons/ListAltOutlined";

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

function UserDisplayCard(props) {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
    >
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
            props.user ? (
              <Typography variant="h5">
                {props.user.data.firstName} {props.user.data.lastName}
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
      </Card>
      <Divider variant="middle" />
      <Card className={classes.root}>
        {" "}
        <CardActions>
          <IconButton
            aria-label="My Bucketlist"
            component={Link}
            to="/users/bucketlist"
          >
            <FavoriteBorderIcon />
          </IconButton>
          <IconButton
            aria-label="bucketlist"
            component={Link}
            to="/users/itineraries"
          >
            <ListAltOutlinedIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default withRouter(UserDisplayCard);
