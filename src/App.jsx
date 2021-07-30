import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Box from "@material-ui/core/Box";
import Navbar from "./components/navbar";
import Copyright from "./components/copyright";
import SignUp from "./components/pages/register";
import SignIn from "./components/pages/login";
import LandingPage from "./components/pages/landing_page";
import ProtectedRoute from "./components/protected_routes";
import GuestRoute from "./components/guest_route";
import EditItinerary from "./components/pages/edit_itinerary";
import TripPlanner from "./components/pages/trip_planner";

import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import Comments from "./components/comments";
import Follow from "./components/follows";
import UserProfile from "./components/pages/profile";
import Discover from "./components/pages/discover";
import ViewItinerary from "./components/pages/view_itinerary";

import "./App.css";
import Bucketlist from "./components/pages/bucketlist";
import decodeToken from "./services/token_decoder";
import { useEffect } from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#9c27b0",
    },
    secondary: {
      main: "#e91e63",
    },
  },
});

function App() {
  const authToken = Cookies.get("auth_token");
  const loggedInUserId = decodeToken(authToken);
  let loggedInUserDetails;

  const headers = {
    headers: authToken,
  };

  useEffect(() => {
    async function getLoggedInUserDetails() {
      if (!loggedInUserId) {
        return;
      }

      try {
        loggedInUserDetails = await axios.get(
          `https://tritch-be.herokuapp.com/api/v1/users/show/${loggedInUserId}`,
          {
            headers: headers,
          }
        );
      } catch (err) {
        toast(err.response.data);
        console.log(err);
      }
    }
    getLoggedInUserDetails();
  }, []);

  console.log(loggedInUserDetails);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <Navbar userDetails={loggedInUserDetails} />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            {/* to remove later*/}
            <Route
              exact
              path="/testcomment/:itineraryid"
              component={Comments}
            />
            {/* /* to remove later*/}
            {/*<Route  path="/testfollower/:profileid" component={Follow} /> */}
            <Route path="/discover/" component={Discover} />
            <GuestRoute path="/users/register" component={SignUp} />
            <GuestRoute path="/users/login" component={SignIn} />
            <ProtectedRoute
              path="/itinerary/view/:id"
              component={ViewItinerary}
            />
            <ProtectedRoute
              path="/itinerary/edit/:id"
              component={EditItinerary}
            />
            <ProtectedRoute path="/tripplanner" component={TripPlanner} />

            <ProtectedRoute
              path="/itinerary/create/"
              component={EditItinerary}
            />
            <ProtectedRoute
              exact
              path="/users/profile/"
              component={UserProfile}
            />
            <ProtectedRoute
              path="/users/profile/:userid"
              component={UserProfile}
            />
            <ProtectedRoute path="/users/itineraries" />
            <ProtectedRoute path="/users/itineraries/:userid" />
            <ProtectedRoute
              exact
              path="/users/bucketlist"
              component={Bucketlist}
            />
            <ProtectedRoute path="/users/bucketlist/:itinerariesid/add" />
     
          </Switch>
          <Box mt={5}>
            <Copyright />
          </Box>
          <ToastContainer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
