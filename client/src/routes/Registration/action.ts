import { ActionFunction, redirect } from "react-router-dom";
import appAxios from "../../appAxios";
import { IUser } from "../../types/IUser";
import { authorize } from "../../store/auth/slice";
import store from "../../store";

const registrationAction: ActionFunction = async ({ request }) => {
  try {
    const data = Object.fromEntries(await request.formData());
    const response = await appAxios.post<{ token: string; user: IUser }>("/api/users/registrate", data);

    store.dispatch(authorize(response.data));
    return redirect("/");
  } catch (err) {
    const data = err.response.data;
    return data;
  }
};

export default registrationAction;
