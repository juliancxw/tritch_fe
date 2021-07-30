import React, { useEffect, useRef, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import Cookies from "js-cookie";
import logo from "../images/logo.png";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Avatar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  MenuItem,
  MenuList,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  Box,
} from "@material-ui/core/";

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
  appBarSpacer: theme.mixins.toolbar,
}));

function Navbar(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const verifiedUser = Cookies.get("auth_token");

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  function handleLogout(e) {
    Cookies.remove("auth_token");
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
            <Box mt={2}>
              <img src={logo} alt="TRITCH" className={classes.logo} />
            </Box>
          </Typography>
          <Button color="inherit" component={Link} to={"/tripplanner"}>
            Trip Planner
          </Button>
          <Button component={Link} to="/discover" color="inherit">
            Discover
          </Button>
          {verifiedUser ? (
            <div className="authenticatedOnly">
              <Button
                color="inherit"
                ref={anchorRef}
                aria-controls={open ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
              >
                <Avatar
                  alt="Remy Sharp"
                  src="/static/images/avatar/1.jpg"
                  className={classes.large}
                />
              </Button>
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom" ? "center top" : "center bottom",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={open}
                          id="menu-list-grow"
                          onKeyDown={handleListKeyDown}
                        >
                          <MenuItem
                            component={Link}
                            to={`/users/profile`}
                            onClick={handleClose}
                          >
                            My Profile
                          </MenuItem>
                          <MenuItem>
                            <Button
                              onClick={(e) => {
                                handleLogout(e);
                              }}
                              color="inherit"
                            >
                              Logout
                            </Button>
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
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
