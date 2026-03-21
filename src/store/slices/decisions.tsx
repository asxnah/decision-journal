import { Decision } from "@shared-types/decision";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DecisionsData {
  data: Decision[];
}

const initialState: DecisionsData = {
  data: [],
};

export const getSingle = (state: { decisions: DecisionsData }, id: string) => {
  return state.decisions.data.find((decision) => decision.id === id);
};

export const decisionSlice = createSlice({
  name: "decision",
  initialState,
  reducers: {
    set: (state: DecisionsData, action: PayloadAction<Decision[]>) => {
      state.data = action.payload;
    },
    add: (state: DecisionsData, action: PayloadAction<Decision>) => {
      state.data.push(action.payload);
    },
    resetAll: () => initialState,
  },
});

export const { set } = decisionSlice.actions;
export const { add } = decisionSlice.actions;
export const { resetAll } = decisionSlice.actions;
export default decisionSlice.reducer;
