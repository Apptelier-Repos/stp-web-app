import React from "react";
import { Route, Redirect } from "react-router-dom";
import Router from "./router";

const ProtectedRoute = ({ component: Component, ...args }) => {
  var approvedPath = Router.GetApprovedPath(args.location.pathname);
  return (
    <Route
      {...args}
      render={props =>
        props.location.pathname === approvedPath ? (
          <Component {...props} />
        ) : (
          <Redirect to={approvedPath} />
        )
      }
    />
  );
};

export default ProtectedRoute;
