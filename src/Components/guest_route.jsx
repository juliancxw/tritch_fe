import React, { useContext } from "react";
import { Redirect, Route, withRouter, useHistory } from "react-router-dom";
import { AuthContext } from "./Contexts/auth_context";

function GuestRoute({ component: Component, ...rest }) {
  const { isAuth } = useContext(AuthContext);
  const history = useHistory();

  return isAuth ? (
    <Redirect to={history.goBack} />
  ) : (
    <Route {...rest} render={(props) => <Component {...rest} {...props} />} />
  );
}

export default withRouter(GuestRoute);
