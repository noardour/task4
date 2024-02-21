import { Form, Link, useActionData } from "react-router-dom";
import Container from "../../components/Container";
import Paper from "../../components/UI/Paper";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import { ChangeEventHandler, useState } from "react";

export interface RegistrationData {
  name: string;
  email: string;
  password: string;
  repeat_password: string;
}

const Registration = () => {
  const error = useActionData();
  const [state, setState] = useState<RegistrationData>({
    name: "",
    email: "",
    password: "",
    repeat_password: "",
  });

  const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Paper>
        <Link to="/" className="text-main underline hover:text-white">
          На главную
        </Link>
        <h1 className="text-4xl font-bold mb-4">Регистрация</h1>

        {error && <div className="mb-3 mt-3 text-error">{error as string}</div>}

        <Form action="/registration" method="POST">
          <div className="mb-8">
            <Input className="mb-2" value={state.name} label="Имя" onChange={handleInput} name="name" />
            <Input className="mb-2" value={state.email} label="Email" onChange={handleInput} name="email" />
            <Input className="mb-2" value={state.password} label="Пароль" onChange={handleInput} name="password" />
            <Input value={state["repeat_password"]} label="Повторить пароль" onChange={handleInput} name="repeat_password" />
          </div>
          <Button>Зарегистрироваться</Button>
        </Form>
      </Paper>
    </Container>
  );
};

export default Registration;
