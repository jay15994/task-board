import * as a from "../constants/actionTypes";

const initialState = {
  todoList: [],
  isLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case a.ADD_NEW_TODO:
      return {
        ...state,
        isLoading: false
      };
    case a.UPDATE_TODO: {
      return {
        ...state,
        isLoading: false
      };
    }
    case a.SET_TODO_LIST: {
      return {
        ...state,
        todoList: action.payload,
        isLoading: false
      };
    }
    case a.SHOW_LOADER: {
      return {
        ...state,
        isLoading: true
      };
    }
    default:
      return state;
  }
}
