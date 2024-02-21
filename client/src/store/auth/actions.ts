import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginData } from "../../routes/Login";
import appAxios from "../../appAxios";
import { authorize } from "./slice";
import { IUser } from "../../types/IUser";

export const logIn = createAsyncThunk("auth/login", async (data: LoginData, thunk) => {
  try {
    const response = await appAxios.post<{ token: string; user: IUser }>("/api/users/login", data);

    thunk.dispatch(authorize(response.data));
  } catch (err) {
    thunk.rejectWithValue(err);
  }
});

export const registrate = createAsyncThunk("auth/registrate", async (data: LoginData, thunk) => {
  try {
    const response = await appAxios.post<{ token: string; user: IUser }>("/api/users/registrate");

    thunk.dispatch(authorize(response.data));
  } catch (err) {
    thunk.rejectWithValue(err);
  }
});
