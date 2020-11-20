import React from "react";
import { Redirect, Route } from "react-router-dom";
import { isAutheticated } from "../auth/helper/index";
function ProtectedRoutes({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAutheticated()) {
          return <Component {...props} />;
        } else {
          return <Redirect to={{ pathname: "/signin" }} />;
        }
      }}
    />
  );
}

export default ProtectedRoutes;
