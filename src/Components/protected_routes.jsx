import React, { useContext, useEffect } from "react";
import { Redirect, Route, withRouter } from "react-router-dom";
import { AuthContext } from "./Contexts/auth_context";
import Cookies from "js-cookie";

function ProtectedRoute({ component: Component, ...rest }) {
  // const { isAuth, setIsAuth } = useContext(AuthContext);
  const verifiedUser = Cookies.get("auth_token");

  return verifiedUser ? (
    <Route {...rest} render={(props) => <Component {...rest} {...props} />} />
  ) : (
    // <Component />
    <Redirect to={"/users/login"} />
  );
}
export default withRouter(ProtectedRoute);
