import { combineReducers } from "@reduxjs/toolkit";
import decisionReducer from "./slices/decision";
import decisionsReducer from "./slices/decisions";

export const rootReducer = combineReducers({
  decision: decisionReducer,
  decisions: decisionsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
