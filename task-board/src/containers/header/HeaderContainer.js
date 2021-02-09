import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Header from "../../components/header/Header";
import * as loginAction from "../../actions/loginAction";

class HeaderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.logout = this.logout.bind(this);
    this.buttonRef = this.buttonRef.bind(this);
  }

  handleToggle() {
    this.setState(state => ({ open: !state.open }));
  }

  handleClose(event) {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  }

  buttonRef(node) {
    this.anchorEl = node;
  }

  logout(event) {
    const { logout } = this.props;
    logout();
    this.handleClose(event);
  }

  render() {
    const { name, isAuthUser } = this.props;
    const { open } = this.state;
    return (
      <Header
        open={open}
        name={name}
        isAuthUser={isAuthUser}
        buttonRef={this.buttonRef}
        handleToggle={this.handleToggle}
        handleClose={this.handleClose}
        anchorEl={this.anchorEl}
        logout={this.logout}
      />
    );
  }
}

HeaderContainer.propTypes = {
  name: PropTypes.string,
  isAuthUser: PropTypes.bool,
  logout: PropTypes.func.isRequired
};

HeaderContainer.defaultProps = {
  name: "",
  isAuthUser: null
};

const MapStateToProps = state => ({
  name: state.user.user
    ? state.user.user.displayName || state.user.user.email
    : "",
  isAuthUser: state.user.isAuthUser
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logout: loginAction.logout
    },
    dispatch
  );

export default connect(
  MapStateToProps,
  mapDispatchToProps
)(HeaderContainer);
