import axios from "axios";
import Cookies from "js-cookie";

export const apiUrl_main = `http://156.200.122.85:100`;
const apiUrl = `${apiUrl_main}/api`;

// export const Authorization_Token_Main = "token 123";
const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// axiosInstance.interceptors.request.use((config) => {
//   const token = Cookies.get("token_the_club");
//   console.log(Cookies.get("token_the_club"));
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  const isLoginRequest = config.url?.includes(
    "/method/the_club_api.api.public.auth.login.login"
  );

  if (token && !isLoginRequest) {
    config.headers.Authorization = `token ${token}`;
  }

  return config;
});
export default axiosInstance;