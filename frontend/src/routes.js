import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NewSpot from "./pages/NewSpot";

export default function Routes () {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact={true} component={Login}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/new" component={NewSpot}/>
            </Switch>
        </BrowserRouter>
    )
}