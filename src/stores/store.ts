import { applyMiddleware, createStore, compose } from "redux";
import reducer from "./reducer";
import { logger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";

const isDevelopment =
  process.env.NODE_ENV === "local" ||
  process.env.NODE_ENV === "development" ||
  process.env.NODE_ENV === "development2" ||
  process.env.NODE_ENV === "development3";

const middlewareList = [];
if (isDevelopment) {
  middlewareList.push(logger);
}

const enhancer = isDevelopment
  ? composeWithDevTools(applyMiddleware(...middlewareList))
  : compose(applyMiddleware(...middlewareList));
const store = createStore(reducer, {}, enhancer);

export default store;
