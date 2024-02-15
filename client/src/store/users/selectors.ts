import { RootState } from "..";
import { IUserRow } from "./slice";

export const selectUsers = (store: RootState): IUserRow[] => store.users.data;
