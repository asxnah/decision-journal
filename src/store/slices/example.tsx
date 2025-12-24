import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ExampleState {
  data: [];
}

const initialState: ExampleState = {
  data: [],
};

export const exampleSlice = createSlice({
  name: "example",
  initialState,
  reducers: {
    init: (state, action: PayloadAction<[]>) => {
      state.data = action.payload;
    },
  },
});

export const { init } = exampleSlice.actions;
export default exampleSlice.reducer;
