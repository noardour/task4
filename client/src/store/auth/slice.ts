import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types/IUser";

interface AuthState {
  isAuthorized: boolean;
  token: string | null;
  user: IUser | null;
}

const stateFromStorage = localStorage.getItem("REDUX_AUTH_STATE");

const INITIAL_STATE: AuthState = stateFromStorage
  ? JSON.parse(stateFromStorage)
  : {
      isAuthorized: false,
      token: null,
      user: null,
    };

const slice = createSlice({
  name: "auth",
  reducers: {
    authorize: (state, action: PayloadAction<{ token: string; user: IUser }>) => {
      state.isAuthorized = true;
      state.token = action.payload.token;
      state.user = action.payload.user;

      localStorage.setItem("REDUX_AUTH_STATE", JSON.stringify(state));
    },

    unauthorize: (state) => {
      state.isAuthorized = false;
      state.token = null;
      state.user = null;

      localStorage.removeItem("REDUX_AUTH_STATE");
    },
  },
  initialState: INITIAL_STATE,
});

export const { authorize, unauthorize } = slice.actions;

export default slice.reducer;
