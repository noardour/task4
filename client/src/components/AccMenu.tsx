import { FC } from "react";
import { useSelector } from "react-redux";
import { selectAuthUser, selectIsAuthorized } from "../store/auth/selectors";
import { Link } from "react-router-dom";

const UserMenu: FC = () => {
  const user = useSelector(selectAuthUser);

  return (
    <div className="flex gap-2">
      <span>Добро пожаловать {user.name}</span>
      <Link to="logout">Log Out</Link>
    </div>
  );
};

const AuthMenu: FC = () => (
  <div className="flex gap-2">
    <Link to="/login">Log In</Link>
    <Link to="/registration">Registration</Link>
  </div>
);

const AccMenu: FC = () => {
  const isAuthorized = useSelector(selectIsAuthorized);

  return isAuthorized ? <UserMenu /> : <AuthMenu />;
};

export default AccMenu;
