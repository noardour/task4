import { Link } from "react-router-dom";
import Container from "../components/Container";
import Paper from "../components/UI/Paper";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";

const Registration = () => {
  return (
    <Container>
      <Paper>
        <Link to="/" className="text-main underline hover:text-white">
          На главную
        </Link>
        <h1 className="text-4xl font-bold mb-4">Регистрация</h1>
        <Input />
      </Paper>
      <Button>Test</Button>
    </Container>
  );
};

export default Registration;
