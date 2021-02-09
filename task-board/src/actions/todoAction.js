import firebase from "../config/Fire";

import * as actionTypes from "../constants/actionTypes";

export const addNewTodo = todoData => dispatch => {
  const { uid } = firebase.auth().currentUser;
  const todo = {
    id: new Date().getTime(),
    title: todoData.title,
    categoryId: todoData.categoryId,
    removed: false
  };
  firebase
    .database()
    .ref(`users/${uid}/todo/${todo.id}`)
    .set(todo)
    .catch(error => {
      dispatch({
        type: actionTypes.SHOW_NOTIFICATION,
        payload: {
          level: "error",
          title: "Failed to add todo",
          message: error.message,
          position: "tr"
        }
      });
    });
  dispatch({
    type: actionTypes.ADD_NEW_TODO
  });
};

export function updateTodo(todo) {
  const { uid } = firebase.auth().currentUser;
  firebase
    .database()
    .ref(`users/${uid}/todo/${todo.id}`)
    .update({ ...todo });
  return {
    type: actionTypes.UPDATE_TODO
  };
}

export const rearrangeTodo = (result, todoList) => dispatch => {
  const { uid } = firebase.auth().currentUser;
  const { destination, source, draggableId } = result;
  let finalList = {};

  if (Number(destination.droppableId) === Number(source.droppableId)) {
    const destinationTodo = todoList.filter(
      todo => todo.categoryId === Number(destination.droppableId)
    );

    destinationTodo.splice(
      destination.index,
      0,
      destinationTodo.splice(source.index, 1)[0]
    );

    finalList = destinationTodo
      .map((todo, index) => ({ ...todo, index }))
      .reduce((todo, item) => ({ ...todo, [item.id]: item }), {});
  } else {
    let destinationTodo = todoList.filter(
      todo => todo.categoryId === Number(destination.droppableId)
    );
    let sourceTodo = todoList.filter(
      todo => todo.categoryId === Number(source.droppableId)
    );

    destinationTodo.splice(destination.index, 0, sourceTodo[source.index]);
    sourceTodo.splice(source.index, 1);

    destinationTodo = destinationTodo.map((todo, index) => ({
      ...todo,
      index
    }));
    sourceTodo = sourceTodo.map((todo, index) => ({ ...todo, index }));

    finalList = [...destinationTodo, ...sourceTodo];
    finalList = finalList.reduce(
      (todo, item) => ({ ...todo, [item.id]: item }),
      {}
    );
    finalList[Number(draggableId)].categoryId = Number(destination.droppableId);
  }

  firebase
    .database()
    .ref(`users/${uid}/todo/`)
    .update(finalList)
    .catch(error => {
      dispatch({
        type: actionTypes.SHOW_NOTIFICATION,
        payload: {
          level: "error",
          title: "Failed to rearrange todo",
          message: error.message,
          position: "tr"
        }
      });
    });
  dispatch({
    type: actionTypes.UPDATE_TODO
  });
};

export const setTodoList = isAuthUser => dispatch => {
  if (isAuthUser) {
    const { uid } = firebase.auth().currentUser;
    firebase
      .database()
      .ref(`users/${uid}/todo`)
      .on("value", snapshot => {
        const todo = snapshot.val() || {};
        let payload = [];
        payload = Object.keys(todo)
          .map(key => todo[key])
          .filter(_todo => !_todo.removed)
          .sort((a, b) => a.index - b.index || a.id - b.id);
        dispatch({
          type: actionTypes.SET_TODO_LIST,
          payload
        });
      });
  } else {
    dispatch({
      type: actionTypes.SET_TODO_LIST,
      payload: []
    });
  }
};

export function showLoader() {
  return {
    type: actionTypes.SHOW_LOADER
  };
}

export const removeTodo = todo => dispatch => {
  const { uid } = firebase.auth().currentUser;
  const ref = firebase.database().ref(`users/${uid}/todo/${todo.id}`);
  ref
    .update({
      removed: true
    })
    .then(() => {
      dispatch({
        type: actionTypes.SHOW_NOTIFICATION,
        payload: {
          level: "warning",
          title: `"${todo.title}" was removed`,
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
                      title: `"${todo.title}" - Undo failed`,
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
          title: `"${todo.title}" - Remove failed`,
          message: error.message,
          position: "tr"
        }
      });
    });
  dispatch({
    type: actionTypes.REMOVE_TODO
  });
};
