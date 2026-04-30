import axios from "axios";

// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
// });

const API = axios.create({
  baseURL: https://fitness-tracker-web-w5td.onrender.com/api
});

let storeRef=null;

export const injectStore = (_store) => {
  storeRef = _store;
};

API.interceptors.request.use((req) => {
  const token = storeRef?.getState()?.user?.currentUser?.token;
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;