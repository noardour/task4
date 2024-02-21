import { LoaderFunction, redirect } from "react-router-dom";
import { selectIsAuthorized } from "../../store/auth/selectors";
import store from "../../store";
import { unauthorize } from "../../store/auth/slice";

const logoutLoader: LoaderFunction = async () => {
  if (selectIsAuthorized(store.getState())) {
    store.dispatch(unauthorize());
  }

  return redirect("/");
};

export default logoutLoader;
