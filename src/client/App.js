import React, { Component } from "react";
import {render} from "react-dom";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";

function App() {
    return (
      <BrowserRouter>
         <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/" component={Dashboard} />
         </Switch>
      </BrowserRouter>
    );
  }

export default App;