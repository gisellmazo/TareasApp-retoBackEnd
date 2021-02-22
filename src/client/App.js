import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";

function App() {
    return (
      <BrowserRouter>
         <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/dashboard" component={Dashboard} />
         </Switch>
      </BrowserRouter>
    );
  }

export default App;