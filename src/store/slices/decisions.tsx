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
  },
});

export default decisionSlice.reducer;
