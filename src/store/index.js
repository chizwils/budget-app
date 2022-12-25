import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import debtReducer from "./debtSlice";
const reducer = combineReducers({
  // here we will be adding reducers
  debt: debtReducer,
});
const store = configureStore({
  reducer,
});
export default store;
