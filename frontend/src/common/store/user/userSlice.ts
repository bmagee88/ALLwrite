import { createSlice } from "@reduxjs/toolkit";

export interface User {
  username: string;
  user_id: number;
  firstname: string;
  lastname: string;
  email: string;
}

interface UserState {
  user: User | null; // user can be null or of type User
}

let initialState: UserState = { user: null };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action: { payload: User }) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
