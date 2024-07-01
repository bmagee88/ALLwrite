import { createSlice } from "@reduxjs/toolkit";

export interface Nav {
  selectedItem: string;
}

let initialState: Nav = { selectedItem: "Explore" };

const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setSelected: (state, action) => {
      state.selectedItem = action.payload;
    },
  },
});

export const { setSelected } = navSlice.actions;

export default navSlice.reducer;
