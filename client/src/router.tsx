import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./routes/Login";
import Registration from "./routes/Registration";
import Root from "./routes/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Root />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/registration",
        element: <Registration />,
      },
    ],
  },
]);

export default router;
