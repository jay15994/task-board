/* eslint jsx-a11y/label-has-for: 0 */

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { LoginForm, LoginFormContainer } from "./Style";
import Loader from "../../containers/loader/Loader";

const Login = props => {
  const {
    googleLogin,
    isLoading,
    email,
    password,
    login,
    handleChange
  } = props;
  return (
    <LoginFormContainer>
      <Loader loading={isLoading} />
      <LoginForm>
        <h1>Login to Task Bord </h1>
        <span>
          or <Link to="/signup">create an account </Link>
        </span>
        <form onSubmit={login}>
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
          <button type="submit">Login </button>
        </form>
        <button type="button" onClick={googleLogin}> <i className="google-logo" /> Login with Google </button>
      </LoginForm>
    </LoginFormContainer>
  );
};

Login.propTypes = {
  googleLogin: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  email: PropTypes.string,
  password: PropTypes.string,
  login: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
};

Login.defaultProps = {
  email: "",
  password: "",
  isLoading: false
};

export default Login;
