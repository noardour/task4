import { Link } from "react-router-dom";
import Container from "../components/Container";
import Paper from "../components/UI/Paper";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import useAppDispatch from "../hooks/useAppDispatch";
import { createUser } from "../store/users/actions";

export interface RegistrationData {
  name: string;
  email: string;
  password: string;
  repeat_password: string;
}

const Registration = () => {
  const [state, setState] = useState<RegistrationData>({
    name: "",
    email: "",
    password: "",
    repeat_password: "",
  });
  const dispatch = useAppDispatch();

  const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const hundleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    dispatch(createUser(state));
  };

  return (
    <Container>
      <Paper>
        <Link to="/" className="text-main underline hover:text-white">
          На главную
        </Link>
        <h1 className="text-4xl font-bold mb-4">Регистрация</h1>

        <form action="api/users/create" method="POST" onSubmit={hundleSubmit}>
          <div className="mb-8">
            <Input className="mb-2" value={state.name} label="Имя" onChange={handleInput} name="name" />
            <Input className="mb-2" value={state.email} label="Email" onChange={handleInput} name="email" />
            <Input className="mb-2" value={state.password} label="Пароль" onChange={handleInput} name="password" />
            <Input value={state["repeat_password"]} label="Повторить пароль" onChange={handleInput} name="repeat_password" />
          </div>
          <Button>Зарегистрироваться</Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Registration;
