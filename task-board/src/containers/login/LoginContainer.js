/* eslint jsx-a11y/label-has-for: 0 */

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import Login from "../../components/login/Login";
import * as action from "../../actions/loginAction";
import { addMultipleCategories } from "../../actions/categoryAction";

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
    this.googleLogin = this.googleLogin.bind(this);
  }

  login(e) {
    e.preventDefault();
    const { login } = this.props;
    const { email, password } = this.state;
    login({
      email,
      password
    });
  }

  googleLogin() {
    const { googleLogin, addNewUserData } = this.props;
    googleLogin().then(promiseData => {
      if (
        promiseData &&
        promiseData.additionalUserInfo &&
        promiseData.additionalUserInfo.isNewUser
      ) {
        addNewUserData(["Doing", "Todo", "done"]);
      }
    });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { isLoading } = this.props;
    const { email, password } = this.state;
    return (
      <Login
        googleLogin={this.googleLogin}
        isLoading={isLoading}
        email={email}
        password={password}
        login={this.login}
        handleChange={this.handleChange}
      />
    );
  }
}

LoginContainer.propTypes = {
  login: PropTypes.func.isRequired,
  googleLogin: PropTypes.func.isRequired,
  addNewUserData: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
};

LoginContainer.defaultProps = {
  isLoading: false
};

const MapStateToProps = state => ({
  isLoading: state.user.isLoading
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login: action.login,
      googleLogin: action.googleLogin,
      addNewUserData: addMultipleCategories
    },
    dispatch
  );

export default connect(
  MapStateToProps,
  mapDispatchToProps
)(LoginContainer);
