import { FC } from "react";
import { Link } from "react-router-dom";
import Container from "./Container";

const Header: FC = () => (
  <header className="bg-[#232323] p-4 mb-10">
    <Container>
      <div className="flex justify-end gap-3">
        <Link className="font-semibold hover:text-[#60dbfa] text-xl" to="/">
          home
        </Link>
        <Link className="font-semibold hover:text-[#60dbfa] text-xl" to="/login">
          login
        </Link>
        <Link className="font-semibold hover:text-[#60dbfa] text-xl" to="/registration">
          register
        </Link>
      </div>
    </Container>
  </header>
);

export default Header;
