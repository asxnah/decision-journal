import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DecisionData {
  data: Decision;
}

const initialState: DecisionData = {
  data: {
    decision: "",
    thoughts: "",
    options: "",
    confidence: 50,
    expectations: "",
    reviewDate: "",
  },
};

export const decisionSlice = createSlice({
  name: "decision",
  initialState,
  reducers: {
    set: <K extends keyof Decision>(
      state: DecisionData,
      action: PayloadAction<{ key: K; value: Decision[K] }>
    ) => {
      const { key, value } = action.payload;
      state.data[key] = value;
    },
  },
});

export const { set } = decisionSlice.actions;
export default decisionSlice.reducer;
