// src/store/Store.js
import {
  legacy_createStore as createStore,
  combineReducers,
  compose,
  applyMiddleware,
} from "redux";
import { AuthReducer } from "../reducers/AuthReducer.js";
import { MessagesReducer } from "../reducers/MessagesReducer.js";
import { thunk } from "redux-thunk";

const reducers = combineReducers({
  auth: AuthReducer,
  messages: MessagesReducer,
});

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);
