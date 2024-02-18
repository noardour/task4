import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IUser } from "../../types/IUser";
import { RootState } from "..";

export const fetchUsers = createAsyncThunk(
  "users/fetch",
  async (_, thunk) => {
    try {
      const response = await axios.get<IUser[]>("/api/users");
      return response.data;
    } catch (err) {
      thunk.rejectWithValue(err);
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState() as RootState;
      return !state.users.isLoading;
    },
  }
);

export const blockUsers = createAsyncThunk("users/block", async (_, thunk) => {
  try {
    const state = thunk.getState() as RootState;
    const ids = state.users.data.filter((user) => user.checked).map((user) => user.id);
    await axios.patch("/api/users/block", { ids: ids });
    return ids;
  } catch (err) {
    thunk.rejectWithValue(err);
  }
});

export const unblockUsers = createAsyncThunk("users/unblock", async (_, thunk) => {
  try {
    const state = thunk.getState() as RootState;
    const ids = state.users.data.filter((user) => user.checked).map((user) => user.id);
    await axios.patch("/api/users/unblock", { ids: ids });
    return ids;
  } catch (err) {
    thunk.rejectWithValue(err);
  }
});
