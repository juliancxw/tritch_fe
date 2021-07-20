import React, { useContext } from "react";
import { Redirect, Route, withRouter } from "react-router-dom";
import { AuthContext } from "./Contexts/auth_context";

function ProtectedRoute({ component: Component, ...rest }) {
  const { isAuth } = useContext(AuthContext);

  return isAuth ? (
    <Route {...rest} render={(props) => <Component {...rest} {...props} />} />
  ) : (
    // <Component />
    <Redirect to={"/users/login"} />
  );
}
export default withRouter(ProtectedRoute);
