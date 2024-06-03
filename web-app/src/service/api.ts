import axios from "axios";

const baseURL = "http://localhost:3333/v1";

const api = axios.create({ baseURL });

const setApiToken = (token: string) => {
  api.defaults.headers.common["Authorization"] = token;

  return api;
};

export { api, setApiToken };
