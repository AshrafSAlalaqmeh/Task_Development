import axios from "axios";

const publicAxios = axios.create({
  baseURL: "http://localhost:3001",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
  credentials: "include",
});

publicAxios.interceptors.response.use(
  (res) => {
    return res;
  },

  async (err) => {
    return Promise.reject(err);
  }
);

const method = {
  get: publicAxios.get,
  post: publicAxios.post,
  put: publicAxios.put,
  delete: publicAxios.delete,
};

export default method;
