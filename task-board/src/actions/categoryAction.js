import firebase from "../config/Fire";

import * as actionTypes from "../constants/actionTypes";

export function addNewCategory(categoryTitle) {
  const { uid } = firebase.auth().currentUser;
  const category = {
    id: new Date().getTime(),
    title: categoryTitle,
    removed: false
  };
  firebase
    .database()
    .ref(`users/${uid}/category/${category.id}`)
    .set(category);
  return {
    type: actionTypes.ADD_NEW_CATEGORY
  };
}

export function addMultipleCategories(categoryTitles) {
  categoryTitles.forEach(title => {
    addNewCategory(title);
  });
  return {
    type: actionTypes.ADD_MULTIPLE_CATEGORIES
  };
}

export const updateCategory = category => dispatch => {
  const { uid } = firebase.auth().currentUser;
  firebase
    .database()
    .ref(`users/${uid}/category/${category.id}`)
    .update({ ...category })
    .catch(error => {
      dispatch({
        type: actionTypes.SHOW_NOTIFICATION,
        payload: {
          level: "error",
          message: error.message,
          title: "Category title update failed",
          position: "tr"
        }
      });
    });
  dispatch({
    type: actionTypes.UPDATE_CATEGORY
  });
};

export const rearrangeCategory = newCategoryList => dispatch => {
  const categoryList = newCategoryList
    .map((category, index) => ({ ...category, index }))
    .reduce((category, item) => ({ ...category, [item.id]: item }), {});

  const { uid } = firebase.auth().currentUser;
  firebase
    .database()
    .ref(`users/${uid}/category`)
    .update(categoryList)
    .catch(error => {
      dispatch({
        type: actionTypes.SHOW_NOTIFICATION,
        payload: {
          level: "error",
          title: "Failed to rearrange category",
          message: error.message,
          position: "tr"
        }
      });
    });
  dispatch({
    type: actionTypes.UPDATE_CATEGORY
  });
};

export const setCategoryList = isAuthUser => dispatch => {
  if (isAuthUser) {
    const { uid } = firebase.auth().currentUser;
    firebase
      .database()
      .ref(`users/${uid}/category`)
      .on("value", snapshot => {
        const category = snapshot.val() || {};
        let payload = [];
        payload = Object.keys(category)
          .map(key => category[key])
          .filter(_category => !_category.removed)
          .sort((a, b) => a.index - b.index || a.id - b.id);

        dispatch({
          type: actionTypes.SET_CATEGORY_LIST,
          payload
        });
      });
  } else {
    dispatch({
      type: actionTypes.SET_CATEGORY_LIST,
      payload: []
    });
  }
};

export const removeCategory = category => dispatch => {
  const { uid } = firebase.auth().currentUser;
  const ref = firebase.database().ref(`users/${uid}/category/${category.id}`);
  ref
    .update({
      removed: true
    })
    .then(() => {
      dispatch({
        type: actionTypes.SHOW_NOTIFICATION,
        payload: {
          level: "warning",
          title: `"${category.title}" was removed`,
          message: "Undo this action",
          position: "bc",
          autoDismiss: 5,
          action: {
            label: "Undo",
            callback() {
              ref
                .update({
                  removed: false
                })
                .catch(error => {
                  dispatch({
                    type: actionTypes.SHOW_NOTIFICATION,
                    payload: {
                      level: "error",
                      title: `"${category.title}" - Undo failed`,
                      message: error.message,
                      position: "tr"
                    }
                  });
                });
            }
          }
        }
      });
    })
    .catch(error => {
      dispatch({
        type: actionTypes.SHOW_NOTIFICATION,
        payload: {
          level: "error",
          title: `"${category.title}" - Remove failed`,
          message: error.message,
          position: "tr"
        }
      });
    });
  dispatch({
    type: actionTypes.REMOVE_CATEGORY
  });
};
