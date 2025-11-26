import axios from "axios";

// Hardcoded API URL
const baseURL = "http://16.16.194.51:5000";

const axiosClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "X-Requested-With": "XMLHttpRequest"
  },
  withCredentials: true, // Enable credentials for CORS
  crossDomain: true
});

// Request interceptor for CORS
axiosClient.interceptors.request.use(
  (config) => {
    // Browser automatically adds Origin header, no need to set manually
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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


