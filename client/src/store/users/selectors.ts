import { RootState } from "..";
import { IUserRow } from "./slice";

export const selectUsers = (store: RootState): IUserRow[] => store.users.data;

export const selectIsLoading = (store: RootState): boolean => store.users.isLoading;
