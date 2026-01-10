import { Decision } from "@shared-types/decision";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DecisionsData {
  data: Decision[];
}

const initialState: DecisionsData = {
  data: [],
};

export const decisionSlice = createSlice({
  name: "decision",
  initialState,
  reducers: {
    add: (state: DecisionsData, action: PayloadAction<Decision>) => {
      state.data.push(action.payload);
    },
    reset: () => initialState,
  },
});

export const { add } = decisionSlice.actions;
export default decisionSlice.reducer;
