import React, { useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import Cookies from "js-cookie";

import { AuthContext } from "./Contexts/auth_context";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Navbar(props) {
  const classes = useStyles();

  const { isAuth, setIsAuth } = useContext(AuthContext);

  function handleLogout(e) {
    Cookies.remove("auth_token");
    setIsAuth(false);
    props.history.push("/");
  }

  return (
    <div className={classes.root}>
      <AppBar style={{ background: "#9c27b0" }} position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          ></IconButton>
          <Typography
            component={Link}
            style={{ textDecoration: "none" }}
            to="/"
            variant="h6"
            color="inherit"
            className={classes.title}
          >
            TRITCH
          </Typography>
          <Button color="inherit">Trip Planner</Button>
          <Button color="inherit">Discover</Button>
          {isAuth ? (
            <div className="unauthenticatedOnly">
              <Button component={Link} to="/users/dashboard" color="inherit">
                My Dashboard
              </Button>
              <Button
                onClick={(e) => {
                  handleLogout(e);
                }}
                color="inherit"
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="unauthenticatedOnly">
              <Button component={Link} to="/users/login" color="inherit">
                Login
              </Button>
              <Button component={Link} to="/users/register" color="inherit">
                Register
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(Navbar);
