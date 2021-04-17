import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dashboard from "../screens/Dashboard.js";
import Home from "../screens/Home.js";

export default function Navigation() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/home" component={Home} />
      </Switch>
    </Router>
  );
}
