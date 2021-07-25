import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Avatar,
} from "@material-ui/core";

import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MapOutlinedIcon from "@material-ui/icons/MapOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    height: 80,
    width: 80,
  },
}));

function UserDisplayCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
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
        action={
          <IconButton style={{ paddingTop: "10px" }} aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          props.user ? (
            <Typography variant="h5" style={{ padding: "15px" }}>
              {props.user.data.firstName} {props.user.data.lastName}
            </Typography>
          ) : (
            <Typography variant="h5" style={{ padding: "15px" }}>
              Loading...
            </Typography>
          )
        }
      />

      <CardContent>{/* import followers component here */}</CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="My Bucketlist">
          <MapOutlinedIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default withRouter(UserDisplayCard);
