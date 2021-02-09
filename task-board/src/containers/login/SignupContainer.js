/* eslint jsx-a11y/label-has-for: 0 */

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import Signup from "../../components/login/Signup";
import notificationAction from "../../actions/notificationAction";
import * as action from "../../actions/loginAction";
import { addMultipleCategories } from "../../actions/categoryAction";

class SignupContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
  }

  signup(e) {
    e.preventDefault();
    const { signup, notification, addNewUserData } = this.props;
    const { email, password, confirmPassword } = this.state;
    if (password === confirmPassword) {
      signup({
        email,
        password
      }).then(promiseData => {
        if (
          promiseData &&
          promiseData.additionalUserInfo &&
          promiseData.additionalUserInfo.isNewUser
        ) {
          addNewUserData(["Doing", "Todo", "done"]);
        }
      });
    } else {
      notification({
        level: "error",
        title: "Password does not match the confirm password.",
        position: "tr"
      });
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { isLoading } = this.props;
    const { email, password, confirmPassword } = this.state;
    return (
      <Signup
        isLoading={isLoading}
        email={email}
        password={password}
        confirmPassword={confirmPassword}
        signup={this.signup}
        handleChange={this.handleChange}
      />
    );
  }
}

SignupContainer.propTypes = {
  signup: PropTypes.func.isRequired,
  notification: PropTypes.func.isRequired,
  addNewUserData: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
};

SignupContainer.defaultProps = {
  isLoading: false
};

const MapStateToProps = state => ({
  isLoading: state.user.isLoading
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      signup: action.signup,
      notification: notificationAction,
      addNewUserData: addMultipleCategories
    },
    dispatch
  );

export default connect(
  MapStateToProps,
  mapDispatchToProps
)(SignupContainer);
