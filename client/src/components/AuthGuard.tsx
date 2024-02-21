import { FC, PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { selectIsAuthorized } from "../store/auth/selectors";
import Paper from "./UI/Paper";

interface AuthGuradProps {
  message?: string;
}

const AuthGuard: FC<PropsWithChildren<AuthGuradProps>> = ({ message, children }) => {
  const isAuthrized = useSelector(selectIsAuthorized);

  if (!isAuthrized) {
    return <Paper>{message || "Требуется авторизация"}</Paper>;
  }

  return children;
};

export default AuthGuard;
