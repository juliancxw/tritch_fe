import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
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
import decodeToken from "../services/token_decoder";

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

function DiscoverItinerariesDisplay(props) {
  const classes = useStyles();
  const [allItineraries, setAllItineraries] = useState([]);
  const [userBucketlist, setUserBucketlist] = useState([]);
  const [addBucketlist, setAddBucketlist] = useState([]);

  let isItemInBucketlist;
  const authToken = Cookies.get("auth_token");

  const verifiedUserID = decodeToken(authToken);

  const headers = {
    auth_token: authToken,
  };

  // call the backend to figure out current items in the user's bucketlist
  useEffect(() => {
    axios
      .get(
        `https://tritch-be.herokuapp.com/api/v1/bucketlist/${verifiedUserID}/view`,
        {
          headers: headers,
        }
      )
      .then((response) => {
        if (!response) {
          console.log("response not found");
        }
        setUserBucketlist(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // console.log(userBucketlist);

  useEffect(() => {
    // call backend to get all itineraries
    axios
      .get(`https://tritch-be.herokuapp.com/api/v1/itineraries`, {
        headers: headers,
      })
      .then((response) => {
        if (!response) {
          console.log(`shit!`);
          return;
        }
        setAllItineraries(response.data.itineraries);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(allItineraries);

  // onClick event, post to backend to add item to bucketlist
  function addToBucketlist(e, itineraryId) {
    axios
      .post(
        "https://tritch-be.herokuapp.com/api/v1/bucketlist/add",
        { userID: verifiedUserID, itinerariesID: itineraryId },
        { headers: headers }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // handle clicking of been_there
  //   const handleOnClick = async (e, index, beenThere, userId, itinerariesId) => {
  //     const bucketlistItemData = JSON.parse(e.currentTarget.value);

  //     // restructuring the Array
  //     let newBucketlist = Array(...bucketlist);
  //     let newBeenThere;

  //     // handle toggler nature of been_there
  //     if (beenThere === false) {
  //       newBucketlist[index].been_there = true;
  //       newBeenThere = true;
  //     } else if (beenThere === true) {
  //       newBucketlist[index].been_there = false;
  //       newBeenThere = false;
  //     }

  //     // set state with the updated cards
  //     // (only been_there of targeted card will be updated, rest remains as is)
  //     await setBucketlist(newBucketlist);

  //     // setBucketlist(newBucketlist);

  //     axios
  //       .patch(
  //         `https://tritch-be.herokuapp.com/api/v1/bucketlist/update`,
  //         {
  //           been_there: newBeenThere,
  //           userID: userId,
  //           itinerariesID: itinerariesId,
  //         },
  //         {
  //           headers: headers,
  //         }
  //       )
  //       .then((response) => {
  //         console.log(response);
  //         return;
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         return;
  //       });
  //   };

  return (
    <React.Fragment>
      <CssBaseline />
      <main style={{ paddingTop: "20px" }}>
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
              Discover all itineraries
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Be inspired by user-submitted itineraries!
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {allItineraries.map((item, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={""}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5">
                      {item.name}
                    </Typography>
                    <Typography variant="subtitle1">
                      Created By:{" "}
                      <Link
                        style={{ textDecoration: "none" }}
                        to={`users/profile/${item.creator[0]._id}`}
                      >
                        {item.creator[0].firstName}
                      </Link>
                    </Typography>
                    <Typography variant="subtitle1">
                      Trip Duration: {item.trip_duration} days
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      component={Link}
                      to={`/itinerary/view/${item._id}`}
                      size="small"
                      color="primary"
                    >
                      View
                    </Button>

                    <Button
                      onClick={(e) => {
                        addToBucketlist(e, item._id);
                      }}
                      size="small"
                      color="primary"
                    >
                      Add to Bucketlist
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

export default DiscoverItinerariesDisplay;
//
