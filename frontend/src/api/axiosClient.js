import axios from "axios";

// Hardcoded API URL
const baseURL = "http://16.16.194.51:5000";

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


