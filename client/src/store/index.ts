import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users/slice";
import authReducer from "./auth/slice";
import { setUpInterseptors } from "../appAxios";

const store = configureStore({
  reducer: {
    users: usersReducer,
    auth: authReducer,
  },
});

setUpInterseptors(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
