import * as a from "../constants/actionTypes";

const initialState = {
  categoryList: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case a.SET_CATEGORY_LIST: {
      return {
        ...state,
        categoryList: action.payload
      };
    }
    case a.ADD_NEW_CATEGORY:
      return {
        ...state
      };
    case a.ADD_MULTIPLE_CATEGORIES:
      return {
        ...state
      };
    case a.UPDATE_CATEGORY: {
      return {
        ...state
      };
    }
    case a.REMOVE_CATEGORY: {
      return {
        ...state
      };
    }
    default:
      return state;
  }
}
