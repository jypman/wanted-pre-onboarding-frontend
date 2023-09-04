import axios from "axios";
import { BASE_URL } from "./constants";
import { ACCESS_TOKEN_KEY } from "../utils/auth";

const http = axios.create({
  timeout: 5000,
  baseURL: BASE_URL,
});

http.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (err) => {
    console.error(err);
    alert("요청에 실패하였습니다.");
  },
);

http.interceptors.response.use((res) => {
  return res.data;
});

export default http;
