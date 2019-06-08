import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import Index from "./pages/index";
import SignIn from "./pages/signIn";
import NotFound from "./pages/notFound";
import ProtectedRoute from "./session/protectedRoute";

const routing = (
  <Router>
    <div>
      <Switch>
        <ProtectedRoute exact path="/" component={Index} />
        <ProtectedRoute path="/signIn" component={SignIn} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
