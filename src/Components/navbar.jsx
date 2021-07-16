import React from "react";
import { Link } from "react-router-dom";
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

export default function Navbar() {
  const classes = useStyles();

  // check for jwt token in cookie
  let authToken;

  return (
    <div className={classes.root}>
      <AppBar style={{ background: "#673ab7" }} position="static">
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
          <Button color="inherit">Be Inspired</Button>
          {authToken ? (
            <Button component={Link} to="/logout" color="inherit">
              Logout
            </Button>
          ) : (
            <div className="unauthenticatedOnly">
              <Button component={Link} to="/login" color="inherit">
                Login
              </Button>
              <Button component={Link} to="/register" color="inherit">
                Register
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
