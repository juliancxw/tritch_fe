import React, { useState, useEffect } from "react";
import axios from "axios";
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

function DiscoverUsersDisplay() {
  const classes = useStyles();
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    // call backend to get details of all users
    axios
      .get(`https://tritch-be.herokuapp.com/api/v1/users/show/all`)
      .then((response) => {
        if (!response) {
          console.log(`shit!`);
        }
        setAllUsers(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
              Discover all users
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Seek inspiration from fellow travellers!
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {allUsers.map((item, index) => (
              <Grid item key={item} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5">
                      {item.firstName} {item.lastName}
                    </Typography>
                    <Typography variant="subtitle1">
                      <Link
                        style={{ textDecoration: "none" }}
                        to={`users/itineraries/${item._id}`}
                      >
                        {item.firstName}'s Itineraries
                      </Link>
                    </Typography>
                    <Typography variant="subtitle1">
                      <Link
                        style={{ textDecoration: "none" }}
                        to={`users/bucketlist/:${item._id}`}
                      >
                        {item.firstName}'s Bucketlist
                      </Link>
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      component={Link}
                      to={`users/profile/${item._id}`}
                      size="small"
                      color="primary"
                    >
                      View
                    </Button>
                    <Button
                      component={Link}
                      to={``}
                      size="small"
                      color="primary"
                    >
                      Follow
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

export default DiscoverUsersDisplay;
