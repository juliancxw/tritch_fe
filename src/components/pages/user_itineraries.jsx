import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import decodeToken from "../../services/token_decoder";

import { Link, useParams } from "react-router-dom";
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

function UserItineraries() {
  const classes = useStyles();
  const [userItineraries, setUserItineraries] = useState([]);
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

    // call api to get itineraries of user
    axios
      .get(
        `https://tritch-be.herokuapp.com/api/v1/itineraries/${userToRender}`,

        {
          headers: headers,
        }
      )
      .then((response) => {
        if (!response) {
          console.log(`shit!`);
        }
        setUserItineraries(response.data.itineraries);
        console.log("setting state");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(userItineraries);

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
              My Itineraries
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Yay Yay Yay Yay Yay
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {userItineraries.map((item, index) => (
              <Grid item key={index} xs={12} sm={6}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={item.image}
                    title={item.name}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5">
                      {item.name}
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
                      component={Link}
                      to={`/itinerary/edit/${item._id}`}
                      size="small"
                      color="primary"
                    >
                      Edit
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

export default UserItineraries;
