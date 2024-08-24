// src/reducers/AuthReducer.js
import { ChatTypes } from "../types/ChatTypes.js";

const initialState = {
  isAuthenticated: false,
  user: null,
};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ChatTypes.login:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };

    case ChatTypes.logout:
      return initialState;

    default:
      return state;
  }
};
