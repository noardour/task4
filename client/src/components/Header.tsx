import { FC } from "react";
import Container from "./Container";
import AccMenu from "./AccMenu";

const Header: FC = () => (
  <header className="bg-[#232323] p-4 mb-10">
    <Container>
      <div className="flex justify-end gap-3">
        <AccMenu />
      </div>
    </Container>
  </header>
);

export default Header;
