import { axiosPrivate } from "../api/auth/privateAxios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useSelector } from "react-redux";
import axios from "axios";
import useLogout from "./useLogout";
import { useLocation, useNavigate } from "react-router-dom";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const logout = useLogout();
  const accessToken = useSelector((state) => state.accessToken.accessToken);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (prevRequest.url === "/refresh" || prevRequest.url === "/logout") {
          try {
            await logout();
            navigate("/login", { state: { from: location }, replace: true });
          } catch (error) {
            return Promise.reject(error);
          }
          return Promise.reject(error);
        } else if (
          error?.response?.status === 401 &&
          prevRequest.url !== "/refresh"
        ) {
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
