import { combineReducers } from "redux";
// import authFunc from './AuthReducer'
// import fireStoreFunc from "./FireStoreReducer";
import { authFunc } from "./AuthReducer";
import { fireStoreFunc } from "./FireStoreReducer";

export const rootReducer = combineReducers({
  auth:  authFunc,
  fireStore:  fireStoreFunc,
})