import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

import Box from "@material-ui/core/Box";

import Navbar from "./Components/navbar.jsx";
import Copyright from "./Components/copyright";
import SignUp from "./Components/pages/register.jsx";
import SignIn from "./Components/pages/login.jsx";
import LandingPage from "./Components/pages/landing_page";
import UserDashboard from "./Components/pages/user_dashboard.jsx";
import ProtectedRoute from "./Components/protected_routes";
import GuestRoute from "./Components/guest_route";
import { AuthContext } from "./Components/Contexts/auth_context";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState("");

  useEffect(() => {
    const verifiedUser = Cookies.get("auth_token");

    if (verifiedUser) {
      setIsAuth(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/users/register" component={SignUp} />
            <GuestRoute path="/users/login" component={SignIn} />
            <ProtectedRoute path="/users/dashboard" component={UserDashboard} />
            <ProtectedRoute path="/users/itinerary/plan" />
          </Switch>
          <Box mt={5}>
            <Copyright />
          </Box>
          <ToastContainer />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
