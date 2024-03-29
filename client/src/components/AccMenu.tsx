import { FC } from "react";
import { useSelector } from "react-redux";
import { selectAuthUser, selectIsAuthorized } from "../store/auth/selectors";
import AppLink from "./UI/AppLink";

const UserMenu: FC = () => {
  const user = useSelector(selectAuthUser);

  return (
    <div className="flex gap-5">
      <span>
        Добро пожаловать, <b>{user.name}</b>
      </span>
      <AppLink to="logout">Log Out</AppLink>
    </div>
  );
};

const AuthMenu: FC = () => (
  <div className="flex gap-5">
    <AppLink to="/login">Log In</AppLink>
    <AppLink to="/registration">Registration</AppLink>
  </div>
);

const AccMenu: FC = () => {
  const isAuthorized = useSelector(selectIsAuthorized);

  return isAuthorized ? <UserMenu /> : <AuthMenu />;
};

export default AccMenu;
