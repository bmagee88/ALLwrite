import { createSlice } from "@reduxjs/toolkit";

export interface Contributions {
  myContributions: [];
}

let initialState: Contributions = { myContributions: [] };

const contributionsSlice = createSlice({
  name: "myContributions",
  initialState,
  reducers: {
    setContributions: (state, action) => {
      console.log("dispatching");
      state.myContributions = action.payload;
    },
  },
});

export const { setContributions } = contributionsSlice.actions;

export default contributionsSlice.reducer;
