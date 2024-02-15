import { FC } from "react";
import Container from "../../components/Container";
import Tooltip from "../../components/Tooltip";
import UsersTable from "../../components/UsersTable";
import { IUser } from "../../types/IUser";

const users: IUser[] = [
  {
    id: 1,
    name: "FirstName SecondName",
    eMail: "testtest@email.com",
    lastLogin: "2022.01.01",
    status: "active",
  },
  {
    id: 2,
    name: "FirstName SecondName",
    eMail: "testtest@email.com",
    lastLogin: "2022.01.01",
    status: "active",
  },
  {
    id: 3,
    name: "FirstName SecondName",
    eMail: "testtest@email.com",
    lastLogin: "2022.01.01",
    status: "active",
  },
];

const Root: FC = () => (
  <div>
    <Container>
      <Tooltip />

      <UsersTable users={users} />
    </Container>
  </div>
);

export default Root;
