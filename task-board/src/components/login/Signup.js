/* eslint jsx-a11y/label-has-for: 0 */

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { LoginForm, LoginFormContainer } from "./Style";
import Loader from "../../containers/loader/Loader";

const Signup = props => {
  const {
    isLoading,
    email,
    password,
    confirmPassword,
    signup,
    handleChange
  } = props;
  return (
    <LoginFormContainer>
      <Loader loading={isLoading} />
      <LoginForm>
        <h1>Create a Task Bord Account</h1>
        <span>
          or <Link to="/login">sign in to your account </Link>
        </span>
        <form onSubmit={signup}>
          <label htmlFor="email">
            Email
            <input
              type="email"
              id="email"
              placeholder="e.g., id@email.com"
              name="email"
              value={email}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              type="password"
              id="password"
              placeholder="e.g., **********"
              name="password"
              value={password}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </label>
          <label htmlFor="confirmPassword">
            Confirm password
            <input
              type="password"
              id="confirmPassword"
              placeholder="e.g., **********"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </label>
          <button type="submit">Create New Account </button>
        </form>
      </LoginForm>
    </LoginFormContainer>
  );
};

Signup.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  confirmPassword: PropTypes.string,
  signup: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
};

Signup.defaultProps = {
  email: "",
  password: "",
  confirmPassword: "",
  isLoading: false
};

export default Signup;
