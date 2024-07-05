import { message } from "antd";
import axios, { AxiosError, AxiosInstance, HttpStatusCode } from "axios";
import { useNavigate } from "react-router-dom";

const useAxios = () => {
  const navigate = useNavigate();

  const api: AxiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    responseType: "json",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    timeout: 1000 * 60,
  });

  // add token to each request
  api.interceptors.request.use(async (config: any) => {
    let token = localStorage.getItem("authToken");
    config.headers.Authorization = token;
    return config;
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      // handle server errors for all the requests
      if (error?.response?.status === HttpStatusCode.Unauthorized) {
        message.error("Please log in first !", 5);
        return navigate("/register");
      } else {
        message.error("Somthing went wrong !", 5);
      }
      return Promise.reject(error);
    }
  );
  return api;
};

export default useAxios;
