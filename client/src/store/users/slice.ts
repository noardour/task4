import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../types/IUser";
import { blockUsers, createUser, deleteUsers, fetchUsers, unblockUsers } from "./actions";

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
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    builder.addCase(blockUsers.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(blockUsers.fulfilled, (state, action: PayloadAction<number[]>) => {
      state.isLoading = false;
      state.data.forEach((user) => {
        if (action.payload.includes(user.id)) user.status = "BLOCKED";
      });
    });
    builder.addCase(blockUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    builder.addCase(unblockUsers.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(unblockUsers.fulfilled, (state, action: PayloadAction<number[]>) => {
      state.isLoading = false;
      state.data.forEach((user) => {
        if (action.payload.includes(user.id)) user.status = "ACTIVE";
      });
    });
    builder.addCase(unblockUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    builder.addCase(createUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createUser.fulfilled, (state, action: PayloadAction<IUser>) => {
      state.isLoading = false;
      state.data.push({ ...action.payload, checked: false });
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    builder.addCase(deleteUsers.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteUsers.fulfilled, (state, action: PayloadAction<number[]>) => {
      console.log(action.payload);
      state.data = state.data.filter((user) => !action.payload.includes(user.id));
      state.isLoading = false;
    });
    builder.addCase(deleteUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const { setChecked, setCheckedToAll } = usersSlice.actions;

export default usersSlice.reducer;
