import {applyMiddleware, createStore} from "redux";
import authReducer from "./reducers/authReducer.js";
import {thunk} from "redux-thunk";

const store = createStore(
    authReducer,
    applyMiddleware(thunk)
)
export default store