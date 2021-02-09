import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import Notification from "./notification/NotificationSystem";

import "./style/App.css";
import "./style/custom.css";

import store from "./store/store";
import WrappedComponent from "./hoc/WrappedComponent";

import Header from "./containers/header/HeaderContainer";
import Login from "./containers/login/LoginContainer";
import Signup from "./containers/login/SignupContainer";
import Home from "./containers/home/Home";

const App = () => (
  <Provider store={store}>
    <Router>
      <div className="App">
        <Notification />
        <Header />
        <Switch>
          <Route exact path="/" component={WrappedComponent(Home)} />
          <Route path="/login" component={WrappedComponent(Login)} />
          <Route path="/signup" component={WrappedComponent(Signup)} />
        </Switch>
      </div>
    </Router>
  </Provider>
);

export default App;
