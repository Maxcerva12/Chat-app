// src/reducers/MessagesReducer.js
import { ChatTypes } from "../types/ChatTypes";

const initialState = {
  messages: [],
  loading: false,
  error: null,
};

export const MessagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ChatTypes.messageLoad:
      return {
        ...state,
        messages: action.payload,
        loading: false,
        error: null,
      };

    case ChatTypes.messageSend:
      return {
        ...state,
        messages: [...state.messages, action.payload],
        error: null,
      };

    case ChatTypes.messageDelete:
      return {
        ...state,
        messages: state.messages.filter(
          (message) => message.id !== action.payload
        ),
        error: null,
      };

    case ChatTypes.messageError:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};
