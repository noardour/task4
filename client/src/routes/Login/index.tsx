import { ChangeEventHandler, FC, useState } from "react";
import Container from "../../components/Container";
import Paper from "../../components/UI/Paper";
import { Form, useActionData } from "react-router-dom";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import AppLink from "../../components/UI/AppLink";

export interface LoginData {
  email: string;
  password: string;
}

const Login: FC = () => {
  const error = useActionData();
  const [state, setState] = useState<LoginData>({
    email: "",
    password: "",
  });

  const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Paper>
        <AppLink to="/">На главную</AppLink>
        <h1 className="text-4xl font-bold mb-4">Регистрация</h1>

        {error && <div className="mb-3 mt-3 text-error">{error as string}</div>}

        <Form action="/login" method="POST">
          <div className="mb-8">
            <Input className="mb-2" value={state.email} label="Email" onChange={handleInput} name="email" />
            <Input className="mb-2" value={state.password} label="Пароль" onChange={handleInput} name="password" />
          </div>
          <Button>Войти</Button>
        </Form>
      </Paper>
    </Container>
  );
};

export default Login;
