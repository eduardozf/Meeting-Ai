import axios from "axios";

const baseURL = "http://localhost:3333/v1";

const api = axios.create({ baseURL });

export { api };
