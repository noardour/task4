import { ActionFunction, redirect } from "react-router-dom";
import appAxios from "../../appAxios";
import { authorize } from "../../store/auth/slice";
import store from "../../store";
import { IUser } from "../../types/IUser";

const loginAction: ActionFunction = async ({ request }) => {
  try {
    const data = Object.fromEntries(await request.formData());
    const response = await appAxios.post<{ token: string; user: IUser }>("/api/users/login", data);
    store.dispatch(authorize(response.data));
    return redirect("/");
  } catch (err) {
    const data = err?.response?.data;
    return typeof data == "string" ? data : null;
  }
};

export default loginAction;
