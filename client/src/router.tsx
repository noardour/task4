import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./routes/Login";
import loginLoader from "./routes/Login/loader";
import Registration from "./routes/Registration";
import Root from "./routes/Root";
import registrationLoader from "./routes/Registration/loader";
import logoutLoader from "./routes/Logout/loader";
import loginAction from "./routes/Login/action";
import registrationAction from "./routes/Registration/action";

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
        loader: loginLoader,
        action: loginAction,
      },
      {
        path: "/registration",
        element: <Registration />,
        loader: registrationLoader,
        action: registrationAction,
      },
      {
        path: "/logout",
        loader: logoutLoader,
      },
    ],
  },
]);

export default router;
