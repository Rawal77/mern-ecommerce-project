import axios from "axios";
import { toast } from "react-toastify";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "Application/json",
    Accept: "Application/json",
  },
});

http.interceptors.response.use(
  response => response,
  err => {
    if ("response" in err && "error" in err.response.data) {
      toast.error(err.response.data.error);
    }
    return Promise.reject(err);
  }
);

export default http;
