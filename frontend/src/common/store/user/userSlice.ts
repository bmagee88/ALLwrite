import { createSlice } from "@reduxjs/toolkit";

export interface User {
  username: string;
  user_id: number;
  firstname: string;
  lastname: string;
  email: string;
}

let initialState = { user: {} as User };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action: { payload: User }) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = {} as User;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
