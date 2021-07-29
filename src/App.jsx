import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
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
import Trips from "./components/pages/trips";
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Comments from "./components/comments";
import Follow from "./components/follows";
import UserProfile from "./components/pages/profile";
import Discover from "./components/pages/discover";

import "./App.css";
import Bucketlist from "./components/pages/bucketlist";

const theme = createTheme({
  palette: {
    primary: {
      main: '#9c27b0',
    },
    secondary: {
      main: '#e91e63',
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          {/* to remove later*/}
          <Route exact path="/testcomment/:itineraryid" component={Comments} /> 
          {/* /* to remove later*/}
          <Route exact path="/testfollower/:profileid" component={Follow} />
          <Route path="/discover/" component={Discover} />
          <GuestRoute path="/users/register" component={SignUp} />
          <GuestRoute path="/users/login" component={SignIn} />
          <ProtectedRoute path="/itinerary/view/:id" component={EditItinerary} />
          <ProtectedRoute path="/itinerary/edit/:id" component={EditItinerary} />
          <ProtectedRoute path="/tripplanner" component={TripPlanner} />
          <ProtectedRoute path="/users/profile" />
          <ProtectedRoute path="/itinerary/create/" component={EditItinerary} />
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
          <ProtectedRoute path="/trips/:userid" component={Trips} />
          <ProtectedRoute path="/trips/:" component={Trips} />
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
