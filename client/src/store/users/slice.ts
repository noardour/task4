import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../types/IUser";

export interface IUserRow extends IUser {
  checked: boolean;
}

export interface UsersState {
  users: IUserRow[];
}

const INITIAL_STATE: UsersState = {
  users: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState: INITIAL_STATE,
  reducers: {
    setChecked: (
      state,
      action: PayloadAction<{ id: number; value: boolean }>
    ) => {
      const user = state.users.find((user) => user.id == action.payload.id);
      user && (user.checked = action.payload.value);
    },

    blockUsers: (state) => {
      state.users.forEach((user) => {
        user.checked && (user.status = "blocked");
      });
    },

    deleteUsers: (state) => {
      state.users = state.users.filter((user) => !user.checked);
    },
  },
});

export const { setChecked, blockUsers, deleteUsers } = usersSlice.actions;

export default usersSlice.reducer;
