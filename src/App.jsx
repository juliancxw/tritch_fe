import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Box from "@material-ui/core/Box";

import Navbar from "./Components/navbar.jsx";
import Copyright from "./Components/copyright";
import SignUp from "./Components/pages/register.jsx";
import SignIn from "./Components/pages/login.jsx";
import LandingPage from "./Components/pages/landing_page";

function App() {
  const [user, setUser] = useState(false);

  function handleLogin(e) {
    e.preventDefault();
    setUser(true);
  }

  return (
    <Router>
      <Switch>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={LandingPage} />
          <Route path="/register" component={SignUp} />
          <Route path="/login" component={SignIn} />
          <Box mt={5}>
            <Copyright />
          </Box>
          <ToastContainer />
        </div>
      </Switch>
    </Router>
  );
}

export default App;
