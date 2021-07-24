import React, { useContext, useEffect } from "react";
import { Redirect, Route, withRouter } from "react-router-dom";
import Cookies from "js-cookie";

function ProtectedRoute({ component: Component, ...rest }) {
  const verifiedUser = Cookies.get("auth_token");

  return verifiedUser ? (
    <Route {...rest} render={(props) => <Component {...rest} {...props} />} />
  ) : (
    <Redirect to={"/users/login"} />
  );
}
export default withRouter(ProtectedRoute);
