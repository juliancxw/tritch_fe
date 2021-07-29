import React, { useContext } from "react";
import { Redirect, Route, withRouter, useHistory } from "react-router-dom";
import Cookies from "js-cookie";

function GuestRoute({ component: Component, ...rest }) {
  const history = useHistory();
  const verifiedUser = Cookies.get("auth_token");

  return verifiedUser ? (
    <Redirect to={history.goBack} />
  ) : (
    <Route {...rest} render={(props) => <Component {...rest} {...props} />} />
  );
}

export default withRouter(GuestRoute);
