import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import * as loginAction from "../actions/loginAction";
import * as todoAction from "../actions/todoAction";
import * as categoryAction from "../actions/categoryAction";
import Loader from "../containers/loader/Loader";

export default function isAuthenticated(WrappedComponent) {
  class authentication extends Component {
    componentWillMount() {
      const { setUser, showLoader } = this.props;
      showLoader();
      setUser();
    }

    componentWillReceiveProps(nextProps) {
      const { setTodoList, setCategoryList, history } = this.props;

      setCategoryList(nextProps.isAuthUser);
      setTodoList(nextProps.isAuthUser);

      if (
        nextProps.isAuthUser &&
        (history.location.pathname === "/login" ||
          history.location.pathname === "/signup")
      ) {
        history.push("/");
      }

      if (!nextProps.isAuthUser && history.location.pathname === "/") {
        history.push("/login");
      }
    }

    render() {
      const { isLoading } = this.props;
      if (isLoading) {
        return <Loader loading={isLoading} />;
      }
      return <WrappedComponent />;
    }
  }

  const MapStateToProps = state => ({
    isAuthUser: state.user.isAuthUser,
    isLoading: state.user.isLoading
  });

  const mapDispatchToProps = dispatch =>
    bindActionCreators(
      {
        setUser: loginAction.setUser,
        showLoader: loginAction.showLoader,
        setTodoList: todoAction.setTodoList,
        setCategoryList: categoryAction.setCategoryList
      },
      dispatch
    );

  authentication.propTypes = {
    setUser: PropTypes.func.isRequired,
    showLoader: PropTypes.func.isRequired,
    setTodoList: PropTypes.func.isRequired,
    setCategoryList: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    isAuthUser: PropTypes.bool,
    history: PropTypes.instanceOf(Object)
  };

  authentication.defaultProps = {
    isLoading: false,
    isAuthUser: false,
    history: {}
  };

  return connect(
    MapStateToProps,
    mapDispatchToProps
  )(authentication);
}
