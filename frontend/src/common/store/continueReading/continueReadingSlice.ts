import { createSlice } from "@reduxjs/toolkit";

export interface Continue {
  bookmarks: [];
}

let initialState: Continue = { bookmarks: [] };

const continueReadingSlice = createSlice({
  name: "continueReading",
  initialState,
  reducers: {
    setBookmarks: (state, action) => {
      console.log("dispatching setContinueReading");
      state.bookmarks = action.payload;
    },
  },
});

export const { setBookmarks } = continueReadingSlice.actions;

export default continueReadingSlice.reducer;
