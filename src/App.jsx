import React, { useState, useEffect } from "react";
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
import Trips from "./components/pages/trips";
import UserProfile from "./components/pages/profile";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <GuestRoute path="/users/register" component={SignUp} />
          <GuestRoute path="/users/login" component={SignIn} />
          <ProtectedRoute
            path="/itinerary/view/:id"
            component={EditItinerary}
          />
          <ProtectedRoute path="/itinerary/create/" component={EditItinerary} />
          <ProtectedRoute path="/users/profile" component={UserProfile} />
          <ProtectedRoute path="/users/itineraries" />
          <ProtectedRoute path="/users/bucketlist" />
          <Route path="/discover/" />
          <ProtectedRoute path="/trips/:userid" component={Trips} />
          <ProtectedRoute path="/trips/:" component={Trips} />
        </Switch>
        <Box mt={5}>
          <Copyright />
        </Box>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
