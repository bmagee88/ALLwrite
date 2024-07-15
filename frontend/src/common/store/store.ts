import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userReducer from "./user/userSlice";
import coverReducer from "./cover/coverSlice";
import navReducer from "./nav/navSlice";
import continueReadingReducer from "./continueReading/continueReading";

const reducers = combineReducers({
  user: userReducer,
  nav: navReducer,
  cover: coverReducer,
  continueReading: continueReadingReducer,
});

export const store = configureStore({ reducer: reducers });

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
