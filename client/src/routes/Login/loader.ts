import { LoaderFunction, redirect } from "react-router-dom";
import store from "../../store";
import { selectIsAuthorized } from "../../store/auth/selectors";

const loginLoader: LoaderFunction = async () => {
  if (selectIsAuthorized(store.getState())) return redirect("/");
  return null;
};

export default loginLoader;
