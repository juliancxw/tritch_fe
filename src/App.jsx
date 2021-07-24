import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Box from "@material-ui/core/Box";

import Navbar from "./components/navbar.jsx";
import Copyright from "./components/copyright";
import SignUp from "./components/pages/register.jsx";
import SignIn from "./components/pages/login.jsx";
import LandingPage from "./components/pages/landing_page";
import ProtectedRoute from "./components/protected_routes";
import GuestRoute from "./components/guest_route";
import Itinerary from "./components/pages/itinerary.jsx";

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
          <ProtectedRoute path="/itinerary/view/:id" component={Itinerary} />
          <ProtectedRoute path="/users/:userID/profile" />
          <ProtectedRoute path="/users/:userID/itineraries" />
          <ProtectedRoute path="/users/:userID/bucketlist" />
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
