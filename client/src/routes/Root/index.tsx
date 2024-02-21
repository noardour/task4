import { FC } from "react";
import Container from "../../components/Container";
import Tooltip from "../../components/Tooltip";
import UsersTable from "../../components/UsersTable";
import AuthGuard from "../../components/AuthGuard";

const Root: FC = () => (
  <div>
    <Container>
      <AuthGuard message="Редактирование таблицы пользователей доступно только зарегистрированным пользователям">
        <Tooltip className="mb-2" />
        <UsersTable />
      </AuthGuard>
    </Container>
  </div>
);

export default Root;
