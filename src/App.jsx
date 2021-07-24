import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Box from "@material-ui/core/Box";

import Navbar from "./Components/navbar.jsx";
import Copyright from "./Components/copyright";
import SignUp from "./Components/pages/register.jsx";
import SignIn from "./Components/pages/login.jsx";
import LandingPage from "./Components/pages/landing_page";
import ProtectedRoute from "./Components/protected_routes";
import GuestRoute from "./Components/guest_route";

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
