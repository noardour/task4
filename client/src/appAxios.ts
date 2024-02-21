import axios from "axios";
import { selectToken } from "./store/auth/selectors";
import { unauthorize } from "./store/auth/slice";

const appAxios = axios.create();

export const setUpInterseptors = (store) => {
  appAxios.interceptors.request.use((req) => {
    const token = selectToken(store.getState());

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  });

  appAxios.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response && err.response.status == 403) {
        store.dispatch(unauthorize());
      }

      return Promise.reject(err);
    }
  );
};

export default appAxios;
