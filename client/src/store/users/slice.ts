import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../types/IUser";
import { blockUsers, fetchUsers } from "./actions";

export interface IUserRow extends IUser {
  checked: boolean;
}

export interface UsersState {
  error: string | null;
  isLoading: boolean;
  data: IUserRow[];
}

const INITIAL_STATE: UsersState = {
  error: null,
  isLoading: false,
  data: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState: INITIAL_STATE,
  reducers: {
    setChecked: (state, action: PayloadAction<{ id: number; value: boolean }>) => {
      const user = state.data.find((user) => user.id == action.payload.id);
      user && (user.checked = action.payload.value);
    },

    setCheckedToAll: (state, action: PayloadAction<boolean>) => {
      state.data.forEach((user) => {
        user.checked = action.payload;
      });
    },

    unblockUsers: (state) => {
      state.data.forEach((user) => {
        user.checked && (user.status = "ACTIVE");
      });
    },

    deleteUsers: (state) => {
      state.data = state.data.filter((user) => !user.checked);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.error = null;
      state.isLoading = false;
      state.data = [];
    });
    builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
      state.data = action.payload.map((user) => ({ ...user, checked: false }));
      state.isLoading = false;
    });
    builder.addCase(fetchUsers.rejected, (_, action) => {
      console.log(action.payload);
    });

    builder.addCase(blockUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(blockUsers.fulfilled, (state, action: PayloadAction<number[]>) => {
      state.isLoading = false;
      state.data.forEach((user) => {
        if (action.payload.includes(user.id)) user.status = "BLOCKED";
      });
    });
    builder.addCase(blockUsers.rejected, (state) => {
      state.isLoading = true;
    });
  },
});

export const { setChecked, setCheckedToAll, unblockUsers, deleteUsers } = usersSlice.actions;

export default usersSlice.reducer;
