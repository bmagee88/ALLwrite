import { createSlice } from "@reduxjs/toolkit";

export interface Contributions {
  contribs: [];
}

let initialState: Contributions = { contribs: [] };

const myContributionsSlice = createSlice({
  name: "myContributions",
  initialState,
  reducers: {
    setContributions: (state, action) => {
      console.log("dispatching setContributions");
      state.contribs = action.payload;
    },
  },
});

export const { setContributions } = myContributionsSlice.actions;

export default myContributionsSlice.reducer;
