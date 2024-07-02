import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userReducer from "./user/userSlice";
import navReducer from "./nav/navSlice";

const reducers = combineReducers({
  user: userReducer,
  nav: navReducer,
});

export const store = configureStore({ reducer: reducers });

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
