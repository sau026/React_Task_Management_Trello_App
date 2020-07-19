import React from "react";
import { Route } from "react-router-dom";
import Login from './pages/login/index';
import TaskDashboard from './pages/task-dashoard/index'

export default function Router_outlet() {
    return (
        <React.Fragment>
        <Route exact path="/" component={Login}></Route>
        <Route path="/task-dashboard" component={TaskDashboard}></Route>
        </React.Fragment>
    );
  }
