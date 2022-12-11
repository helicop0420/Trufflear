import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { AuthPage, LoginPage, MainPage, SignupPage, LoginFormPage, BoardPage, SearchPage, Error1, Error2, ProfilePage, SettingPage } from '../views';
import {PrivateRoute} from './PrivateRouter'

export const AppRouter = () => (
    <Router>
        <Switch>
            <Route path="/signup" exact component={SignupPage} />
            <Route path="/auth" exact component={AuthPage} />
            <Route path="/login" exact component={LoginFormPage} />
            <Route path="/board" exact component={BoardPage} />
            <Route path="/find" exact component={SearchPage} />
            <Route path="/home" exact component={LoginPage} />
            <Route path="/app" exact component={MainPage} />
            <Route path="/profile" exact component={ProfilePage} />
            <Route path="/setting" exact component={SettingPage} />
            <Route path="/error_1" exact component={Error1} />
            <Route path="/error_2" exact component={Error2} />
            <Route path="/:username" exact component={SearchPage} />
            <Route path="/" exact component={LoginPage} />
        </Switch>
    </Router> 

)