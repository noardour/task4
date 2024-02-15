import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../types/IUser";

const testUsers: IUser[] = [
  {
    id: 1,
    name: "FirstName SecondName",
    eMail: "testtest@email.com",
    lastLogin: "2022.01.01",
    status: "active",
  },
  {
    id: 2,
    name: "FirstName SecondName",
    eMail: "testtest@email.com",
    lastLogin: "2022.01.01",
    status: "active",
  },
  {
    id: 3,
    name: "FirstName SecondName",
    eMail: "testtest@email.com",
    lastLogin: "2022.01.01",
    status: "active",
  },
  {
    id: 4,
    name: "FirstName SecondName",
    eMail: "testtest@email.com",
    lastLogin: "2022.01.01",
    status: "active",
  },
  {
    id: 5,
    name: "FirstName SecondName",
    eMail: "testtest@email.com",
    lastLogin: "2022.01.01",
    status: "active",
  },
  {
    id: 6,
    name: "FirstName SecondName",
    eMail: "testtest@email.com",
    lastLogin: "2022.01.01",
    status: "active",
  },
];

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
    fetchUsers: (state) => {
      state.users = testUsers.map((user) => ({ ...user, checked: false } as IUserRow));
    },

    setChecked: (state, action: PayloadAction<{ id: number; value: boolean }>) => {
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
