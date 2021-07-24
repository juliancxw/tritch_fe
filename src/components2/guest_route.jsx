import React, { useContext } from "react";
import { Redirect, Route, withRouter, useHistory } from "react-router-dom";
import { AuthContext } from "./Contexts/auth_context";
import Cookies from "js-cookie";

function GuestRoute({ component: Component, ...rest }) {
  const { isAuth } = useContext(AuthContext);
  const history = useHistory();
  const verifiedUser = Cookies.get("auth_token");

  return verifiedUser ? (
    <Redirect to={history.goBack} />
  ) : (
    <Route {...rest} render={(props) => <Component {...rest} {...props} />} />
  );
}

export default withRouter(GuestRoute);
