import { FC } from "react";
import { Link } from "react-router-dom";
import Container from "./Container";
import useAppSelector from "../hooks/useAppSelector";
import { selectIsAuthorized } from "../store/auth/selectors";

const Header: FC = () => {
  const isAuthorized = useAppSelector(selectIsAuthorized);

  return (
    <header className="bg-[#232323] p-4 mb-10">
      <Container>
        <div className="flex justify-end gap-3">
          {isAuthorized ? (
            <>
              <Link to="/logout">Log Out</Link>
            </>
          ) : (
            <>
              <Link className="font-semibold hover:text-[#60dbfa] text-xl" to="/login">
                Log In
              </Link>
              <Link className="font-semibold hover:text-[#60dbfa] text-xl" to="/registration">
                Registration
              </Link>
            </>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
