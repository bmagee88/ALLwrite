import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CoverSlice {
  coverId: number;
}

let initialState: CoverSlice = { coverId: -1 };

const coverSlice = createSlice({
  name: "cover",
  initialState,
  reducers: {
    setCoverId: (state, action: PayloadAction<number>) => {
      console.log("In setCoverId", action.payload);
      state.coverId = action.payload;
    },
  },
});

export const { setCoverId } = coverSlice.actions;

export default coverSlice.reducer;
