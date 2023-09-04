import axios from "axios";
import { BASE_URL } from "./constants";
import { ACCESS_TOKEN_KEY } from "../utils/auth";

const http = axios.create({
  timeout: 5000,
  baseURL: BASE_URL,
});

http.interceptors.response.use(
  (res) => {
    const accessToken = window.localStorage.getItem(ACCESS_TOKEN_KEY);
    if (accessToken) {
      res.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return res.data;
  },
  (err) => {
    console.error(err);
    alert("요청에 실패하였습니다.");
  },
);

export default http;
