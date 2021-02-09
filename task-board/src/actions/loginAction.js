import firebase, { googleAuthProvider } from "../config/Fire";

import * as actionTypes from "../constants/actionTypes";

export const setUser = () => dispatch =>
  new Promise(resolve => {
    firebase.auth().onAuthStateChanged(authUser => {
      if (!authUser) {
        dispatch({
          type: actionTypes.SET_USER,
          payload: null
        });
        resolve(authUser);
      } else {
        dispatch({
          type: actionTypes.SET_USER,
          payload: authUser
        });
        resolve(authUser);
      }
    });
  });

export function logout() {
  firebase.auth().signOut();
  return {
    type: actionTypes.LOGOUT
  };
}

export const login = credentials => dispatch => {
  dispatch({
    type: actionTypes.SHOW_LOADER
  });
  firebase
    .auth()
    .signInWithEmailAndPassword(credentials.email, credentials.password)
    .catch(error => {
      dispatch({
        type: actionTypes.SHOW_NOTIFICATION,
        payload: {
          level: "error",
          title: "Login failed",
          message: error.message,
          position: "tr"
        }
      });
    });
  dispatch({
    type: actionTypes.LOGIN
  });
};

export const signup = formData => dispatch =>
  new Promise(resolve => {
    dispatch({
      type: actionTypes.SHOW_LOADER
    });
    firebase
      .auth()
      .createUserWithEmailAndPassword(formData.email, formData.password)
      .then(promiseData => resolve(promiseData))
      .catch(error => {
        dispatch({
          type: actionTypes.SHOW_NOTIFICATION,
          payload: {
            level: "error",
            title: "Registration failed",
            message: error.message,
            position: "tr"
          }
        });
      });
    dispatch({
      type: actionTypes.SIGNUP
    });
  });

export const googleLogin = () => dispatch =>
  new Promise(resolve => {
    dispatch({
      type: actionTypes.SHOW_LOADER
    });
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(promiseData => {
        resolve(promiseData);
      })
      .catch(error => {
        dispatch({
          type: actionTypes.SHOW_NOTIFICATION,
          payload: {
            level: "error",
            title: "Login failed",
            message: error.message,
            position: "tr"
          }
        });
      });
    dispatch({
      type: actionTypes.GOOGLE_LOGIN
    });
  });

export function showLoader() {
  return {
    type: actionTypes.SHOW_LOADER
  };
}
