import axios from "axios";

import { setupInterceptor } from "./interceptor";

let instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}`,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

instance = setupInterceptor(instance);

export default instance;
