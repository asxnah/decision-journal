import { combineReducers } from "@reduxjs/toolkit";
import decisionReducer from "./slices/decision";

export const rootReducer = combineReducers({
  decision: decisionReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
