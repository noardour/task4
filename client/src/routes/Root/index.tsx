import { FC } from "react";
import Container from "../../components/Container";
import Tooltip from "../../components/Tooltip";
import UsersTable from "../../components/UsersTable";

const Root: FC = () => (
  <div>
    <Container>
      <Tooltip className="mb-2" />

      <UsersTable />
    </Container>
  </div>
);

export default Root;
