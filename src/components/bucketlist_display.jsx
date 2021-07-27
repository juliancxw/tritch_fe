import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import decodeToken from "../services/token_decoder";

import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardMedia,
  CardContent,
  CssBaseline,
  Grid,
  Container,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },

  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
    expandOpen: {
      transform: "rotate(180deg)",
    },
  },
}));

function BucketlistDisplay(props) {
  const classes = useStyles();
  const [bucketlist, setBucketlist] = useState([]);

  const authToken = Cookies.get("auth_token");

  const verifiedUserID = decodeToken(authToken);

  const headers = {
    auth_token: authToken,
  };

  useEffect(() => {
    // call api to get bucketlist of userID

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
        console.log('setting state')
      })
      .catch((err) => {
        console.log(err);
        toast(err);
      });
  }, []);

 

  const handleOnClick = async (e, index, beenThere, userId, itinerariesId) => {
    const bucketlistItemData = JSON.parse(e.currentTarget.value);
    
    let newBucketlist = Array(...bucketlist);
    let newBeenThere 


    if (beenThere=== false) {
      newBucketlist[index].been_there = true;
      newBeenThere = true
      console.log(`hi`);
    } else if (beenThere === true) {
      newBucketlist[index].been_there = false;
      newBeenThere = false
      console.log(`hi111111111`);
    }
  
    await setBucketlist(newBucketlist)

    console.log(bucketlist);

    axios
      .patch(
        `http://localhost:8000/api/v1/bucketlist/update`,
        {
          been_there: newBeenThere,
          userID: userId,
          itinerariesID: itinerariesId,
        },
        {
          headers: headers,
        }
      )
      .then((response) => {
        console.log(response);
        return;
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              My Bucketlist
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Scratch that travel itch by looking at the itineraries of the
              places that you want to go to!
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {bucketlist.map((item, index) => (
              <Grid item key={item} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5">
                      {item.itineraries.name}
                    </Typography>
                    <Typography variant="subtitle1">
                      Created By:{" "}
                      <Link to="users/profile/:userID">
                        {item.itineraries.creator}
                      </Link>
                    </Typography>
                    <Typography variant="subtitle1">
                      Trip Duration: {item.itineraries.trip_duration} days
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      component={Link}
                      to={`/itinerary/view/${item.itineraries._id}`}
                      size="small"
                      color="primary"
                    >
                      View
                    </Button>
                    <Button
                      size="small"
                      color="primary"
                      value={item.been_there}
                      onClick={(e) => {
                        handleOnClick(e, index, item.been_there, item.user._id, item.itineraries._id);
                      }}
                    >
                      {item.been_there ? `Been there!` : `Not been there..`}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}

export default withRouter(BucketlistDisplay);
