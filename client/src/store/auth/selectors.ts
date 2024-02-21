import { RootState } from "..";

export const selectAuthUser = (state: RootState) => state.auth.user;

export const selectToken = (state: RootState) => state.auth.token;

export const selectIsAuthorized = (state: RootState) => state.auth.isAuthorized;
