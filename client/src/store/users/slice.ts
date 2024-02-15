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
  data: IUserRow[];
}

const INITIAL_STATE: UsersState = {
  data: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState: INITIAL_STATE,
  reducers: {
    fetchUsers: (state) => {
      state.data = testUsers.map((user) => ({ ...user, checked: false } as IUserRow));
    },

    setChecked: (state, action: PayloadAction<{ id: number; value: boolean }>) => {
      const user = state.data.find((user) => user.id == action.payload.id);
      user && (user.checked = action.payload.value);
    },

    setCheckedToAll: (state, action: PayloadAction<boolean>) => {
      state.data.forEach((user) => {
        user.checked = action.payload;
      });
    },

    blockUsers: (state) => {
      state.data.forEach((user) => {
        user.checked && (user.status = "blocked");
      });
    },

    unblockUsers: (state) => {
      state.data.forEach((user) => {
        user.checked && (user.status = "active");
      });
    },

    deleteUsers: (state) => {
      state.data = state.data.filter((user) => !user.checked);
    },
  },
});

export const { fetchUsers, setChecked, setCheckedToAll, blockUsers, unblockUsers, deleteUsers } = usersSlice.actions;

export default usersSlice.reducer;
