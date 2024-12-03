import { combineReducers } from "redux";
import { authFunc } from "./AuthReducer";

export const rootReducer = combineReducers({
    authFunc,
})