import axios from "axios";
import useStore from "@/shared/store/useStore";
import clientConfig from "./indexConfig";

const axiosInstance = axios.create({
  baseURL: clientConfig.base_url,
});

// Request interceptor → add access token from Zustand
axiosInstance.interceptors.request.use(
  (config) => {
    const { token } = useStore.getState();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor → handle expired token

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { refresh_token } = useStore.getState();

        // Ask Directus for new access token
        const res = await axios.post(`${clientConfig.base_url}/auth/refresh`, {
          refresh_token,
        });

        const { access_token, expires } = res.data.data;

        useStore
          .getState()
          .setToken(access_token ?? "", refresh_token ?? "", expires, true);

        // Retry failed request
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("❌ Refresh token invalid, logging out...");

        useStore.getState().logout?.();

        try {
          await axios.post(`${clientConfig.base_url}/auth/logout`, {
            refresh_token: useStore.getState().refresh_token,
          });
        } catch (err) {
          console.warn(
            "Logout request failed, but session already invalid",
            err
          );
        }

        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
