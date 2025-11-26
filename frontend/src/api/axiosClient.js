import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

if (!baseURL) {
  // Log a warning in development so misconfigurations are obvious.
  // This will not break the app but API calls will fail against an undefined URL.
  // eslint-disable-next-line no-console
  console.warn(
    "VITE_API_URL is not defined. Please set it in your frontend .env file."
  );
}

const axiosClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: false
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Central place to log errors; could be extended to show toasts, etc.
    // eslint-disable-next-line no-console
    console.error("API Error:", error?.response || error?.message);
    return Promise.reject(error);
  }
);

export default axiosClient;


