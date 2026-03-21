import { Decision } from "@shared-types/decision";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DecisionData {
  data: Decision;
}

const initialState: DecisionData = {
  data: {
    id: "",
    reviewed: false,
    successful: false,
    decision: "",
    thoughts: "",
    options: "",
    confidence: 50,
    expectations: "",
    reviewDateType: "preset",
    reviewDate: "",
    createdAt: "",
  },
};

export const decisionSlice = createSlice({
  name: "decision",
  initialState,
  reducers: {
    setValueByKey: <K extends keyof Decision>(
      state: DecisionData,
      action: PayloadAction<{ key: K; value: Decision[K] }>,
    ) => {
      const { key, value } = action.payload;
      state.data[key] = value;
    },
    resetCurrent: () => initialState,
  },
});

export const { setValueByKey, resetCurrent } = decisionSlice.actions;
export default decisionSlice.reducer;
